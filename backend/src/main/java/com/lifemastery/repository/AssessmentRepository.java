package com.lifemastery.repository;

import com.lifemastery.model.Assessment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AssessmentRepository extends JpaRepository<Assessment, String> {
    List<Assessment> findByClassName(String className);
    List<Assessment> findByClassNameOrderByCreatedAtDesc(String className);
    List<Assessment> findByUserIdOrderByCreatedAtDesc(String userId);
}
