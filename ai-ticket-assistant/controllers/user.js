import brcypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { inngest } from "../inngest/client.js";
import user from "../models/user.js";

export const signup = async (req, res) => {
  const { email, password, skills = [] } = req.body;
  try {
    const hashed = await brcypt.hash(password, 10);
    const user = await User.create({ email, password: hashed, skills });

    //inngest events occuring
    await inngest.send({
      name: "user/signup",
      data: {
        email,
      },
    });

    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET
    );

    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ message: "SIGN UP FAILED", details: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "USER NOT FOUND" });
    }
    const isMatch = await brcypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "PASSWORD DOESNT MATCH" });
    }
    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET
    );

    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ message: "LOGIN FAILED", details: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "UNAUTHORIZED" });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "UNAUTHORIZED" });
      }
    });
    res.json({ message: "Log out Successfully" });
  } catch (error) {
    res.status(500).json({ error: "LOG OUT FAILED", details: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { skills = [], role, email } = req.body;
  try {
    if (req.user?.role != "admin") {
      return res.status(403).json({ error: "FORBIDDEN" });
    }
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "User not found" });

    await User.updateOne(
      { email },
      { skillss: skills.length ? skills : user.skills, role }
    );

    return res.json({ message: "user updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Update failed" });
  }
};

export const getUsers = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "UNAUTHORISED" });
    }

    const users = await User.find().select("-password");
    return res.json(users);
  } catch (error) {
    res.status(500).json({ error: "getUsers failed" });
  }
};
