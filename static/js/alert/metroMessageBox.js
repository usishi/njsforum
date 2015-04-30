$("#botMsg1").on("tap",function(){

	$.metroMessageBox({
		title: "Did you like it?",
		content: "You now, all this features are almost for free! ( $5 )",
		buttons: ["Yes, I want to buy it now!","No, I want more"],
		icons: ["fa-thumbs-o-up", "fa-times"],
		activebutton:"#139B80",
	},function(action, buttonPress){

		alert("action: "+ action + "  ButtonPress: " + buttonPress);

		if(buttonPress == "Yes, I want to buy it now!"){
			window.location = "http://codecanyon.net/item/metro-notifications/3903495";
		}

	});
});


$("#botMsg2").on("tap",function(){

	$.metroMessageBox({
		title: "Is getting better!",
		content: "Metro MessageBox is getting bigger and Stronger!",
		buttons: ["Button 1","Button 2","Button 3","Button 4"],
		defaultbutton: 1,
		icons: ["fa-paper-plane-o"],
		activebutton:"#139B80",
	});


});



$("#botMsg3").on("tap",function(){

	$.metroMessageBox({
		title: "What do you think?",
		content: "Do I get your attention, right?",
		buttons: ["Wow!"],
		icons: ["fa-child"],
		opacity: 1,
		backgroundcolor: "#6D1D99",
		backgroundcontent: "#6D1D99",
		normalbutton: "#232323",
		icons: ["fa-paper-plane-o"],
		// activebutton:"#6D1D99",
	});

});

$("#botMsg4").on("tap",function(){

	$.metroMessageBox({
		title: "Just for $6?",
		content: "You gotta be kidding me!?",
		buttons: ["Looks Amazing!!","Too much color for me"],
		icons: ["fa-thumbs-o-up","fa-thumbs-o-down"],
		opacity: 1,
		colors: ["#208AAF","#C53FDF", "#6D1D99"],
		activebutton: "black",
	});

});
