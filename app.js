import express from "express";
import bodyParser from "body-parser";
import { engine } from "express-handlebars";
import fs from "node:fs";

// Handlebars Objects
function readObj(file) {
  return JSON.parse(fs.readFileSync(`./json/${file}.json`));
}

const port = process.env.PORT || 3000;
const app = express();

app.use(express.static("public"));

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Handlebars Engine

app.engine("handlebars", engine());
app.set("view engine", "handlebars");

// Pages Request

app.get("/", (req, res) => {
  res.render("index", readObj("home"));
});

app.get("/courses", (req, res) => {
  res.render("course", readObj("course"));
});

app.get("/testimonials", (req, res) => {
  res.render("testimonial", readObj("testimonial"));
});

app.get("/coaches", (req, res) => {
  res.render("coaches", readObj("coaches"));
});

app.get("/about", (req, res) => {
  res.render("about", readObj("about"));
});

app.get("/founder", (req, res) => {
  res.render("founder", readObj("founder"));
});

app.get("/contact", (req, res) => {
  res.render("contact", readObj("contact"));
});

// Course Details Page

app.get("/courses/:id/details", (req, res) => {
  const { id } = req.params;
  if (id > 11) res.status(404).render("404NotFound", readObj("404NotFound"));
  res.render("courseDetail", readObj("courseDetail").details[id]);
});

// Coach Details Page

app.get("/coaches/:id/details", (req, res) => {
  const { id } = req.params;
  res.render("coachDetail", readObj("coachDetail"));
});

app.get("/workshops", (req, res) => {
  res.render("workshops", readObj("workshop"));
});

// 404 Not Found Page

app.get("*", (req, res) => {
  res.status(404).render("404NotFound", readObj("404NotFound"));
});

// Enquiry Form Route

app.post("enquiry-form", (req, res) => {
  const { name } = req.body;
  const { email } = req.body;
  const { phone } = req.body;
  const { message } = req.body;

  res.json({
    Name: name,
    Email: email,
    Phone: phone,
    Message: message,
  });
});

app.listen(port, () => {
  console.log(`Active On http://localhost:${port}`);
});
