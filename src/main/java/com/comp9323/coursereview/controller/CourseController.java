package com.comp9323.coursereview.controller;

import VO.ResultVO;
import com.comp9323.coursereview.converter.UserForm2UserDetailConverter;
import com.comp9323.coursereview.dataObject.Course;
import com.comp9323.coursereview.dataObject.UserDetail;
import com.comp9323.coursereview.enums.ResultEnum;
import com.comp9323.coursereview.exception.HolirooException;
import com.comp9323.coursereview.form.CourseForm;
import com.comp9323.coursereview.form.UserDetailForm;
import com.comp9323.coursereview.form.UserUpdateForm;
import com.comp9323.coursereview.service.CourseService;
import com.comp9323.coursereview.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import util.ResultVOUtil;

import javax.validation.Valid;
import javax.xml.transform.Result;

@RestController
@RequestMapping("/course")
@Slf4j
@CrossOrigin
public class CourseController {
    @Autowired
    private CourseService courseService;

    @PostMapping("/add")
    public ResultVO add(@Valid CourseForm courseForm, BindingResult bindingResult
    ){
        if(bindingResult.hasErrors()){
            log.error("There is error in parameters, userDetailForm = {}", courseForm);
            throw new HolirooException(ResultEnum.COURSE_FORM_ERROR.getCode(), bindingResult.getFieldError().getDefaultMessage());
        }

        //Model newModel = ResultVO2ModelConverter.convert(model, ResultVOUtil.success(userService.signUp(userDetail)));
        //return new ModelAndView("/index","model",newModel);

        return ResultVOUtil.success(courseService.add(courseForm));

    }

    @GetMapping("/list")
    public ResultVO list(){
        return ResultVOUtil.success(courseService.list());
    }

    @PostMapping("/getOne")
    public ResultVO search(@RequestParam("courseCode") String courseCode){

        return ResultVOUtil.success(courseService.search(courseCode));
    }

    @PostMapping("/compare")
    public ResultVO compare(@RequestParam("courseCode1") String courseCode1,
                            @RequestParam("courseCode2") String courseCode2){

        return ResultVOUtil.success(courseService.compare(courseCode1,courseCode2));
    }

    //TODO: search

}
