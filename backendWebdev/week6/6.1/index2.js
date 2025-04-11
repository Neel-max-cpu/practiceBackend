import express, { json } from "express";
import {z} from "zod";
import errorMap from "zod/locales/en.js";
import jwt from 'jsonwebtoken'
const port = 3000;
const app = express();
app.use(express.json());
app.listen(port, ()=>{
    console.log(`app running on port ${port}`);
})

const users = [];
const JWT_SECRET = "mykey";

const signupSchema = z.object({
    email: z.string().email(),
    name: z.string().min(1),
    pass: z.string().min(1),
    cpass: z.string().min(1),
});

app.post("/signup", (req, res)=>{
    const parsed = signupSchema.safeParse(req.body);
    if(!parsed.success){
        return res.status(400).json({error: parsed.error.errors});
    }

    const {email, name, pass, cpass} = parsed.data;

    if(pass !== cpass){
        return res.status(400).send("password and confirm password are not same!");
    }
    
    const existingUser = users.find(user=>user.email === email);
    if(existingUser){
        return res.status(400).send("user already exists");
    }

    const token = jwt.sign({email}, JWT_SECRET, {expiresIn: "1h"});
    users.push({email, name, pass, token});
    res.status(201).json({message: "user created!", token});
})

const signinSchema = z.object({
    email: z.string().email(),
    pass: z.string().min(1),
})

app.post("/signin", (req, res)=>{
    const parsed = signinSchema.safeParse(req.body);
    if(!parsed.success){
        return res.status(400).json({error:parsed.error.errors});
    }
    const {email, pass} = parsed.data;
    const user = users.find(user=>user.email === email);
    if(!user || user.pass !== pass){
        res.status(400).send("invalid creds!");
    }

    const token = jwt.sign({email}, JWT_SECRET, {expiresIn: "1hr"});
    res.json({message:"Signed In!", token});
})

app.get("/me", (req, res)=>{
    const tokenHeader = req.headers.authorization;
    if(!tokenHeader){
        return res.status(400).send("token missing");
    }
    
    try {
        const decoded = jwt.verify(tokenHeader, JWT_SECRET);
        const user = users.find(user=>user.email === decoded.email);
        if(!user){
            return res.status(400).send("user not found!");
        }
        res.json({
            email:user.email,
            name:user.name,
            pass:user.pass,
        })

    } catch (error) {
        return res.status(400).send('invalid or expired token!');
    }

    
})