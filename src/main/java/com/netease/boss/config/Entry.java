package com.netease.boss.config;

import com.alibaba.fastjson.serializer.SerializerFeature;
import com.alibaba.fastjson.support.config.FastJsonConfig;
import com.alibaba.fastjson.support.spring.FastJsonHttpMessageConverter;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.web.HttpMessageConverters;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.converter.HttpMessageConverter;

@SpringBootApplication
@ComponentScan(basePackages = "com.netease.boss")
@MapperScan("com.netease.boss.mapper")
public class Entry {
    public static void main(String[] args) throws Exception {
        SpringApplication.run(Entry.class, args);
    }

//    @Bean
//    public HttpMessageConverters fastjsonHttpMessageConverter(){
//        //定义一个转换消息的对象
//        FastJsonHttpMessageConverter fastConverter = new FastJsonHttpMessageConverter();
//
//        //添加fastjson的配置信息 比如 ：是否要格式化返回的json数据
//        FastJsonConfig fastJsonConfig = new FastJsonConfig();
//
//        fastJsonConfig.setSerializerFeatures(SerializerFeature.PrettyFormat);
//
//        //在转换器中添加配置信息
//        fastConverter.setFastJsonConfig(fastJsonConfig);
//
//        HttpMessageConverter<?> converter = fastConverter;
//
//        return new HttpMessageConverters(converter);
//
//    }
}