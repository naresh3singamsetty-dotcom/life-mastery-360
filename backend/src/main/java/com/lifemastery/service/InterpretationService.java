package com.lifemastery.service;

import com.lifemastery.model.AssessmentResult.InterpretationData;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class InterpretationService {

    public InterpretationData interpret(Map<String, Integer> scores, Map<String, String> levels, Integer age, String gender) {
        InterpretationData data = new InterpretationData();

        List<String> strengths = new ArrayList<>();
        List<String> growthAreas = new ArrayList<>();
        List<String> recommendations = new ArrayList<>();

        for (Map.Entry<String, String> entry : levels.entrySet()) {
            String category = entry.getKey();
            String level = entry.getValue();

            switch (level) {
                case "Good" -> strengths.add(getStrengthMessage(category));
                case "Needs Attention" -> {
                    growthAreas.add(getGrowthAreaMessage(category));
                    recommendations.addAll(getRecommendations(category));
                }
                default -> recommendations.add(getModerateRecommendation(category));
            }
        }

        if (strengths.isEmpty()) {
            strengths.add("You are taking a positive step by assessing your mental wellness — that itself takes courage.");
        }

        data.setSummary(generateSummary(levels, age));
        data.setStrengths(strengths);
        data.setGrowthAreas(growthAreas);

        int limit = Math.min(recommendations.size(), 5);
        data.setRecommendations(new ArrayList<>(recommendations.subList(0, limit)));

        return data;
    }

    private String getStrengthMessage(String category) {
        return switch (category) {
            case "stress" -> "You manage stress well and maintain a calm, composed mindset under pressure.";
            case "focus" -> "You have strong concentration and the ability to stay focused on your tasks.";
            case "emotionalRegulation" -> "You handle your emotions with maturity and emotional balance.";
            case "habitDiscipline" -> "You show excellent discipline in building and consistently maintaining habits.";
            case "socialConfidence" -> "You are confident in social situations and communicate effectively with others.";
            default -> "You show notable strength in " + category + ".";
        };
    }

    private String getGrowthAreaMessage(String category) {
        return switch (category) {
            case "stress" -> "Stress management needs focused attention — high stress can impact your health and performance.";
            case "focus" -> "Focus and concentration are key areas for development to improve productivity.";
            case "emotionalRegulation" -> "Emotional regulation is a vital skill — improving it will positively affect all areas of your life.";
            case "habitDiscipline" -> "Building consistent habits and daily discipline is essential for long-term success.";
            case "socialConfidence" -> "Developing social confidence will unlock many personal and professional opportunities.";
            default -> category + " needs focused and consistent improvement.";
        };
    }

    private List<String> getRecommendations(String category) {
        return switch (category) {
            case "stress" -> List.of(
                "Practice deep breathing for 5 minutes every morning to calm your nervous system.",
                "Write down 3 things you are grateful for each evening before sleeping.",
                "Take short 5-minute breaks every hour during study sessions."
            );
            case "focus" -> List.of(
                "Use the Pomodoro technique: 25 minutes focused work, then a 5-minute break.",
                "Put your phone in another room or on silent while studying.",
                "Start each study session by writing down the one thing you want to accomplish."
            );
            case "emotionalRegulation" -> List.of(
                "Pause and take 3 slow deep breaths before reacting in any difficult situation.",
                "Keep a daily emotion journal to track and understand your feelings over time.",
                "Practice the '5-4-3-2-1' grounding technique when you feel emotionally overwhelmed."
            );
            case "habitDiscipline" -> List.of(
                "Start with just one small habit and master it fully before adding another.",
                "Set a consistent sleep and wake time each day to anchor your entire routine.",
                "Use a habit tracker to visually see your progress and stay motivated."
            );
            case "socialConfidence" -> List.of(
                "Practice initiating one small conversation with someone new each week.",
                "Join a club, sport, or group activity aligned with your genuine interests.",
                "Remind yourself daily: people are far more focused on themselves than on judging you."
            );
            default -> List.of("Focus on gradual, consistent improvement in " + category + ".");
        };
    }

    private String getModerateRecommendation(String category) {
        return switch (category) {
            case "stress" -> "Keep practising relaxation techniques to prevent stress from escalating.";
            case "focus" -> "Build more structured study routines to enhance your already decent focus levels.";
            case "emotionalRegulation" -> "Continue developing emotional awareness through daily reflection and mindfulness.";
            case "habitDiscipline" -> "Strengthen your habit consistency with small, reliable daily improvements.";
            case "socialConfidence" -> "Keep putting yourself in social situations — your confidence will grow with each interaction.";
            default -> "Keep working steadily on " + category + " for consistently better results.";
        };
    }

    private String generateSummary(Map<String, String> levels, Integer age) {
        long goodCount = levels.values().stream().filter(l -> l.equals("Good")).count();
        long attentionCount = levels.values().stream().filter(l -> l.equals("Needs Attention")).count();

        StringBuilder sb = new StringBuilder();

        if (goodCount >= 4) {
            sb.append("You show excellent overall mental wellness with strong foundations across most areas of your life. ");
        } else if (goodCount >= 2 && attentionCount <= 1) {
            sb.append("Your assessment reveals a strong and balanced mental wellness profile with clear areas of strength. ");
        } else if (attentionCount >= 3) {
            sb.append("Your assessment reveals several areas needing focused care and attention. This is a valuable insight — recognizing these patterns is the first powerful step toward real change. ");
        } else {
            sb.append("Your assessment shows a balanced profile with genuine strengths to build on and clear opportunities for meaningful growth. ");
        }

        if (attentionCount > 0) {
            sb.append("With consistent practice and the right strategies, you can make significant improvements in the areas flagged. ");
        }

        sb.append("Remember: self-awareness is the foundation of all personal growth. The fact that you took this assessment shows you are already committed to becoming a better version of yourself.");

        return sb.toString();
    }
}
