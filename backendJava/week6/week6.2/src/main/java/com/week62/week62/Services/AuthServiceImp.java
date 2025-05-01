package com.week62.week62.Services;

import com.week62.week62.Dto.LoginDto;
import com.week62.week62.Dto.SignUpDto;
import com.week62.week62.Models.UserModel;
import org.apache.catalina.User;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AuthServiceImp implements AuthService{
    private List<UserModel>users = new ArrayList<>();

    @Override
    public String signUp(SignUpDto signUpDto){
        if(!signUpDto.getPass().equals(signUpDto.getCpass())){
            return "Password and confirm password must be equal!";
        }
        for(UserModel u:users){
            if(u.getEmail().equals(signUpDto.getEmail())){
                return "User with this email already exists!";
            }
        }
        UserModel newUser = new UserModel(signUpDto.getName(), signUpDto.getEmail(), signUpDto.getPass());
        users.add(newUser);
        return "Signed Up successfully!";
    }

    @Override
    public UserModel logIn(LoginDto loginDto){
        for(UserModel u:users){
            if(u.getEmail().equals(loginDto.getEmail()) && u.getPassword().equals(loginDto.getPass())){
                return u;
            }
            else return null;
        }
        return null;
    }

    @Override
    public List<UserModel>allUsers(){
        return users;
    }

    @Override
    public UserModel findByEmail(String email){
        for(UserModel u:users){
            if(u.getEmail().equals(email)){
                return u;
            }
        }
        return null;
    }
}
