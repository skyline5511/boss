package com.netease.boss.mapper;

import com.netease.boss.domain.Content;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ContentMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Content record);

    int insertSelective(Content record);

    Content selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Content record);

    int updateByPrimaryKey(Content record);

    List<Content> selectAll();

    int updateIsBuy(@Param("num")int num, @Param("id")int id);
}