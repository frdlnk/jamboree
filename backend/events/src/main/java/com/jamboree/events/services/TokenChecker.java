package com.jamboree.events.services;

import com.jamboree.events.models.UserModel;
import com.jamboree.events.repos.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TokenChecker {
    @Autowired
    UserRepository uRepo;
    public String check(String tokenid) {
        if(tokenid == null) return "You don't have access to this action because you didn't provide a token on the request headers";
        Optional<UserModel> user = uRepo.findById(tokenid);
        if(user.isEmpty()) return "You don't have access to this action because this user doesn't exist";
        return "";
    }
}
