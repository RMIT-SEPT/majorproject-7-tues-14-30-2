package com.rmit.sept.majorproject.majorproject.service;

import com.rmit.sept.majorproject.majorproject.model.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class UserServiceTests {

    private User user1 = new User();
    private User user2 = new User();
    private User user3 = new User();

    @BeforeEach
    public void init(){
        user1.setUsername("user1");
        user1.setPassword("Test");
        user1.setName("Test");
        user2.setUsername("user2");
        user2.setPassword("Test");
        user2.setName("Test");
        user3.setUsername("user3");
        user3.setPassword("Test");
        user3.setName("Test");
    }

    @Autowired
    private UserService userService;

    @Test
    public void testAddUser_EmptyUsername_Null(){
        user1.setUsername("");
        user2.setUsername("");
        user3.setUsername("");
        assertNull(userService.saveOrUpdateUser(user1));
        assertNull(userService.saveOrUpdateUser(user2));
        assertNull(userService.saveOrUpdateUser(user3));
    }

    @Test
    public void testAddUser_EmptyPassword_Null(){
        user1.setPassword("");
        user2.setPassword("");
        user3.setPassword("");
        assertNull(userService.saveOrUpdateUser(user1));
        assertNull(userService.saveOrUpdateUser(user2));
        assertNull(userService.saveOrUpdateUser(user3));
    }

    @Test
    public void testAddUser_EmptyName_Null(){
        user1.setName("");
        user2.setName("");
        user3.setName("");
        assertNull(userService.saveOrUpdateUser(user1));
        assertNull(userService.saveOrUpdateUser(user2));
        assertNull(userService.saveOrUpdateUser(user3));
    }

    @Test
    public void testAddUser_TooShortName_Null(){
        user1.setName("a");
        user2.setName("b");
        user3.setName("c");
        assertNull(userService.saveOrUpdateUser(user1));
        assertNull(userService.saveOrUpdateUser(user2));
        assertNull(userService.saveOrUpdateUser(user3));
    }

    @Test
    public void testSearchUser_NoUsers_Null(){
        assertNull(userService.findUser(user1.getUsername()));
        assertNull(userService.findUser(user2.getUsername()));
        assertNull(userService.findUser(user3.getUsername()));
    }
}
