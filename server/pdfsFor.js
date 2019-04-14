const fs          = require('fs')
const _           = require('lodash')
const filler      = require('pdffiller')
const PDFDocument = require('pdfkit')
const extract     = require('extract-svg-path')
const svgpath     = require('svgpath')
const { spawn }   = require('child_process')


/* FDF Form Fields
 * ---
 * FieldType: Text
 * FieldName: Date
 * FieldNameAlt: Today's Date
 * FieldFlags: 8388608
 * FieldJustification: Left
 * ---
 * FieldType: Text
 * FieldName: First &amp; Last Name
 * FieldNameAlt: Your First &amp; Last Name
 * FieldFlags: 0
 * FieldJustification: Left
 * ---
 * FieldType: Text
 * FieldName: Other Amount
 * FieldFlags: 8388608
 * FieldJustification: Center
 * ---
 * FieldType: Button
 * FieldName: Purchase Amount
 * FieldFlags: 49152
 * FieldValue: 4
 * FieldJustification: Left
 * FieldStateOption: $100,000
 * FieldStateOption: 0
 * FieldStateOption: 1
 * FieldStateOption: 2
 * FieldStateOption: 3
 * FieldStateOption: 4
 * FieldStateOption: Off
 * ---
 * FieldType: Text
 * FieldName: Mailing Adress
 * FieldFlags: 0
 * FieldJustification: Left
 * ---
 * FieldType: Text
 * FieldName: Mailing Address 2
 * FieldFlags: 0
 * FieldJustification: Left
 * ---
 * FieldType: Text
 * FieldName: Mailing Address 3
 * FieldFlags: 0
 * FieldJustification: Left
 */

module.exports = (json) => {
  const genFnames = () => {
    const postfix = Date.now()
    const nameSplit = json.name.split(' ').join('_')
    const base = `${nameSplit}-${postfix}`
    const loiDir = 'loi'
    const toRelPath = (name) => `${loiDir}/${name}.pdf`
    return {
      base     : base,
      template : toRelPath('__template__'),
      filled   : toRelPath(`${base}_filled`),
      stamp    : toRelPath(`${base}_stamp`),
      signed   : toRelPath(`${base}_signed`),
    }
  }

  const genFDFData = () => {
    const nonOtherAmounts = [
      '$100,000',
      '$250,000',
      '$500,000',
      '$1,000,000'
    ]
    const investment = json.investment
    const indexNonOther = _.indexOf(nonOtherAmounts, investment)
    // The other index is 1 greater than the last non-other
    const indexOther = nonOtherAmounts.length
    const isOtherAmount = indexNonOther < 0
    const indexRadio = isOtherAmount ? indexOther : indexNonOther
    return {
      'Date'              : json.date,
      'First & Last Name' : json.name,
      // Only set the other amount field if the amount requested was
      // not one of the options
      'Other Amount'      : isOtherAmount ? `${investment}` : '',
      // Set the purchase amount radio
      'Purchase Amount'   : indexRadio,
      'Mailing Adress'    : json.addressLine1,
      'Mailing Address 2' : json.addressLine2,
      'Mailing Address 3' : json.addressLine3,
    }
  }

  const fnames = genFnames()
  const dataFill = genFDFData()

  const createStamp = (sigSVGPath, cbak) => {
    // Create 2-page empty stamp document
    const doc = new PDFDocument()
    doc.addPage()
    doc.path(sigSVGPath).stroke()
    // Write the stamp document
    const stream = fs.createWriteStream(fnames.stamp)
    stream.on('finish', cbak)
    doc.pipe(stream)
    doc.end()
  }

  const stampFilled = (cbak) => {
    // Use pdftk multistamp to sign filled document
    const pdftkArgs = [
      fnames.filled,
      'multistamp',
      fnames.stamp,
      'output',
      fnames.signed
    ]
    const cmdTk = spawn('pdftk', pdftkArgs)
    cmdTk.on('exit', (code, signal) => {
      if (code !== 0) {
        const error =
          `Abnormal exit of pdftk: code: ${code} signal: ${signal}`
        cbak(error)
      } else {
        console.log(
          `[ OK ] Completed (${fnames.signed}) ${code} ${signal}`
        )
        cbak()
      }
    })
  }

  const signDocument = (cbak) => {
    const sigTransforms = {
      scale      : 0.25,
      translateX : 110,
      translateY : 410
    }
    // Signature as a transformed path
    const sigSVGPath = extract.parse(json.signature)
    const pathSigTransformed = svgpath(sigSVGPath)
      .scale(sigTransforms.scale)
      .translate(
        sigTransforms.translateX,
        sigTransforms.translateY
      )
      .toString()
    // Create a stamp and merge filled and stamped
    createStamp(pathSigTransformed, (err) => {
      if (err) {
        const error = `Failed to create stamp: ${err}`
        console.error(error)
        cbak(error)
      } else {
        console.log('[ OK ] Created stamp')
        stampFilled((err) => {
          if (err) {
            const error = `Failed to stamp filled: ${err}`
            cbak(error)
          } else {
            console.log('[ OK ] Stamped filled document')
            cbak()
          }
        })
      }
    })
  }

  return {
    fnames: fnames,
    fillForm: (cbak) => filler.fillForm(
      fnames.template, fnames.filled, dataFill, cbak
    ),
    signDocument: signDocument
  }
}
