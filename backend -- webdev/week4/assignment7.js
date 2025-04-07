import express from "express";
import { errorHandler, errorCount } from "./middleware/7middleware.js";

const app = express();
app.use(express.json());
const port = 3000;

app.listen(port, ()=>{
    console.log(`app is running on the ${port}`);
})

// don't use middleware here since after the error hit in "/explode" there is no middle ware to track it
// app.use(errorHandler);

app.get("/explode", (req, res, next)=>{
    throw new Error("Somethings broken!");
})

app.get("/ok", (req, res)=>{
    res.send("All good!");
})

app.get("/errorCount", (req, res)=>{
    res.send(`Total errors: ${errorCount.value}`);
})

// since we need to hit the error then work on the middleware so in the bottom(middleware placement matters a lot)
app.use(errorHandler);