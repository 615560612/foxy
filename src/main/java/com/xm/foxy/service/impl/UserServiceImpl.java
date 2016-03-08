package com.xm.foxy.service.impl;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xm.foxy.dao.UserMapper;
import com.xm.foxy.model.User;
import com.xm.foxy.service.UserService;

@Service("userService")
public class UserServiceImpl implements UserService {
	@Autowired
	private UserMapper userMapper;

	@Override
	public User getUserById(String userId) {
		return userMapper.selectByPrimaryKey(userId);
	}

	@Override
	public User findUserByName(String userName) {
		return userMapper.findUserByName(userName);
	}

	@Override
	public List<User> getAll() {
		return userMapper.findAll();
	}

	@Override
	public void insertBatch(User[] users) {
		userMapper.insertBatch(Arrays.asList(users));
	}

}
