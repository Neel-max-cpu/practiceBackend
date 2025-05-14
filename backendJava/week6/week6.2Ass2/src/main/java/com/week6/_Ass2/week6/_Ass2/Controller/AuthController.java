package com.week6._Ass2.week6._Ass2.Controller;

import com.week6._Ass2.week6._Ass2.Dto.LoginDto;
import com.week6._Ass2.week6._Ass2.Dto.SignUpDto;
import com.week6._Ass2.week6._Ass2.Models.UserModel;
import com.week6._Ass2.week6._Ass2.Services.AuthService;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthService authService;


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDto loginDto){
        UserModel user = authService.login(loginDto);
        if(user!=null){
            return ResponseEntity.ok(user);
        }
        else return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("invalid credentials!");
    }

    @PostMapping("/signup")
    public ResponseEntity<?>signup(@RequestBody SignUpDto signUpDto){
        String res = authService.signup(signUpDto);
        return ResponseEntity.ok(res);

    }

}
