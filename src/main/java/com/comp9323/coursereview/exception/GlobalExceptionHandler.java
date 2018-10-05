package com.comp9323.coursereview.exception;

import VO.ResultVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.servlet.http.HttpServletRequest;

@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(value = HolirooException.class)
    @ResponseBody
    public ResultVO errorHandler(HttpServletRequest request, HolirooException e) throws Exception{
        ResultVO resultVO = new ResultVO();
        resultVO.setCode(e.getCode());
        resultVO.setMsg(e.getMessage());
        resultVO.setData(null);

        return resultVO;
    }

    @ExceptionHandler(value = Exception.class)
    @ResponseBody
    public ResultVO generalErrorHandler(HttpServletRequest request, HolirooException e) throws Exception {

        ResultVO resultVO = new ResultVO();
        resultVO.setCode(e.getCode());
        resultVO.setMsg(e.getMessage());
        resultVO.setData(null);

        return resultVO;
    }
}
