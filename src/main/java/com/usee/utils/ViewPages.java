package com.usee.utils;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

/**
 * 此类为保存安卓端的ViewPages信息并提供方法得到信息
 * @author lhx
 *
 */
public class ViewPages {
	public static final String FILEPATH = API.PROJECT_PATH + "res/viewpages/viewpages.xml";
	
    public static List<Map<String, String>> getViewPageInfo() {
    	List<Map<String, String>> returnList =  new ArrayList<Map<String, String>>();
    	SAXReader reader = new SAXReader();
        Document document = null;
		try {
			document = reader.read(new File(FILEPATH));
		} catch (DocumentException e) {
			e.printStackTrace();
		}
        Element root = document.getRootElement();
		for (Object object : root.elements()) {
			Map<String, String> viewpageMap = new HashMap<String, String>();
			Element element = (Element) object;
			viewpageMap.put("title", element.elementText("title"));
			viewpageMap.put("type", element.elementText("type"));
			viewpageMap.put("imageurl", element.elementText("imageurl"));
			returnList.add(viewpageMap);
		}
        return returnList;
    }
}
