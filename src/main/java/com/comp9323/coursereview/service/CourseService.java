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

    //actually should be course dto
    CourseDTO  search(String courseCode);

    List<CourseDTO> compare(String courseCode1,String courseCode2);
}
