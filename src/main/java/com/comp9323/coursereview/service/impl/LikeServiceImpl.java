package com.comp9323.coursereview.service.impl;

import com.comp9323.coursereview.dataObject.LikeDetail;
import com.comp9323.coursereview.dto.RemarkDTO;
import com.comp9323.coursereview.repository.LikeRepository;
import com.comp9323.coursereview.service.LikeService;
import com.comp9323.coursereview.service.RemarkService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class LikeServiceImpl implements LikeService {
    @Autowired
    private LikeRepository likeRepository;

    @Autowired
    private RemarkService remarkService;

    @Override
    @Transactional
    public List<RemarkDTO> update(String userId, String remarkId, String courseCode) {
        Optional<LikeDetail> likeDetailOptional = likeRepository.findByLikeUserIdAndLikeRemarkId(userId, Integer.valueOf(remarkId));
        if(likeDetailOptional.isPresent()){
            likeRepository.deleteById(likeDetailOptional.get().getLikeId());
        }
        else{
            LikeDetail likeDetail = new LikeDetail();
            likeDetail.setLikeRemarkId(Integer.valueOf(remarkId));
            likeDetail.setLikeUserId(userId);
            likeRepository.save(likeDetail);
        }


        return remarkService.list(courseCode,userId);
    }
}
