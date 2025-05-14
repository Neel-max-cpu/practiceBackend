package com.week6._Ass2.week6._Ass2.Dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;

public class LoginDto {
    @NotEmpty(message = "email can't be empty")
    @Email(message = "Email should be valid")
    private String email;

    @NotEmpty(message = "password can't be empty")
    private String pass;

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
}
