package com.comp9323.coursereview.controller;


import com.comp9323.coursereview.VO.ResultVO;
import com.comp9323.coursereview.service.LikeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.comp9323.coursereview.util.ResultVOUtil;

@RestController
@RequestMapping("/like")
@Slf4j
@CrossOrigin
public class LikeController {
    @Autowired
    private LikeService likeService;

    @PostMapping("/update")
    public ResultVO delete(@RequestParam("userId") String userId,
                           @RequestParam("remarkId") String remarkId,
                           @RequestParam("courseCode") String courseCode
    ) {

        return ResultVOUtil.success(likeService.update(userId, remarkId, courseCode));
    }


}
