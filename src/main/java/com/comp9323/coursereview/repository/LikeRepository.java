package com.comp9323.coursereview.repository;

import com.comp9323.coursereview.dataObject.LikeDetail;
import com.comp9323.coursereview.dataObject.Remark;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LikeRepository extends JpaRepository<LikeDetail, String> {
    Optional<LikeDetail> findByLikeUserIdAndLikeRemarkId(String userId, int remarkId);
    List<LikeDetail> findByLikeRemarkId(int remarkId);
}
