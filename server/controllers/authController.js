import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

//@desc Login user/set token
//@route POST /auth
//@access Public
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "모든 항목을 작성해주세요." });
  }

  //! find user with email
  const foundUser = await User.findOne({ email }).exec(); //without exec() you get thenable > exec() returns a promise
  if (!foundUser) {
    res.status(404);
    throw new Error("no matching user");
    //return res.status(401).json({ message: "no matching user" });
  }

  //! compare password
  const match = await bcrypt.compare(password, foundUser.password);
  if (!match) return res.status(400).json({ message: "wrong password" });

  const userObject = {
    name: foundUser.name,
    email: foundUser.email,
    id: foundUser._id,
    username: foundUser.username,
  };

  //! sign JWT
  const accessToken = jwt.sign(userObject, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });

  //refresh token은 payload 없이 발급
  const refreshToken = jwt.sign({}, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "1d",
  });

  //! Create secure cookie with refresh token named 'jwt'
  res.cookie("jwt", refreshToken, {
    httpOnly: true, //accessgible only be web server
    //secure: true, //https only
    SameSite: "none", //cross-site cookie?
    maxAge: 1 * 24 * 60 * 60 * 1000, //cookie expiry : sent to match rT
  });

  res
    .header("Access-Control-Expose-Headers", "Authorization")
    .header("Authorization", accessToken)
    .send({
      user: {
        name: foundUser.name,
        email: foundUser.email,
        id: foundUser._id,
        username: foundUser.username,
      },
    });
  //res.json({ accessToken });
});

/*
app.post('/login', (req, res) => {
const user = {
id: 1,
username: 'john.doe'
};

const accessToken = jwt.sign({ user }, secretKey, { expiresIn: '1h' });
const refreshToken = jwt.sign({ user }, secretKey, { expiresIn: '1d' });

res
.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict' })
.header('Authorization', accessToken)
.send(user);
});
*/

//@desc Refresh
//@route GET /auth/refresh
//@access Public - because access token has expired
export const refresh = asyncHandler(async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });
  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      //send err to asyncHandler
      if (err) return res.status(403).json({ message: "Forbidden" });

      const foundUser = await User.findOne({
        username: decoded.username,
      }).exec();

      if (!foundUser) return res.status(401).json({ message: "Unauthorized" });

      const accessToken = jwt.sign(
        {
          UserInfo: {
            username: foundUser.username,
            roles: foundUser.roles,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );

      res.json({ accessToken });
    }
  );
});

//@desc Logout user
//@route POST /auth/logout
//@access Public - clear cookie if exists
export const logoutUser = asyncHandler(async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  res.clearCookie("jwt", { httpOnly: true });
  res.json({ message: "Cookie cleared" });
});
