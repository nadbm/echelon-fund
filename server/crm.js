const fetch = require('node-fetch')


/* CRM integration through Zapier
 *
 * LOI Signers
 * -----------
 * => https://hooks.zapier.com/hooks/catch/2589398/ihnwu6/
 * {
 *   "name": ...,
 *   "email": ...,
 *   "code_used": ...,
 *   "code_generated": ...
 * }
 *
 *
 * LOI Codes
 * -----------
 * => https://hooks.zapier.com/hooks/catch/2589398/ih73eo/
 * {
 *   "code": ...,
 *   "created_for": ...
 * }
 */

const hookURI = (id) =>
  `https://hooks.zapier.com/hooks/catch/2589398/${id}/`

const idSigners = 'ihnwu6'
const idCodes   = 'ih73eo'

const postToZapier = (id, bodyJSON, cbak) => {
  const body = JSON.stringify(bodyJSON)
  const uriHook = hookURI(id)
  console.log(`--> ${uriHook}: ${body}`)
  fetch(uriHook, {
    method: 'POST',
    body: body,
  }).then(
    res => res.json()
  ).then((json) => {
    const stat = json.status
    console.log(`<-- Zapier: ${JSON.stringify(json)}`)
    if (stat === 'success') {
      console.log('[ OK ] Zapier CRM call')
      cbak(null)
    } else {
      cbak(`Failed CRM push: ${stat}`)
    }
  }).catch((err) => {
    console.error(`[ ERROR ] ${err}`)
    cbak(err)
  })
}

const push = (json, nextCode, cbak) => {
  const { name, email, launchCode } = json
  const jsonSend = {
    signers: {
      "name": name,
      "email": email,
      "code_used": launchCode,
      "code_generated": nextCode,
    },
    codes: {
      "code": nextCode,
      "created_for": name,
    }
  }
  postToZapier(idSigners, jsonSend.signers, (err) => {
    if (err) {
      console.error('Failed LOI signers POST')
      console.error(err)
      cbak(err)
    } else {
      postToZapier(idCodes, jsonSend.codes, (err) => {
        if (err) {
          console.error('Failed LOI codes POST')
          console.error(err)
          cbak(err)
        } else {
          console.log('[ OK ] All Zapier calls')
          cbak(null)
        }
      })
    }
  })
}

const pushCode = (launchCode, cbak) => postToZapier(idCodes, {
  "code": launchCode,
  "created_for": "ECHELON",
}, cbak)

const noOp = (...args) => {
  args.forEach(f => typeof f === 'function' ? f(null) : null)
}

module.exports = (isLive) => {
  const protect = (fn) => isLive ? fn : noOp
  return {
    push     : protect(push),
    pushCode : protect(pushCode),
  }
}
