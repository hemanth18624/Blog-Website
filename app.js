const blogInfo = {};

import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
const port = 8080;

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended : true}));


app.listen(port,()=>{
    console.log(`Listening to port number : ${port}`);
});

app.get("/",(req,res)=>{
    res.render("main.ejs",{
        blogInfo,
    })
});

app.post("/submit",(req,res)=>{
    const titlecontent = req.body.title;
    const actualcontent = req.body.content;
    blogInfo[titlecontent] = actualcontent;
    res.render("main.ejs",{
        blogInfo : blogInfo
    })
});


app.get("/blog/:title",(req,res)=>{
    const title = req.params.title;
    const content = blogInfo[title];
    res.render("displayblogs.ejs",{
        title,content
    });
});

app.post("/blog/update",(req,res)=>{
    const oldTitle = req.body.originalTitle;
    const newContent = req.body.content;
    blogInfo[oldTitle] = newContent;
    res.render("main.ejs",{
        blogInfo : blogInfo,
    })
});
app.post("/blog/delete",(req,res)=>{
    const toBeDeletedTitle = req.body.title;
    const toBeDeletedContent = req.body.content;
    if(toBeDeletedTitle != null)
    {
        delete blogInfo[toBeDeletedTitle];
    }
    res.render("main.ejs",{
        blogInfo:blogInfo,
    })
});
