const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Campground = require("./models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  // we're connected!
  console.log("Database connected");
});

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/getcampground", async (req, res) => {
  const camp = new Campground({
    title: "Second camp",
    description: "ugly camp but ok",
  });
  await camp.save();
  console.log(camp);
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("serving on port 3000");
});
