package com.lifemastery.service;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ScoreService {

    public int calculateStress(List<Integer> answers) {
        return sum(answers, 0, 6);
    }

    public int calculateFocus(List<Integer> answers) {
        return sum(answers, 6, 12);
    }

    public int calculateEmotionalRegulation(List<Integer> answers) {
        return sum(answers, 12, 18);
    }

    public int calculateHabitDiscipline(List<Integer> answers) {
        return sum(answers, 18, 24);
    }

    public int calculateSocialConfidence(List<Integer> answers) {
        return sum(answers, 24, 30);
    }

    /**
     * Score ranges per category (0–18):
     *   0–5  → Good
     *   6–11 → Moderate
     *   12–18 → Needs Attention
     */
    public String getLevel(int score) {
        if (score <= 5) return "Good";
        if (score <= 11) return "Moderate";
        return "Needs Attention";
    }

    private int sum(List<Integer> answers, int from, int to) {
        return answers.subList(from, to).stream().mapToInt(Integer::intValue).sum();
    }
}
