package com.rmit.sept.majorproject.majorproject.web;

import com.rmit.sept.majorproject.majorproject.model.Booking;
import com.rmit.sept.majorproject.majorproject.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/booking")
@CrossOrigin
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping("")
    public ResponseEntity<?> createNewBooking(@Valid @RequestBody Booking booking, BindingResult result){
        if(result.hasErrors()){
            return new ResponseEntity<String>("Invalid User Object", HttpStatus.BAD_REQUEST);
        }
        Booking booking1 = bookingService.saveOrUpdateBooking(booking);
        return new ResponseEntity<Booking>(booking, HttpStatus.CREATED);
    }

}
