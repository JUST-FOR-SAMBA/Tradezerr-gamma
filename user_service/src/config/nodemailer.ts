import "dotenv/config";
import nodemailer from "nodemailer";

const user = "derickzihalirwa07@gmail.com";
const pass = "epgqcbohlgxlydwe";

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: user,
    pass: pass,
  },
});

export const sendConfirmationEmail = (
  name: string,
  email: string,
  emailToken: string
) => {
  transport
    .sendMail({
      from: user,
      to: email,
      subject: "Please confirm your account",
      html: `<h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Please confirm your email by clicking on the following link</p>
        <a href="${emailToken}">${emailToken}</a>
        </div>`,
    })

    .then((res: any) => console.log("message has been sent to " + email))
    .catch((err) => console.log(err));
};
