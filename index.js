import express from "express";
import bodyParser from "body-parser";
import { name } from "ejs";


const app = express();
const port = 3000;



app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});



app.post("/submit", (req, res) => {
  const name = req.body["title"];
  const text = req.body["content"];
  res.render("index.ejs", { name, text });
});

app.post("/edit", (req, res) => {
  const Newname = req.body["name"];
  const Newtext = req.body["text"];

  res.render("partials/editpost.ejs", { name: Newname, text: Newtext });
});


app.post("/delete", (req, res) => {
  const nameToDelete = req.body["name"];
   
  res.redirect("/");
});


app.listen(port, () => {
     console.log(`Listening on port ${port}`);
   });