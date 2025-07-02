import express from "express";
import { authenticate } from "../middlewares/auth.js";
import {
  signup,
  login,
  updateUser,
  getUsers,
  logout,
} from "../controllers/user.js";

const router = express.Router();

router.post("/update-user", authenticate, updateUser);
router.get("/users", authenticate, getUsers);

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

export default router;
