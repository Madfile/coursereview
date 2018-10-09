package com.comp9323.coursereview.service;


import com.comp9323.coursereview.dataObject.Course;
import com.comp9323.coursereview.dto.CourseDTO;
import com.comp9323.coursereview.dto.RemarkDTO;
import com.comp9323.coursereview.form.CourseForm;

import java.util.List;

public interface LikeService {

    List<RemarkDTO> update(String userId, String remarkId, String courseCode);

}
