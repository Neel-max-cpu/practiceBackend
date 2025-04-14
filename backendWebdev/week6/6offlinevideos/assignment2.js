import express from "express";
import {z} from "zod";
import jwt from "jsonwebtoken";

const app = express();
const port = 3000;
const JWT_SECRET = "hehe";

app.use(express.json());
app.listen(port, ()=>{
    console.log(`app running on the port ${port}`);
})

const tokenschema = z.object({
    user:z.string().email(),
    pass:z.string().min(1),
})

function createtoken(user, pass){
    const parsed = tokenschema.safeParse({user, pass});
    if(!parsed.success){
        return null;
    }
    const token = jwt.sign({user}, JWT_SECRET);
    return token;
}

function check(token){
    // verify needs JWT_SECRET but decode doesn't
    const decode = jwt.decode(token);

    if(!decode) return false;
    else return true;
}

const token = createtoken("hehe@gmail.com", "1234");
const checktoken = check(token);
console.log(token)
console.log(checktoken);


