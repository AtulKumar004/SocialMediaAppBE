const express = require("express");
const { getAllUsers, signUp , signIn, getUserDetails, UpdateUser, Deleteuser} = require("../controller/user");
const verifyToken = require("../middleware/verifyToken");
const userRoute = express.Router();
userRoute.get("/" , verifyToken , getAllUsers);
userRoute.post("/register" , signUp);
userRoute.post("/login" , signIn);
userRoute.get("/details" , verifyToken,  getUserDetails);
userRoute.put("/update" , verifyToken,  UpdateUser);
userRoute.delete("/delete" , verifyToken,  Deleteuser);



module.exports = {userRoute}