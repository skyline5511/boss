package com.netease.boss.controller;


import com.alibaba.fastjson.JSON;
import com.netease.boss.domain.Content;
import com.netease.boss.domain.Record;
import com.netease.boss.mapper.ContentMapper;
import com.netease.boss.mapper.RecordMapper;
import com.netease.boss.util.MyJson;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/record")
public class RecordController {
    @Resource
    private RecordMapper recDao;

    @Resource
    private ContentMapper contentDao;

    @RequestMapping(value="/buy", method = RequestMethod.POST)
    public String buy(@ModelAttribute Record rec){
        MyJson result = new MyJson();
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
        String time = df.format(new Date());// new Date()为获取当前系统时间，也可使用当前时间戳
        int gid = rec.getGid();
        Content content = contentDao.selectByPrimaryKey(gid);
        if(content == null){
            result.setMessage("您要购买的商品已不存在！");
            return MyJson.toJSON(result);
        }
        rec.setPicture(content.getPic());
        rec.setPrice(content.getPrice());
        rec.setTitle(content.getTitle());
        rec.setTime(time);
        recDao.insert(rec);
        contentDao.updateIsBuy(gid, rec.getNum());
        result.setCode(200);
        return MyJson.toJSON(result);
    }

    @RequestMapping(value = "/getRecord", method = RequestMethod.POST)
    public String getRecord(){
        List<Record> rList = recDao.selectAll();
        return JSON.toJSONString(rList);
    }

    @RequestMapping(value="/batchBuy", method = RequestMethod.POST)
    public String batchBuy(@RequestBody Record[] recList){
        MyJson result = new MyJson();
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
        String time = df.format(new Date());// new Date()为获取当前系统时间，也可使用当前时间戳
        for(Record rec : recList){
            int gid = rec.getGid();
            Content content = contentDao.selectByPrimaryKey(gid);
            if(content == null){
                result.setMessage("您要购买的商品已不存在！");
                return MyJson.toJSON(result);
            }
            rec.setPicture(content.getPic());
            rec.setPrice(content.getPrice());
            rec.setTitle(content.getTitle());
            rec.setTime(time);
            recDao.insert(rec);
            contentDao.updateIsBuy(gid, rec.getNum());
        }

        result.setCode(200);
        return MyJson.toJSON(result);
    }
}
