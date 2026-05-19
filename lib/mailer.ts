import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true, // port 465 = SSL from the start
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const TO = "Info@smallcakesgwinnett.com";
export const FROM = `"Smallcakes Website" <${process.env.SMTP_USER}>`;
