import express from "express";
import {z} from "zod";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());
const port = 3000;
app.listen(port, ()=>{
    console.log(`app running on the port ${port}`)
});


const JWT_SECRET = "hehe";

const signupSchema = z.object({
    username:z.string().email(),
    password:z.string().min(6),
})

function createjwt (username, password){
    const paresed = signupSchema.safeParse({username, password});

    if(!paresed.success){
        return null;
    }
    const token = jwt.sign({username}, JWT_SECRET);
    return token;
}


const token = createjwt("hehe@gmail.com", "123456");
const token1 = createjwt("hehegmail.com", "123456");
const token2 = createjwt("hehe@gmail.com", "1234");
console.log(token)
console.log(token1)
console.log(token2)



/*
app.post("/signup", (req, res)=>{
    const paresed = signupSchema.safeParse(req.body);
    if(!paresed.success){
        return res.status(400).json({error:paresed.error.errors});        
    }
    const {username, password} = paresed.data;
    const token = jwt.sign({username}, JWT_SECRET);
    console.log("done signed!");
    return res.status(201).send(`here's the token: ${token}`);
})
*/