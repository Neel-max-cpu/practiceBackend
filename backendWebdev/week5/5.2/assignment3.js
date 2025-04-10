import express from "express";
import { count, logger2 } from "./middleware/3middleware.js";
const app = express();
const port = 3000;
app.listen(port, ()=>{
    console.log(`app running on the ${port}`);
})

// Assignment #3 - Create a middleware that counts total number 
// of requests sent to a server. Also create an endpoint that exposes it

app.use(logger2);

app.get("/get", (req, res)=>{
    res.send("hello there!");
})

app.get("/see", count)