import express from "express";
import cors from "cors";
import { summer } from "./middleware/4middleware.js";
const app = express();
app.use(express.json());
app.use(cors());
const port = 3000;
app.listen(port, ()=>{
    console.log(`app running on the ${port}`);
})


// Assignment #4 - Create a backend server in node.js, that returns the sum endpoint

app.post("/sum", summer);