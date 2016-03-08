package com.xm.foxy.controller;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xm.foxy.model.User;
import com.xm.foxy.response.model.BaseResponse;
import com.xm.foxy.service.UserService;

import ch.ralscha.extdirectspring.annotation.ExtDirectMethod;

@Controller
@RequestMapping("/user/")
public class UserController {

	@Resource
	private UserService userService;

	@ExtDirectMethod
	public BaseResponse getUser() {
		User user = this.userService.getUserById("1");
		BaseResponse baseResponse = new BaseResponse();
		baseResponse.setMsg("Success!");
		baseResponse.setSuccess(true);
		baseResponse.setResult(user);
		return baseResponse;
	}

	@RequestMapping("insertBatchUser")
	public String insertBatchUser() {
		return "insert-batch-user";
	}

	@RequestMapping("create")
	public void createUser(@RequestBody User[] users) {
		for(int i = 0;i < users.length;i++){
			System.out.println("create users" + users[i]);
		}
		userService.insertBatch(users);
	}
	
	@RequestMapping("update")
	public void updateUser(@RequestParam String data) {
		System.out.println("update users" + data);
//		userService.insertBatch(users);
	}
	
	@RequestMapping("destroy")
	public void destroyUser(@RequestBody User[] users) {
		System.out.println("destroy users" + users);
		userService.insertBatch(users);
	}

	@RequestMapping("view")
	@ResponseBody
	public List<User> viewUser() {
		return userService.getAll();
	}
}
