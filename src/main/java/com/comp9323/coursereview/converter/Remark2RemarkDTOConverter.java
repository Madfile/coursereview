package com.comp9323.coursereview.converter;

import com.comp9323.coursereview.dataObject.Remark;
import com.comp9323.coursereview.dto.RemarkDTO;
import lombok.Data;

import java.text.SimpleDateFormat;

@Data
public class Remark2RemarkDTOConverter {
    public static RemarkDTO convert(Remark remark) {
        System.out.println("1");
        RemarkDTO remarkDTO = new RemarkDTO();
        remarkDTO.setCourseId(remark.getCourseId());
        remarkDTO.setRemarkContent(remark.getRemarkContent());
        remarkDTO.setRemarkDifficultyMark(remark.getRemarkDifficultyMark());
        remarkDTO.setRemarkId(remark.getRemarkId());
        remarkDTO.setRemarkOverallMark(remark.getRemarkOverallMark());
        remarkDTO.setRemarkUserId(remark.getRemarkUserId());
        remarkDTO.setRemarkUsername(remark.getRemarkUserName());
        System.out.println("2");
        if (remark.getUpdateTime() != null) {
            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            remarkDTO.setUpdateTime(format.format(remark.getUpdateTime()));
        } else {
            remarkDTO.setUpdateTime("Just now");
        }
        //remarkDTO.setUpdateTime(remark.getUpdateTime().toString());


        return remarkDTO;
    }
}
