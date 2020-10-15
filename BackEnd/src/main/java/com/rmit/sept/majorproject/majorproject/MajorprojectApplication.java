package com.rmit.sept.majorproject.majorproject;

import com.rmit.sept.majorproject.majorproject.model.User;
import com.rmit.sept.majorproject.majorproject.service.BookingService;
import com.rmit.sept.majorproject.majorproject.service.ServiceService;
import com.rmit.sept.majorproject.majorproject.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MajorprojectApplication {

    //Go to "localhost:8080/h2-console" to access the database
    public static void main(String[] args) {
        SpringApplication.run(MajorprojectApplication.class, args);
    }

}
