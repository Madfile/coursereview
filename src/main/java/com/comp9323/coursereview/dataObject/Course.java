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
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String courseId;

    private String courseLevel;

    private String courseCode;

    private String courseName;

    private String coursePassRate;

    private String courseDescription;

    private String courseHandbook;

    private Date createTime;

    private Date updateTime;
}
