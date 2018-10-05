package com.comp9323.coursereview.repository;

import com.comp9323.coursereview.dataObject.Course;
import com.comp9323.coursereview.dataObject.UserDetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CourseRepository extends JpaRepository<Course, String> {

    Optional<Course> findByCourseCode(String courseCode);
}
