package com.xm.foxy.model;

import java.io.Serializable;
import java.util.Date;

public class Log implements Serializable{

	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database column t_log.id
	 * @mbggenerated  Tue Mar 08 00:36:16 CST 2016
	 */
	private String id;
	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database column t_log.userId
	 * @mbggenerated  Tue Mar 08 00:36:16 CST 2016
	 */
	private String userId;
	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database column t_log.createdate
	 * @mbggenerated  Tue Mar 08 00:36:16 CST 2016
	 */
	private Date createdate;
	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database column t_log.content
	 * @mbggenerated  Tue Mar 08 00:36:16 CST 2016
	 */
	private String content;
	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database column t_log.operation
	 * @mbggenerated  Tue Mar 08 00:36:16 CST 2016
	 */
	private String operation;

	/**
	 * This method was generated by MyBatis Generator. This method returns the value of the database column t_log.id
	 * @return  the value of t_log.id
	 * @mbggenerated  Tue Mar 08 00:36:16 CST 2016
	 */
	public String getId() {
		return id;
	}

	/**
	 * This method was generated by MyBatis Generator. This method sets the value of the database column t_log.id
	 * @param id  the value for t_log.id
	 * @mbggenerated  Tue Mar 08 00:36:16 CST 2016
	 */
	public void setId(String id) {
		this.id = id;
	}

	/**
	 * This method was generated by MyBatis Generator. This method returns the value of the database column t_log.userId
	 * @return  the value of t_log.userId
	 * @mbggenerated  Tue Mar 08 00:36:16 CST 2016
	 */
	public String getUserId() {
		return userId;
	}

	/**
	 * This method was generated by MyBatis Generator. This method sets the value of the database column t_log.userId
	 * @param userId  the value for t_log.userId
	 * @mbggenerated  Tue Mar 08 00:36:16 CST 2016
	 */
	public void setUserId(String userId) {
		this.userId = userId;
	}

	/**
	 * This method was generated by MyBatis Generator. This method returns the value of the database column t_log.createdate
	 * @return  the value of t_log.createdate
	 * @mbggenerated  Tue Mar 08 00:36:16 CST 2016
	 */
	public Date getCreatedate() {
		return createdate;
	}

	/**
	 * This method was generated by MyBatis Generator. This method sets the value of the database column t_log.createdate
	 * @param createdate  the value for t_log.createdate
	 * @mbggenerated  Tue Mar 08 00:36:16 CST 2016
	 */
	public void setCreatedate(Date createdate) {
		this.createdate = createdate;
	}

	/**
	 * This method was generated by MyBatis Generator. This method returns the value of the database column t_log.content
	 * @return  the value of t_log.content
	 * @mbggenerated  Tue Mar 08 00:36:16 CST 2016
	 */
	public String getContent() {
		return content;
	}

	/**
	 * This method was generated by MyBatis Generator. This method sets the value of the database column t_log.content
	 * @param content  the value for t_log.content
	 * @mbggenerated  Tue Mar 08 00:36:16 CST 2016
	 */
	public void setContent(String content) {
		this.content = content;
	}

	/**
	 * This method was generated by MyBatis Generator. This method returns the value of the database column t_log.operation
	 * @return  the value of t_log.operation
	 * @mbggenerated  Tue Mar 08 00:36:16 CST 2016
	 */
	public String getOperation() {
		return operation;
	}

	/**
	 * This method was generated by MyBatis Generator. This method sets the value of the database column t_log.operation
	 * @param operation  the value for t_log.operation
	 * @mbggenerated  Tue Mar 08 00:36:16 CST 2016
	 */
	public void setOperation(String operation) {
		this.operation = operation;
	}
}