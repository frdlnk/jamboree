package com.jamboree.auth.services;

import at.favre.lib.crypto.bcrypt.BCrypt;
import com.jamboree.auth.models.LoginDataModel;

public class LoginDataVerification {

    public String certificateData(LoginDataModel data) {
        if (data.email == null || data.password == null) return "Email or password was not provided on the request";
        if(data.email.isEmpty() || data.password.isEmpty()) return "Fill the blanks before send";
        return "";
    }


    public BCrypt.Result checkIfPasswordMatch(String password, String userPassword) {
        return BCrypt.verifyer().verify(password.toCharArray(), userPassword);
    }
}
