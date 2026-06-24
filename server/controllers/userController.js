require("dotenv").config();
const User = require("../sequelize/models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Invalid input" });
  }
  if (password.length < 4) {
    return res
      .status(400)
      .json({ error: "Password must be at least 4 characters long" });
  }
  exist = await User.findOne({ where: { email } });
  if (exist) {
    return res.status(409).json({ message: "User already exists" });
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({ name, email, password: hashedPassword });
    res.status(201).json({ user });
  } catch {
    res.status(400).json({ message: "Error in creating user" });
  }
};  


  
const countUsers = async (req, res) => {
  try {
    const products = await User.findAll(); // fetch all products
    const count = products.length; // get the length
    res.status(200).json({ users:count }); // return as JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};




const refreshToken = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    // console.log("refresh token from cocokies")
    // console.log(token)
    if (!token) {
      return res.status(401).json({ error: "Refresh token not found" });
    }

    const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    // console.log("the new acess token from the backend ")
    const newAccessToken = jwt.sign(
      { id: payload.id, isAdmin: payload.isAdmin },
      process.env.JWT_SECRET,
      // { expiresIn: "10s" }
      { expiresIn: "15h" }  
    );
        // console.log(newAccessToken);
    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    console.log("the token ")
    res.status(401).json("Invalid or expired refresh token" );
    console.log("the errror is ")
    console.log(error)
  }
};





const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Invalid login or password" });

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ message: "Invalid password" });

    const accessToken = jwt.sign(
      { id: user.id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "15h" }
    );
    const refreshToken = jwt.sign(
      { id: user.id, isAdmin: user.isAdmin },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res.status(200).json({ accessToken, user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error during login" });
  }
};



const logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.sendStatus(204); // No content
  }
  res.clearCookie("refreshToken", { httpOnly: true, sameSite: "None" });
  return res.sendStatus(200);
};

module.exports = { signup, login, refreshToken, logout, countUsers };
