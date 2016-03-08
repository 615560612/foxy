package com.xm.foxy.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.xm.foxy.dao.LogMapper;
import com.xm.foxy.model.Log;
import com.xm.foxy.model.User;
import com.xm.foxy.service.LogService;
import com.xm.foxy.service.UserService;

@Service("logService")
public class LogServiceImpl implements LogService {
	@Autowired
	private LogMapper logMapper;
	@Autowired
	private UserService userService;
	@Override
	public void log(Log log) {
		logMapper.insert(log);
	}
	@Override
	public String loginUserId() {
		if (SecurityContextHolder.getContext() == null) {
			return null;
		}
		if (SecurityContextHolder.getContext().getAuthentication() == null) {
			return null;
		}
		UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		if (userDetails == null) {
			return null;
		}
		// 获取登录管理员帐号名
		String userName = userDetails.getUsername();
		if (userName == null || userName.equals("")) {
			return null;
		}
		// 根据管理员帐号名获取帐号ID
		User user = userService.findUserByName(userName);
		if (user == null) {
			return null;
		}
		return user.getId();
	}
}
