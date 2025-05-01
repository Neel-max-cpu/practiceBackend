package com.week6.allOfWeek6.Dto;

public class SignUpDto {
    private String name;
    private String email;
    private String pass;
    private String cpass;

    public SignUpDto(){};
    public SignUpDto(String name, String email, String pass, String cpass){
        this.name = name;
        this.email = email;
        this.pass = pass;
        this.cpass = cpass;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPass() {
        return pass;
    }

    public void setPass(String pass) {
        this.pass = pass;
    }

    public String getCpass() {
        return cpass;
    }

    public void setCpass(String cpass) {
        this.cpass = cpass;
    }
}
