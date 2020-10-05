package com.rmit.sept.majorproject.majorproject.service;

import com.rmit.sept.majorproject.majorproject.Repositories.UserRepository;
import com.rmit.sept.majorproject.majorproject.exceptions.UserException;
import com.rmit.sept.majorproject.majorproject.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
        } else if (findDuplicate(user.getUsername())){
            return null;
        } else if (!verifyRole(user)){
            return null;
        }
        return userRepository.save(user);
    }

    public void deleteUserByUsername(String username){
        User user = userRepository.findByUsername(username);
        if(user == null){
            throw new UserException("Cannot delete User with username: '" + username + "'. User does not exists");
        }

        userRepository.delete(user);
    }

    public boolean findDuplicate(String username){
        if(findUser(username) != null){
            return true;
        }

        return false;
    }

    public User findUser(String userName){
        Iterable<User> users = userRepository.findAll();
        User foundUser = null;

        for(User user: users){
            if(user.getUsername().equals(userName)){
                foundUser = user;
            }
        }

        return foundUser;
    }

    public User findWorkerFromName(String name){
        Iterable<User> users = userRepository.findAll();
        for(User user : users){
            if(user.getName().equals(name)){
                if(user.getRole().equals("WORKER")){
                    return user;
                }
            }
        }
        return null;
    }

    public Iterable<User> getUserType(String type){
        Iterable<User> users = userRepository.findAll();
        List<User> returnUsers = new ArrayList<>();

        for(User user: users){
            if(user.getRole().equals(type)){
                returnUsers.add(user);
            }
        }

        return returnUsers;
    }

    public boolean verifyRole(String role){
        if (role.toUpperCase().equals("CUSTOMER") ||
                role.toUpperCase().equals("ADMIN") ||
                role.toUpperCase().equals("WORKER")){
            return true;
        }

        return false;
    }

    public boolean verifyRole(User user){
        if (user.getRole().equals("CUSTOMER") ||
            user.getRole().equals("ADMIN") ||
            user.getRole().equals("WORKER")){
            return true;
        }
        return false;
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        //return findUser(s);
        return findUser(s);
    }
}
