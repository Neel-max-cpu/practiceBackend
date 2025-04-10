import express from "express";
import { calculate } from "./middleware/1middleware.js";
const app = express();
app.use(express.json());
const port = 3000;

app.listen(port, ()=>{
    console.log(`app running on the ${port}`);
});


// Assignment #1 - Try converting the calculator assignment to use POST endpoints. 
// Check if it works with/without the express.json middleware

app.post("/:operator", calculate);