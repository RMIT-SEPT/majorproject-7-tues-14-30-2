package com.rmit.sept.majorproject.majorproject.web;

import com.rmit.sept.majorproject.majorproject.model.User;
import com.rmit.sept.majorproject.majorproject.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/user")
public class userController {

    @Autowired
    private UserService userService;

    @PostMapping("")
    public ResponseEntity<?> createNewUser(@Valid @RequestBody User user, BindingResult result){
        //        if (result.hasErrors()) {
//            Map<String, String> errorMap = new HashMap<>();
//            for (FieldError error : result.getFieldErrors()) {
//                return new ResponseEntity<List<FieldError>>(result.getFieldErrors(), HttpStatus.BAD_REQUEST);
//            }
//        }
        if(result.hasErrors()){
            return new ResponseEntity<String>("Invalid User Object", HttpStatus.BAD_REQUEST);
        }
        User user1 = userService.saveOrUpdateUser(user);
        return new ResponseEntity<User>(user, HttpStatus.CREATED);
    }

    @GetMapping("/find")
    public ResponseEntity<?> findUser(@Valid @RequestBody String userName, BindingResult result){

        if(result.hasErrors()){
            return new ResponseEntity<String>("Invalid User Object", HttpStatus.BAD_REQUEST);
        }

        User user = userService.findUser(userName);

        if(user == null){
            return new ResponseEntity<String>("User not found", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<User>(user, HttpStatus.FOUND);
    }

    @GetMapping("/login")
    public ResponseEntity<?> verifyUser(@Valid @RequestBody String username, String password, BindingResult result){
        if(result.hasErrors()){
            return new ResponseEntity<String>("Invalid User Object", HttpStatus.BAD_REQUEST);
        }

        User user = userService.verifyUser(username, password);

        if(user == null){
            return new ResponseEntity<String>("User not found", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<User>(user, HttpStatus.ACCEPTED);

    }

}
