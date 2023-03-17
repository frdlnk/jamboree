package com.jamboree.events.services;

import com.jamboree.events.models.EventModel;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EventsManipulator {
    public List<EventModel> paginateEvents(List<EventModel> eventsArray, int page, int limit) {
        int startIndex = page -1;
        startIndex *= limit;
        int endIndex = page * limit;
        return eventsArray.stream().skip(startIndex).limit(endIndex).collect(Collectors.toList());
    }
}
