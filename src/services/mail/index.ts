import env from "../../env";
import sendMail from "./emailService";
import { EmailVerifyMail } from "./mailformat";


export const sendVerifyMail = async (
    MailId: string,
    otp: number
  ) => {
    const res = await sendMail({
      to: MailId,
      from: env.GMAIL,
      subject: "Registration Mail",
      text: "",
      html: EmailVerifyMail("Skyd", otp),
    });
    return res;
  };