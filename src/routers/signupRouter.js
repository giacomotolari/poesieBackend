import "../config.js";
import bcrypt from "bcrypt";
import express from "express";
import { sendEmail } from "../util/sendEmail.js";
import * as userController from "../controllers/userController.js";

const saltRounds = Number(process.env.SALT_ROUNDS);
// const myPlaintextPassword = process.env.MY_PASSWORD;

const signupRouter = express.Router();

// READ ALL
signupRouter.get("/", async (_req, res) => {
  const users = await userController.readAllUsers();
  res.json(users);
});

signupRouter.post("/sendemail", async (req, res) => {
  try {
    await sendEmail({
      to: ["tolarigiacomo@gmail.com"],
      from: "tolarigiacomo@gmail.com",
      subject: "te",
      text: "21",
    });
    res.sendStatus(200);
    console.log("sended");
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

// CREATE
signupRouter.post("/create", async (req, res) => {
  const users = await userController.readAllUsers();
  const userObj = req.body;
  userObj.password1 !== userObj.password2
    ? res.status(500).send("error")
    : bcrypt.genSalt(saltRounds, async (err, salt) => {
        bcrypt.hash(userObj.password1, salt, async (err, hash) => {
          const dbUser = {
            userName: userObj.userName,
            accessGroups: "loggedInUsers",
            hash,
          };
          if (users.find((element) => element !== dbUser.userName)) {
            const savedDBUser = await userController.createUser(dbUser);
            res.json({
              savedDBUser,
            });
          }
        });
      });
});

// READ ONE
signupRouter.get("/user/:id", async (req, res) => {
  const id = req.params.id;
  res.json({
    user: await userController.readOneUser(id),
  });
});

// UPDATE
signupRouter.patch("/update/:id", async (req, res) => {
  const id = req.params.id;
  const updateFields = req.body;
  const result = await userController.updateUser(id, updateFields);
  res.json({
    result,
  });
});

// DELETE
signupRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const result = await userController.deleteUser(id);
  res.json({
    result,
  });
});

export { signupRouter };
