package com.week6._Ass2.week6._Ass2.Services;

import com.week6._Ass2.week6._Ass2.Dto.LoginDto;
import com.week6._Ass2.week6._Ass2.Dto.SignUpDto;
import com.week6._Ass2.week6._Ass2.Models.UserModel;
import org.springframework.stereotype.Service;

public interface AuthService {
    String signup(SignUpDto signUpDto);
    UserModel login(LoginDto loginDto);
}
