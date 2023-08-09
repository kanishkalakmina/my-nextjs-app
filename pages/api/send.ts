// pages/api/mail.ts

import type { NextApiRequest, NextApiResponse } from "next";
import sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

type Data = {
  message: string;
};
const link = "https://app.sendgrid.com/settings/sender_auth";
const timestamp = Date.now();
const currentDate = new Date(timestamp);
const year = currentDate.getFullYear();
const name = "lakmina";
const email = "lakmina@bistecglobal.com";
const myemail = "k.l.egodawattha@gmail.com";
const message = "hello how";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const msg = `<html>

    <head>
      <title>BISTEC Care Invitation</title>
    </head>
    
    <body>
      <table cellpadding='0' cellspacing='0' border='0'
        style='width: 600px; margin: 0 auto; font-family: Arial, sans-serif; border: 1px solid #b3b3b3;'>
        <tr>
          <td valign='top' style='text-align: center; padding: 20px;'>
            <img src='{0}' style='height: 80px; padding-top: 20px; padding-bottom: 10px;' />
          </td>
        </tr>
        <tr>
          <td valign='top' style='padding: 20px;'>
            <table width='100%'>
              <tr>
                <td scope='row' style='width: 150px; font-size: 18px; font-weight: bold;'>Hi ${name},</td>
              </tr>
              <tr>
                <td style='padding: 10px; font-size: 16px; bold;' scope='row' colspan='3'>We are excited to invite you to join BISTEC Care.</td>
              </tr>
              <tr>
                <td style='padding: 10px; font-size: 16px;' scope='row' colspan='3'>To create your account and access BISTEC Care, simply follow these steps:</td>
              </tr>
              <tr>
                <td style='padding: 10px; font-size: 16px;' scope='row' colspan='3'>1. Click the following invitation link:</td>
              </tr>
              <tr>
                <td style='padding: 10px; font-size: 16px;' scope='row' colspan='3'><a href='${link}'
                    style='color: #007BFF; text-decoration: none; font-size: 15px; font-weight: bold;'><u>${link}</u></a></td>
              </tr>
              <tr>
                <td style='padding: 10px; font-size: 16px;' scope='row' colspan='3'>2. Set up a password for your account.</td>
              </tr>
            </table>
            <br />
          </td>
        </tr>
        <tr>
          <td style='background: #00b2ff; padding: 10px;'>
            <p style='color: #fff; font-size: 12px; padding: 10px; margin: 0;'>Copyright © BISTEC Care <span>${year}</span>.
              All Rights Reserved.</p>
          </td>
        </tr>
        <tr>
          <td style='padding: 10px;'>
            <p style='color: #736f6f; font-size: 12px; padding: 10px; margin: 0;'>Please do not reply to this email. Emails
              sent to this address will not be answered.</p>
          </td>
        </tr>
      </table>
    </body>
    
    </html>
    
    
    
    
    `;

    const data = {
      to: `${email}`,
      from: "lakmina@bistecglobal.com",
      subject: `${name.toUpperCase()} sent you a message from Contact Form`,
      text: `Email => ${email}`,
      html: msg,
    };

    try {
      await sgMail.send(data);
      res.status(200).json({ message: "Your email was sent successfully." });
    } catch (err) {
      res
        .status(500)
        .json({ message: `There was an error sending your message. ${err}` });
    }
  }
}
