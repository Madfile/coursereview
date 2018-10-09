package com.comp9323.coursereview.dataObject;

import lombok.Data;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Entity
@Data
@DynamicUpdate
public class LikeDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String likeId;

    private String likeUserId;

    private int likeRemarkId;

    private Date createTime;

    private Date updateTime;
}
