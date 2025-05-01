package com.week62.week62.Services;

import com.week62.week62.Models.UserModel;
import com.week62.week62.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {
    //now not needed when used db then needed
    /*
    @Autowired
    private UserRepository userRepository;

    public UserModel findByEmail(String email){
        Optional<UserModel> userOptional = userRepository.findByEmail(email);
        return userOptional.orElse(null);
    }
    */
}
