import { camparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
// import JWT from "Jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    // destructuring data
    const { name, email, phone, address, password, answer } = req.body;
    // validation
    if (!name) {
      return res.send({ message: "Name is Require" });
    }
    if (!email) {
      return res.send({ message: "Email is Require" });
    }
    if (!phone) {
      return res.send({ message: "phone is Require" });
    }
    if (!password) {
      return res.send({ message: "password is Require" });
    }
    

    // check  user
    const existingUser = await userModel.findOne({ email });
    // existing user
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "already register please login",
      });
    }
    // register user

    const hashedPassword = await hashPassword(password);
    // save
    const user = await new userModel({
      name,
      email,
      phone,

      password: hashedPassword,
    
    }).save();
    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      err,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not register",
      });
    }
    const match = await camparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }

    // token

    const token = await JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "60d",
    });
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, question, newpassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Email is required" });
    }
    if (!question) {
      res.status(400).send({ message: "question is required" });
    }
    if (!newpassword) {
      res.status(400).send({ message: "newpassword is required" });
    }
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "wrogn email",
      });
    }
    const hashed = await hashPassword(newpassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

// export default {registerController,loginController}
