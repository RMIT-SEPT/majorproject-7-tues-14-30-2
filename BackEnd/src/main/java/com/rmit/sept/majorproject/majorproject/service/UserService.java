package com.rmit.sept.majorproject.majorproject.service;

import com.rmit.sept.majorproject.majorproject.Repositories.UserRepository;
import com.rmit.sept.majorproject.majorproject.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    public User saveOrUpdateUser(User user){
        //Business logic
        if (user.getUsername().length() <= 0 || user.getPassword().length() <= 0 ||
                user.getName().length() < 2){
            return null;
        }
        return userRepository.save(user);
    }

    public User findUser(String userName){
        Iterable<User> users = userRepository.findAll();
        User foundUser = null;

        for(User user: users){
            //System.out.print(user.getUsername() + userName);
            if(user.getUsername().equals(userName)){
                foundUser = user;
            }
        }

        return foundUser;
    }

    public boolean findContact(String contact){
        Iterable<User> users = userRepository.findAll();
        for(User user : users){
            if(user.getContact().equals(contact)){
                return true;
            }
        }
        return false;
    }

    public User verifyUser(String username, String password){
        Iterable<User> users = userRepository.findAll();
        User foundUser = null;

        for(User user: users){
            if(user.getUsername().equals(username) && user.getPassword().equals(password)){
                foundUser = user;
            }
        }

        return foundUser;

    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        //return findUser(s);
        return findUser(s);
    }
}
