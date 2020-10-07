package com.rmit.sept.majorproject.majorproject.web;

import com.rmit.sept.majorproject.majorproject.model.Services;
import com.rmit.sept.majorproject.majorproject.model.User;
import com.rmit.sept.majorproject.majorproject.service.ServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/services")
@CrossOrigin(origins="http://localhost:3000")
public class ServicesController {

    @Autowired
    private ServiceService serviceService;

    @PostMapping("")
    public ResponseEntity<?> createNewService(@Valid @RequestBody Services service, BindingResult result){
        if (result.hasErrors()) {
            Map<String, String> errorMap = new HashMap<>();
            for (FieldError error : result.getFieldErrors()) {
                return new ResponseEntity<List<FieldError>>(result.getFieldErrors(), HttpStatus.BAD_REQUEST);
            }
        }
        Services services = serviceService.saveOrUpdateServices(service);

        if(services == null){
            return new ResponseEntity<String>("Invalid service", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<Services>(services, HttpStatus.CREATED);
    }

    @GetMapping("/findService/{employeeUsername}")
    public ResponseEntity<?> getServiceEmployees(@PathVariable String employeeUsername){
        Iterable<Services> services = serviceService.findEmployeeServices(employeeUsername);

        return new ResponseEntity<Iterable<Services>>(services, HttpStatus.OK);
    }

    @GetMapping("/findEmployees/{service}")
    public ResponseEntity<?> getEmployeeServices(@PathVariable String service){
        Iterable<User> employees = serviceService.findServicesEmployee(service);

        return new ResponseEntity<Iterable<User>>(employees, HttpStatus.OK);
    }

}
