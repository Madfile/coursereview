package com.comp9323.coursereview.service.impl;


import com.comp9323.coursereview.converter.RemarkForm2RemarkConverter;
import com.comp9323.coursereview.converter.UserForm2UserDetailConverter;
import com.comp9323.coursereview.dataObject.Course;
import com.comp9323.coursereview.dataObject.Remark;
import com.comp9323.coursereview.dataObject.UserDetail;
import com.comp9323.coursereview.enums.ResultEnum;
import com.comp9323.coursereview.exception.HolirooException;
import com.comp9323.coursereview.form.RemarkForm;
import com.comp9323.coursereview.form.UserUpdateForm;
import com.comp9323.coursereview.repository.CourseRepository;
import com.comp9323.coursereview.repository.RemarkRepository;
import com.comp9323.coursereview.repository.UserDetailRepository;
import com.comp9323.coursereview.service.RemarkService;
import com.comp9323.coursereview.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class RemarkServiceImpl implements RemarkService {
    @Autowired
    private RemarkRepository remarkRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Transactional
    @Override
    public List<Remark> save(RemarkForm remarkForm) {
        Remark remark = RemarkForm2RemarkConverter.convert(remarkForm);
        remarkRepository.save(remark);
        return remarkRepository.findAll();
    }

    @Override
    @Transactional
    public List<Remark> delete(String remarkId) {
        remarkRepository.deleteById(remarkId);
        return remarkRepository.findAll();
    }

    @Override
    public List<Remark> list(String courseCode) {
        Optional<Course> optionalCourse = courseRepository.findByCourseCode(courseCode);
        if(optionalCourse.isPresent() == false){
            throw new HolirooException(ResultEnum.COURSE_NOT_EXIST);
        }
        String courseId = optionalCourse.get().getCourseId();
        return remarkRepository.findByCourseId(courseId);
    }
}
