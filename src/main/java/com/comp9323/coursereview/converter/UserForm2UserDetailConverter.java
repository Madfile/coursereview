package com.comp9323.coursereview.converter;


import com.comp9323.coursereview.dataObject.UserDetail;
import com.comp9323.coursereview.form.UserDetailForm;
import com.comp9323.coursereview.form.UserUpdateForm;
import util.KeyGenerateUtil;

public class UserForm2UserDetailConverter {
    public static UserDetail convert(UserDetailForm userDetailForm){
        UserDetail userDetail = new UserDetail();

        userDetail.setUserId(KeyGenerateUtil.genUniqueKey());
        userDetail.setUserName(userDetailForm.getUserName());
        userDetail.setUserEmail(userDetailForm.getUserEmail());
        userDetail.setUserPassword(userDetailForm.getUserPassword());
        userDetail.setUserGender(userDetailForm.getUserGender());
        userDetail.setUserPhone(userDetailForm.getUserPhone());

        return userDetail;
    }

    public static UserDetail convert(UserUpdateForm userUpdateForm, UserDetail userDetail){

        userDetail.setUserName(userUpdateForm.getUserName());
        userDetail.setUserPhone(userUpdateForm.getUserPhone());
        userDetail.setUserPassword(userUpdateForm.getUserPassword());
        userDetail.setUserEmail(userUpdateForm.getUserEmail());
        userDetail.setUserGender(userUpdateForm.getUserGender());

        return userDetail;
    }

}
