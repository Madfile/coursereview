package com.comp9323.coursereview.service;


import com.comp9323.coursereview.dataObject.Remark;
import com.comp9323.coursereview.dataObject.UserDetail;
import com.comp9323.coursereview.dto.RemarkDTO;
import com.comp9323.coursereview.form.RemarkForm;
import com.comp9323.coursereview.form.UserUpdateForm;

import java.util.List;

public interface RemarkService {

    List<RemarkDTO> save(RemarkForm remarkForm);

    List<RemarkDTO> delete(String remarkId, String userId);

    List<RemarkDTO> list(String courseCode, String userId);
}
