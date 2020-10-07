package com.rmit.sept.majorproject.majorproject.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
public class Services {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotBlank
    private String service;

    @ManyToOne(fetch=FetchType.EAGER)
    @JoinColumn(name = "ASSIGNED_WORKER")
    private User assigned_employee;

    @JsonFormat(pattern ="HH:mm")
    private Date start_time;

    @JsonFormat(pattern ="HH:mm")
    private Date end_time;

    private String available_days;

    @JsonFormat(pattern ="yyyy-MM-dd")
    private Date created_At;

    @JsonFormat(pattern ="yyyy-MM-dd")
    private Date updated_At;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getService() {
        return service;
    }

    public void setService(String service) {
        this.service = service;
    }

    public Date getCreated_At() {
        return created_At;
    }

    public void setCreated_At(Date created_At) {
        this.created_At = created_At;
    }

    public Date getUpdated_At() {
        return updated_At;
    }

    public void setUpdated_At(Date updated_At) {
        this.updated_At = updated_At;
    }

    public User getAssigned_employee() {
        return assigned_employee;
    }

    public void setAssigned_employee(User assigned_employee) {
        this.assigned_employee = assigned_employee;
    }

    public Date getStart_time() {
        return start_time;
    }

    public void setStart_time(Date start_time) {
        this.start_time = start_time;
    }

    public Date getEnd_time() {
        return end_time;
    }

    public void setEnd_time(Date end_time) {
        this.end_time = end_time;
    }

    public String getAvailable_days() {
        return available_days;
    }

    public void setAvailable_days(String available_days) {
        this.available_days = available_days;
    }

    public List<Integer> getAvailable_Days_AsList(){
        List<Integer> returnDays = new ArrayList<>();

        for(String number: this.available_days.split(",")){
            returnDays.add(Integer.parseInt(number));
        }

        return returnDays;
    }

    public void setAvailable_Days_FromList(List<Integer> days){
        String setDays = "";

        for(int val: days){
            setDays = setDays.concat(String.valueOf(val));
            setDays = setDays.concat(",");
        }

        setDays = setDays.substring(0,setDays.length()-1);
        this.available_days = setDays;

    }

    @PrePersist
    protected void onCreate() {
        this.created_At = new Date();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updated_At = new Date();
    }
}