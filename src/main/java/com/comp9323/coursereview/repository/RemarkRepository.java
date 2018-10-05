package com.comp9323.coursereview.repository;

import com.comp9323.coursereview.dataObject.Course;
import com.comp9323.coursereview.dataObject.Remark;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RemarkRepository extends JpaRepository<Remark, String> {
    List<Remark> findByCourseId(String courseId);
}
