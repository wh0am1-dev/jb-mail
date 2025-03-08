import fs from 'fs'
import fsp from 'fs/promises'
import { parse } from 'csv-parse'
import nodemailer from 'nodemailer'

;(async () => {
  const __dirname = process.cwd()
  const host = process.env.HOST
  const user = process.env.MAIL
  const pass = process.env.PASSWORD

  const transporter = nodemailer.createTransport({
    host: host,
    port: 465,
    secure: true,
    auth: { user, pass },
  })

  const contacts = []
  const parser = fs
    .createReadStream(`${__dirname}/data/contacts.csv`)
    .pipe(parse({ delimiter: ',', columns: true }))

  for await (const contact of parser) {
    contacts.push(contact)
  }

  const subject = await fsp.readFile(`${__dirname}/data/subject.txt`, 'utf-8')
  const template = await fsp.readFile(
    `${__dirname}/data/template.html`,
    'utf-8'
  )

  console.log('host: %s', host)
  console.log('mail: %s', user)
  console.log('mails: %s', JSON.stringify(contacts, null, 2))
  console.log('subject: %s', subject)
  console.log('template:\n%s', template)

  for (const contact of contacts) {
    let html = template

    for (const field in contact) {
      if (field === 'email') continue
      html = html.replace(`{{${field}}}`, contact[field])
    }

    const info = await transporter.sendMail({
      from: process.env.MAIL,
      to: contact.email,
      subject,
      html,
    })

    console.log('message sent: %s\n  to: %s', info.messageId, contact.email)
  }
})().catch(console.error)
