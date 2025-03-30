import { db } from "../connect.js";
import bcrypt from "bcryptjs";
import uniqid from "uniqid";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  // Check user if exits
  const q = "SELECT * FROM users WHERE username = ? OR email = ?";

  db.query(q, [req.body.username, req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) {
      if (data[0].username === req.body.username)
        return res.status(409).json("Username is already taken!");
      if (data[0].email === req.body.email)
        return res.status(409).json("Email is already registered!");
    }

    //Create a new user
    //hash the passord
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const q = "INSERT INTO users (userID, username, email, password) VALUE (?)";

    const new_userID = uniqid();

    const values = [
      new_userID,
      req.body.username,
      req.body.email,
      hashedPassword,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User has been created");
    });
  });
};

export const login = (req, res) => {
  const q = "SELECT * FROM users WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    const checkPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!checkPassword)
      return res.status(400).json("Wrong password or username");

    const token = jwt.sign({ id: data[0].userID }, "secretkey");

    const { password, ...other } = data[0];

    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  });
};

export const logout = (req, res) => {
  res
    .clearCookie("accessToken", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json("user has been logged out");
};
