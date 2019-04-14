const Datastore    = require('nedb')
const randomstring = require('randomstring')

// Database Structure
// ==================
//
// User
// ----
// {
//   nameFirst  :: String
//   nameLast   :: String
//   email      :: String
//   address    :: String
//   loiBase    :: String (Name of LOI PDF base)
//   launchCode :: String (launch code used)
//   launchGen  :: String (generated launch code)
// }
//
// Launch Code
// -----------
// {
//   code :: String
//   user :: String (_id of user for whom it was created)
//         | null
// }

// Setup database
const databaseFor = (collection) => {
  const fname =`db/${collection}.db`
  return new Datastore({
    filename: fname,
    autoload: true,
    timestampData: true,
    corruptAlertThreshold: 0,
    onload: (err) => {
      if (err) {
        console.error(err)
      } else {
        console.log(`[ OK ] Loaded ${fname}`)
      }
    },
  })
}

const users = databaseFor('users')
const launchCodes = databaseFor('launch-codes')

exports.genLaunchCode = () => randomstring.generate({
  length: 6,
  charset: 'alphanumeric',
  capitalization: 'uppercase',
})

exports.isValidLaunchCode = (launchCode, cbak) => launchCodes.findOne(
  { code: launchCode },
  (err, code) => cbak(err, !!code)
)

exports.addLaunchCode = (newCode, cbak) => {
  const launchCode = {
    code: newCode ? newCode : genLaunchCode(),
    user: null
  }
  launchCodes.insert(launchCode, (err, lc) => {
    if (err) {
      cbak(err)
    } else {
      console.log(`[ OK ] Created launch code ${lc.code}`)
      cbak(null)
    }
  })
}

exports.saveRecords = (json, loiBase, nextLaunchCode, cbak) => {
  const user = {
    nameFirst: json.nameFirst,
    nameLast: json.nameLast,
    loiBase: loiBase,
    launchCode: json.launchCode,
    launchGen: nextLaunchCode,
  }
  users.insert(user, (err, usr) => {
    if (err) {
      cbak(err)
    } else {
      console.log(`[ OK ] Created user with LOI ${loiBase}`)
      const launchCode = {
        code: nextLaunchCode,
        user: usr._id
      }
      launchCodes.insert(launchCode, (err, lc) => {
        if (err) {
          cbak(err)
        } else {
          console.log(`[ OK ] Created launch code ${nextLaunchCode}`)
          cbak(null)
        }
      })
    }
  })
}
