package com.rmit.sept.majorproject.majorproject.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Date;

@Entity
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @JsonFormat(pattern ="yyyy-MM-dd")
    private Date booking_date;

    @JsonFormat(pattern = "HH:mm:ss")
    private Date booking_time;

    private int duration;

    @ManyToOne(fetch=FetchType.EAGER)
    @JoinColumn(name = "ASSIGNED_WORKER")
    private User assigned_employee;

    @NotBlank
    private String notes;

    @ManyToOne(fetch=FetchType.EAGER)
    @JoinColumn(name = "CUSTOMER_USERNAME")
    private User customer;

    @ManyToOne(fetch=FetchType.EAGER)
    @JoinColumn(name = "SERVICE")
    private Services bookedService;
    
    @JsonFormat(pattern ="yyyy-MM-dd")
    private Date created_At;
    @JsonFormat(pattern ="yyyy-MM-dd")
    private Date updated_At;

    public Booking(){
    }

    public Booking(Date booking_date, Date booking_time, int duration, User assigned_employee, @NotBlank String notes, User customer, Services bookedService) {
        this.booking_date = booking_date;
        this.booking_time = booking_time;
        this.duration = duration;
        this.assigned_employee = assigned_employee;
        this.notes = notes;
        this.customer = customer;
        this.bookedService = bookedService;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Date getBooking_date() {
        return booking_date;
    }

    public void setBooking_date(Date booking_date) {
        this.booking_date = booking_date;
    }

    public User getAssigned_employee() {
        return assigned_employee;
    }

    public void setAssigned_employee(User assigned_employee) {
        this.assigned_employee = assigned_employee;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public User getCustomer() {
        return customer;
    }

    public void setCustomer(User customer) {
        this.customer = customer;
    }

    public Date getBooking_time() {
        return booking_time;
    }

    public void setBooking_time(Date booking_time) {
        this.booking_time = booking_time;
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

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public Services getBookedService() {
        return bookedService;
    }

    public void setBookedService(Services bookedService) {
        this.bookedService = bookedService;
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
