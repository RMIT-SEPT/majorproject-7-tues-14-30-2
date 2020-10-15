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

    /*
     * Saves or Updates a Booking. Validates the booking beforehand,
     * and will return null if the booking is invalid.
     */
    public Booking saveOrUpdateBooking(Booking booking){

        if (checkDate(booking.getBooking_date()) < 0){
            System.out.println(1);
            return null;
        } else if (checkDate(booking.getBooking_date()) == 0 && !checkTime(booking.getBooking_time())) {
            System.out.println(2);
            return null;
        //}
//        } else if(!verifyBookingTime(booking)){
//            System.out.println(3);
//            return null;
        } else if (booking.getBookedService() == null || booking.getAssigned_employee() == null){
            return null;
        }

        return bookingRepository.save(booking);
    }

    // Verifies that the date provided is not in the past
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

    // Checks that the time provided is not in the past
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

    /*
     * Returns a list of bookings belonging to the customer
     * with the username that matches the username provided
     */
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

    /*
     * Returns a list of bookings with the worker with the corresponding
     * username as the argument.
     */
    public Iterable<Booking> findWorkerBooking(String username){
        Iterable<Booking> bookings = bookingRepository.findAll();
        List<Booking> returnBookings = new ArrayList<>();

        for(Booking booking: bookings){
            if(booking.getAssigned_employee() != null) {
                if(booking.getAssigned_employee().getUsername().equals(username)){
                    returnBookings.add(booking);
                }
            }
        }

        return returnBookings;
    }

    /*
     * Verifies that the booking time is within the bounds of
     * assigned working times of the service
     */
    public boolean verifyBookingTime(Booking booking) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(booking.getBooking_date());

        if(booking.getAssigned_employee() == null || booking.getBookedService() == null){
            return false;
        }

        List<Integer> days = booking.getBookedService().getAvailable_Days_AsList();
        boolean found = false;
        for(int i : days){
            if(i == cal.get(Calendar.DAY_OF_WEEK)){
                found = true;
                break;
            }
        }

        if(!found){
            return false;
        }

        Date bookingTime = booking.getBooking_time();
        bookingTime.setHours(bookingTime.getHours() - 10);
        //System.out.println(bookingTime);
        bookingTime.setYear(2020);
        bookingTime.setMonth(1);
        bookingTime.setDate(1);
        Date serviceStart = booking.getBookedService().getStart_time();
        serviceStart.setYear(2020);
        serviceStart.setMonth(1);
        serviceStart.setDate(1);
        Date serviceEnd = booking.getBookedService().getEnd_time();
        serviceEnd.setYear(2020);
        serviceEnd.setMonth(1);
        serviceEnd.setDate(1);

        if(bookingTime.compareTo(serviceStart) < 0 ||
            bookingTime.compareTo(serviceEnd) > 0){
            return false;
        }

        return true;
    }
}
