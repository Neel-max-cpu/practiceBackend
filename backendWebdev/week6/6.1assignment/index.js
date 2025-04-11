import express from "express";
import jwt from "jsonwebtoken";
import {z} from "zod";
import { authentication } from "./middleware/6middleware.js";

const port = 3000;
const app = express();
app.use(express.json());
app.listen(port, ()=>{
    console.log(`app is running on the port ${port}`);
})

const users = [];
const JWT_SECRET = "hehe";

const signupSchema = z.object({
    email:z.string().email(),
    name:z.string().min(1),
    pass:z.string().min(1),
    cpass:z.string().min(1)
})

app.post("/signup", (req, res)=>{
    const parsed = signupSchema.safeParse(req.body);
    if(!parsed.success){
        return res.status(400).json({error:parsed.error.errors});
    }

    const {email, name, pass, cpass} = parsed.data;
    if(pass!==cpass){
        return res.status(400).send("password doesn't match the confirm pasword");
    }
    
    const existingUser = users.find(user=>user.email === email);
    if(existingUser){
        return res.status(400).send("user already exists!");
    }
    
    users.push({email, name, pass});
    res.status(201).json({message:"user created!"});
})


const signinSchema = z.object({
    email: z.string().email(),
    pass: z.string().min(1),
})

app.post("/signin", (req, res)=>{
    const parsed = signinSchema.safeParse(req.body);
    if(!parsed.success){
        return res.status(400).send("password doesn't match the confirm pasword");
    }
    const {email, pass} = parsed.data;
    const user = users.find(user=>user.email === email);
    if(!user || user.pass != pass){
        return res.status(400).json({error:parsed.error.errors});
    }
    const token = jwt.sign({email}, JWT_SECRET, {expiresIn: "1hr"});
    res.json({message:"Signed IN!", token});
})


app.get("/me", authentication, (req, res)=>{
    const user = users.find(user => user.email === req.user.email);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.json({
        email: user.email,
        name: user.name
    });
})