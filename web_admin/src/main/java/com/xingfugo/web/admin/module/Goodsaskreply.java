package com.xingfugo.web.admin.module;

import org.hibernate.validator.constraints.NotBlank;

public class Goodsaskreply {
	private Integer trade_id;
	@NotBlank
	private String re_content;
	
	private String c_content;
	
	public String getC_content() {
		return c_content;
	}

	public void setC_content(String c_content) {
		this.c_content = c_content;
	}

	public Integer getTrade_id() {
		return trade_id;
	}

	public void setTrade_id(Integer trade_id) {
		this.trade_id = trade_id;
	}

	public String getRe_content() {
		return re_content;
	}

	public void setRe_content(String re_content) {
		this.re_content = re_content;
	}
}
