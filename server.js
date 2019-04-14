const path             = require('path')
const _                = require('lodash')
const { createServer } = require('http')
const { parse }        = require('url')
const next             = require('next')

// Environment variable set to decide whether to send email, CRM
// updates, and any other external calls.
// `isLive` will be true if the environment variable LIVE=true was set,
// or the app is run in production.
const isProduction = process.env.NODE_ENV === 'production'
const liveSet      = process.env.LIVE === 'true'
const isLive = liveSet || isProduction

const db      = require('./server/db')
const pdfsFor = require('./server/pdfsFor')
const crm     = require('./server/crm')(isLive)
const email   = require('./server/email')(isLive)


const mimeJSON = 'application/json'

const respond = (res, statusCode=200, body={}) => {
  const isSuccess = statusCode === 200
  const bodyFull = Object.assign({
    ok: isSuccess,
  }, body)
  res.writeHead(statusCode, {
    'Content-Type': mimeJSON
  })
  res.end(JSON.stringify(bodyFull))
}

const respondSuccess = (res) => respond(res)
const respondFailure = (res) => respond(res, 500)

const respondErrors = (res, statusCode=400, errors) =>
  respond(res, statusCode, {
    errors: errors
  })

const respondUnauthorizedLaunchCode = (res) =>
  respondErrors(res, 401, ['Invalid launch code'])

const processLOIInfo = (json, res) => {
  const pdf = pdfsFor(json)
  const fnames = pdf.fnames
  const sentValues = JSON.stringify(_.omit(json, ['signature']))
  console.log(
    `[ OK ] /POST ${sentValues}\n${JSON.stringify(fnames)}`
  )
  pdf.fillForm((err) => {
    if (err) {
      console.error(err)
      respondFailure(res)
    } else {
      console.log('[ OK ] Filled form')
      // TODO: Pass malformed sigs to test protecting edge cases
      pdf.signDocument((err) => {
        if (err) {
          console.error(err)
          respondFailure(res)
        } else {
          console.log('[ OK ] Document generated.')
          const nextLaunchCode = db.genLaunchCode()
          const loiSigned = path.join(__dirname, fnames.signed)
          email.send(loiSigned, json, nextLaunchCode, (err, body) => {
            if (err) {
              console.log(err)
              respondFailure(res)
            } else {
              console.log('[ OK ] Email sent')
              const loiBase = fnames.base
              db.saveRecords(json, loiBase, nextLaunchCode, (err) => {
                if (err) {
                  console.log(err)
                  respondFailure(res)
                } else {
                  console.log('[ OK ] Records saved')
                  crm.push(json, nextLaunchCode, (err) => {
                    if (err) {
                      console.error(err)
                      respondFailure(res)
                    } else {
                      console.log('[ OK ] Everything succeeded')
                      respond(res, 200, {
                        "genLaunchCode": nextLaunchCode
                      })
                    }
                  })
                }
              })
            }
          })
        }
      })
    }
  })
}

const errorsForLOI = (json) => {
  const keys = Object.keys(json)
  const required = [
    'launchCode',
    'date',
    'epoch',
    'name',
    'email',
    'investment',
    'signature',
    'addressLine1',
    'addressLine2',
    'addressLine3',
  ]
  const missing = _.difference(required, keys)
  const errors = missing.map(f => `Field ${f} is missing.`)
  return errors
}

/* POST /loi-info with a valid launch code
 *
 * Expected Fields:
 * - launchCode
 * - date
 * - epoch
 * - name
 * - email
 * - investment
 * - signature
 * - addressLine1
 * - addressLine2
 * - addressLine3
 */
const handleLOIInfo = (json, res) => {
  const errors = errorsForLOI(json)
  if (! _.isEmpty(errors)) {
    console.error(`[ ERROR ] Invalid JSON: ${errors}`)
    respondErrors(res, errors)
  } else {
    processLOIInfo(json, res)
  }
}

const handleAddLaunchCode = (json, res) => {
  const { secret, launchCode } = json
  const isValidCode = (code) =>
    _.isString(code)
    && code.length === 6
    && _.every(code, c => c === c.toUpperCase())
  if (secret === 'Otters4Lyfe!') {
    const newCode = isValidCode(launchCode)
      ? launchCode
      : db.genLaunchCode()
    db.addLaunchCode(newCode, (err) => {
      if (err) {
        console.error(err)
        respondFailure(res)
      } else {
        console.log(`[ OK ] ${newCode} saved`)
        crm.pushCode(newCode, (err) => {
          if (err) {
            console.error(err)
            respondFailure(res)
          } else {
            console.log(`[ OK ] ${newCode} sent to CRM`)
            respond(res, 200, {
              "genLaunchCode": newCode
            })
          }
        })
      }
    })
  } else {
    console.error(
      `[ ERROR ] Trying to add code using ${secret}`
    )
    respondFailure(res)
  }
}

const readJSON = (req, cbak) => {
  req.body = ""
  req.on('data', (data) => req.body += data)
  req.on('end', () => {
    const json = JSON.parse(req.body)
    cbak(json)
  })
}

const gateWithLaunchCode = (fn) => {
  return (json, res) => {
    const code = json.launchCode
    db.isValidLaunchCode(code, (err, isValid) => {
      if (err) {
        console.error(err)
        respondFailure(res)
      } else if (isValid) {
        console.log(`[ OK ] User getting through using ${code}`)
        fn(json, res)
      } else {
        console.error(`User tried invalid code ${code}`)
        respondUnauthorizedLaunchCode(res)
      }
    })
  }
}

// Setup HTTP server
const dev = ! isProduction
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    const { pathname, query } = parsedUrl
    const match = (method, path) => (
      pathname === path && req.method === method
    )
    // POST /loi-info
    if (match('POST', '/loi-info')) {
      console.log('POST /loi-info')
      readJSON(req, (json) => {
        gateWithLaunchCode(handleLOIInfo)(json, res)
      })
    // POST /verify-launch-code
    } else if (match('POST', '/verify-launch-code')) {
      console.log('POST /verify-launch-code')
      readJSON(req, (json) => {
        gateWithLaunchCode(
          (json, res) => respondSuccess(res)
        )(json, res)
      })
    } else if (match('POST', '/launch-codes')) {
      console.log('POST /launch-codes')
      readJSON(req, (json) => {
        handleAddLaunchCode(json, res)
      })
    // Pass-through for every other request
    } else {
      handle(req, res, parsedUrl)
    }
  }).listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
