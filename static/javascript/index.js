
$("#submit").click(function() {
    let hideElements = ["#submit-box", "#search-box", "#dropdown-box"],
        showElemnts = ["#feedbackButton"],
        searchValue = $("#search").val()

    if (searchValue != "") {

        $.each(hideElements, function(index) {
            let element = hideElements[index];
            $(element).remove();
        });
        $.each(showElemnts, function(index) {
            let element = showElemnts[index];
            $(element).css({
                "visibility": "visible"
            });
        });

        resultsBoxSetup(searchValue);
    } else {
        $("#search").attr("placeholder", "Please do not leave this box empty.");
    }
});

function resultsBoxSetup(searchValue) {
    $("<div id=\"results-container\" class=\"form-row col-md-auto\"></div>").appendTo("#page-content");
    $("<p id=\"loading\">Loading, please wait...</p>").appendTo("#page-content");

    communicate(searchValue);
}

function showResults(data) {
    let dataArray = [];
    for (let index in data) {
        dataArray.push(data[index]);
    }

    let idea = dataArray[0];
    let reason = dataArray[1];

    $("#loading").remove();

    if (idea === "bad") {
        let bad = (`<span id="bad-idea">BAD</span>`)
        $(`<div id="results-title" class="form-row col-md-auto justify-content-center">It looks like your idea is&nbsp;${bad}!</div>`).appendTo("#page-content");
        $(`<div class="form-row col-md-auto justify-content-center">Here is why:</div>`).appendTo("#page-content");

        $(`<div id="roasts" class="col-md-auto  justify-content-center">${reason}</div>`).appendTo("#page-content");

    } else if (idea === "impressive") {
        let impressive = (`<span id="impressive-idea">IMPRESSIVE</span>`);
        $(`<div id="results-title" class="form-row col-md-auto justify-content-center">It looks like your idea is&nbsp;${impressive}!</div>`).appendTo("#page-content");
        $(`<div class="form-row col-md-auto justify-content-center">Good luck with your idea!</div>`).appendTo("#page-content");
    } else {
        $(`<p id="results-title">We don't have enough data to evaluate your idea!</p>`).appendTo("#page-content");
    }
}

function communicate(searchValue) {

    $.ajax({
        type: "POST",
        data: searchValue,
        url: "http://127.0.0.1:8000/api/results",
    }).then(data => {
        showResults(data);
    });
}
