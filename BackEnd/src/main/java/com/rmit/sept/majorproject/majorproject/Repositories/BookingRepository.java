package com.rmit.sept.majorproject.majorproject.Repositories;

import com.rmit.sept.majorproject.majorproject.model.Booking;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingRepository extends CrudRepository<Booking, Long> {

    @Override
    Iterable<Booking> findAllById(Iterable<Long> iterable);

}
