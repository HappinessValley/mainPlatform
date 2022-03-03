import express from "express";
import bodyParser from "body-parser";
import { engine } from "express-handlebars";
import fs from "node:fs";

// Handlebars Objects Starts

const homeObj = JSON.parse(fs.readFileSync("./json/home.json"));
const courseObj = JSON.parse(fs.readFileSync("./json/course.json"));
const courseDetailObj = JSON.parse(fs.readFileSync("./json/courseDetail.json"));
const contactObj = JSON.parse(fs.readFileSync("./json/contact.json"));
const coachesObj = JSON.parse(fs.readFileSync("./json/coaches.json"));
const coachDetailObj = JSON.parse(fs.readFileSync("./json/coachDetail.json"));
const aboutObj = JSON.parse(fs.readFileSync("./json/about.json"));
const founderObj = JSON.parse(fs.readFileSync("./json/founder.json"));
const testimonialObj = JSON.parse(fs.readFileSync("./json/testimonial.json"));
const workshopObj = JSON.parse(fs.readFileSync("./json/workshops.json"));
const notFoundObj = JSON.parse(fs.readFileSync("./json/404NotFound.json"));

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
  res.render("index", homeObj);
});

app.get("/courses", (req, res) => {
  res.render("course", courseObj);
});

app.get("/testimonials", (req, res) => {
  res.render("testimonial", testimonialObj);
});

app.get("/coaches", (req, res) => {
  res.render("coaches", coachesObj);
});

app.get("/about", (req, res) => {
  res.render("about", aboutObj);
});

app.get("/founder", (req, res) => {
  res.render("founder", founderObj);
});

app.get("/contact", (req, res) => {
  res.render("contact", contactObj);
});

// Course Details Page

app.get("/courses/:id/details", (req, res) => {
  const { id } = req.params;
  if (id > 11) {
    res.status(404).render("404NotFound", notFoundObj);
  }
  res.render("courseDetail", courseDetailObj.details[id]);
});

// Coach Details Page

app.get("/coaches/:id/details", (req, res) => {
  const { id } = req.params;
  res.render("coachDetail", coachDetailObj);
});

app.get("/workshops", (req, res) => {
  res.render("workshops", workshopObj);
});

// 404 Not Found Page

app.get("*", (req, res) => {
  res.status(404).render("404NotFound", notFoundObj);
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
