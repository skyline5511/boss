package com.netease.boss.controller;


import com.alibaba.druid.util.StringUtils;
import com.netease.boss.util.FileUtil;
import com.netease.boss.util.MyJson;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;

@RestController
@RequestMapping("/file")
public class uploadFileController {
    @RequestMapping(value="/upload", method = RequestMethod.POST)
    public String uploadImg(@RequestParam("file") MultipartFile file, HttpServletRequest request) {
        String contentType = file.getContentType();
        String fileName = file.getOriginalFilename();
        /*System.out.println("fileName-->" + fileName);
        System.out.println("getContentType-->" + contentType);*/
        String[] types = fileName.split("\\.");
        String type = types[types.length-1];
        String filePath = request.getSession().getServletContext().getRealPath("img/");
        fileName = String.valueOf(new Date().getTime())+"."+type;
        try {
            FileUtil.uploadFile(file.getBytes(), filePath, fileName);
            FileUtil.uploadFile(file.getBytes(), "src/main/resources/static/img/", fileName);
        } catch (Exception e) {
            // TODO: handle exception
        }

       // System.out.println(filePath+fileName);
        //返回json
        MyJson result = new MyJson();
        result.setCode(200);
        result.setResult("img/"+fileName);
        return MyJson.toJSON(result);
    }
}
