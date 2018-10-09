package com.comp9323.coursereview.service.impl;


import com.comp9323.coursereview.converter.Remark2RemarkDTOConverter;
import com.comp9323.coursereview.converter.RemarkForm2RemarkConverter;
import com.comp9323.coursereview.converter.UserForm2UserDetailConverter;
import com.comp9323.coursereview.dataObject.Course;
import com.comp9323.coursereview.dataObject.LikeDetail;
import com.comp9323.coursereview.dataObject.Remark;
import com.comp9323.coursereview.dataObject.UserDetail;
import com.comp9323.coursereview.dto.RemarkDTO;
import com.comp9323.coursereview.enums.ResultEnum;
import com.comp9323.coursereview.exception.HolirooException;
import com.comp9323.coursereview.form.RemarkForm;
import com.comp9323.coursereview.form.UserUpdateForm;
import com.comp9323.coursereview.repository.CourseRepository;
import com.comp9323.coursereview.repository.LikeRepository;
import com.comp9323.coursereview.repository.RemarkRepository;
import com.comp9323.coursereview.repository.UserDetailRepository;
import com.comp9323.coursereview.service.RemarkService;
import com.comp9323.coursereview.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.swing.text.html.Option;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class RemarkServiceImpl implements RemarkService {
    @Autowired
    private RemarkRepository remarkRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private LikeRepository likeRepository;

    @Transactional
    @Override
    public List<RemarkDTO> save(RemarkForm remarkForm) {
        Remark remark = RemarkForm2RemarkConverter.convert(remarkForm);
        remarkRepository.save(remark);

        return listRemarkDTO(remarkForm.getCourseId(), remarkForm.getRemarkUserId());
    }

    @Override
    @Transactional
    public List<RemarkDTO> delete(String remarkId, String userId) {
        Optional<Remark> remarkOptional = remarkRepository.findById(remarkId);
        String courseId = remarkOptional.get().getCourseId();
        remarkRepository.deleteById(remarkId);

        return listRemarkDTO(courseId, userId);
    }

    @Override
    public List<RemarkDTO> list(String courseCode, String userId) {
        Optional<Course> optionalCourse = courseRepository.findByCourseCode(courseCode);
        if (optionalCourse.isPresent() == false) {
            throw new HolirooException(ResultEnum.COURSE_NOT_EXIST);
        }
        String courseId = optionalCourse.get().getCourseId();

        return listRemarkDTO(courseId, userId);
    }

//    private int getNumberOfLike(String remarkId ){
//        List<LikeDetail> likeDetailList = likeRepository.findByRemarkId(Integer.valueOf(remarkId));
//        return likeDetailList.size();
//    }

    private List<String> getLikeUserId(String remarkId) {
        List<LikeDetail> likeDetailList = likeRepository.findByLikeRemarkId(Integer.valueOf(remarkId));
        List<String> likeUserIdList = new ArrayList<String>();
        for (LikeDetail likeDetail : likeDetailList) {
            likeUserIdList.add(likeDetail.getLikeUserId());
        }
        return likeUserIdList;
    }

    private List<RemarkDTO> listRemarkDTO(String courseId, String userId){
        List<Remark> remarkList = remarkRepository.findByCourseId(courseId);
        List<RemarkDTO> remarkDTOList = new ArrayList<RemarkDTO>();
        for (Remark remarkUnit : remarkList) {
            RemarkDTO remarkDTO = Remark2RemarkDTOConverter.convert(remarkUnit);
            List<String> likeUserIdList = getLikeUserId(remarkUnit.getRemarkId());
            remarkDTO.setUserLiked(likeUserIdList.contains(userId));
            remarkDTO.setNumberOfLike(likeUserIdList.size());
            remarkDTOList.add(remarkDTO);
        }
        Collections.reverse(remarkDTOList);
        return remarkDTOList;
    }
}
