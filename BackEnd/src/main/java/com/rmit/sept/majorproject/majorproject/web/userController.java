package com.rmit.sept.majorproject.majorproject.web;

import com.rmit.sept.majorproject.majorproject.model.User;
import com.rmit.sept.majorproject.majorproject.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/person")
public class userController {

    @Autowired
    private UserService userService;

    @PostMapping("")
    public ResponseEntity<?> createNewUser(@Valid @RequestBody User user, BindingResult result){
        if(result.hasErrors()){
            return new ResponseEntity<String>("Invalid User Object", HttpStatus.BAD_REQUEST);
        }
        User user1 = userService.saveOrUpdateUser(user);
        return new ResponseEntity<User>(user, HttpStatus.CREATED);
    }

}
