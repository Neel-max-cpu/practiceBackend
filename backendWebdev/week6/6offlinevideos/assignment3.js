import express from "express";
import {z} from "zod";
import jwt from "jsonwebtoken";
const app = express();
app.use(express.json());
const port = 3000;
app.listen(port, ()=>{
    console.log(`app running on the port ${port}`);
})

const JWT_SECRET = "hehe";


const checkschema = z.object({
    user:z.string().email(),
    pass:z.string().min(1),
})


function createjwt(user, pass){
    const parsed = checkschema.safeParse({user, pass});
    if(!parsed.success){
        return null;
    }

    const token = jwt.sign({user}, JWT_SECRET);
    return token;
}


function checkjwt(token){
    
    const decode = jwt.verify(token, JWT_SECRET);
    if(!decode) return "no user";
    else return decode;
}


const token = createjwt("hehe@gmail.com", "1234");
const user = checkjwt(token);
console.log(`user is ${user.user}`);


