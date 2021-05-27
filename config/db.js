const mongoose = require("mongoose");
const config = require("config");
const mongoUri = config.get("mongoURI");
// const mongoLocal = config.get("mongoLocal");

const connectDB = async () => {
  try {
   // await mongoose.connect(mongoLocal, {
     await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("Db connected");
  } catch (error) {
    console.log(error);
    return process.exit(1);
  }
};

module.exports = connectDB;
