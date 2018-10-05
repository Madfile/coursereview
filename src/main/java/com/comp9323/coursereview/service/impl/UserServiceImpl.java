package com.comp9323.coursereview.service.impl;


import com.comp9323.coursereview.converter.UserForm2UserDetailConverter;
import com.comp9323.coursereview.dataObject.UserDetail;
import com.comp9323.coursereview.enums.ResultEnum;
import com.comp9323.coursereview.exception.HolirooException;
import com.comp9323.coursereview.form.UserUpdateForm;
import com.comp9323.coursereview.repository.UserDetailRepository;
import com.comp9323.coursereview.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Slf4j
public class UserServiceImpl implements UserService {
    @Autowired
    private UserDetailRepository userDetailRepository;

    @Override
    @Transactional
    public UserDetail signUp(UserDetail userDetail) {
        Optional<UserDetail> feedback = userDetailRepository.findByUserEmail(userDetail.getUserEmail());
        if(feedback.isPresent() == true){
            throw new HolirooException(ResultEnum.EMAIL_EXIST);
        }
        else {
            UserDetail temp = userDetailRepository.save(userDetail);
            return temp;
        }
    }

    @Override
    @Transactional
    public UserDetail update(UserUpdateForm userUpdateForm) {

        Optional<UserDetail> userDetail = userDetailRepository.findById(userUpdateForm.getUserId());
        if(userDetail.isPresent() == false){
            throw new HolirooException((ResultEnum.USER_NOT_EXIST));
        }
        else{
            UserDetail newUserDetail = UserForm2UserDetailConverter.convert(userUpdateForm, userDetail.get());
            UserDetail temp = userDetailRepository.save(newUserDetail);

            return temp;
        }
    }

    @Override
    public UserDetail search(String userId) {
        Optional<UserDetail> userDetail = userDetailRepository.findById(userId);
        if(userDetail.isPresent() == false){
            throw new HolirooException((ResultEnum.USER_NOT_EXIST));
        }
        else{
            return userDetail.get();
        }
    }

    @Override
    public UserDetail logIn(String userEmail, String userPassword) {
        Optional<UserDetail> userDetail = userDetailRepository.findByUserEmail(userEmail);
        if(userDetail.isPresent() == false){
            throw new HolirooException((ResultEnum.USER_NOT_EXIST));
        }
        if (!userDetail.get().getUserPassword().equals(userPassword)){
            throw new HolirooException(ResultEnum.WRONG_PASSWORD);
        }



        return userDetail.get();
    }

//    @Override
//    public UserDetailDTO changePassword(String userId, String userPassword) {
//        Optional<UserDetail> userDetail = userDetailRepository.findById(userId);
//        if(userDetail.isPresent() == false){
//            throw new HolirooException((ResultEnum.USER_NOT_EXIST));
//        }
//        UserDetail newUserDetail = userDetail.get();
//        newUserDetail.setUserPassword(userPassword);
//        return UserDetail2UserDetailDTOConverter.convert(newUserDetail);
//    }

}
