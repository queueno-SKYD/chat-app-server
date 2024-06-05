import nodemailer from "nodemailer";
import env from "../../env";
interface mailDetails {
  from: string; // sender address
  to: string; // receiver email
  subject: string; // Subject line
  text: string;
  html: string;
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: true,
  auth: {
    user: env.GMAIL,
    pass: env.GMAIL_PASSWORD,
  },
});

const sendMail = async (mailDetails: mailDetails) => {
  try {
    const info = await transporter.sendMail(mailDetails);
    return info;
  } catch (error) {
    return false;
  }
};

export default sendMail;
