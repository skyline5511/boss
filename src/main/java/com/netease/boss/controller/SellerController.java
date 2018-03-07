package com.netease.boss.controller;

import com.alibaba.fastjson.JSON;
import com.netease.boss.domain.Content;
import com.netease.boss.mapper.ContentMapper;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
@RequestMapping("/seller")
public class SellerController {
    @Resource
    private ContentMapper contentDao;

    @RequestMapping(value="/publish", method= RequestMethod.POST)
    public String publish(@ModelAttribute Content content){
        contentDao.insert(content);
        return JSON.toJSONString(1);
    }
}
