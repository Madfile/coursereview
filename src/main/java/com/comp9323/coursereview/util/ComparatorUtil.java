package com.comp9323.coursereview.util;

import com.comp9323.coursereview.dto.CourseDTO;
import lombok.Data;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@Data
public class ComparatorUtil {
    public static void sortListByOverallRating(List<CourseDTO> list) {
        Collections.sort(list, new Comparator<CourseDTO>() {
            @Override
            public int compare (CourseDTO o1, CourseDTO o2){
                if (Float.valueOf(o1.getCourseOverallRating()) > Float.valueOf(o2.getCourseOverallRating())) {
                    return -1;
                } else if (Float.valueOf(o1.getCourseOverallRating()) < Float.valueOf(o2.getCourseOverallRating())) {
                    return 1;
                } else {
                    return 0;
                }
            }
        });
    }

    public static void sortListByDifficultyRating(List<CourseDTO> list) {
        Collections.sort(list, new Comparator<CourseDTO>() {
            @Override
            public int compare (CourseDTO o1, CourseDTO o2){
                if (Float.valueOf(o1.getCourseDifficultyRating()) > Float.valueOf(o2.getCourseDifficultyRating())) {
                    return 1;
                } else if (Float.valueOf(o1.getCourseDifficultyRating()) < Float.valueOf(o2.getCourseDifficultyRating())) {
                    return -1;
                } else {
                    return 0;
                }
            }
        });
    }

    public static void sortListByPassRate(List<CourseDTO> list) {
        Collections.sort(list, new Comparator<CourseDTO>() {
            @Override
            public int compare (CourseDTO o1, CourseDTO o2){
                if (Float.valueOf((o1.getCoursePassRate().substring(0,o1.getCoursePassRate().length()-1))) > Float.valueOf(o2.getCoursePassRate().substring(0,o1.getCoursePassRate().length()-1))) {
                    return -1;
                } else if (Float.valueOf((o1.getCoursePassRate().substring(0,o1.getCoursePassRate().length()-1))) < Float.valueOf(o2.getCoursePassRate().substring(0,o1.getCoursePassRate().length()-1))) {
                    return 1;
                } else {
                    return 0;
                }
            }
        });
    }


    public static void sortListByNumberOfRemarks(List<CourseDTO> list) {
        Collections.sort(list, new Comparator<CourseDTO>() {
            @Override
            public int compare (CourseDTO o1, CourseDTO o2){
                if (Float.valueOf(o1.getNumberOfRemarks()) > Float.valueOf(o2.getNumberOfRemarks())) {
                    return -1;
                } else if (Float.valueOf(o1.getNumberOfRemarks()) < Float.valueOf(o2.getNumberOfRemarks())) {
                    return 1;
                } else {
                    return 0;
                }
            }
        });
    }
}
