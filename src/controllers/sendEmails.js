import { sendEmail } from "../util/sendEmail.js";

export const sendEmailToUser = async (subject, text, userEmail) => {
  // try {
  await sendEmail({
    to: userEmail,
    from: "giacomo.tolari@digitalcareerinstitute.org",
    subject,
    text,
  });
  // res.sendStatus(200);
  // } catch (e) {
  //   console.log(e);
  //   res.sendStatus(500);
  // }
};
