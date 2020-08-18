package com.rmit.sept.majorproject.majorproject.service;

import com.rmit.sept.majorproject.majorproject.Repositories.UserRepository;
import com.rmit.sept.majorproject.majorproject.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User saveOrUpdateUser(User user){
        //Business logic
        return userRepository.save(user);
    }
}
