// $(document).ready(function(){
$("#botLoading1").on("tap", function() {
    $.metroLoading({
        title:"Now we are loading...",
        content:"Please wait for 3 seconds",
        fa: "fa-circle-o-notch",
        timeout: 3000,
    },function(action){

        alert("Action: " + action );

    });

});

$("#botLoading2").on("tap", function() {
    $.metroLoading({
        title:"Loading in Purp...",
        content:"Please wait for 3 seconds",
        fa: "fa-gear",
        backgroundcolor: "#6D1D99",
        backgroundcontent: "#6D1D99",
        timeout: 3000,
        opacity:1,
    });

});

$("#botLoading3").on("tap", function() {
    $.metroLoading({
        title:"4.5 seconds",
        content:"See some colors",
        fa: "fa-spinner",
        backgroundcolor: "#6D1D99",
        backgroundcontent: "#6D1D99",
        colors: ["#208AAF","#C53FDF", "#6D1D99"],
        timeout: 4500,
        opacity:1,
    });

});


$("#botLoading4").on("tap", function() {
    $.metroLoading({
        texts:[
                "Hi dear user... <i class='fa fa-wheelchair'></i>",
                "I'm loading something <i class='fa fa-refresh fa-spin'></i>",
                "At least you are not bored <i class='fa fa-truck'></i>",
                "Almost done!<br><i class='fa fa-star-o fa-spin'></i>",
                "Opps!? <br/> I think somethig goes wrong!!!<br/> <img class='smallImg' src='static/img/butterfly-50.png'>",
                "To close this..",
                "You need to call <br/>$.metroLoadingKill()",
                "Click the button to call it.",
                "C'mon",
                "Press that button!",
                "What are you waiting for...",
                "Well, I will show all the text again",
              ],
        content:"See some colors",
        fa: "fa-spinner",
        backgroundcolor: "#6D1D99",
        backgroundcontent: "#6D1D99",
        opacity:1,
    });

    setTimeout(function() {
        $("#botCloseLoading").fadeIn();
    }, 20000);

});


$("#botCloseLoading").on("tap",function(){
    $.metroLoadingKill();
    $("#botCloseLoading").fadeOut();
})
