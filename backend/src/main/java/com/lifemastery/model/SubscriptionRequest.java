package com.lifemastery.model;

public class SubscriptionRequest {
    private String userType;
    private String subscriptionPlan;
    private String subscriptionDuration;

    public String getUserType() { return userType; }
    public void setUserType(String userType) { this.userType = userType; }
    public String getSubscriptionPlan() { return subscriptionPlan; }
    public void setSubscriptionPlan(String subscriptionPlan) { this.subscriptionPlan = subscriptionPlan; }
    public String getSubscriptionDuration() { return subscriptionDuration; }
    public void setSubscriptionDuration(String subscriptionDuration) { this.subscriptionDuration = subscriptionDuration; }
}
