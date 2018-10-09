package com.comp9323.coursereview.controller;

import com.comp9323.coursereview.VO.ResultVO;
import com.comp9323.coursereview.converter.UserForm2UserDetailConverter;
import com.comp9323.coursereview.dataObject.UserDetail;
import com.comp9323.coursereview.enums.ResultEnum;
import com.comp9323.coursereview.exception.HolirooException;
import com.comp9323.coursereview.form.UserDetailForm;
import com.comp9323.coursereview.form.UserUpdateForm;
import com.comp9323.coursereview.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import com.comp9323.coursereview.util.ResultVOUtil;

import javax.validation.Valid;

@RestController
@RequestMapping("/user")
@Slf4j
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

//    @PostMapping("/changePassword")
//    public ResultVO changePassword(@RequestParam("userId") String userId,
//                                   @RequestParam("newPassword") String newPassword){
//
//        return ResultVOUtil.success(userService.changePassword(userId, newPassword));
//    }



    @PostMapping("/signup")
    public ResultVO signUp(@Valid UserDetailForm userDetailForm, BindingResult bindingResult
                             ){
        if(bindingResult.hasErrors()){
            log.error("There is error in parameters, userDetailForm = {}", userDetailForm);
            throw new HolirooException(ResultEnum.USER_FORM_ERROR.getCode(), bindingResult.getFieldError().getDefaultMessage());
        }

        UserDetail userDetail = UserForm2UserDetailConverter.convert(userDetailForm);

        //Model newModel = ResultVO2ModelConverter.convert(model, ResultVOUtil.success(userService.signUp(userDetail)));
        //return new ModelAndView("/index","model",newModel);

        return ResultVOUtil.success(userService.signUp(userDetail));

    }

    @PostMapping("/update")
    public ResultVO update(@Valid UserUpdateForm userUpdateForm, BindingResult bindingResult){

        if(bindingResult.hasErrors()){
            log.error("There is error in parameters, userDetailForm = {}", userUpdateForm.toString());
            throw new HolirooException(ResultEnum.USER_FORM_ERROR.getCode(), bindingResult.getFieldError().getDefaultMessage());
        }
        else {
            UserDetail userDetail = userService.update(userUpdateForm);
            return ResultVOUtil.success(userDetail);
        }
    }

    @PostMapping("/profile")
    public ResultVO search(@RequestParam("userId") String userId){

        return ResultVOUtil.success(userService.search(userId));
    }

    @PostMapping("/login")
    public ResultVO logIn(@RequestParam("userEmail") String userEmail,
                                        @RequestParam("userPassword") String userPassword){

        return ResultVOUtil.success(userService.logIn(userEmail, userPassword));
    }

}
