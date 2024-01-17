import express from "express";
import usersController from "../controllers/users.controller.js";
import { body } from "express-validator";
import requsetHandler from "../handlers/request.handler.js";
import tokenMiddleware from "../middlewares/token.middleware.js";

const router = express.Router();

router.post(
  "/sign-up",
  [
    body("userUID").notEmpty().withMessage("User UID is required"),
    body("firstName").notEmpty().withMessage("First name is required"),
    body("lastName").notEmpty().withMessage("Last name is required"),
  ],
  requsetHandler.validate,
  usersController.signUp
);

router.post(
  "/sign-in",
  [body("userUID").notEmpty().withMessage("User UID is required")],
  requsetHandler.validate,
  usersController.signIn
);

router.get("/profile", tokenMiddleware.auth, usersController.getProfile);

router.put(
  "/profile",
  tokenMiddleware.auth,
  [
    body("firstName").notEmpty().withMessage("First name is required"),
    body("lastName").notEmpty().withMessage("Last name is required"),
    body("age")
      .notEmpty()
      .withMessage("Age is required")
      .isInt()
      .withMessage("Age must be a number"),
    body("city").notEmpty().withMessage("City is required"),
    body("address").notEmpty().withMessage("Address is required"),
    body("phoneNumber")
      .notEmpty()
      .withMessage("Phone number is required")
      .isMobilePhone()
      .withMessage("Phone number is invalid"),
  ],
  requsetHandler.validate,
  usersController.updateProfile
);

router.get(
  "/:competitionId",
  tokenMiddleware.auth,
  usersController.getUserTeam
);

router.put(
  "/update-to-admin/:id",
  tokenMiddleware.auth,
  usersController.updateUserToAdmin
);

export default router;
