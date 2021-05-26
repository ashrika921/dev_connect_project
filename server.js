const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const connectDB = require("./config/db");
const path = require('path');

//connect Database;
connectDB();

// /Init middleware
app.use(express.json({ extended: false }));

//cors
app.use(cors());

//Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

// app.get("/", (req, res) => {
//   return res.send("api running");
// });

if(process.env.NODE_ENV === 'production'){
  //Set static folder
  app.use(express.static('client/build'));
  app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client' , 'build', 'index.html'));
  });
}

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`server is running on the port${PORT}`);
  }
});

