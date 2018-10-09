package com.comp9323.coursereview.converter;

import com.comp9323.coursereview.dataObject.Course;
import com.comp9323.coursereview.dto.CourseDTO;
import lombok.Data;

@Data
public class Course2CourseDTOConverter {
    public static CourseDTO convert(Course course){
        CourseDTO courseDTO = new CourseDTO();
        courseDTO.setCourseCode(course.getCourseCode());
        courseDTO.setCourseDescription(course.getCourseDescription());
        courseDTO.setCourseHandbook(course.getCourseHandbook());
        courseDTO.setCourseId(course.getCourseId());
        courseDTO.setCourseLevel(course.getCourseLevel());
        courseDTO.setCourseName(course.getCourseName());
        courseDTO.setCoursePassRate(course.getCoursePassRate().replace("%", ""));
        return courseDTO;
    }
}
