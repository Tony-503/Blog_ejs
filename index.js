import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

// Array to store all posts
let posts = [];

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { posts });
});

app.post("/submit", (req, res) => {
  const title = req.body["title"];
  const content = req.body["content"];
  
  // Create new post object with unique ID and timestamp
  const newPost = {
    id: Date.now(), // Simple unique ID using timestamp
    title: title,
    content: content,
    createdAt: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  };
  
  // Add to beginning of array (newest first)
  posts.unshift(newPost);
  
  res.redirect("/");
});

app.post("/edit", (req, res) => {
  const postId = req.body["id"];
  const post = posts.find(p => p.id == postId);
  
  if (post) {
    res.render("partials/editpost.ejs", { 
      id: post.id,
      name: post.title, 
      text: post.content 
    });
  } else {
    res.redirect("/");
  }
});

app.post("/update", (req, res) => {
  const postId = req.body["id"];
  const newTitle = req.body["title"];
  const newContent = req.body["content"];
  
  const postIndex = posts.findIndex(p => p.id == postId);
  
  if (postIndex !== -1) {
    posts[postIndex].title = newTitle;
    posts[postIndex].content = newContent;
    posts[postIndex].updatedAt = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  
  res.redirect("/");
});

app.post("/delete", (req, res) => {
  const postId = req.body["id"];
  
  // Remove post from array
  posts = posts.filter(post => post.id != postId);
  
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});