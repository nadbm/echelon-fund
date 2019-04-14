const Mailgun = require('mailgun-js')


// Setup Mailgun
const credentialsMailgun = {
  domain: 'mg.echelon.fund',
  keyPrivate: 'key-1abe0036f32827cee881c2685850987d',
}

const mailgun = new Mailgun({
  apiKey: credentialsMailgun.keyPrivate,
  domain: credentialsMailgun.domain,
})

const templateSigned = (name, code) =>
`
Hello ${name},

Thank you for your commitment to Echelon. Attached is a digital copy of your signed LOI for your records. 

You can also share Echelon with your friends and colleagues.
Share your code: ${code}

Regards,
Echelon Investor Relations
`

module.exports = (isLive) => {
  return {
    send: (pathToSigned, json, theirCode, cbak) => {
      const { name, email } = json
      const to = `${name} <${email}>`
      const subject =
        `${name}, attached is your Echelon LOI`
      const text = templateSigned(name, theirCode)
      const from =
        `Echelon Fund <postmaster@${credentialsMailgun.domain}>`
      const data = {
        from       : from,
        to         : to,
        subject    : subject,
        text       : text,
        attachment : pathToSigned
      }
      if (isLive) {
        console.log('Sending email')
        mailgun.messages().send(data, cbak)
      } else {
        cbak()
      }
    }
  }
}
