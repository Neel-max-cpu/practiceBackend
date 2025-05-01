package com.week62.week62.Controllers;

import com.week62.week62.Dto.LoginDto;
import com.week62.week62.Dto.SignUpDto;
import com.week62.week62.Models.UserModel;
import com.week62.week62.Services.AuthService;
import com.week62.week62.Services.JwtService;
import com.week62.week62.Services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @Autowired
    private JwtService jwtService;

    // when using the db now not needed
    /*
    @Autowired
    private UserService userService;
    */

    @PostMapping("/signup")
    public String signup(@Valid @RequestBody SignUpDto body){
        return authService.signUp(body);
    }

    @PostMapping("/login")
    public  ResponseEntity<Map<String, String>> login(@Valid @RequestBody LoginDto body){
        UserModel user = authService.logIn(body);
        Map<String, String> response = new HashMap<>();
        if(user!=null){
            String token = jwtService.generateToken(user.getEmail());
            response.put("message", "Logged In successfully!");
            response.put("token", token);
            return ResponseEntity.ok(response);
        }
        else {
            response.put("message", "Invalid Creds");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

    @GetMapping("/userinfo")
    public ResponseEntity<UserModel>getUserModel(@RequestHeader("Authorization") String token){
        if(jwtService.isTokenValid(token)){
            String email = jwtService.extractEmail(token);
            //with db ---
            /*
            UserModel user = userService.findByEmail(email);
            if(user!=null){
                return ResponseEntity.ok(user);
            }
            else{
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            */

            // without db --
            UserModel user = authService.findByEmail(email);
            if(user!=null){
                return ResponseEntity.ok(user);
            }
            else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        }
        else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

    }

    @GetMapping("/allUsers")
    public List<UserModel>allUsers(){
        List<UserModel> users = authService.allUsers();
        return users;
    }
}
