package com.jamboree.events.models;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Document(collection = "events")
public class EventModel {
    @Getter @Setter
    private String _id;

    @Getter @Setter
    private String title;

    @Getter @Setter
    private String description;

    @Getter @Setter
    private String backgroundURI;

    @Getter @Setter
    private String location;

    @Getter @Setter
    private String country;

    @Getter @Setter
    private String startDayTime;

    @Getter @Setter
    private String endDayTime;

    @Getter @Setter
    private List<UserModel> joined;

    @Getter @Setter
    private String category;
    
    @Getter @Setter
    private UserModel createdBy;

    @Getter @Setter
    private Long createdAt;
}
