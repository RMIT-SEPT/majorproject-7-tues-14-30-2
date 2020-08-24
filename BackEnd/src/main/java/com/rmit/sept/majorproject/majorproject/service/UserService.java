package com.rmit.sept.majorproject.majorproject.service;

import com.rmit.sept.majorproject.majorproject.Repositories.UserRepository;
import com.rmit.sept.majorproject.majorproject.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User saveOrUpdateUser(User user){
        //Business logic
        if (user.getUsername().length() <= 0 || user.getPassword().length() <= 0){
            return null;
        } else if (user.getName().length() < 2){
            return null;
        }
        return userRepository.save(user);
    }

    public User findUser(String userName){
        Iterable<User> users = userRepository.findAll();
        User foundUser = null;

        for(User user: users){
            if(user.getUsername() == userName){
                foundUser = user;
            }
        }

        return foundUser;
    }
}
