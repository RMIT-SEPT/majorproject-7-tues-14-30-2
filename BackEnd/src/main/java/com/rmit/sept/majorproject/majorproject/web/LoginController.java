package com.rmit.sept.majorproject.majorproject.web;

import com.rmit.sept.majorproject.majorproject.model.AuthenticationRequest;
import com.rmit.sept.majorproject.majorproject.model.AuthenticationResponse;
import com.rmit.sept.majorproject.majorproject.model.User;
import com.rmit.sept.majorproject.majorproject.service.UserService;
import com.rmit.sept.majorproject.majorproject.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Controller
//@RequestMapping("/verify")
@CrossOrigin
public class LoginController {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserService userService;
    @Autowired
    private JwtUtil jwtTokenUtil;

    @GetMapping("/find/{userName}")
    public ResponseEntity<?> findUser(@Valid @PathVariable String userName){

        User user = userService.findUser(userName);

        if(user == null){
            return new ResponseEntity<String>("User not found", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<User>(user, HttpStatus.OK);
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception{
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(),
                            authenticationRequest.getPassword()));
        } catch (BadCredentialsException e){
            throw new Exception("Incorrect username or password", e);
        }
        final UserDetails user = userService.loadUserByUsername(authenticationRequest.getUsername());
        final String jwt = jwtTokenUtil.generateToken(user);
        return ResponseEntity.ok(new AuthenticationResponse((jwt)));
    }

}
