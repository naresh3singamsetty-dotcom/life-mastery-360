package com.lifemastery.controller;

import com.lifemastery.model.User;
import com.lifemastery.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/assessments")
public class AssessmentCatalogController {

    private final UserRepository userRepository;

    public AssessmentCatalogController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Static assessment catalog data
    private static final List<Map<String, Object>> CATALOG = initializeCatalog();

    private static List<Map<String, Object>> initializeCatalog() {
        List<Map<String, Object>> catalog = new ArrayList<>();
        
        catalog.add(createAssessment("quick-scan", "Quick Scan", "⚡", 1, 5, "basic",
                "A fast wellness snapshot to gauge your current mental state."));
        catalog.add(createAssessment("wellness-check", "Wellness Check", "💚", 2, 10, "basic",
                "A comprehensive but quick check of your overall wellness across key dimensions."));
        catalog.add(createAssessment("full-assessment", "Full Assessment", "📊", 5, 30, "intermediate",
                "Detailed 5-area assessment for comprehensive mental wellness insights."));
        catalog.add(createAssessment("deep-dive", "Deep Dive", "🔬", 10, 50, "advanced",
                "The most comprehensive assessment with advanced analytics and intervention recommendations."));
        
        return catalog;
    }

    private static Map<String, Object> createAssessment(String id, String name, String icon, 
                                                        Integer duration, Integer questions, 
                                                        String accessLevel, String description) {
        Map<String, Object> assessment = new HashMap<>();
        assessment.put("id", id);
        assessment.put("name", name);
        assessment.put("icon", icon);
        assessment.put("duration", duration);
        assessment.put("questions", questions);
        assessment.put("accessLevel", accessLevel);
        assessment.put("description", description);
        return assessment;
    }

    @GetMapping("/catalog")
    public ResponseEntity<?> getCatalog() {
        String email = getAuthenticatedEmail();
        if (email == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authentication required.");
        }

        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found.");
        }

        String userAccessLevel = getUserAccessLevel(user.getSubscriptionPlan());

        List<Map<String, Object>> enrichedCatalog = new ArrayList<>();
        for (Map<String, Object> assessment : CATALOG) {
            Map<String, Object> item = new HashMap<>(assessment);
            String requiredLevel = (String) assessment.get("accessLevel");
            item.put("canAccess", canUserAccess(userAccessLevel, requiredLevel));
            enrichedCatalog.add(item);
        }

        return ResponseEntity.ok(enrichedCatalog);
    }

    @PostMapping("/validate-access/{assessmentId}")
    public ResponseEntity<?> validateAccess(@PathVariable String assessmentId) {
        String email = getAuthenticatedEmail();
        if (email == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authentication required.");
        }

        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found.");
        }

        Map<String, Object> assessment = CATALOG.stream()
                .filter(a -> a.get("id").equals(assessmentId))
                .findFirst()
                .orElse(null);

        if (assessment == null) {
            return ResponseEntity.notFound().build();
        }

        String userAccessLevel = getUserAccessLevel(user.getSubscriptionPlan());
        String requiredLevel = (String) assessment.get("accessLevel");
        boolean hasAccess = canUserAccess(userAccessLevel, requiredLevel);

        Map<String, Object> response = new HashMap<>();
        response.put("assessmentId", assessmentId);
        response.put("assessmentName", assessment.get("name"));
        response.put("hasAccess", hasAccess);
        response.put("userPlan", user.getSubscriptionPlan());
        response.put("requiredAccessLevel", requiredLevel);

        if (!hasAccess) {
            response.put("message", "Not accessible with current subscription.");
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
        }

        return ResponseEntity.ok(response);
    }

    private String getAuthenticatedEmail() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || auth.getName() == null || auth.getName().equals("anonymousUser")) {
            return null;
        }
        return auth.getName();
    }

    private String getUserAccessLevel(String subscriptionPlan) {
        if (subscriptionPlan == null || subscriptionPlan.isEmpty()) {
            return "none";
        }
        if (subscriptionPlan.equalsIgnoreCase("Basic")) {
            return "basic";
        }
        if (subscriptionPlan.equalsIgnoreCase("Intermediate")) {
            return "intermediate";
        }
        if (subscriptionPlan.equalsIgnoreCase("Advanced")) {
            return "advanced";
        }
        return "none";
    }

    private boolean canUserAccess(String userLevel, String requiredLevel) {
        int userLevelValue = getLevelValue(userLevel);
        int requiredLevelValue = getLevelValue(requiredLevel);
        return userLevelValue >= requiredLevelValue;
    }

    private int getLevelValue(String level) {
        switch (level.toLowerCase()) {
            case "basic":
                return 1;
            case "intermediate":
                return 2;
            case "advanced":
                return 3;
            default:
                return 0;
        }
    }
}
