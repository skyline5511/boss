package com.netease.boss.controller;

import com.alibaba.fastjson.JSON;
import com.netease.boss.domain.User;
import com.netease.boss.mapper.UserMapper;
import com.netease.boss.util.MyJson;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/api")
public class LoginController {
    @Resource
    private UserMapper userDao;

    @RequestMapping(value="/login", method=RequestMethod.POST)
    public String login(HttpServletRequest request, HttpSession session) {
        String userName = request.getParameter("userName");
        String password = request.getParameter("password");
        User user = userDao.selectByPrimaryKey(userName);
        String pswd = "";
        if(user != null){
            pswd = user.getPassword();
        }
        MyJson result = new MyJson();
        if(password.equals(pswd)){
            session.setAttribute("userName", userName);
            result.setCode(200);
            result.setResult(userName);

        }
        return MyJson.toJSON(result);
    }

    @RequestMapping(value="/logout", method=RequestMethod.POST)
    public String logout(HttpSession session) {
        session.removeAttribute("userName");
        MyJson result = new MyJson();
        result.setCode(200);
        return MyJson.toJSON(result);
    }
}