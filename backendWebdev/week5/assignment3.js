import express from "express";
import { logger2, count } from "./middleware/3middleware.js";
const app=express();
const port = 3000;
app.use(express.json());
app.listen(port, ()=>{
    console.log(`app is running on the port ${port}`);
})

app.use(logger2)

app.get("/", (req, res)=>{
    res.send("hello world");
})


app.get("/get", (req, res)=>{
    res.json({message:"get req is send"});
});

app.get('/value', (req, res)=>{
    res.json({value: `${count} is the number of time server was called`});
})