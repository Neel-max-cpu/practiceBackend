package com.week62.week62.Dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class LoginDto {
    @NotBlank(message = "email can't be empty!")
    @Email(message = "invalid email formate")
    private String email;

    @NotBlank(message = "password can't be empty")
    @Size(message = "min 4 characters needed!")
    private String pass;

    public LoginDto(){};
    public LoginDto(String email, String pass){
        this.email = email;
        this.pass = pass;
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
}
