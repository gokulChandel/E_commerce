import express from "express";
import {
  registerController,
  loginController,
  forgotPasswordController
} from "../controller/authController.js";
// router object

const router = express.Router();

router.post("/register", registerController);

// LOGIN \\ POST

router.post("/login", loginController);


router.post('/forgot-password' ,forgotPasswordController)

router.get('/user-auth' , (req, res)=>{
  res.status(200).send({ok : true})
})
router.get('/admin-auth' , (req, res)=>{
  res.status(200).send({ok : true})
})
export default router;
