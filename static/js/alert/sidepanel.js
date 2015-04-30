$("#botSidePanel1").on("tap",function(){

	$.metroSidePanel({
		// position: 1
		title: "Metro Sidepanel",
		content: "You know, this can help you to show everything you want.<br/><br/>Even iFrames with cache!",
		backgroundcontent: "#1B7CBD",
		fa: "fa-pagelines",
	});


});


$("#botSidePanel2").on("tap",function(){

	$.metroSidePanel({
		position: 2,
		iframe: "secundary.html",
		iframecache: false,
		backgroundcontent: "#1B7CBD",
	});


});


$("#botSidePanel3").on("tap",function(){

	$.metroSidePanel({
		position: 2,
		width:300,
		iframe: "http://m.wikipedia.org",
		iframecache: true,
		backgroundcontent: "#1B7CBD",
	});


});


$("#botSidePanel4").on("tap",function(){

	$.metroSidePanel({
		title: "Colors!!!",
		content: "Every plugin can hold an array of colors!",
		fa: "fa-star-o fa-spin",
		colors: ["#208AAF","#C53FDF", "#6D1D99"],
	});


});

$("#botSidePanel5").on("tap",function(){

	$.metroSidePanel({
		position:2,
		title: "Time Out",
		content: "This is blocked. Please wait 4 seconds",
		fa: "fa-clock-o",
		backgroundcontent:"#C53FDF",
		timeout: 5000,
		blocked: true,
	});


});



$("#botSidePanel6").on("tap",function(){

	$.metroSidePanel({
		title: "Blocked!!",
		content: "This Sidepanel is blocked until you call <br/>$.sidePanelKill( )<br/><br/><a class='color-8 puerto-btn-1 closeAll'><span><i class='fa fa-trash-o'></i></span><small>Close!</small></a><br/>",
		fa: "fa-lock",
		blocked: true,
		width: 200,
	});


});

$("#botSidePanel7").on("tap",function(){

	$.sidePanelKill();

});

$("body").on("tap",".closeAll",function(){
	$.sidePanelKill();
});


