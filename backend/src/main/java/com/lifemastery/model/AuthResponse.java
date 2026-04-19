package com.lifemastery.model;

public class AuthResponse {
    private String token;
    private String name;
    private String email;
    private String userType;
    private String subscriptionPlan;
    private String subscriptionDuration;

    public AuthResponse(String token, String name, String email, String userType, String subscriptionPlan, String subscriptionDuration) {
        this.token = token;
        this.name = name;
        this.email = email;
        this.userType = userType;
        this.subscriptionPlan = subscriptionPlan;
        this.subscriptionDuration = subscriptionDuration;
    }

    public String getToken() { return token; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getUserType() { return userType; }
    public String getSubscriptionPlan() { return subscriptionPlan; }
    public String getSubscriptionDuration() { return subscriptionDuration; }
}
