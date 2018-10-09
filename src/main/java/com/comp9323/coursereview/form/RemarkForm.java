package com.comp9323.coursereview.form;

import lombok.Data;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;

@Data
public class RemarkForm {

    @NotEmpty(message = "course id can not be empty")
    private String courseId;

    @NotEmpty(message = "please give your overall mark")
    @Min(value = 1, message = "please give your overall mark")
    private String remarkOverallMark;

    @NotEmpty(message = "please give your difficulty  mark")
    @Min(value = 1, message = "please give your difficulty mark")
    private String remarkDifficultyMark;

    @NotEmpty(message = "content can not be empty")
    private String remarkContent;

    @NotEmpty(message = "user id can not be empty")
    private String remarkUserId;

    @NotEmpty(message = "username can not be empty")
    private String remarkUsername;
}

