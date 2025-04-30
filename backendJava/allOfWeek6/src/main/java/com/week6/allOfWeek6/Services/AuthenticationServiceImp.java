package com.week6.allOfWeek6.Services;

import com.week6.allOfWeek6.Dto.LoginDto;
import com.week6.allOfWeek6.Dto.SignUpDto;
import com.week6.allOfWeek6.Models.Users;
import org.apache.catalina.User;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AuthenticationServiceImp implements AuthenticationService {
    private List<Users>users = new ArrayList<>();

    @Override
    public String signup(SignUpDto signUpDto){
        if(!signUpDto.getPass().equals(signUpDto.getCpass())){
            return "password and confirm password doesn't match!";
        }
        for(Users u:users){
            if(u.getEmail().equals(signUpDto.getEmail())){
                return "user already exists!";
            }
        }
        System.out.println(signUpDto.getName());
        System.out.println(signUpDto.getEmail());
        System.out.println(signUpDto.getPass());
        Users newUser = new Users(signUpDto.getName(), signUpDto.getEmail(), signUpDto.getPass());
        users.add(newUser);
        return "SignUp successfully!";
    }

    @Override
    public Users login(LoginDto loginDto){
        for(Users u:users){
            if(u!=null && u.getEmail().equals(loginDto.getEmail()) && u.getPassword().equals(loginDto.getPass())) {
                return u;
            }
            else return null;
        }
        return null;
    }

    @Override
    public List<Users>allUsers(){
        return users;
    }
}
