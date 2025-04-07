import express from "express";
import { checklimitar } from "./middleware/6middleware.js";
const app = express();
app.use(express.json());
const port = 3000;

app.listen(port, ()=>{
    console.log(`app running on ${port}`);
});


app.use(checklimitar);

app.get('/data',(req, res)=>{
    res.send("Data accessed!");
})