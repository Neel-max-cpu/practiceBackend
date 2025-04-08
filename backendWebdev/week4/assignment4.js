import express from "express";
import fs from "fs";

const FILE_PATH = "./todoApp.json";

const app = express();
app.use(express.json());
const port = 3000;

app.listen(port, ()=>{
    console.log(`app running on ${port}`);
});



function loaderTodoApp(){
    try {
        const data = fs.readFileSync(FILE_PATH, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

function saveTodoApp(todos){
    // update todo, with null(dont filter anything, update everything) with 2 spaces
    fs.writeFileSync(FILE_PATH, JSON.stringify(todos, null, 2));
}

let todoApp = loaderTodoApp();
let nextId = todoApp.length>0 ? Math.max(...todoApp.map(t=>t.id))+1 : 1;


app.get("/todos/all", (req, res)=>{
    if(todoApp.length===0){
        return res.status(200).send("no item in the litst, all task done!");        
    }
    else return res.json(todoApp);
});

app.get("/todos/:id", (req, res)=>{
    const id = parseInt(req.params.id);
    const data = todoApp.find(t=>t.id===id);

    if(!data){
        return res.status(400).json({message: "Todo not found!"});
    }
    return res.status(200).json(data);
})

app.post("/todos/insert", (req, res)=>{

    // eg --
    /*
    {
        "title":"do assignment3",
        "desc":"need to finish it3"
    }
    */
    const {title, desc} = req.body;
    if(!title || !desc) res.status(400).send("title/description not found");
    const newTodo = {
        id: nextId++,
        title: title,
        desc: desc,
        complete: false
    }

    todoApp.push(newTodo);
    saveTodoApp(todoApp);
    res.status(201).json(newTodo);
})


app.put("/todos/edit/:id", (req, res)=>{

    // eg --
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
    if(ntitle!==undefined) todo.title = ntitle;
    if(ndesc!==undefined) todo.desc = ndesc;
    if(ncompleted!==undefined) todo.complete = ncompleted;
    saveTodoApp(todoApp);
    res.status(202).json(todo);
    
})


app.delete("/todos/del/:id", (req, res)=>{
    const id = parseInt(req.params.id);
    const index = todoApp.findIndex(t=>t.id===id);
    
    if(index===-1){
        return res.status(404).json({message: "todo not found!"});
    }

    // slice it -  splice(index, 1) → Remove 1 item starting from index
    todoApp.splice(index, 1);
    saveTodoApp(todoApp);
    res.status(200).json({message:"Todo item deleted successfully!"});

})