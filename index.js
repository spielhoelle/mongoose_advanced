const express = require("express");
const app = express();
app.use(express.static('assets'));
const mongoose = require("mongoose");
var path = require("path");
mongoose.connect("mongodb://localhost:27017/aqmpoints", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
const Aqmpoint = require("./models/Aqmpoint");
const User = require("./models/User");

const userData = [{ email: "admin@example.com" }, { email: "user@example.com" }];
const aqmData = require("./out3.json");

app.set("views", path.join(__dirname, "views")); //setting views directory for views.
app.set("view engine", "hbs"); //setting view engine as handlebars
(async () => {
  await Aqmpoint.deleteMany();
  await User.deleteMany();
  const createdUser = await User.insertMany(userData);
  aqmData.map(p => p.user = createdUser[Math.floor(Math.random() * createdUser.length)]._id)
  const createdPoints = await Aqmpoint.insertMany(aqmData);
})()

app.get("/:userId?", async (req, res) => {
  const query = req.params.userId ? {user: req.params.userId} : {}
  let aqmpoints = await Aqmpoint.find(query);
  let users = await User.find();
  res.render("index", { aqmpoints, users });
});

app.listen(3000);
