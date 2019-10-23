const app = require("express")();
const mongoose = require("mongoose");
var path = require("path");
mongoose.connect("mongodb://localhost:27017/aqmpoints", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
const Aqmpoint = require("./Aqmpoint");
const aqmData = require("./out3.json");

//view engine setup
app.set("views", path.join(__dirname, "views")); //setting views directory for views.
app.set("view engine", "hbs"); //setting view engine as handlebars
(async () => {
  await Aqmpoint.deleteMany();
  await Aqmpoint.insertMany(aqmData);
})()
app.get("/", async (req, res) => {
  let aqmpoints = await Aqmpoint.find();
  res.render("index", { people: aqmpoints }); //passing list of people to our index.hbs file.
});

app.listen(3000);
