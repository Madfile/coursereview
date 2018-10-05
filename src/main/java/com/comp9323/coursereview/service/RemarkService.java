package com.comp9323.coursereview.service;


import com.comp9323.coursereview.dataObject.Remark;
import com.comp9323.coursereview.dataObject.UserDetail;
import com.comp9323.coursereview.form.RemarkForm;
import com.comp9323.coursereview.form.UserUpdateForm;

import java.util.List;

public interface RemarkService {

    List<Remark> save(RemarkForm remarkForm);

    List<Remark> delete(String remarkId);

    List<Remark> list(String courseCode);
}
