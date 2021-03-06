package com.usee.dao;

import java.util.List;

import com.usee.model.Danmu;

public interface DanmuDao {

	public void saveDanmu(Danmu danmu);
	
	public Danmu getDanmu(int id);

	public List<Danmu> getDanmuList(String topicId);
	
	public List<Danmu> getDanmuList(String topicId, int pageNum,
			int pageSize);

    public List<Danmu> getLatestDanmuList(String topicId, String startTime, String T);

	//public List<Object[]> getDanmuDetails(int danmuId);
	
	public int getLatestDanmuId();
	
	public List getDanmubyUserId(String userId);
	
	public String getTopicIdbyDanmuId(int danmuId);
	
	public String getUserIDbyDanmuId(int danmuId);
	
	public boolean updateUserUpDanmu(Boolean isUp, String userId, int danmuId, String upTime);
	
	public boolean updateUserDownDanmu(Boolean isDown, String userId, int danmuId, String downTime);
	
	public boolean updateUserFavDanmu(Boolean isFav, String userId, int danmuId, String favTime);
	
	public void saveUserDanmu(String userId, int danmuId, String firstVisitTime, String lastVisitTime, int frequency);
	
	public int getUniqueUserDanmubyUserIdandDanmuId(String userId, int danmuId);
	
	public void updateUserDanmu(String userId, int danmuId, String lastVisitTime, int frequency);
	
	public int getLatestFrequency();
	
	public List listFavDanmu(String userId);
	
	public int saveUserDanmuAction(String userId, int danmuId, int action, String actionTime);
	
	public int updateUserDanmuAction(String userId, int danmuId, int action, String actionTime);
	
	public int getUniqueUpDownDanmubyUserIdandDanmuId(String userId, int danmuId);
	
	public int getActionbyUserIdandDanmuId(String userId, int danmuId);
	
	public boolean checkUserFavDanmu(String userId, int danmuId);
	
	public int getLatestDanmuIdByUserIdAndTopicId(String userId, String topicId);

    public int updateReport(String reporter, String contentUserId, String contentId, String contentType, String reportTime, int reportType);

    public Danmu getDanmuByDanmuIdAndUserId(int danmuID, String userID);
    
    public boolean deleteUpdownDanmu(int danmuID);

    public boolean deleteUser_Danmu(int danmuID);
    
    public boolean deleteUserFavDanmu(int danmuID);
    
    public boolean deleteDanmu(int danmuID);
    
    public List<Danmu> getDanmuListByInterval(String topicID, String startTime, String endTime);

    public List<Object[]> getNewDanmu(String createTime);
    
    public boolean hasRealnameDmByUserIdAndTopicId(String userID, String topicID);
    
    public List<Danmu> getDanmuByTopicIdAndUserId(String userID, String topicID);
    
    public List<Danmu> getHotDanmu(String topicID);
}
