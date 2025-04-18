import express from "express";
import {z} from "zod";
import jwt from 'jsonwebtoken'
import { TodoModel, UserModel } from "./models/db.js";
import mongoose from 'mongoose'
import { authentication } from "./middleware/auth.middleware.js";
import bcrypt, { hash } from 'bcrypt'

const app = express();
const port = 3000;
const JWT_SECRET = "hehe";

mongoose.connect("mongodb://localhost:27017/todo-app").then(()=>{
    console.log("Connected to mongodb Db");
}).catch(()=>{
    console.log("Error in connection!");
})



app.use(express.json());
app.listen(port, ()=>{
    console.log(`app running on the port ${port}`);
});

const signupSchema = z.object({
    email:z.string().email(),
    name:z.string().min(3),
    pass:z.string(),
    cpass:z.string()
})

app.post("/signup", async(req, res)=>{
    const paresed = signupSchema.safeParse(req.body);
    if(!paresed.success){
        // return res.status(400).send("Error in singup");
        return res.status(400).json({error:paresed.error.errors});
    }
    const {email, name, cpass, pass} = paresed.data;
    if(pass !== cpass){
        return res.status(400).send("password and confirm password are not same!");
    }

    const existingUser = await UserModel.findOne({email});
    if(existingUser){
        return res.status(400).send("User already exists");
    }
    // hashing the pass ---
    const hashedpass = await bcrypt.hash(pass, 10);

    // const newUser = new UserModel({name, email, pass});
    const newUser = new UserModel({name, email, hashedpass});
    await newUser.save();

    const token = jwt.sign({email}, JWT_SECRET);
    res.status(201).json({message:"Account Created!", "token":`${token}`});
    console.log("Done");

});


const loginSchema = z.object({
    email:z.string().email(),
    pass:z.string(),
})

app.post("/login", async(req, res)=>{
    const paresed = loginSchema.safeParse(req.body);
    if(!paresed.success){
        return res.status(400).send("Error in format!");
    }

    const {email, pass} = paresed.data;
    /* checking how promise works--
    const user1 = UserModel.findOne({email});
    console.log(`user1 it is ${user1}`);
    */
    const user = await UserModel.findOne({email});
    // console.log(`user it is ${user}`);
    // if(!user || user.pass!==pass){
    // const isMatch = await bcrypt.compare(pass, user.pass);
    const isMatch = await bcrypt.compare(pass, user.hashedpass);
    if(!user || !isMatch){
        /*
        if(!user){
            console.log("Wrong user");
        }
        else{
            console.log("invalid pass");
            console.log(pass);
            console.log(user.pass);
        }
        */
        return res.status(400).send("invalid credintials");
    }

    const token = jwt.sign({email}, JWT_SECRET);
    res.status(200).json({message:"Signed in!", "token":`${token}`});
    console.log("login!");
})

const todoScheme = z.object({
    title:z.string().min(3),
})

app.post("/todomake", authentication, async (req, res)=>{
    const paresed = todoScheme.safeParse(req.body);
    if(!paresed.success){
        return res.status(400).send("not done correctly, fill it correctly");
        // return res.status(400).json({error:paresed.error.errors});
    }

    const {title} = paresed.data;

    try {
        // user from jwt
        const email = req.user.email;
        const user = await UserModel.findOne({email});
        
        const newTodo = new TodoModel({
            userId: user._id,
            title,
        })

        await newTodo.save();
        res.status(201).json({message:"Todo created successfully", todo:newTodo});
    } catch (error) {
        console.log(error);
        res.status(500).send('Something went wrong!');
    }
})


// get all the todos, from the user
app.get("/todo", authentication, async(req, res)=>{
    try {
        const email = req.user.email;
        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(400).send("user doesn't exist!");
        }
        
        // by not using relationships
        // const todos = await TodoModel.find({userId:user._id});
        
        // using relationships --- passing the id
        const todos = await TodoModel.find({userId:user._id}).populate('userId');
        if(todos.length===0){
            return res.status(200).send("no todos found! write Something up!");
        }
        res.status(200).json({todos});
    } catch (error) {
        return res.status(500).send("something went wrong!");
    }
})


app.put("/todo/:id/markdone", async(req, res)=>{
    await TodoModel.findByIdAndUpdate(req.params.id, {done:true});
    res.send("marked done!");
})