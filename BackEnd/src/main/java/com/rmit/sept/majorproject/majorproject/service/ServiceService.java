<<<<<<< HEAD
package com.rmit.sept.majorproject.majorproject.service;

import com.rmit.sept.majorproject.majorproject.Repositories.ServiceRepository;
import com.rmit.sept.majorproject.majorproject.model.Services;
import com.rmit.sept.majorproject.majorproject.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ServiceService {

    @Autowired
    private ServiceRepository serviceRepository;

    public Services saveOrUpdateServices(Services services){
        return serviceRepository.save(services);
    }

    public Iterable<Services> findEmployeeServices(String username){
        Iterable<Services> servicesIterable = serviceRepository.findAll();
        List<Services> returnServices = new ArrayList<>();

        for(Services service : servicesIterable){
            if(service.getAssigned_employee().getUsername().equals(username)){
                returnServices.add(service);
            }
        }

        return returnServices;
    }

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

    public Services findServiceFromWorker(String serviceName, String worker){
        Iterable<Services> servicesIterable = serviceRepository.findAll();
        for(Services services : servicesIterable){
            System.out.println(services.getService());
            if(services.getService().equals(serviceName)){
                if(services.getAssigned_employee().getUsername().equals(worker)){
                    return services;
                }
            }
        }

        return null;
    }

}
=======
package com.rmit.sept.majorproject.majorproject.service;

import com.rmit.sept.majorproject.majorproject.Repositories.ServiceRepository;
import com.rmit.sept.majorproject.majorproject.model.Services;
import com.rmit.sept.majorproject.majorproject.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ServiceService {

    @Autowired
    private ServiceRepository serviceRepository;

    public Services saveOrUpdateServices(Services services){
        return serviceRepository.save(services);
    }

    public Iterable<Services> findEmployeeServices(String username){
        Iterable<Services> servicesIterable = serviceRepository.findAll();
        List<Services> returnServices = new ArrayList<>();

        for(Services service : servicesIterable){
            if(service.getAssigned_employee() != null) {
                if (service.getAssigned_employee().getUsername().equals(username)) {
                    returnServices.add(service);
                }
            }
        }

        return returnServices;
    }

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

}
>>>>>>> development
