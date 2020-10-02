package com.rmit.sept.majorproject.majorproject.web;

import com.rmit.sept.majorproject.majorproject.model.User;
import com.rmit.sept.majorproject.majorproject.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
@CrossOrigin
public class userController {

    @Autowired
    private UserService userService;

    @PostMapping("")
    public ResponseEntity<?> createNewUser(@Valid @RequestBody User user, BindingResult result){
        if (result.hasErrors()) {
            Map<String, String> errorMap = new HashMap<>();
            for (FieldError error : result.getFieldErrors()) {
                return new ResponseEntity<FieldError>(error, HttpStatus.BAD_REQUEST);
            }
        }
      
        User user1 = userService.saveOrUpdateUser(user);
        return new ResponseEntity<User>(user, HttpStatus.CREATED);
    }

    @GetMapping("/getRole/{role}")
    public ResponseEntity<?> getUserType(@PathVariable String role){

        if(!userService.verifyRole(role)){
            return new ResponseEntity<String>("Invalid user role", HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<Iterable<User>>(userService.getUserType(role), HttpStatus.OK);
    }

    @DeleteMapping("/{userName}")
    public ResponseEntity<?> deleteUser(@PathVariable String userName){
        userService.deleteUserByUsername(userName);

        return new ResponseEntity<String>("User with username: '" + userName + "' was deleted", HttpStatus.OK);
    }

}