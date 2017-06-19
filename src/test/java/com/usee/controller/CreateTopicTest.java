package com.usee.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.ContextHierarchy;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;

@RunWith(SpringJUnit4ClassRunner.class)   
@WebAppConfiguration(value = "src/main/webapp")  
@ContextHierarchy({
    @ContextConfiguration(name = "parent", locations = "classpath:spring-common.xml"),
    @ContextConfiguration(name = "child", locations = "classpath:spring-mvc.xml")
})   
@Transactional
public class CreateTopicTest {

	@Autowired  
    private WebApplicationContext wac;
	private MockMvc mockMvc;     
	
	@Before
	public void setUp() throws Exception {
		 mockMvc = webAppContextSetup(wac).build();         
	}
	
	String getUserIconByTopicJson = "{\"title\":\"测试话题看看\","
			+ "\"description\":\"测试\","
			+ "\"radius\":\"1000\","
			+ "\"lon\":\"118.7868\","
			+ "\"lat\":\"31.9173\","
			+ "\"userid\":\"0028888782364536AE15AD6AEAC2BF1A\","
			+ "\"type\":\"100\","
			+ "\"imgurls\":[],"
			+ "\"videourl\":\"http://oq543v9g0.bkt.clouddn.com/lt0EG7hE9XRoKgBr\"}";
	
	@Test
	public void getUserIconByTopicTest() throws Exception{
		mockMvc.perform((post("/createtopic"))
				.contentType(MediaType.APPLICATION_JSON_VALUE)
				.content(getUserIconByTopicJson.getBytes()) 
				.accept(MediaType.parseMediaType("application/json;charset=UTF-8"))
				)
			.andExpect(status().isOk())
			;
	}
}
