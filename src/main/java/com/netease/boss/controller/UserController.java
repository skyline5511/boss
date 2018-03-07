package com.netease.boss.controller;

import com.alibaba.fastjson.JSON;
import com.netease.boss.util.MyJson;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/user")
public class UserController {

    @RequestMapping("/getName")
    public String getName(HttpSession session){
        String userName = (String) session.getAttribute("userName");
        MyJson result = new MyJson();
        if(userName != null){
           result.setCode(200);
           result.setResult(userName);
        }
        return MyJson.toJSON(result);
    }
}
