package com.rmit.sept.majorproject.majorproject.service;

import com.rmit.sept.majorproject.majorproject.Repositories.BookingRepository;
import com.rmit.sept.majorproject.majorproject.model.Booking;
import com.rmit.sept.majorproject.majorproject.model.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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

    @Test
    public void testFindCustomerBooking_NoneFound_EmptyList(){
        Booking booking1 = new Booking();
        User user1 = new User();
        user1.setUsername("Wrong");
        booking1.setCustomer(user1);
        Booking booking2 = new Booking();
        User user2 = new User();
        user2.setUsername("Incorrect");
        booking2.setCustomer(user2);
        Booking booking3 = new Booking();
        User user3 = new User();
        user3.setUsername("StillWrong");
        booking3.setCustomer(user3);
        List<Booking> bookings = new ArrayList<>();
        bookings.add(booking1);
        bookings.add(booking2);
        bookings.add(booking3);
        Mockito.when(bookingRepository.findAll()).thenReturn(bookings);

        List<Booking> results = new ArrayList<>();
        bookingService.findCustBooking("Correct").iterator().forEachRemaining(results::add);

        assertTrue(results.isEmpty());
    }

    @Test
    public void testFindCustomerBooking_Found_NotEmptyList(){
        Booking booking1 = new Booking();
        User user1 = new User();
        user1.setUsername("Correct");
        booking1.setCustomer(user1);
        Booking booking2 = new Booking();
        User user2 = new User();
        user2.setUsername("Incorrect");
        booking2.setCustomer(user2);
        Booking booking3 = new Booking();
        booking3.setCustomer(user1);
        List<Booking> bookings = new ArrayList<>();
        bookings.add(booking1);
        bookings.add(booking2);
        bookings.add(booking3);
        Mockito.when(bookingRepository.findAll()).thenReturn(bookings);

        List<Booking> results = new ArrayList<>();
        bookingService.findCustBooking("Correct").iterator().forEachRemaining(results::add);

        assertFalse(results.isEmpty());
        assertEquals(2, results.size());
    }

    @Test
    public void testFindWorkerBooking_NoneFound_EmptyList(){
        Booking booking1 = new Booking();
        User user1 = new User();
        user1.setUsername("Wrong");
        user1.setRole("WORKER");
        booking1.setAssigned_employee(user1);
        Booking booking2 = new Booking();
        User user2 = new User();
        user2.setUsername("Incorrect");
        booking2.setAssigned_employee(user2);
        user2.setRole("WORKER");
        Booking booking3 = new Booking();
        User user3 = new User();
        user3.setUsername("StillWrong");
        user3.setRole("WORKER");
        booking3.setAssigned_employee(user3);
        List<Booking> bookings = new ArrayList<>();
        bookings.add(booking1);
        bookings.add(booking2);
        bookings.add(booking3);
        Mockito.when(bookingRepository.findAll()).thenReturn(bookings);

        List<Booking> results = new ArrayList<>();
        bookingService.findWorkerBooking("Correct").iterator().forEachRemaining(results::add);

        assertTrue(results.isEmpty());
    }

    @Test
    public void testFindWorkerBooking_BookingsFound_FilledList(){
        Booking booking1 = new Booking();
        User user1 = new User();
        user1.setUsername("Correct");
        user1.setRole("WORKER");
        booking1.setAssigned_employee(user1);
        Booking booking2 = new Booking();
        User user2 = new User();
        user2.setUsername("Incorrect");
        booking2.setAssigned_employee(user2);
        user2.setRole("WORKER");
        Booking booking3 = new Booking();
        booking3.setAssigned_employee(user1);
        List<Booking> bookings = new ArrayList<>();
        bookings.add(booking1);
        bookings.add(booking2);
        bookings.add(booking3);
        Mockito.when(bookingRepository.findAll()).thenReturn(bookings);

        List<Booking> results = new ArrayList<>();
        bookingService.findWorkerBooking("Correct").iterator().forEachRemaining(results::add);

        assertFalse(results.isEmpty());
        assertEquals(2, results.size());
    }
}
