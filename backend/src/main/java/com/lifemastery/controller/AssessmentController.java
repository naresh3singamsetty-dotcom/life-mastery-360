package com.lifemastery.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lifemastery.model.Assessment;
import com.lifemastery.model.AssessmentRequest;
import com.lifemastery.model.AssessmentResult;
import com.lifemastery.repository.AssessmentRepository;
import com.lifemastery.service.InterpretationService;
import com.lifemastery.service.ScoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/assessment")
public class AssessmentController {

    @Autowired
    private AssessmentRepository repository;

    @Autowired
    private ScoreService scoreService;

    @Autowired
    private InterpretationService interpretationService;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @PostMapping("/submit")
    public ResponseEntity<AssessmentResult> submit(@RequestBody AssessmentRequest request) {
        try {
            if (request.getAnswers() == null || request.getAnswers().size() != 30) {
                return ResponseEntity.badRequest().build();
            }

            int stress = scoreService.calculateStress(request.getAnswers());
            int focus = scoreService.calculateFocus(request.getAnswers());
            int emotionalReg = scoreService.calculateEmotionalRegulation(request.getAnswers());
            int habitDiscipline = scoreService.calculateHabitDiscipline(request.getAnswers());
            int socialConf = scoreService.calculateSocialConfidence(request.getAnswers());

            Map<String, Integer> scores = new LinkedHashMap<>();
            scores.put("stress", stress);
            scores.put("focus", focus);
            scores.put("emotionalRegulation", emotionalReg);
            scores.put("habitDiscipline", habitDiscipline);
            scores.put("socialConfidence", socialConf);

            Map<String, String> levels = new LinkedHashMap<>();
            scores.forEach((key, value) -> levels.put(key, scoreService.getLevel(value)));

            AssessmentResult.InterpretationData interpretation =
                interpretationService.interpret(scores, levels, request.getAge(), request.getGender());

            Assessment assessment = new Assessment();
            assessment.setAge(request.getAge());
            assessment.setClassName(request.getClassName());
            assessment.setGender(request.getGender());
            assessment.setAnswers(objectMapper.writeValueAsString(request.getAnswers()));
            assessment.setStressScore(stress);
            assessment.setFocusScore(focus);
            assessment.setEmotionalRegulationScore(emotionalReg);
            assessment.setHabitDisciplineScore(habitDiscipline);
            assessment.setSocialConfidenceScore(socialConf);
            assessment.setInterpretationJson(objectMapper.writeValueAsString(interpretation));

            Assessment saved = repository.save(assessment);

            AssessmentResult result = new AssessmentResult();
            result.setId(saved.getId());
            result.setAge(request.getAge());
            result.setGender(request.getGender());
            result.setScores(scores);
            result.setLevels(levels);
            result.setInterpretation(interpretation);

            return ResponseEntity.ok(result);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<AssessmentResult> getResult(@PathVariable String id) {
        Optional<Assessment> optAssessment = repository.findById(id);
        if (optAssessment.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        try {
            Assessment assessment = optAssessment.get();

            Map<String, Integer> scores = new LinkedHashMap<>();
            scores.put("stress", assessment.getStressScore());
            scores.put("focus", assessment.getFocusScore());
            scores.put("emotionalRegulation", assessment.getEmotionalRegulationScore());
            scores.put("habitDiscipline", assessment.getHabitDisciplineScore());
            scores.put("socialConfidence", assessment.getSocialConfidenceScore());

            Map<String, String> levels = new LinkedHashMap<>();
            scores.forEach((key, value) -> levels.put(key, scoreService.getLevel(value)));

            AssessmentResult.InterpretationData interpretation =
                objectMapper.readValue(assessment.getInterpretationJson(), AssessmentResult.InterpretationData.class);

            AssessmentResult result = new AssessmentResult();
            result.setId(assessment.getId());
            result.setAge(assessment.getAge());
            result.setGender(assessment.getGender());
            result.setScores(scores);
            result.setLevels(levels);
            result.setInterpretation(interpretation);

            return ResponseEntity.ok(result);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
}
