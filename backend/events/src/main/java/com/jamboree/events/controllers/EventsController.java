package com.jamboree.events.controllers;

import com.jamboree.events.models.EventModel;
import com.jamboree.events.models.UserModel;
import com.jamboree.events.repos.EventsRepository;
import com.jamboree.events.repos.UserRepository;
import com.jamboree.events.services.EventsManipulator;
import com.jamboree.events.services.TokenChecker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/events")
public class EventsController {
    @Autowired
    private EventsRepository eRepo;

    @Autowired
    private UserRepository uRepo;

    @Autowired
    private EventsManipulator eManipulator;
    @Autowired
    private TokenChecker tC;

    @GetMapping("/health")
    public ResponseEntity<String> sendStatus() {
        return ResponseEntity.status(HttpStatus.OK).body("Events service operational");
    }

    @GetMapping
    public ResponseEntity getEvents(@RequestParam int page, int limit, @RequestHeader("tokenid") String tokenid) {
        String message = tC.check(tokenid);
        if (!message.isEmpty()) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(message);
        List<EventModel> globalEvents = eRepo.findAll();
        List<EventModel> paginatedEvents = eManipulator.paginateEvents(globalEvents, page, limit);
        return ResponseEntity.status(HttpStatus.OK).body(paginatedEvents);
    }

    @GetMapping("/event")
    public ResponseEntity getEventById(@RequestParam String id, @RequestHeader("tokenid") String tokenid) {
        String message = tC.check(tokenid);
        if(!message.isEmpty()) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(message);
        Optional<EventModel> event = eRepo.findById(id);
        return ResponseEntity.status(HttpStatus.OK).body(event.get());
    }

    @GetMapping("/search")
    public ResponseEntity search(@RequestParam String title, int page, int limit, @RequestHeader("tokenid") String tokenid) {
        String message = tC.check(tokenid);
        if(!message.isEmpty()) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(message);
        List<EventModel> searchedEvents = eRepo.search(title);
        List<EventModel> paginatedSearched = eManipulator.paginateEvents(searchedEvents, page, limit);
        return ResponseEntity.status(HttpStatus.OK).body(paginatedSearched);
    }

    @PostMapping("/new")
    public ResponseEntity<String> createNewEvent(@RequestBody EventModel event, @RequestHeader("tokenid") String tokenid){
        String message = tC.check(tokenid);
        EventModel existEvent = eRepo.findByTitle(event.getTitle());
        if(!message.isEmpty()) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(message);
        if(existEvent != null) return ResponseEntity.status(HttpStatus.CONFLICT).body("This event already exist, pick another name");
        Optional<UserModel> user = uRepo.findById(tokenid);
        event.setJoined(new ArrayList<>());
        event.setCreatedAt(new Date().getTime());
        event.setCreatedBy(user.get());
        eRepo.save(event);
        return ResponseEntity.status(HttpStatus.CREATED).body("Event created");
    }

    @PutMapping("/edit")
    public ResponseEntity<String> updateEvent(@RequestHeader("tokenid") String tokenid, @RequestBody EventModel event) {
        String message = tC.check(tokenid);
        if(!message.isEmpty()) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(message);
        eRepo.save(event);
        return ResponseEntity.status(HttpStatus.CREATED).body("Event updated");
    }
}
