package com.lifemastery.controller;

import com.lifemastery.model.AuthResponse;
import com.lifemastery.model.LoginRequest;
import com.lifemastery.model.RegisterRequest;
import com.lifemastery.model.User;
import com.lifemastery.repository.UserRepository;
import com.lifemastery.security.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder,
                          JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest req) {
        if (req.getFirstName() == null || req.getFirstName().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("First name is required.");
        }
        if (req.getLastName() == null || req.getLastName().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Last name is required.");
        }
        if (req.getEmail() == null || req.getEmail().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Email is required.");
        }
        if (req.getPassword() == null || req.getPassword().length() < 6) {
            return ResponseEntity.badRequest().body("Password must be at least 6 characters.");
        }
        if (req.getPhoneNumber() == null || req.getPhoneNumber().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Phone number is required.");
        }
        if (req.getAge() == null || req.getAge() < 1 || req.getAge() > 100) {
            return ResponseEntity.badRequest().body("Age must be between 1 and 100.");
        }
        if (req.getPlace() == null || req.getPlace().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Place is required.");
        }
        if (req.getUserType() == null || req.getUserType().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("User type is required.");
        }
        if (req.getUserType().equalsIgnoreCase("School")) {
            if (req.getSchoolName() == null || req.getSchoolName().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("School name is required for school users.");
            }
            if (req.getAreaName() == null || req.getAreaName().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Area name is required for school users.");
            }
        }
        if (userRepository.existsByEmail(req.getEmail())) {
            return ResponseEntity.badRequest().body("Email already in use.");
        }
        User user = new User();
        user.setFirstName(req.getFirstName());
        user.setLastName(req.getLastName());
        user.setName(req.getFirstName().trim() + " " + req.getLastName().trim());
        user.setEmail(req.getEmail());
        user.setPhoneNumber(req.getPhoneNumber());
        user.setAge(req.getAge());
        user.setPlace(req.getPlace());
        user.setUserType(req.getUserType());
        user.setSchoolName(req.getSchoolName());
        user.setAreaName(req.getAreaName());
        user.setPassword(passwordEncoder.encode(req.getPassword()));
        userRepository.save(user);
        String token = jwtUtil.generateToken(req.getEmail());
        return ResponseEntity.ok(new AuthResponse(token, user.getName(), user.getEmail(), user.getUserType(), user.getSubscriptionPlan(), user.getSubscriptionDuration()));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        if (req.getIdentifier() == null || req.getIdentifier().trim().isEmpty() || req.getPassword() == null || req.getPassword().isEmpty()) {
            return ResponseEntity.badRequest().body("Email/Phone and password are required.");
        }
        User user = userRepository.findByEmail(req.getIdentifier())
            .or(() -> userRepository.findByPhoneNumber(req.getIdentifier()))
            .orElse(null);
        if (user == null || !passwordEncoder.matches(req.getPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials.");
        }
        String token = jwtUtil.generateToken(user.getEmail());
        return ResponseEntity.ok(new AuthResponse(token, user.getName(), user.getEmail(), user.getUserType(), user.getSubscriptionPlan(), user.getSubscriptionDuration()));
    }
}
