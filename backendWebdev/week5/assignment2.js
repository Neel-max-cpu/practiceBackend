// Assignment #2 - Create a middleware function that logs each incoming request’s HTTP
//  method, URL, and timestamp to the console

import express from "express";
import { logger } from "./middleware/2middleware.js";

const app = express();
const port = 3000;
app.use(express.json());
app.listen(port, ()=>{
    console.log(`app running on ${port}`);
})


app.use(logger);

app.get("/", (req, res)=>{
    res.send("hello world");
})


app.get("/get", (req, res)=>{
    res.json({message:"get req is send"});
});