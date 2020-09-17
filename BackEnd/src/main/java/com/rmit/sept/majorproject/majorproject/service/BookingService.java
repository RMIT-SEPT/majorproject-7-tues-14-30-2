package com.rmit.sept.majorproject.majorproject.service;

import com.rmit.sept.majorproject.majorproject.Repositories.BookingRepository;
import com.rmit.sept.majorproject.majorproject.model.Booking;
import com.rmit.sept.majorproject.majorproject.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class BookingService {
    @Autowired
    private BookingRepository bookingRepository;

    public Booking saveOrUpdateBooking(Booking booking){
        Date currentDate = new Date();

        if (booking.getBooking_date().compareTo(currentDate) < 0 ||
            booking.getBooking_time().compareTo(currentDate) < 0){
            return null;
        }

        return bookingRepository.save(booking);
    }

    public Iterable<Booking> findCustBooking(String username){
        Iterable<Booking> bookings = bookingRepository.findAll();
        List<Booking> returnBookings = new ArrayList<>();

        for(Booking booking: bookings){
            if(booking.getCustomer().getUsername().equals(username)){
                returnBookings.add(booking);
            }
        }

        return returnBookings;
    }

    public Iterable<Booking> findWorkerBooking(String username){
        Iterable<Booking> bookings = bookingRepository.findAll();
        List<Booking> returnBookings = new ArrayList<>();

        for(Booking booking: bookings){
            if(booking.getAssigned_employee().getUsername().equals(username)){
                returnBookings.add(booking);
            }
        }

        return returnBookings;
    }
}
