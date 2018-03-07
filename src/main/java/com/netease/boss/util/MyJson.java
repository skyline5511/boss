package com.netease.boss.util;

import com.alibaba.fastjson.annotation.JSONField;

public class MyJson {
    private int code = 0;
    private String result = "";
    private String message = "";

    public MyJson() {
    }

    public MyJson(int code, String result, String message) {
        this.code = code;
        this.result = result;
        this.message = message;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public int getCode() {
        return code;
    }

    public String getResult() {
        return result;
    }

    public String getMessage() {
        return message;
    }

    public static String toJSON(MyJson json){
        return "{\"code\":\"" + json.getCode() + "\", \"result\":\"" + json.getResult() + "\", \"message\":\"" + json.getMessage() + "\"}";
    }
}
