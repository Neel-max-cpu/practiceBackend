package com.week6._Ass2.week6._Ass2.Dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

public class SignUpDto {
    @NotEmpty(message = "name can't be empty")
    private String name;

    @NotEmpty(message = "Email can't be empty")
    @Email(message = "email should be valid")
    private String email;

    @NotEmpty(message = "password can't be empty")
    @Size(min=4, message = "min of 4 char")
    private String pass;
    @NotEmpty(message = "password can't be empty")
    @Size(min=4, message = "min of 4 char")
    private String cpass;

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
