// $(document).ready(function(){
$("#botInput1").on("tap", function() {
    $.metroMessageBox({
        title:"Basic Input",
        content:"Can you tell me what do you think?",
        buttons:[ "Button 1", "Button 2", "Button 3"],
        defaultbutton:1,
        input: "text",
        // showcounter: false,
        placeholder:"Write a few words",
        icons:[ "fa-paper-plane-o" ],
        activebutton:"#D6511C",
    },function(action, button, value){

    	alert("Action: " + action + "\nbutton: " + button + "\nValue: " + value);

    });

});


$("#botInput2").on("tap", function() {
    $.metroMessageBox({
        title:"Basic Input",
        content:"Can you tell me what do you think?",
        buttons:[ "Button 1", "Button 2", "Button 3"],
        defaultbutton:1,
        input: "textarea",
        // showcounter: false,
        placeholder:"Write a few words",
        icons:[ "fa-paper-plane-o" ],
        activebutton:"#D6511C",
    },function(action, button, value){

    	alert("Action: " + action + "\nbutton: " + button + "\nValue: " + value);

    });

});


$("#botInput3").on("tap", function() {
    
    $.metroMessageBox({
        title:"Don't Waste Your Money",
        content:"Here's your options",
        buttons:[ "I Want Metro Notifications!"],
        input: "select",
        options: [
        			"Other PopUps ( $4 )",
        			"Other Messagebox system ( $7 )",
        			"Other icon set ( $40 )",
        			"Other Sidepanels ( $8 )",
        			"Other Loaders ( $3 )",
        			"All for $5 ( You save $57 )",
				 ],
		values: ["1","2","3","4","5","6"],
        placeholder:"Write a few words",
        icons:[ "fa-money" ],
        activebutton:"#D6511C",
    },function(action, button, value, selecttext){

    	alert("Action: " + action + "\nbutton: " + button + "\nValue: " + value + "\nSelected Text: " + selecttext);

    });

});

$("#botInput4").on("tap", function() {
    $.metroMessageBox({
        title:"Password Input",
        content:"Shhh... write your password quick!",
        buttons:[ "Enter", "Cancel"],
        defaultbutton:1,
        input: "password",
        // showcounter: false,
        placeholder:"Write a few words",
        icons:[ "fa-lock","fa-times" ],
        activebutton:"#D6511C",
    },function(action, button, value){

    	alert("Action: " + action + "\nbutton: " + button + "\nValue: " + value);

    });

});

$("#botInput5").on("tap", function() {
    $.metroMessageBox({
        title:"Email Input",
        content:"This option, will work on devices that understand HTML Email Type.",
        buttons:[ "Enter", "Cancel"],
        defaultbutton:1,
        input: "email",
        // showcounter: false,
        placeholder:"Write a few words",
        icons:[ "fa-lock","fa-times" ],
        activebutton:"#D6511C",
    },function(action, button, value){

    	alert("Action: " + action + "\nbutton: " + button + "\nValue: " + value);

    });

});

$("#botInput6").on("tap", function() {
    $.metroMessageBox({
        title:"Username",
        content:"Enter your username:",
        buttons:[ "Ok", "Cancel"],
        defaultbutton:1,
        input: "text",
        // showcounter: false,
        placeholder:"Username",
        icons:[ "fa-lock","fa-times" ],
        activebutton:"#D6511C",
    },function(action, button, value){

    	if( button == "Cancel"){
    		alert("Login fail.. ");
    		return;
    	}
    	var User = value;

    	   $.metroMessageBox({
		        title: value,
		        content:"Password:",
		        buttons:[ "Ok", "Cancel"],
		        defaultbutton:1,
		        input: "password",
		        // showcounter: false,
		        placeholder:"Password",
		        icons:[ "fa-lock","fa-times" ],
		        activebutton:"#D6511C",
		    },function(action, button, value){

		    	if( button == "Cancel"){
		    		alert("Login fail.. ");
		    		return;
		    	}

		    	alert("User: " + User + "\nPassword: " + value);

		    });

    

    });

});


