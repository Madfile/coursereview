package com.comp9323.coursereview.form;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

@Data
public class UserUpdateForm {
    @NotEmpty(message = "User id is necessary")
    private String userId;

    @NotEmpty(message = "User name is necessary")
    private String userName;

    @NotEmpty(message = "Password is necessary.")
    private String userPassword;

    @NotEmpty(message = "Email address is necessary.")
    @Email(message = "Email form is no good.")
    private String userEmail;

    @NotEmpty(message = "Gender is necessary")
    private String userGender;

    @NotEmpty(message = "Phone number is necessary.")
    private String userPhone;
}
