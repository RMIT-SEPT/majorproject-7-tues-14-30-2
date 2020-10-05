package com.rmit.sept.majorproject.majorproject.Repositories;

import com.rmit.sept.majorproject.majorproject.model.Services;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceRepository extends CrudRepository<Services, Long> {
    @Override
    Iterable<Services> findAll();
}
