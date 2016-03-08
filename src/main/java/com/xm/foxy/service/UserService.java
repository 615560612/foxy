package com.xm.foxy.service;

import java.util.List;

import com.xm.foxy.model.User;

public interface UserService {
	public User getUserById(String userId);

	public User findUserByName(String userName);

	public List<User> getAll();

	public void insertBatch(User[] users);
}
