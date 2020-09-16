package com.rmit.sept.majorproject.majorproject.web;

import com.rmit.sept.majorproject.majorproject.model.Booking;
import com.rmit.sept.majorproject.majorproject.service.BookingService;
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
@RequestMapping("/api/booking")
@CrossOrigin
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping("")
    public ResponseEntity<?> createNewBooking(@Valid @RequestBody Booking booking, BindingResult result){
        if (result.hasErrors()) {
            Map<String, String> errorMap = new HashMap<>();
            for (FieldError error : result.getFieldErrors()) {
                return new ResponseEntity<List<FieldError>>(result.getFieldErrors(), HttpStatus.BAD_REQUEST);
            }
        }
        Booking booking1 = bookingService.saveOrUpdateBooking(booking);
        return new ResponseEntity<Booking>(booking, HttpStatus.CREATED);
    }

    @GetMapping("/findCustBooking/{username}")
    public ResponseEntity<?> getCustomerBookings(@PathVariable String username){
        return new ResponseEntity<Iterable<Booking>>(bookingService.findCustBooking(username), HttpStatus.OK);
    }

    @GetMapping("/findWorkerBooking/{username}")
    public ResponseEntity<?> getWorkerBookings(@PathVariable String username){
        return new ResponseEntity<Iterable<Booking>>(bookingService.findWorkerBooking(username), HttpStatus.OK);
    }

}
