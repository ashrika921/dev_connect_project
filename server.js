const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const connectDB = require("./config/db");

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

app.get("/", (req, res) => {
  return res.send("api running");
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`server is running on the port${PORT}`);
  }
});
