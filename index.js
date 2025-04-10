import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";


const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.listen(port, ()=>{
    console.log(`runinng at port ${port}`);
});

let posts = [];

app.get("/", (req, res)=>{
    res.render("home.ejs", {posts});
});

app.get("/compose", (req, res)=>{
    res.render("compose.ejs")
});

app.post("/create", (req, res)=>{
    const post = {
        id : Date.now().toString(),
        title : req.body.title,
        content : req.body.content
    };
    posts.push(post);
    res.redirect("/");
});

app.get("/view/:id", (req, res)=>{
    const post = posts.find(p => p.id === req.params.id);
    res.render("view.ejs", {post});
   
});

app.get("/edit/:id", (req, res)=>{
    const post = posts.find(p => p.id === req.params.id);
    res.render("edit.ejs", {post});
});

app.post("/edit/:id", (req, res)=>{
    const ind = posts.findIndex(p=> p.id === req.params.id);
    posts[ind].title = req.body.title;
    posts[ind].content = req.body.content;
    res.redirect("/");
});

app.post("/delete/:id", (req, res)=>{
    posts = posts.filter(p=> p.id !== req.params.id);
    res.redirect("/");
});