package com.usee.dao;

import java.util.List;

import com.usee.model.Topic;

public interface TopicDao {

	public Topic getTopic(String id);

	public List<Topic> getAllTopic();

	public void addTopic(Topic topic);

	public boolean delTopic(String id);

	public List getUserTopicsID(String userID);

	public List getUserTopics(String topicID);

	public List getAllTopicId();

	public void updateUser_topic(String userID,String topicID);

	public List<Topic> searchTopic(String keyword);

    public List<String> getTopicsbyDanmuNum(int num);

    public String getTopicTitleForWeb(String topicID);

	public List<Topic> getTopicsbyType(String typeID);
	
	public void updateType(String topicID, int type);
	
	public String getTopicIDBytitle(String topicTitle);

}
