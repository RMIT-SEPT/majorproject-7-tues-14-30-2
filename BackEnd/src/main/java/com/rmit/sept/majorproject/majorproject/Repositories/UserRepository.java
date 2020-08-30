package com.rmit.sept.majorproject.majorproject.Repositories;

import com.rmit.sept.majorproject.majorproject.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {

    @Override
    Iterable<User> findAllById(Iterable<Long> iterable);

}
