package com.lifemastery.model;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

public class AssessmentResult {

    private String id;
    private LocalDateTime date;
    private Integer age;
    private String gender;
    private Map<String, Integer> scores;
    private Map<String, String> levels;
    private InterpretationData interpretation;

    public static class InterpretationData {
        private String summary;
        private List<String> strengths;
        private List<String> growthAreas;
        private List<String> recommendations;

        public String getSummary() { return summary; }
        public void setSummary(String summary) { this.summary = summary; }

        public List<String> getStrengths() { return strengths; }
        public void setStrengths(List<String> strengths) { this.strengths = strengths; }

        public List<String> getGrowthAreas() { return growthAreas; }
        public void setGrowthAreas(List<String> growthAreas) { this.growthAreas = growthAreas; }

        public List<String> getRecommendations() { return recommendations; }
        public void setRecommendations(List<String> recommendations) { this.recommendations = recommendations; }
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public LocalDateTime getDate() { return date; }
    public void setDate(LocalDateTime date) { this.date = date; }

    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public Map<String, Integer> getScores() { return scores; }
    public void setScores(Map<String, Integer> scores) { this.scores = scores; }

    public Map<String, String> getLevels() { return levels; }
    public void setLevels(Map<String, String> levels) { this.levels = levels; }

    public InterpretationData getInterpretation() { return interpretation; }
    public void setInterpretation(InterpretationData interpretation) { this.interpretation = interpretation; }
}
