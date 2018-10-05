package com.comp9323.coursereview.repository;

import com.comp9323.coursereview.dataObject.UserDetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserDetailRepository extends JpaRepository<UserDetail, String> {

    Optional<UserDetail> findByUserEmail(String userEmail);
}
