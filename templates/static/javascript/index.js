$(window).on("load", function() {
    var logoWidth = $("#logo").width();
    var searchBoxLength = (logoWidth * 60) * 0.01;
    var buttonLength = (logoWidth * 15) * 0.01;
    var buttonHeight = $("#search").height() + (($("#search").height() * 30) * 0.01);
    var listLength = (logoWidth * 25) * 0.01;
    
    $("#submit").css({
        "width": (buttonLength + "px"),
        "height": buttonHeight + "px"
    });

    $("#search").css({
        "width": (searchBoxLength + "px")
    });

    $("#dropdown").css({
        "width": (listLength + "px")
    });
});

$("#submit").click(function() {
    var elements = ["#submit", "#search", "#dropdown"]

    if ($("#search").val() != "") {
        $.each(elements, function(index) {
            let element = elements[index];
            $(element).css({
                "visibility": "hidden"
            });
        });

        resultsBoxSetup();
    } else {
        $("#search").attr("placeholder", "We can't roast an empty string.");
    };
});

function resultsBoxSetup() {
    $("<div id=\"results-container\"></div>").insertAfter("#logo-link");
    $("<p id=\"loading\">Loading, please wait...</p>").appendTo("#results-container");
    
    communicate();

    var containerHeight = $("#results-container").height();

    if (containerHeight >= 500) {
        $("#results-container").css({
            "height": 500 + "px",
            "overflow-y": "scroll"
        });
    }

    $("#container").css({
        "top": "50%"
    });
    
}

function showResults(data) {
    var dataArray = [];
    console.log(dataArray);
    for (var index in data) {
        dataArray.push(data[index]);
    }

    var idea = dataArray[0];
    var reason = dataArray[1];
    var name = dataArray[2];
    
    $("#loading").remove();

    if (idea == "bad") {
        let bad = ("<span id=\"bad-idea\">BAD</span>")
        $(`<p id=\"results-title\">It looks like your idea is ${bad}!</p>`).appendTo("#results-container");
        $(`<p>Here is why:</p>`).appendTo("#results-container");
        
        $("<ul id=\"roasts\"></ul>").appendTo("#results-container");
        $(`<li class="roast">${name}</li>`).appendTo("#roasts");
        $(`<li class="roast">${reason}</li>`).appendTo("#roasts");

    } else if (idea == "impressive") {
        let impressive = ("<span id=\"impressive-ideard\">IMPRESSIVE</span>");
        $(`<p id=\"results-title\">It looks like your idea is ${impressive}!</p>`).appendTo("#results-container");
        $(`<p>Good luck with your idea!</p>`).appendTo("#results-container");
    } else {
        $(`<p id=\"results-title\">We don't have enough data to evaluate your idea!</p>`).appendTo("#results-container");
    }
}

function communicate() {
    $.ajax({
        type: "POST",
        data: $("#search").val(),
        url: "http://127.0.0.1:5000/api/results",
    }).then(data => {
        showResults(data);
    });
};