package com.week4.week4.Controller;

import com.week4.week4.Service.TodoService;
import com.week4.week4.model.TodoModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todos")
public class TodoController {
    @Autowired
    private TodoService todoService;


    /*
    1) get all todos
    2) create a todo
    3) update a particular todo
    4) delete a particular todo
     */

    @GetMapping("/all")
    public List<TodoModel>getTodos(){
        return todoService.getallTodos();
    }

    @PostMapping("/create")
    public TodoModel createTodo(@RequestBody TodoModel todo){
        return todoService.addTodo(todo);
    }

    @DeleteMapping("/delete/{id}")
    public boolean deleteTodo(@PathVariable int id){
        return todoService.deleteTodo(id);
    }

    @PutMapping("/update/{id}")
    public TodoModel updateTodo(@PathVariable int id, @RequestBody TodoModel todo){
        return todoService.updateTodo(id, todo);
    }
}
