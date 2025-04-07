import express from "express";

const app = express();
// needed for passing jason
app.use(express.json());
const port = 3000;

app.listen(port,()=>{
    console.log(`app running on port ${port}`);
})

let todoApp = [];
let nextId = 1;


// get 
app.get("/todos/all", (req, res)=>{
    if(todoApp.length===0){
        return res.status(200).send("no item in the list, all task done!");
    }
    else return res.json(todoApp);
});


app.get("/todos/:id", (req, res)=>{
    const id = parseInt(req.params.id);
    const todo =  todoApp.find(t=>t.id===id);

    if(!todo){
        return res.status(404).json({message: "Todo not found!"});
    }
    res.status(200).json(todo);
});

app.post("/todos/insert", (req, res)=>{

    // eg --
    /*
    {
        "title":"do assignment3",
        "desc":"need to finish it3"
    }
    */

    const {title, desc} = req.body;
    if(!title || !desc) res.status(400).send("tile/description is needed!");
    const newTodo = {
        id: nextId++,
        title : title,
        desc: desc,
        completed: false
    }

    todoApp.push(newTodo);
    res.status(201).json(newTodo);
});

app.put("/todos/edit/:id", (req, res)=>{
    /*
    {
        "ntitle":"do assignment10",
        "ndesc":"need to finish it10",
        "ncompleted":true
    }
    */
    const id = parseInt(req.params.id);
    const todo = todoApp.find(t=>t.id===id);
    const {ntitle, ndesc, ncompleted} = req.body;

    if(!todo){
        return res.status(404).json({message: "todo not found!"});
    }
    if (ntitle !== undefined) todo.title = ntitle;
    if (ndesc !== undefined) todo.desc = ndesc;
    if (ncompleted !== undefined) todo.completed = ncompleted;
    res.status(202).json(todo);
});


app.delete("/todos/del/:id", (req, res)=>{
    const id = parseInt(req.params.id);
    const index = todoApp.findIndex(t=>t.id===id);
    
    if(index===-1){
        return res.status(404).json({message: "todo not found!"});
    }

    // slice it -  splice(index, 1) → Remove 1 item starting from index
    todoApp.splice(index, 1);
    res.status(200).json({message:"Todo item deleted successfully!"});

})