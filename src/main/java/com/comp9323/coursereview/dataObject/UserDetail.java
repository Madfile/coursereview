package com.comp9323.coursereview.dataObject;

import lombok.Data;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.math.BigDecimal;
import java.util.Date;


@Entity
@Data
@DynamicUpdate
public class UserDetail {

    @Id
    private String userId;

    private String userName;

    private String userEmail;

    private String userPassword;

    private String userGender;

    private String userPhone;

    private Date createTime;

    private Date updateTime;
}
