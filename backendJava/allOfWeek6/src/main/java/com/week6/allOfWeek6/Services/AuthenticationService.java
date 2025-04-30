package com.week6.allOfWeek6.Services;

import com.week6.allOfWeek6.Dto.LoginDto;
import com.week6.allOfWeek6.Dto.SignUpDto;
import com.week6.allOfWeek6.Models.Users;
import org.apache.catalina.User;

import java.util.List;

public interface AuthenticationService {
    String signup(SignUpDto signUpDto);
    Users login(LoginDto loginDto);
    List<Users>allUsers();
}
