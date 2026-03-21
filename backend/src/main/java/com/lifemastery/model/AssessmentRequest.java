package com.lifemastery.model;

import java.util.List;

public class AssessmentRequest {
    private Integer age;
    private String className;
    private String gender;
    private List<Integer> answers;

    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }

    public String getClassName() { return className; }
    public void setClassName(String className) { this.className = className; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public List<Integer> getAnswers() { return answers; }
    public void setAnswers(List<Integer> answers) { this.answers = answers; }
}
