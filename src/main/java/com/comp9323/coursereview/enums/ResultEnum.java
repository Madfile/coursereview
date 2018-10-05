package com.comp9323.coursereview.enums;

import lombok.Getter;

@Getter
public enum ResultEnum {

    USER_FORM_ERROR(100, "There is error with user detail form."),
    EMAIL_EXIST(101,"Email has existed, try to sign up with another email address."),
    USER_NOT_EXIST(102, "The user does not exist."),
    WRONG_PASSWORD(103, "The password is wrong."),
    COURSE_FORM_ERROR(200, "There is error with course request form."),
    COURSE_NOT_EXIST(201, "A course code may be not correct"),


    REQUEST_USERID_NOT_MATCH(202, "The user id does not match! warning: Illegal operation!"),
    REQUEST_UPDATE_FORM_ERROR(203, "There is error in the request update form."),
    REMARK_FORM_ERROR(300, "There is error in the form of remark."),
    REMARK_ILLEGAL_ADD(301, "WARNING! Illegal adding remark."),
    REMARK_NOT_EXIST(302, "Remark does not exist."),
    REMARK_UPDATE_FORM_ERROR(303, "There is error in the update form of remark."),
    REMARK_ILLEGAL_UPDATE(304, "WARNING! Illegal updating remark."),
    REMARK_ILLEGAL_SEARCH(305, "WARNING! Illegal searching remark."),
    PROPERTY_FORM_ERROR(500, "There is error with create request form"),
    PROPERTY_UPDATE_FORM_ERROR(501, "There is error with update request form"),
    PROPERTY_NOT_EXIST(502, "The property does not exist!"),
    PROPERTY_ILLEGAL_REQUEST(503, "Warning! The owner does not match."),
    PROPERTY_ILLEGAL_INPUT(504, "Warning! Illegal input."),
    WISHLIST_NOT_EXIST(400,"This property does not exist in the wish-list! "),
    WISHLIST_ALREADY_EXIST(401,"This property is already in the wish-list"),
    ORDER_NOT_EXIST(600,"This order does not exist!"),
    ORDER_NOT_CONFIRM(601,"This order is not confirmed!"),
    CREDICT_NOT_ENOUGH(602,"The user does not have enough credict!"),
    ORDER_NOT_PAID(603,"The order is not paid!"),
    ORDER_ALREADY_CONFIRMED(604,"This order has already confirmed!"),
    ORDER_ALREADY_PAID(605,"This order has already paid!"),
    ORDER_ALREADY_CANCELED(606,"This order has already canceled"),
    ORDER_ALREADY_REMARKED(607,"This order has alreasy remarked"),
    ;


    private int code;
    private String message;

    ResultEnum(int code, String message) {
        this.code = code;
        this.message = message;
    }

}
