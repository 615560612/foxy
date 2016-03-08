package com.xm.foxy.service;

import javax.transaction.Transactional;

import com.xm.foxy.model.Log;

public interface LogService {
	@Transactional  
    public void log(Log log);  
      
    /** 
     * 获取登录管理员ID 
     */  
    public String loginUserId();  
}
