package com.rmit.sept.majorproject.majorproject.service;

import com.rmit.sept.majorproject.majorproject.Repositories.ServiceRepository;
import com.rmit.sept.majorproject.majorproject.model.Services;
import com.rmit.sept.majorproject.majorproject.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
public class ServiceService {

    @Autowired
    private ServiceRepository serviceRepository;

    // Saves or Updates a service
    public Services saveOrUpdateServices(Services services){

        Services fixedService = fixTimes(services);

        if(!validateAvailableTimes(fixedService) || !validateDays(services)){
            return null;
        }

        return serviceRepository.save(services);
    }

    /*
     * Returns a list of Services belonging to a worker with the specified
     * username
     */
    public Iterable<Services> findEmployeeServices(String username){
        Iterable<Services> servicesIterable = serviceRepository.findAll();
        List<Services> returnServices = new ArrayList<>();

        for(Services service : servicesIterable){
            if(service.getAssigned_employee() != null) {
                if (service.getAssigned_employee().getUsername().equals(username)) {
                    Services editedService = service;
                    Date editedStart = editedService.getStart_time();
                    editedStart.setHours(editedService.getStart_time().getHours() - 14);
                    editedService.setStart_time(editedStart);
                    Date editedEnd = editedService.getEnd_time();
                    editedEnd.setHours(editedService.getEnd_time().getHours() - 14);
                    editedService.setEnd_time(editedEnd);
                    returnServices.add(editedService);
                }
            }
        }

        return returnServices;
    }

    /*
     * Returns a list of employees that service a service
     * with the name corresponding to the argument parsed.
     */
    public Iterable<User> findServicesEmployee(String service){
        Iterable<Services> servicesIterable = serviceRepository.findAll();
        List<User> returnUser = new ArrayList<>();
        for(Services services : servicesIterable){
            if(services.getService().toUpperCase().equals(service.toUpperCase())){
                returnUser.add(services.getAssigned_employee());
            }
        }

        return returnUser;
    }

    /*
     * Returns a service that corresponds to the parsed service name,
     * and has an assigned worker with the corresponding username
     */
    public Services findServiceFromWorker(String serviceName, String worker){
        Iterable<Services> servicesIterable = serviceRepository.findAll();
        for(Services services : servicesIterable){
            if(services.getService().equals(serviceName)){
                if(services.getAssigned_employee().getUsername().equals(worker)){
                    return services;
                }
            }
        }

        return null;
    }

    // Validates the available days of a service, returning false if the day is invalid
    public boolean validateDays(Services service){
        List<Integer> days = service.getAvailable_Days_AsList();

        for(int val: days){
            if(val <= 0 || val > 7){
                return false;
            }
        }

        return true;
    }

    // Validates that the start time is before the end time for a service
    public boolean validateAvailableTimes(Services service){

        if(service.getStart_time().compareTo(service.getEnd_time()) >= 0){
           return false;
        }

        return true;
    }

    // Corrects the starting and ending time, as there is an issue where the times are incorrect
    public Services fixTimes(Services service){

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(service.getStart_time());
        calendar.add(Calendar.HOUR, -10);
        service.setStart_time(calendar.getTime());
        calendar.setTime(service.getEnd_time());
        calendar.add(Calendar.HOUR, -10);
        service.setEnd_time(calendar.getTime());

        return service;
    }

}
