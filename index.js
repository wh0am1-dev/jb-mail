import fs from 'fs'
import fsp from 'fs/promises'
import { parse } from 'csv-parse'
import nodemailer from 'nodemailer'

const __dirname = process.cwd()

console.log('host: %s', process.env.HOST)
console.log('mail: %s', process.env.MAIL)
console.log('password: %s', process.env.PASSWORD)

const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL,
    pass: process.env.PASSWORD,
  },
})

const readSubject = async () =>
  await fsp.readFile(`${__dirname}/data/subject.txt`, 'utf-8')

const readTemplate = async () =>
  await fsp.readFile(`${__dirname}/data/template.html`, 'utf-8')

const readMails = async () => {
  const records = []
  const parser = fs
    .createReadStream(`${__dirname}/data/mails.csv`)
    .pipe(parse({ delimiter: ',', columns: true }))

  for await (const record of parser) {
    records.push(record)
  }

  return records
}

;(async () => {
  const subject = await readSubject()
  console.log('subject: %s', subject)

  const template = await readTemplate()
  console.log('template:\n%s', template)

  const mails = await readMails()
  console.log('mails: %s', JSON.stringify(mails, null, 2))

  for (const contact of mails) {
    const info = await transporter.sendMail({
      from: process.env.MAIL,
      to: contact.email,
      subject: subject,
      html: template.replace(/{{name}}/g, contact.name),
    })

    console.log('message sent: %s\n  to: %s', info.messageId, contact.email)
  }
})().catch(console.error)
