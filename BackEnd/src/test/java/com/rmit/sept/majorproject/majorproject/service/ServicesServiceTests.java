package com.rmit.sept.majorproject.majorproject.service;

import com.rmit.sept.majorproject.majorproject.Repositories.BookingRepository;
import com.rmit.sept.majorproject.majorproject.Repositories.ServiceRepository;
import com.rmit.sept.majorproject.majorproject.model.Booking;
import com.rmit.sept.majorproject.majorproject.model.Services;
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
public class ServicesServiceTests {

    private Services services1;
    private Services services2;
    private Services services3;

    @Autowired
    private ServiceService serviceService;

    @MockBean
    private ServiceRepository serviceRepository;

    @BeforeEach
    public void init(){
        services1 = new Services();
        services2 = new Services();
        services3 = new Services();
    }

    @Test
    public void testValidateAvailableTimes_ValidTimes_True(){
        SimpleDateFormat stformat = new SimpleDateFormat("HH:mm:ss");
        try{
            Date d1 = stformat.parse("8:30:00");
            Date d2 = stformat.parse("20:00:00");
            services1.setStart_time(d1);
            services1.setEnd_time(d2);
            d1 = stformat.parse("5:30:00");
            d2 = stformat.parse("9:00:00");
            services2.setStart_time(d1);
            services2.setEnd_time(d2);
            d1 = stformat.parse("20:30:00");
            d2 = stformat.parse("23:00:00");
            services3.setStart_time(d1);
            services3.setEnd_time(d2);
            assertTrue(serviceService.validateAvailableTimes(services1));
            assertTrue(serviceService.validateAvailableTimes(services2));
            assertTrue(serviceService.validateAvailableTimes(services3));

        } catch (ParseException e) {
            e.printStackTrace();
        }
    }

    @Test
    public void testValidateAvailableTimes_InvalidTimes_False(){
        SimpleDateFormat stformat = new SimpleDateFormat("HH:mm:ss");
        try{
            Date d1 = stformat.parse("20:30:00");
            Date d2 = stformat.parse("9:00:00");
            services1.setStart_time(d1);
            services1.setEnd_time(d2);
            d1 = stformat.parse("5:30:00");
            d2 = stformat.parse("4:00:00");
            services2.setStart_time(d1);
            services2.setEnd_time(d2);
            d1 = stformat.parse("20:30:00");
            d2 = stformat.parse("19:00:00");
            services3.setStart_time(d1);
            services3.setEnd_time(d2);
            assertFalse(serviceService.validateAvailableTimes(services1));
            assertFalse(serviceService.validateAvailableTimes(services2));
            assertFalse(serviceService.validateAvailableTimes(services3));

        } catch (ParseException e) {
            e.printStackTrace();
        }
    }

    @Test
    public void testValidateDays_ValidDays_True(){
        String days1 = "1,2,3";
        String days2 = "2,3";
        String days3 = "4,5,6,7";
        services1.setAvailable_days(days1);
        services2.setAvailable_days(days2);
        services3.setAvailable_days(days3);

        assertTrue(serviceService.validateDays(services1));
        assertTrue(serviceService.validateDays(services2));
        assertTrue(serviceService.validateDays(services3));
    }

    @Test
    public void testValidateDays_InvalidDays_False(){
        String days1 = "10";
        String days2 = "11,8,9";
        String days3 = "-1";
        services1.setAvailable_days(days1);
        services2.setAvailable_days(days2);
        services3.setAvailable_days(days3);

        assertFalse(serviceService.validateDays(services1));
        assertFalse(serviceService.validateDays(services2));
        assertFalse(serviceService.validateDays(services3));
    }


}
