package com.rmit.sept.majorproject.majorproject.service;

import com.rmit.sept.majorproject.majorproject.Repositories.UserRepository;
import com.rmit.sept.majorproject.majorproject.exceptions.UserException;
import com.rmit.sept.majorproject.majorproject.model.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class UserServiceTests {

    private User user1 = new User();
    private User user2 = new User();
    private User user3 = new User();

    @Autowired
    private UserService mockUserService;

    @MockBean
    private UserRepository userRepository;

    @BeforeEach
    public void init(){
        user1.setUsername("user1");
        user1.setPassword("Test");
        user1.setName("Test");
        user1.setContact("Test");
        user2.setUsername("user2");
        user2.setPassword("Test");
        user2.setName("Test");
        user3.setUsername("user3");
        user3.setPassword("Test");
        user3.setName("Test");
        Mockito.when(userRepository.save(user1)).thenReturn(user1);
        Mockito.when(userRepository.save(user2)).thenReturn(user2);
        Mockito.when(userRepository.save(user3)).thenReturn(user3);
    }

    @Test
    public void testAddUser_ValidUser_User(){
        assertEquals(user1, mockUserService.saveOrUpdateUser(user1));
        assertEquals(user2, mockUserService.saveOrUpdateUser(user2));
        assertEquals(user3, mockUserService.saveOrUpdateUser(user3));
    }

    @Test
    public void testAddUser_InvalidUsername_Null(){
        user1.setName("a");
        user2.setName("b");
        user3.setName("c");
        assertNull(mockUserService.saveOrUpdateUser(user1));
        assertNull(mockUserService.saveOrUpdateUser(user2));
        assertNull(mockUserService.saveOrUpdateUser(user3));
    }

    @Test
    public void testAddUser_EmptyPassword_Null(){
        user1.setPassword("");
        user2.setPassword("");
        user3.setPassword("");
        assertNull(mockUserService.saveOrUpdateUser(user1));
        assertNull(mockUserService.saveOrUpdateUser(user2));
        assertNull(mockUserService.saveOrUpdateUser(user3));
    }

    @Test
    public void testAddUser_EmptyName_Null(){
        user1.setName("");
        user2.setName("");
        user3.setName("");
        assertNull(mockUserService.saveOrUpdateUser(user1));
        assertNull(mockUserService.saveOrUpdateUser(user2));
        assertNull(mockUserService.saveOrUpdateUser(user3));
    }

    @Test
    public void testAddUser_TooShortName_Null(){
        user1.setName("a");
        user2.setName("b");
        user3.setName("c");
        assertNull(mockUserService.saveOrUpdateUser(user1));
        assertNull(mockUserService.saveOrUpdateUser(user2));
        assertNull(mockUserService.saveOrUpdateUser(user3));
    }

    @Test
    public void testSearchUser_NoUsers_Null(){
        assertNull(mockUserService.findUser(user1.getUsername()));
        assertNull(mockUserService.findUser(user2.getUsername()));
        assertNull(mockUserService.findUser(user3.getUsername()));
    }

    @Test
    public void testSearchUser_FoundUser_User(){
        List<User> userList = new ArrayList<>();
        userList.add(user1);
        userList.add(user2);
        userList.add(user3);
        Mockito.when(userRepository.findAll()).thenReturn(userList);
        assertEquals(user1, mockUserService.findUser(user1.getUsername()));
        assertEquals(user2, mockUserService.findUser(user2.getUsername()));
        assertEquals(user3, mockUserService.findUser(user3.getUsername()));
    }

    @Test
    public void testDeleteUser_NoUsers_Exception(){
        Mockito.when(userRepository.findByUsername(user1.getUsername())).thenReturn(null);
        Mockito.when(userRepository.findByUsername(user2.getUsername())).thenReturn(null);
        Mockito.when(userRepository.findByUsername(user3.getUsername())).thenReturn(null);

        assertThrows(UserException.class, () -> {
           mockUserService.deleteUserByUsername(user1.getUsername());
        });
        assertThrows(UserException.class, () -> {
            mockUserService.deleteUserByUsername(user2.getUsername());
        });
        assertThrows(UserException.class, () -> {
            mockUserService.deleteUserByUsername(user3.getUsername());
        });
    }

    @Test
    public void testDeleteUser_UsersExists_Void(){
        Mockito.when(userRepository.findByUsername(user1.getUsername())).thenReturn(user1);
        Mockito.when(userRepository.findByUsername(user2.getUsername())).thenReturn(user2);
        Mockito.when(userRepository.findByUsername(user3.getUsername())).thenReturn(user3);

        assertDoesNotThrow(() -> {
            mockUserService.deleteUserByUsername(user1.getUsername());
        });
        assertDoesNotThrow(() -> {
            mockUserService.deleteUserByUsername(user2.getUsername());
        });
        assertDoesNotThrow(() -> {
            mockUserService.deleteUserByUsername(user3.getUsername());
        });
    }

    @Test
    public void testVerifyRole_InvalidRole_False(){
        String invalidRole1 = "FakeRole";
        String invalidRole2 = "Cust";
        String invalidRole3 = "Administrator";
        String invalidRole4 = "Employee";

        assertFalse(mockUserService.verifyRole(invalidRole1));
        assertFalse(mockUserService.verifyRole(invalidRole2));
        assertFalse(mockUserService.verifyRole(invalidRole3));
        assertFalse(mockUserService.verifyRole(invalidRole4));
    }

    @Test
    public void testVerifyRole_ValidRole_True(){
        String validRole1 = "CUSTOMER";
        String validRole2 = "WORKER";
        String validRole3 = "ADMIN";

        assertTrue(mockUserService.verifyRole(validRole1));
        assertTrue(mockUserService.verifyRole(validRole2));
        assertTrue(mockUserService.verifyRole(validRole3));
    }
}
