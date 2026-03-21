package com.lifemastery.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "assessments")
public class Assessment {

    @Id
    private String id = java.util.UUID.randomUUID().toString();

    private Integer age;
    private String className;
    private String gender;

    @Column(columnDefinition = "TEXT")
    private String answers;

    private Integer stressScore;
    private Integer focusScore;
    private Integer emotionalRegulationScore;
    private Integer habitDisciplineScore;
    private Integer socialConfidenceScore;

    @Column(columnDefinition = "TEXT")
    private String interpretationJson;

    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }

    public String getClassName() { return className; }
    public void setClassName(String className) { this.className = className; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public String getAnswers() { return answers; }
    public void setAnswers(String answers) { this.answers = answers; }

    public Integer getStressScore() { return stressScore; }
    public void setStressScore(Integer stressScore) { this.stressScore = stressScore; }

    public Integer getFocusScore() { return focusScore; }
    public void setFocusScore(Integer focusScore) { this.focusScore = focusScore; }

    public Integer getEmotionalRegulationScore() { return emotionalRegulationScore; }
    public void setEmotionalRegulationScore(Integer emotionalRegulationScore) { this.emotionalRegulationScore = emotionalRegulationScore; }

    public Integer getHabitDisciplineScore() { return habitDisciplineScore; }
    public void setHabitDisciplineScore(Integer habitDisciplineScore) { this.habitDisciplineScore = habitDisciplineScore; }

    public Integer getSocialConfidenceScore() { return socialConfidenceScore; }
    public void setSocialConfidenceScore(Integer socialConfidenceScore) { this.socialConfidenceScore = socialConfidenceScore; }

    public String getInterpretationJson() { return interpretationJson; }
    public void setInterpretationJson(String interpretationJson) { this.interpretationJson = interpretationJson; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
