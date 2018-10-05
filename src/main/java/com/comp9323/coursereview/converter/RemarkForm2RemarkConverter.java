package com.comp9323.coursereview.converter;

import com.comp9323.coursereview.dataObject.Remark;
import com.comp9323.coursereview.form.RemarkForm;
import lombok.Data;

@Data
public class RemarkForm2RemarkConverter {
    public static Remark convert(RemarkForm remarkForm){
        Remark remark = new Remark();
        remark.setCourseId(remarkForm.getCourseId());
        remark.setRemarkContent(remarkForm.getRemarkContent());
        remark.setRemarkDifficultyMark(Integer.valueOf(remarkForm.getRemarkDifficultyMark()));
        remark.setRemarkOverallMark(Integer.valueOf(remarkForm.getRemarkOverallMark()));
        remark.setRemarkUserId(remarkForm.getRemarkUserId());
        remark.setRemarkUserName(remarkForm.getRemarkUserName());

        return remark;
    }
}
