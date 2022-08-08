import "dotenv/config";

const sid = process.env.TWILIO_ACCOUNT_SID;
const token = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_PHONE_NUMBER;

const client = require("twilio")(sid, token);

export const sendSMS = (to: string, message: string) => {
  client.messages
    .create({
      from: twilioNumber,
      to,
      body: message,
    })
    .then((res: any) => console.log("message has been sent to " + to))
    .catch((err: any) => console.log(err));
};
