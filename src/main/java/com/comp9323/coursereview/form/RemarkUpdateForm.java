package com.comp9323.coursereview.form;

import lombok.Data;

import javax.validation.constraints.NotEmpty;

@Data
public class RemarkUpdateForm {
    @NotEmpty(message = "remark id can not be empty")
    private String remarkId;

    @NotEmpty(message = "course id can not be empty")
    private String courseId;

    @NotEmpty(message = "over all mark can not be empty")
    private String remarkOverallMark;

    @NotEmpty(message = "difficulty all mark can not be empty")
    private String remarkDifficultyMark;

    @NotEmpty(message = "content can not be empty")
    private String remarkContent;

    @NotEmpty(message = "customer id can not be empty")
    private String remarkUserId;

    @NotEmpty(message = "customer name can not be empty")
    private String remarkUserName;
}
