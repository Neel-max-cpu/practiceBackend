import express from "express";
import { requestLogger, getCount } from "./middleware/assignmentMiddleware.js";
const app = express();
app.use(express.json());
const port = 3000;

app.listen(port, ()=>{
    console.log(`app is running on ${port}`);
})

// Middleware in Express is like a checkpoint that runs before your actual route.
app.use(requestLogger);

app.get("/checkCount", getCount);