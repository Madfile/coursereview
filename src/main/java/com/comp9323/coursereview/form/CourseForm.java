package com.comp9323.coursereview.form;

import lombok.Data;

import javax.validation.constraints.NotEmpty;

@Data
public class CourseForm {
    @NotEmpty(message="course level can not be empty")
    private String courseLevel;

    @NotEmpty(message="course code can not be empty")
    private String courseCode;

    @NotEmpty(message="course name can not be empty")
    private String courseName;

    @NotEmpty(message="course pass rate can not be empty")
    private String coursePassRate;

    @NotEmpty(message="course description can not be empty")
    private String courseDescription;

    @NotEmpty(message="course handbook can not be empty")
    private String courseHandbook;
}
