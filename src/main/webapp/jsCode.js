		
		var foundDanDao = false;
		for ( i=0;i<numOfYongDao;i++) {
			if ( typeof(firstDanmus[i]) === "undefined") {
					firstDanmus[i] = div_barrager;
					var bottom = (barrage.bottom == 0) ? Math.floor(number* window_height /numOfYongDao + 100) : barrage.bottom;
			} else {
				currentMR = firstDanmus[i].css('margin-right');
				currentDMWidth = firstDanmus[i].css("width");	 
				currentDMWidth = parseFloat(currentDMWidth.replace(/px/,""))
				
				alert (currentMR+":" + currentDMWidth);
				if (currentMR - currentDMWidth > 10 ) {
						var bottom = (barrage.bottom == 0) ? Math.floor(i* window_height /numOfYongDao + 100) : barrage.bottom;
						foundDanDao = true;
						firstDanmus[i] = div_barrager;
				}
			}
		
		// if (bottom > window_height) 	{bottom = bottom =100;}
		
		if(foundDanDao) {		
			div_barrager.css("bottom", bottom + "px");
			alert(div_barrager + "Is in :" + bottom ) ;
		} else {
			div_barrager.remove();
		}