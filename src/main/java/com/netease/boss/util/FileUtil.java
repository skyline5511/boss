package com.netease.boss.util;

import java.io.File;
import java.io.FileOutputStream;

public class FileUtil {
    public static void uploadFile(byte[] file, String filePath, String fileName) throws Exception {
        File targetFile = new File(filePath);
        if(!targetFile.exists()){
            targetFile.mkdirs();
        }
        FileOutputStream out = new FileOutputStream(filePath+fileName);
        out.write(file);
        out.flush();
        out.close();
    }
}
//package com.netease.boss.mapper;
//
//        import com.netease.boss.domain.Content;
//        import org.apache.ibatis.annotations.Param;
//
//        import java.util.List;
//
//public interface ContentMapper {
//    int deleteByPrimaryKey(Integer id);
//
//    int insert(Content record);
//
//    int insertSelective(Content record);
//
//    Content selectByPrimaryKey(Integer id);
//
//    int updateByPrimaryKeySelective(Content record);
//
//    int updateByPrimaryKey(Content record);
//
//    List<Content> selectAll();
//
//    int updateIsBuy(@Param("num")int num, @Param("id")int id);
//}