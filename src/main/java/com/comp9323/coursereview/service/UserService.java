package com.comp9323.coursereview.service;


import com.comp9323.coursereview.dataObject.UserDetail;
import com.comp9323.coursereview.form.UserUpdateForm;

public interface UserService {

    //user sign up
    UserDetail signUp(UserDetail userDetail);

    UserDetail update(UserUpdateForm userUpdateForm);

    UserDetail search(String userId);

    UserDetail logIn(String userEmail, String userPassword);

//    UserDetailDTO changePassword(String userId, String userPassword);
}
