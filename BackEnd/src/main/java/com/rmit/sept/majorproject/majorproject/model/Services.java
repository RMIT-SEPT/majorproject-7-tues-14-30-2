package com.rmit.sept.majorproject.majorproject.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Date;

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

    @JsonFormat(pattern ="yyyy-mm-dd")
    private Date created_At;

    @JsonFormat(pattern ="yyyy-mm-dd")
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

    @PrePersist
    protected void onCreate() {
        this.created_At = new Date();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updated_At = new Date();
    }
}
