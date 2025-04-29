package com.week4.week4.model;

public class TodoModel {

    private int id;
    private String title;
    private String desc;
    private boolean completed;

    public TodoModel(){};

    public TodoModel(int id, String title, String desc, boolean completed){
        this.id = id;
        this.title = title;
        this.desc = desc;
        this.completed = completed;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }
}
