package com.comp9323.coursereview.dataObject;

import lombok.Data;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Entity
@DynamicUpdate
@Data
public class Remark {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String remarkId;

    private String courseId;

    private int remarkOverallMark;

    private int remarkDifficultyMark;

    private String remarkContent;

    private String remarkUserId;

    private String remarkUserName;

    private Date createTime;

    private Date updateTime;
}
