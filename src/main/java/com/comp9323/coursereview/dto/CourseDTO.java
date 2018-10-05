package com.comp9323.coursereview.dto;

import lombok.Data;

import java.util.Date;

@Data
public class CourseDTO {
    private String courseId;

    private String courseLevel;

    private String courseCode;

    private String courseName;

    private String coursePassRate;

    private String courseDescription;

    private String courseHandbook;

    private String courseOverallRating = "5";

    private String courseDifficultyRating = "5";

    private String numberOfRemarks = "0";

}
