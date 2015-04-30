// $(document).ready(function(){

var bbCountDemo = 0;

$("#botBig1").on("tap",function(){
	
	switch(bbCountDemo){
		case 0:
			$.bigBox({
				title: "Close up mode",
				content: "BigBoxes can show a lot of information an has a different behavior",
				img: "static/img/close_up_mode-50.png",
				width: 250,
			});
			bbCountDemo = 1;
		break;

		case 1:
			$.bigBox({
				title: "Night Portrait",
				content: "BigBoxes can show a lot of information an has a different behavior",
				img: "static/img/night_portrait-50.png",
				color: "#C735E2",
				width: 300,
			});
			bbCountDemo = 2;
		break;

		case 2:
			$.bigBox({
				title: "Clipper board",
				content: "BigBoxes can show a lot of information an has a different behavior",
				img: "static/img/clipperboard-50.png",
				color: "#1B7CBD",
				width: 350,
			});
			bbCountDemo = 3;
		break;

		case 3:
			$.bigBox({
				title: "Leaf",
				content: "BigBoxes can show a lot of information an has a different behavior",
				img: "static/img/leaf-50.png",
				color: "#8165A2",
				width: 400,
			});
			bbCountDemo = 4;
		break;

		case 4:
			$.bigBox({
				title: "Sports Mode",
				content: "BigBoxes can show a lot of information an has a different behavior",
				img: "static/img/sports_mode-50.png",
				color: "#CE6B00",
				width: 450,
			});
			bbCountDemo = 0;
		break;
	}

	


});

$("#botBig2").on("tap",function(){

	$.bigBox({
			position: 2,
			title: "Do you like BigBoxes?",
			content: "Feel free to answer, I don't be offended :)",
			width: 250,
			fa: "fa-question-circle",
			buttons: ["I like it","Naahhh"]
		},function(action, buttonPress){
			alert("action: "+ action + "  Clicked button: " + buttonPress);
		});

});

$("#botBigNuke").on("tap",function(){
	$.bigBoxKill();
});

var TimerbigBox;
var BigBoxCounter = 0;
$("#botBig3").on("tap",function(){


	clearInterval(TimerbigBox)
	BigBoxCounter = 0;

	$.bigBox({
			position:2,
			sound:false,
			title: "Colors",
			content: "Wait a sec..",
			// img: "static/img/butterfly-50.png",
			colors: ["#ba007c","#960165","#58167d","#3c1859"],
			width: 130,
		});

	TimerbigBox = setInterval(function(){

		if( BigBoxCounter >= 3){
			clearInterval(TimerbigBox);
		}
		BigBoxCounter +=1;

		$.bigBox({
			position:2,
			sound:false,
			title: "Colors",
			content: "Wait a sec..",
			// img: "static/img/butterfly-50.png",
			colors: ["#ba007c","#960165","#58167d","#3c1859"],
			width: 130,
		});

	},200)


});


$("#botBig4").on("tap",function(){

	$.bigBox({
			sound:false,
			color: "#58167D",
			title: "Time Out",
			content: "Big Boxes work like SmallBoxes. <br/> If cursor is hover this element and time out is reached. It will remain until mouse out.",
			img: "static/img/flower-50.png",
			width: 350,
			timeout: 3000,
			number: "3 seconds"
		});

});
