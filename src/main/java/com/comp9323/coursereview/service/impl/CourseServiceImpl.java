package com.comp9323.coursereview.service.impl;


import com.comp9323.coursereview.converter.Course2CourseDTOConverter;
import com.comp9323.coursereview.converter.UserForm2UserDetailConverter;
import com.comp9323.coursereview.dataObject.Course;
import com.comp9323.coursereview.dataObject.Remark;
import com.comp9323.coursereview.dataObject.UserDetail;
import com.comp9323.coursereview.dto.CourseDTO;
import com.comp9323.coursereview.enums.ResultEnum;
import com.comp9323.coursereview.exception.HolirooException;
import com.comp9323.coursereview.form.CourseForm;
import com.comp9323.coursereview.form.UserUpdateForm;
import com.comp9323.coursereview.repository.CourseRepository;
import com.comp9323.coursereview.repository.RemarkRepository;
import com.comp9323.coursereview.repository.UserDetailRepository;
import com.comp9323.coursereview.service.CourseService;
import com.comp9323.coursereview.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class CourseServiceImpl implements CourseService {
    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private RemarkRepository remarkRepository;

    @Override
    @Transactional
    public Course add(CourseForm courseForm) {
        Course course = new Course();
        course.setCourseCode(courseForm.getCourseCode());
        course.setCourseDescription(courseForm.getCourseDescription());
        course.setCourseHandbook(courseForm.getCourseHandbook());
        course.setCourseLevel(courseForm.getCourseLevel());
        course.setCourseName(courseForm.getCourseName());
        course.setCoursePassRate(courseForm.getCoursePassRate());

        return courseRepository.save(course);
    }

    @Override
    public List<CourseDTO> list() {
        List<Course> courseList =  courseRepository.findAll();
        List<CourseDTO> courseDTOList = new ArrayList<CourseDTO>();
        for(Course course: courseList){
            String courseCode = course.getCourseCode();
            CourseDTO courseDTO = search(courseCode);
            courseDTOList.add(courseDTO);
        }

        return courseDTOList;
    }

    @Override
    public CourseDTO search(String courseCode) {
        Optional<Course> optionalCourse = courseRepository.findByCourseCode(courseCode);
        if(optionalCourse.isPresent() == false){
            throw new HolirooException((ResultEnum.COURSE_NOT_EXIST));
        }
        CourseDTO courseDTO = Course2CourseDTOConverter.convert(optionalCourse.get());
        //need a util to get the overall remark and difficulty remark
        String courseId = courseDTO.getCourseId();
        List<Remark> remarkList = remarkRepository.findByCourseId(courseId);

        if (remarkList.isEmpty()){
            return courseDTO;
        }

        else{
            courseDTO.setNumberOfRemarks(String.valueOf(remarkList.size()));
            int numberOfRemarks = remarkList.size();
            float overallRating = 0;
            float difficultyRating = 0;
            for(Remark remark: remarkList){
                overallRating += remark.getRemarkOverallMark();
                difficultyRating += remark.getRemarkDifficultyMark();
            }
            DecimalFormat decimalFormat=new DecimalFormat(".0");
            courseDTO.setCourseOverallRating(decimalFormat.format(overallRating/numberOfRemarks));
            courseDTO.setCourseDifficultyRating(decimalFormat.format(difficultyRating/numberOfRemarks));
        }

        return courseDTO;
    }

    @Override
    public List<CourseDTO> compare(String courseCode1, String courseCode2) {
        Optional<Course> optionalCourse = courseRepository.findByCourseCode(courseCode1);
        Optional<Course> optionalCourse2 = courseRepository.findByCourseCode(courseCode2);

        if(optionalCourse.isPresent() == false || optionalCourse2.isPresent() == false){
            throw new HolirooException((ResultEnum.COURSE_NOT_EXIST));
        }
        List<CourseDTO> courseList = new ArrayList<CourseDTO>();
        courseList.add(search(courseCode1));
        courseList.add(search(courseCode2));

        return courseList;
    }
}
