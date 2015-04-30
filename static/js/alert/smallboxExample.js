// $(document).ready(function(){
	$("#bot1").on("tap",function(){
		$.smallBox({
			title: "Hello there",
			content: "I'm here to show you this amazing notification system!",
			icon: "static/img/origami-50.png",
		});
	});

	$("#bot2").on("tap",function(){
		$.smallBox({
			position:2,
			title: "Width",
			content: "Now is a property to change!",
			icon: "static/img/invite-50.png",
			color: "#ba007c",
			width: 250,
		});

	});

	$("#bot3").on("tap",function(){
		$.smallBox({
			position:3,
			title: "Images!",
			width: 310,
			content: "200x200px for a HD image!",
			icon: "static/img/christmas_snowflake-50.png",
			color: "#8165a2",
			img: "static/img/pic1.png"
		});


	});

	$("#bot4").on("tap",function(){
		$.smallBox({
			position:4,
			title: "Question?",
			content: "Just for Smallboxes, are you considering in adquire this plugin!?",
			buttons:["Yes!","I need to see more"],
			buttonhover: "#0484ba",
			color: "#009bdb",
		},function(action, buttonText){

			alert("action: "+ action + ", button text: "+ buttonText);
		});

	});

	$("#bot5").on("tap",function(){
		$.smallBoxKill();
	});

	var ColorRange;
	var Counter = 0;
	$("#bot7").on("tap",function(){
		
		Counter = 0;
		clearInterval(ColorRange);

		$.smallBox({
			position:2,
			sound:false,
			title: "Colors",
			content: "Wait a sec..",
			icon: "static/img/butterfly-50.png",
			colors: ["#ba007c","#960165","#58167d","#3c1859"],
			width: 130,
		});

		ColorRange = setInterval(function(){
			Counter +=1;

			$.smallBox({
				sound:false,
				position:2,
				title: "Colors",
				content: "Wait a sec..",
				icon: "static/img/butterfly-50.png",
				colors: ["#ba007c","#960165","#58167d","#3c1859"],
				width: 130,
			});

			if (Counter>=4 ){
				clearInterval(ColorRange);
			};

		},200)

		


	});


	$("#bot8").on("tap",function(){
		$.smallBox({
			title: "Bounce!",
			sound:false,
			content: "Gear dance",
			width:150,
			fa: "fa-gear fa-spin",
			delay: 0
		});

		$.smallBox({
			title: "Bounce!",
			sound:false,
			content: "Star dance",
			width:150,
			fa: "fa-star fa-spin",
			delay: 0.3
		});

		$.smallBox({
			title: "Bounce!",
			sound:false,
			content: "Refresh dance",
			width:150,
			fa: "fa-refresh fa-spin",
			delay: 0.6
		});

		$.smallBox({
			title: "Bounce!",
			sound:false,
			content: "Spinner dance",
			width:150,
			fa: "fa-spinner fa-spin",
			delay: 0.9
		});
	});

	$("#bot9").on("tap",function(){

		$.smallBox({
			position:2,
			title: "HURRY!",
			content: "Move the mouse over me!!! QUICK <br/><br/><br/> Mouse over will block the autoclose, until the pointer leave.",
			icon: "static/img/alarm_clock-50.png",
			color: "#ba007c",
			width: 350,
			sound: false,
			closeonclick: false,
			timeout: 3000,
		});


		$.smallBox({
			position:2,
			delay: 0.5,
			title: "Auto close",
			content: "Small Boxes can be closed automatically and <br/>block the \"click to close\" function if you want.",
			icon: "static/img/alarm_clock-50.png",
			color: "#ba007c",
			width: 350,
			closeonclick: false,
			timeout: 3000,
		});

		

	});