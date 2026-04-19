package com.lifemastery.model;

public class SubscriptionPlan {
    private String name;
    private String duration;
    private String description;

    public SubscriptionPlan() {
    }

    public SubscriptionPlan(String name, String duration, String description) {
        this.name = name;
        this.duration = duration;
        this.description = description;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDuration() { return duration; }
    public void setDuration(String duration) { this.duration = duration; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
