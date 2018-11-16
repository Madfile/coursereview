package com.comp9323.coursereview.service;


import com.comp9323.coursereview.dataObject.Course;
import com.comp9323.coursereview.dataObject.UserDetail;
import com.comp9323.coursereview.dto.CourseDTO;
import com.comp9323.coursereview.form.CourseForm;
import com.comp9323.coursereview.form.UserUpdateForm;

import java.util.List;

public interface CourseService {

    Course add(CourseForm courseForm);

    List<CourseDTO> list();
    CourseDTO  getOne(String courseCode);
    List<CourseDTO> compare(String courseCode1,String courseCode2);
    List<CourseDTO> rankByOverallRanking();
    List<CourseDTO> rankByDifficultyRanking();
    List<CourseDTO> rankByPassRate();
    List<CourseDTO> rankByPopularity();
    List<CourseDTO> match(String keyword);
    List<CourseDTO> findByLevel(String level);
}
