package com.comp9323.coursereview.controller;

import com.comp9323.coursereview.VO.ResultVO;
import com.comp9323.coursereview.enums.ResultEnum;
import com.comp9323.coursereview.exception.HolirooException;
import com.comp9323.coursereview.form.CourseForm;
import com.comp9323.coursereview.service.CourseService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import com.comp9323.coursereview.util.ResultVOUtil;

import javax.validation.Valid;

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

        return ResultVOUtil.success(courseService.getOne(courseCode));
    }

    @PostMapping("/compare")
    public ResultVO compare(@RequestParam("courseCode1") String courseCode1,
                            @RequestParam("courseCode2") String courseCode2){

        return ResultVOUtil.success(courseService.compare(courseCode1,courseCode2));
    }

    @GetMapping("/rankByOverallRanking")
    public ResultVO rankByOverallRanking(){
        return ResultVOUtil.success(courseService.rankByOverallRanking());
    }

    @GetMapping("/rankByDifficultyRanking")
    public ResultVO rankByDifficultyRanking(){
        return ResultVOUtil.success(courseService.rankByDifficultyRanking());
    }

    @GetMapping("/rankByPassRate")
    public ResultVO rankByPassRate(){
        return ResultVOUtil.success(courseService.rankByPassRate());
    }

    @GetMapping("/rankByPopularity")
    public ResultVO rankByPopularity(){
        return ResultVOUtil.success(courseService.rankByPopularity());
    }

    //TODO: search
    @PostMapping("/search")
    public ResultVO compare(@RequestParam("keyword") String keyword){

        return ResultVOUtil.success(courseService.match(keyword));
    }

    @PostMapping("/level")
    public ResultVO level(@RequestParam("level") String level){
        return ResultVOUtil.success(courseService.findByLevel(level));
    }



}
