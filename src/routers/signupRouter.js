import "../config.js";
import bcrypt from "bcrypt";
import express from "express";
import * as userController from "../controllers/userController.js";
import * as sendEmails from "../controllers/sendEmails.js";

const saltRounds = Number(process.env.SALT_ROUNDS);
// const myPlaintextPassword = process.env.MY_PASSWORD;

const signupRouter = express.Router();

// READ ALL
signupRouter.get("/", async (_req, res) => {
  const users = await userController.readAllUsers();
  res.json(users);
});

// CREATE
signupRouter.post("/create", async (req, res) => {
  const userObj = req.body;
  const sendEmailToUser = await sendEmails.sendEmailToUser(
    "registration by alporto",
    `${userObj.userName} thank you for the registration your email account is: ${userObj.email} `,
    userObj.email
  );
  userObj.password1 !== userObj.password2
    ? res.status(500).send("error")
    : bcrypt.genSalt(saltRounds, async (err, salt) => {
        bcrypt.hash(userObj.password1, salt, async (err, hash) => {
          const dbUser = {
            userName: userObj.userName,
            email: userObj.email,
            accessGroups: "loggedInUsers",
            hash,
          };
          // if (users.find((element) => element !== dbUser.userName)) {
          const savedDBUser = await userController.createUser(dbUser);
          res.json({
            savedDBUser,
            sendEmailToUser,
          });
          // }
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
