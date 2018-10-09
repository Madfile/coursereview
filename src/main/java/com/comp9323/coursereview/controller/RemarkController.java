package com.comp9323.coursereview.controller;

import com.comp9323.coursereview.VO.ResultVO;
import com.comp9323.coursereview.enums.ResultEnum;
import com.comp9323.coursereview.exception.HolirooException;
import com.comp9323.coursereview.form.RemarkForm;
import com.comp9323.coursereview.service.RemarkService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import com.comp9323.coursereview.util.ResultVOUtil;

import javax.validation.Valid;

@RestController
@RequestMapping("/remark")
@Slf4j
@CrossOrigin
public class RemarkController {

    @Autowired
    private RemarkService remarkService;

    @PostMapping("/save")
    public ResultVO add(@Valid RemarkForm remarkForm, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            log.error("There is error in parameters, remarkForm = {}", remarkForm);
            throw new HolirooException(ResultEnum.REMARK_FORM_ERROR.getCode(), bindingResult.getFieldError().getDefaultMessage());
        }

        return ResultVOUtil.success(remarkService.save(remarkForm));
    }

    @PostMapping("/delete")
    public ResultVO delete(@RequestParam("remarkId") String remarkId, String userId){

        return ResultVOUtil.success(remarkService.delete(remarkId, userId));
    }
//
//    @PostMapping("/update")
//    public ResultVO update(@Valid RemarkUpdateForm remarkUpdateForm, BindingResult bindingResult) {
//        if (bindingResult.hasErrors()) {
//            log.error("There is error in parameters, remarkUpdateForm = {}", remarkUpdateForm);
//            throw new HolirooException(ResultEnum.REMARK_UPDATE_FORM_ERROR.getCode(), bindingResult.getFieldError().getDefaultMessage());
//        }
//
//        return ResultVOUtil.success(remarkService.update(remarkUpdateForm));
//    }
//
//
    @PostMapping("/list")
    public ResultVO list(@RequestParam("courseCode") String courseCode,
                         @RequestParam("userId") String userId) {

        return ResultVOUtil.success(remarkService.list(courseCode, userId));
    }
//
//    @RequestMapping("/getOne")
//    public ResultVO getOne(@RequestParam("remarkCustomerId") String remarkCustomerId,
//                           @RequestParam("remarkId") String remarkId) {
//
//        return ResultVOUtil.success(remarkService.getOne( remarkId, remarkCustomerId));
//    }
}

