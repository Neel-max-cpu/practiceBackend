package com.week4.week4.Service;

import com.week4.week4.model.TodoModel;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TodoService {

    //ASSIGNMENT 1 -- USING array
     private final List<TodoModel> todos = new ArrayList<>();

    private int currentId = 1;

    // get all the todos
    public List<TodoModel> getallTodos(){
        return todos;
    }

    // add todo
    public TodoModel addTodo(TodoModel todo){
        todo.setId(currentId++);
        todos.add(todo);
        return todo;
    }

    // delete todo
    public boolean deleteTodo(int id){
        return todos.removeIf(todo -> todo.getId() == id);
    }

    // update
    public TodoModel updateTodo(int id, TodoModel updatedTodo){
        for(TodoModel todo: todos){
            if(todo.getId() == id){
                todo.setTitle(updatedTodo.getTitle());
                todo.setDesc(updatedTodo.getDesc());
                todo.setCompleted(updatedTodo.isCompleted());
                return todo;
            }
        }
        return null;
    }

}
