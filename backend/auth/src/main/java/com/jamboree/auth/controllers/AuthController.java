package com.jamboree.auth.controllers;

import at.favre.lib.crypto.bcrypt.BCrypt;
import com.jamboree.auth.models.LoginDataModel;
import com.jamboree.auth.models.RegisterDataModel;
import com.jamboree.auth.models.UserModel;
import com.jamboree.auth.repository.UserRepository;
import com.jamboree.auth.services.LoginDataVerification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    UserRepository authRepo;

    @GetMapping("/health")
    public ResponseEntity<String> healthEP(){
        return ResponseEntity.status(HttpStatus.OK).body("Auth service operational");
    }

    @PostMapping("/login")
    public ResponseEntity<String> LoginWithEmailAndPassword(@RequestBody LoginDataModel data) {
        LoginDataVerification verficator = new LoginDataVerification();
        String verificationStatus = verficator.certificateData(data);
        if(!verificationStatus.isEmpty()) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(verificationStatus);
        UserModel userExist = authRepo.findByEmail(data.email);
        if (userExist == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("This user doesn't exists. Login with other credentials");
        BCrypt.Result passwordMatch = verficator.checkIfPasswordMatch(data.password, userExist.getPassword());
        if(!passwordMatch.verified) return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Password is incorrect");
        userExist.setLastLogin(new Date().getTime());
        authRepo.save(userExist);
        return ResponseEntity.status(HttpStatus.OK).body(userExist.get_id());
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerWithEmailAndPassword(@RequestBody RegisterDataModel data) {
        if(data.email == null || data.password == null || data.name == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No email or no password or no name provided in the request");
        UserModel user = authRepo.findByEmail(data.email);
        if(user != null) return ResponseEntity.status(HttpStatus.FORBIDDEN).body("This user already exist. Login or create another account");
        UserModel newUser = new UserModel();
        newUser.setName(data.name);
        newUser.setEmail(data.email);
        String passwordHashed = BCrypt.withDefaults().hashToString(12, data.password.toCharArray());
        newUser.setPassword(passwordHashed);
        newUser.setLocation(data.location);
        newUser.setCountry(data.country);
        newUser.setNotifications(new ArrayList<>());
        newUser.setJoined(new ArrayList<>());
        newUser.setCreatedAt(new Date().getTime());
        newUser.setLastLogin(new Date().getTime());
        authRepo.save(newUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(newUser.get_id());
    }

    @GetMapping("/profile")
    public ResponseEntity getProfile(@RequestParam String id) {
        try {
            Optional<UserModel> user = authRepo.findById(id);
            return ResponseEntity.status(HttpStatus.OK).body(user);
        }
        catch (Error e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No id provided in the request");
        }
    }
}
