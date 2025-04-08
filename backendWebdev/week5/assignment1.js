import express from "express";

const app = express();
app.use(express.json());
const port = 3000;

app.listen(port, ()=>{
    console.log(`server running on ${port}`);
});

app.get("/", (req, res)=>{
    res.send("hello");
});

/*
app.get("/sum/:a/:b", (req, res)=>{
    // or 
    // /sum/* -- url then
    // const path = req.path;
    // const part = path.split("/");   //["", "sum", "1", "2"] - if /sum/1/2
    // const a = parseInt(parts[2]);
    // const b = parseInt(parts[3]);
    

    const a = parseInt(req.params.a);
    const b = parseInt(req.params.b);
    res.json({
        ans: a+b
    });
});

app.get("/sub/:a/:b", (req, res)=>{
    const path = req.path;
    const a = parseInt(req.params.a);
    const b = parseInt(req.params.b);
    res.json({

        "ans(a-b)" : a-b,
        "ans(b-a)" : b-a
    });
});


app.get("/mul/:a/:b", (req, res)=>{
    const a = parseInt(req.params.a);
    const b = parseInt(req.params.b);
    res.json({
        ans:a*b
    });
});

app.get("/div/:a/:b", (req, res)=>{
    const a = parseInt(req.params.a);
    const b = parseInt(req.params.b);
    res.json({
        "ans(a/b)": a/b,
        "ans(b/a)":b/a
    });
});
*/

// better way to do it -----

app.get("/:op/:a/:b", (req, res)=>{
    const {op, a, b} = req.params;
    const num1 = parseInt(a);
    const num2 = parseInt(b);
    let result;
    switch (op){
        case "sum":
            result = num1+num2;
            break;
        case "sub":
            result = num1-num2;
            break;
        case "mul":
            result = num1*num2;
            break;
        case "div":
            if(num2 === 0){
                return res.status(400).json({error: "Cannot divide by zero."});
            }
            result = num1/num2;
            break;
        default:
            res.send(400).json({error:"invalid operator"});
    }
    res.json({ans:result});
}); 