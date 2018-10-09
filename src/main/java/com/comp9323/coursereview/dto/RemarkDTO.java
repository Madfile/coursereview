package com.comp9323.coursereview.dto;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class RemarkDTO {
    private String remarkId;

    private String courseId;

    private int remarkOverallMark;

    private int remarkDifficultyMark;

    private String remarkContent;

    private String remarkUserId;

    private String remarkUsername;

    private int numberOfLike;

    private boolean userLiked;

    private String updateTime;
}
