package com.jamboree.events.repos;

import com.jamboree.events.models.EventModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface EventsRepository extends MongoRepository<EventModel, String> {
    @Query("{'title': {$regex: ?0, $options: 'i' }}")
    List<EventModel> search(String title);

    EventModel findByTitle(String title);
}
