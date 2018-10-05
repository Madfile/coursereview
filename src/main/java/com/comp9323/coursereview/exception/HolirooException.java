package com.comp9323.coursereview.exception;


import com.comp9323.coursereview.enums.ResultEnum;
import lombok.Data;

@Data
public class HolirooException extends RuntimeException{

    private Integer code;

    public HolirooException(ResultEnum resultEnum){

        super(resultEnum.getMessage());

        this.code = resultEnum.getCode();
    }

    public HolirooException(Integer code, String message) {

        super(message);

        this.code = code;
    }
}
