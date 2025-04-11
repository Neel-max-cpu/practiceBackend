import express from "express";
import {z} from "zod";
const port = 3000;
const app = express();
app.use(express.json());
app.listen(port, ()=>{
    console.log(`app running on the port ${port}`);
});

const users = [];

function generateToken(length = 16) {
    return Math.random().toString(36).substr(2, length);
}

function generateToken2() {
    let options = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    let token = "";
    for (let i = 0; i < 32; i++) {
        // use a simple function here
        token += options[Math.floor(Math.random() * options.length)];
    }
    return token;
}

const signupSchema =  z.object({
    email: z.string().email(),
    name: z.string().min(1),
    pass: z.string().min(1),
    cpass: z.string().min(1),
});

app.post("/signup", (req, res)=>{
    // traditional way ---
    /*
    const {email, name, pass, cpass} = req.body;
    
    if(!email || !name || !pass ||!cpass){
        res.status(400).send("fields can't be empty");
        }
    */
       
    // using zod ---
    const parsed = signupSchema.safeParse(req.body);
    if(!parsed.success){
        return res.status(400).json({error:parsed.error.errors});
    }
    
    const {email, name, pass, cpass} = parsed.data;
    if(pass!==cpass){
        return res.status(400).send("password and confirm password doesn't match!");
    }

    const existingUser = users.find(user=>user.email === email);
    if(existingUser){
        return res.status(400).send("user already exists!");
    }

    const token = generateToken();
    const token2 = generateToken2();
    users.push({email, name, pass, token, token2});
    res.status(201).json({message: "user created!", token, token2});
});

const signinSchema = z.object({
    email: z.string().email(),
    pass: z.string().min(1),
});

app.post("/signin", (req, res)=>{
    // traditional way ---
    /*
    const {email, pass} = req.body;
    const user = users.find(user=>user.email === email);
    if(!user || user.pass !== pass){
        res.status(400).send("invalid creds!");
    }
    */

    // using zod ---
    const parsed = signinSchema.safeParse(req.body);
    if(!parsed.success){
        return res.status(400).json({error:parsed.error.errors});
    }

    const {email, pass} = parsed.data;
    const user = users.find(user=>user.email === email);
    if(!user || user.pass !== pass){
        res.status(400).send("invalid creds!");
    }
    const token = generateToken();
    const token2 = generateToken2();
    user.token = token;
    res.json({message: "Signed in!", token, token2});
});


    app.get("/me", (req, res)=>{
        // BOTH works
        // const token = req.headers['authorization'];
        const token = req.headers.authorization;
        if(!token){
            return res.status(400).send("Token missing");
        }
        const user = users.find(user=>user.token===token);

        if(!user){
            return res.status(400).send("not valid user");
        }

        res.json({
            email:user.email,
            name:user.name,
            pass:user.pass,
            token:user.token,
            token2:user.token2,
        });
    })