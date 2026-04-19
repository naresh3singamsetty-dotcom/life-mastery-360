package com.lifemastery.controller;

import com.lifemastery.model.SubscriptionPlan;
import com.lifemastery.model.SubscriptionRequest;
import com.lifemastery.model.User;
import com.lifemastery.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/subscription")
public class SubscriptionController {

    private final UserRepository userRepository;

    public SubscriptionController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/plans/{userType}")
    public ResponseEntity<List<SubscriptionPlan>> getPlans(@PathVariable String userType) {
        if (userType == null) {
            return ResponseEntity.badRequest().body(List.of());
        }
        if (userType.equalsIgnoreCase("School")) {
            return ResponseEntity.ok(getSchoolPlans());
        }
        return ResponseEntity.ok(getIndividualPlans());
    }

    @GetMapping("/me")
    public ResponseEntity<?> getSubscription() {
        String email = getAuthenticatedEmail();
        if (email == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authentication required.");
        }
        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found.");
        }
        Map<String, Object> response = new HashMap<>();
        response.put("userType", user.getUserType());
        response.put("subscriptionPlan", user.getSubscriptionPlan());
        response.put("subscriptionDuration", user.getSubscriptionDuration());
        response.put("subscriptionStart", user.getSubscriptionStart());
        response.put("subscriptionEnd", user.getSubscriptionEnd());
        response.put("subscriptionActive", user.getSubscriptionPlan() != null);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/select")
    public ResponseEntity<?> selectSubscription(@RequestBody SubscriptionRequest request) {
        String email = getAuthenticatedEmail();
        if (email == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authentication required.");
        }
        if (request.getSubscriptionPlan() == null || request.getSubscriptionPlan().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Subscription plan is required.");
        }
        if (request.getSubscriptionDuration() == null || request.getSubscriptionDuration().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Subscription duration is required.");
        }
        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found.");
        }
        if (request.getUserType() != null && !request.getUserType().trim().isEmpty()) {
            user.setUserType(request.getUserType());
        }
        user.setSubscriptionPlan(request.getSubscriptionPlan());
        user.setSubscriptionDuration(request.getSubscriptionDuration());
        user.setSubscriptionStart(LocalDate.now());
        user.setSubscriptionEnd(calculateEndDate(request.getSubscriptionDuration()));
        userRepository.save(user);
        Map<String, Object> response = new HashMap<>();
        response.put("subscriptionPlan", user.getSubscriptionPlan());
        response.put("subscriptionDuration", user.getSubscriptionDuration());
        response.put("subscriptionStart", user.getSubscriptionStart());
        response.put("subscriptionEnd", user.getSubscriptionEnd());
        return ResponseEntity.ok(response);
    }

    private String getAuthenticatedEmail() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || auth.getName() == null || auth.getName().equals("anonymousUser")) {
            return null;
        }
        return auth.getName();
    }

    private List<SubscriptionPlan> getIndividualPlans() {
        List<SubscriptionPlan> plans = new ArrayList<>();
        plans.add(new SubscriptionPlan("Basic", "3 months", "Essential access to beginner assessments."));
        plans.add(new SubscriptionPlan("Intermediate", "6 months", "Expanded assessment access plus progress tracking."));
        plans.add(new SubscriptionPlan("Advanced", "1 year", "Full access to all assessments and insights."));
        return plans;
    }

    private List<SubscriptionPlan> getSchoolPlans() {
        List<SubscriptionPlan> plans = new ArrayList<>();
        plans.add(new SubscriptionPlan("Intermediate", "Monthly", "School-level access for educators and students."));
        plans.add(new SubscriptionPlan("Advanced", "6 months", "Advanced school subscription with reporting tools."));
        plans.add(new SubscriptionPlan("Advanced", "1 year", "Full school access plus Contact Sales for volume licensing."));
        return plans;
    }

    private LocalDate calculateEndDate(String duration) {
        if (duration == null) {
            return LocalDate.now();
        }
        String normalized = duration.trim().toLowerCase();
        if (normalized.contains("year")) {
            return LocalDate.now().plusYears(1);
        }
        if (normalized.contains("6 months")) {
            return LocalDate.now().plusMonths(6);
        }
        if (normalized.contains("3 months")) {
            return LocalDate.now().plusMonths(3);
        }
        if (normalized.contains("monthly") || normalized.contains("month")) {
            return LocalDate.now().plusMonths(1);
        }
        return LocalDate.now();
    }
}
