package com.rmit.sept.majorproject.majorproject.service;

import com.rmit.sept.majorproject.majorproject.Repositories.BookingRepository;
import com.rmit.sept.majorproject.majorproject.model.Booking;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class BookingServiceTests {

    private Booking booking1 = new Booking();
    private Booking booking2 = new Booking();
    private Booking booking3 = new Booking();

    @Autowired
    private BookingService bookingService;

    @MockBean
    private BookingRepository bookingRepository;

    @BeforeEach
    public void init(){
        Mockito.when(bookingRepository.save(booking1)).thenReturn(booking1);
        Mockito.when(bookingRepository.save(booking2)).thenReturn(booking2);
        Mockito.when(bookingRepository.save(booking3)).thenReturn(booking3);
    }

    @Test
    public void testCheckDate_PastDate_Minus1(){
        /* Reason for subtracting 1900 from the year, is due to the formatting of the year when using
         * the Date class.
         */
        SimpleDateFormat stformat = new SimpleDateFormat("HH:mm:ss");
        Date date1 = new Date();
        date1.setYear(2000 - 1900);
        Date date2 = new Date();
        date2.setYear(2020 - 1900);
        date2.setMonth(1);
        Date date3 = new Date();
        date3.setYear(2020 - 1900);
        date3.setMonth(9 - 1);
        date3.setDate(1);
        assertEquals(-1, bookingService.checkDate(date1));
        assertEquals(-1, bookingService.checkDate(date2));
        assertEquals(-1, bookingService.checkDate(date3));
    }

    @Test
    public void testAddBooking_InvalidDate_Null(){
        SimpleDateFormat sdformat = new SimpleDateFormat("yyyy-MM-dd");
        SimpleDateFormat stformat = new SimpleDateFormat("HH:mm:ss");
        try {
            Date d1 = sdformat.parse("2019-04-15");
            Date d2 = sdformat.parse("2020-01-15");
            Date d3 = stformat.parse("8:30:00");
            booking1.setBooking_date(d1);
            booking1.setBooking_time(d3);
            booking2.setBooking_date(d2);
            booking2.setBooking_time(d3);
            booking3.setBooking_date(new Date());
            booking3.setBooking_time(d3);
            assertNull(bookingService.saveOrUpdateBooking(booking1));
            assertNull(bookingService.saveOrUpdateBooking(booking2));
            assertNull(bookingService.saveOrUpdateBooking(booking3));
        } catch (ParseException e) {
            e.printStackTrace();
        }
    }
}