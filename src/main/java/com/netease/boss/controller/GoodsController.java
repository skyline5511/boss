package com.netease.boss.controller;

import com.alibaba.fastjson.JSON;
import com.netease.boss.domain.Content;
import com.netease.boss.mapper.ContentMapper;
import com.netease.boss.util.MyJson;
import org.apache.ibatis.annotations.Param;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/goods")
public class GoodsController {
    @Resource
    private ContentMapper contentDao;

    @RequestMapping(value = "/getList", method = RequestMethod.POST)
    public String getList(){
        List<Content> cList = new ArrayList<Content>();
        cList = contentDao.selectAll();
        return JSON.toJSONString(cList);
    }

    @RequestMapping(value = "/get", method = RequestMethod.GET)
    public String get(@Param("id")int id){
        Content result = contentDao.selectByPrimaryKey(id);
        return JSON.toJSONString(result);
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public String update(@ModelAttribute Content content ){
        contentDao.updateByPrimaryKey(content);
        MyJson result = new MyJson();
        result.setCode(200);
        return MyJson.toJSON(result);
    }

    @RequestMapping(value="/delete", method = RequestMethod.POST)
    public String delGoods(@RequestBody String id){
//        System.out.println(id);
        id = id.split("=")[1];
        contentDao.deleteByPrimaryKey(Integer.valueOf(id));
        MyJson result = new MyJson();
        result.setCode(200);
        return MyJson.toJSON(result);
    }
}
