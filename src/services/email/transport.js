import nodemailer, { createTransport } from "nodemailer"

export const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: 'declan25@ethereal.email',
    pass: 'fwctT1G9XYBbAYPJKV',
  },
})
