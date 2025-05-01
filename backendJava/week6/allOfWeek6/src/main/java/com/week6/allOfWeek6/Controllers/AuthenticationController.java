package com.week6.allOfWeek6.Controllers;

import com.week6.allOfWeek6.Dto.LoginDto;
import com.week6.allOfWeek6.Dto.SignUpDto;
import com.week6.allOfWeek6.Models.Users;
import com.week6.allOfWeek6.Services.AuthenticationService;
import jakarta.servlet.http.HttpSession;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {
    @Autowired
    private AuthenticationService authService;

    @PostMapping("/signup")
    public String signup(@RequestBody SignUpDto signUpDto){
        return authService.signup(signUpDto);
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginDto loginDto, HttpSession session){
        Users user =  authService.login(loginDto);
        if(user != null){
            session.setAttribute("user", user.getEmail());
            return "Logged in successfully!";
        }
        else {
            return "Invalid credentials!";
        }
    }

    @GetMapping("/allUser")
    public List<Users> allUsers(){
        return authService.allUsers();
    }

    @GetMapping("/me")
    public String currentUser(HttpSession session){
        Object email = session.getAttribute("user");
        if(email != null){
            return "Logged in as: "+email;
        }
        else{
            return "Not logged in!";
        }
    }
}
