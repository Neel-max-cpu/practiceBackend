package com.week62.week62.Services;

import com.week62.week62.Dto.LoginDto;
import com.week62.week62.Dto.SignUpDto;
import com.week62.week62.Models.UserModel;

import java.util.List;

public interface AuthService {
    String signUp(SignUpDto signUpDto);
    UserModel logIn(LoginDto loginDto);
    List<UserModel> allUsers();
    UserModel findByEmail(String email);
}
