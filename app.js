const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const {userRoute} = require("./routes/user")

const app = express();
app.use(express.json());

app.use("/api/user" , userRoute);


mongoose.connect(process.env.DB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(5000, () => console.log("Listening on port 5000"));
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

// Create module Schema for user, which include name, email , password (hashed) , mobileNo ,  JWT Token 
/// create route for user , contain add , getAll , updateUser, deleteUser, getUserById

// create Controller for user ,

// Create module for blog , contain title , description , image , user , 
// route for blog , contain getAllBlog , addBlog   , update blog , delete blog , getByIdBlog