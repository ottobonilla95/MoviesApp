import { app } from "./app";
import mongoose from "mongoose";

// cloudinary
var cloudinary = require("cloudinary");

// dotenv
require("dotenv").config();

// express-async-errors
import "express-async-errors";

// constants
const port = 3001;
const url = process.env.MONGO_URI!;

const start = async () => {
  try {
    // mongo db connection
    await mongoose.connect(
      url,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      },
      () => {
        console.log("conected to mongo!!");
      }
    );
    // cloudinary configuration
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }

  app.listen(port, () => {
    console.log(`App up and running. ${port}`);
  });
};

start();
