package com.rmit.sept.majorproject.majorproject.service;

import com.rmit.sept.majorproject.majorproject.Repositories.BookingRepository;
import com.rmit.sept.majorproject.majorproject.model.Booking;
import com.rmit.sept.majorproject.majorproject.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    public Booking saveOrUpdateBooking(Booking booking){

        if (checkDate(booking.getBooking_date()) < 0){
            return null;
        } else if (checkDate(booking.getBooking_date()) == 0 && !checkTime(booking.getBooking_time())){
            return null;
        }

        return bookingRepository.save(booking);
    }

    public int checkDate(Date date){
        Calendar currentDate = Calendar.getInstance();

        if (currentDate.get(Calendar.YEAR) > date.getYear() + 1900) {
            return -1;
        } else if (currentDate.get(Calendar.YEAR) < date.getYear() + 1900){
            return 1;
        } else if (currentDate.get(Calendar.MONTH) + 1 > date.getMonth() + 1) {
            return -1;
        } else if (currentDate.get(Calendar.MONTH) + 1 < date.getMonth() + 1){
            return 1;
        } else if (currentDate.get(Calendar.DAY_OF_MONTH) > date.getDate()){
            return -1;
        } else if (currentDate.get(Calendar.DAY_OF_MONTH) < date.getDate()){
            return 1;
        }
        return 0;
    }

    public boolean checkTime(Date date){
        Date currentDate = new Date();

        if (date.getHours() < currentDate.getHours()){
            return false;
        } else if (date.getHours() >= date.getHours() &&
                    date.getMinutes() < currentDate.getMinutes()){
            return false;
        } else if (date.getHours() >= currentDate.getHours() &&
                date.getMinutes() >= currentDate.getMinutes() &&
                date.getSeconds() < currentDate.getSeconds()){
            return false;
        }

        return true;
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
