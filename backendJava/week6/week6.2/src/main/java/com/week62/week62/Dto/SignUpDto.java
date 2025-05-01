package com.week62.week62.Dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class SignUpDto {
    @NotBlank(message = "name is required")
    private String name;

    @NotBlank(message = "email is required")
    @Email(message = "invalid email formate")
    private String email;

    @NotBlank(message = "password can't be blank")
    @Size(min=4, message = "password must be of min 4 characters")
    private String pass;

    @NotBlank(message = "confirm password can't be blank")
    @Size(min=4, message = "confirm password must be of min 4 characters")
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
