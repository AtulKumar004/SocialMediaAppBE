require("dotenv").config();
const User = require("../module/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/verifyToken");
console.log(" process.env.AUTH_ACCESS_TOKEN", process.env.AUTH_ACCESS_TOKEN);
const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find();
    if (!allUsers) {
      return res.status(404).json({ message: "No users found" });
    }

    return res
      .status(200)
      .json({ status: true, message: "Excution Succefully", data: allUsers });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: false, message: "Internal server error", error: err });
  }
};

const signUp = async (req, res, next) => {
  const { name, email, password } = req.body;
  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return res
      .status(400)
      .json({ status: false, message: "Email already registered" });
  }
  try {
    let hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      mobileNo: req.body?.mobileNo ? req.body?.mobileNo : null,
    });

    await user.save();

    return res
      .status(200)
      .json({ status: true, message: "Excution succefully", data: user });
  } catch (err) {
    return res
      .status(500)
      .json({ status: false, message: "Internal server error", error: err });
  }
};

const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "No user found", status: false });
  }
  let isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return res
      .status(400)
      .json({ message: "Invalied credentail", status: false });
  }
  1;
  try {
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.AUTH_ACCESS_TOKEN,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ message: "Excution Succefully", accessToken });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err, status: false });
  }
};

const getUserDetails = async (req, res, next) => {
  const userId = req.user;

  try {
    const user = await User.findById({ _id: userId }).select("-password");
    if (!user) {
      return res
        .status(400)
        .json({ message: "User has deleted ", status: false });
    }
    res.status(200).json({ message: "Excution Succefully", data: user });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err, status: false });
  }
};

const Deleteuser = async (req, res, next) => {
  // update user logic
  const userId = req.user;
  try {
    const userData  ={};
    
    
    
    const user = await User.findByIdAndDelete(userId);
    if(!user){
        return res.status(404).json({message: "user not found" , status: false, })
    }
    return res.status(200).json({message: "Excution Succefully", data: user, status: true})

  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err, status: false });
  }
};
const UpdateUser = async (req, res, next) => {
  // update user logic
  const userId = req.user;
  try {
    const userData  ={};
    if(req.body.name){
        userData.name = req.body.name;
    }
 
    if(req.body.mobileNo){
        userData.mobileNo = req.body.mobileNo;
    }
    
    
    const user = await User.findByIdAndUpdate(userId, userData ,{ new: true });
    if(!user){
        return res.status(404).json({message: "user not found" , status: false, })
    }
    return res.status(200).json({message: "Excution Succefully", data: user, status: true})

  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err, status: false });
  }
};



module.exports = { getAllUsers, signUp, signIn, getUserDetails , UpdateUser , Deleteuser};
