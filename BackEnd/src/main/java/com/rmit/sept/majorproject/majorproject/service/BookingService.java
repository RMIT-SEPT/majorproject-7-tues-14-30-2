package com.rmit.sept.majorproject.majorproject.service;

import com.rmit.sept.majorproject.majorproject.Repositories.BookingRepository;
import com.rmit.sept.majorproject.majorproject.model.Booking;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

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
}
