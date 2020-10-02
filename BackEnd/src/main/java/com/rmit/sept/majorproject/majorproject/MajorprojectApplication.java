package com.rmit.sept.majorproject.majorproject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MajorprojectApplication {

    //Go to "localhost:8080/h2-console" to access the database
    public static void main(String[] args) {
        SpringApplication.run(MajorprojectApplication.class, args);
    }

}
