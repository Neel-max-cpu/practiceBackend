import express from "express";
import { logger } from "../middleware/2middleware.js";

const app = express();
const port = 3000;
app.use(express.json());

app.use(logger);
app.listen(port, ()=>{
    console.log(`app running on the ${port}`);
})

// Assignment #2 - Create a middleware function that 
// logs each incoming request’s HTTP method, URL, and timestamp to the console


app.get("/get", (req, res)=>{
    res.send("hello there!");
})