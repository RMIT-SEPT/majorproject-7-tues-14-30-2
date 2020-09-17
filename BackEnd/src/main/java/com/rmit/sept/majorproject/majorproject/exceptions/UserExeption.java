package com.rmit.sept.majorproject.majorproject.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class UserExeption extends RuntimeException{

    public UserExeption(String message){
        super(message);
    }
}
