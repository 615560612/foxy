package com.xm.foxy.controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.xm.foxy.service.UserService;

@Controller
@RequestMapping("/common")
public class CommonController {

	@Resource
	private UserService userService;

	@RequestMapping("/index")
	public String toIndex() {
		return "feed-view";
	}
}
