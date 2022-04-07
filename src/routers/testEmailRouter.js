import { sendEmail } from "../util/sendEmail.js";
import express from "express";

const testEmailRouter = express.Router();

testEmailRouter.post("/sendemail", async (req, res) => {
  try {
    await sendEmail({
      to: "giacomo.tolari@gmail.com",
      from: "giacomotolari@gmail.com",
      subject: "test email",
      text: "test test test",
    });
    res.sendStatus(200);
  } catch (e) {
    console.log('test');
    console.log(JSON.stringify(e.stack, null, 2));
    res.sendStatus(500).json(e);
  }
});

export { testEmailRouter };
