package com.week6._Ass2.week6._Ass2.Services;

import com.week6._Ass2.week6._Ass2.Dto.LoginDto;
import com.week6._Ass2.week6._Ass2.Dto.SignUpDto;
import com.week6._Ass2.week6._Ass2.Models.UserModel;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AuthServieImp implements AuthService{
    private final List<UserModel> users = new ArrayList<>();

    @Override
    public String signup(SignUpDto signUpDto){
        // if pass and cpass not equal
        if(!signUpDto.getPass().equals(signUpDto.getCpass())){
            return "password and confirm password are not equal!";
        }
        for (UserModel u:users){
            if(u.getEmail().equals(signUpDto.getEmail())){
                return "user with that mail already exist!";
            }
        }
        UserModel newUser = new UserModel(signUpDto.getEmail(), signUpDto.getPass());
        users.add(newUser);
        return "SignedUp successfully!";
    }

    @Override
    public UserModel login(LoginDto loginDto){
        for(UserModel u:users){
            if(u.getEmail().equals(loginDto.getEmail()) && u.getPass().equals(loginDto.getPass())){
                return u;
            }
            else return null;
        }
        return null;
    }
}
