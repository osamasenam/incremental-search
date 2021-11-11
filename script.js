
var searchField = $("input");
var resultsContainer = $(".results-container");

// #1 INPUT EVENT
searchField.on("input", function () {
    var inputVal = searchField.val().toLowerCase();
    if (!searchField.val() == "") {
        // 😃 IF the input field is empty, don't show any results
        var matchResults = [];
        // loop over our countries and see if any of them start with letters matching the input val
        for (var i = 0; i < listOfCountries.length; i++) {
            // check if a country starts with the input value
            if (listOfCountries[i].toLowerCase().indexOf(inputVal) === 0) {
                matchResults.push(listOfCountries[i]);
                // once our matchResults contains four countries end our loop and match search early
                if (matchResults.length === 4) {
                    break;
                }
            }
        }


        // let's make our results show up on screen
        // step 1: generate html elements for each of our country
        var htmlForCountries = "";
        // 😃 IF the user types gibbersih or sth that doesn't match anything, we need to render "no results"
        if(matchResults.length === 0) {
            htmlForCountries =
                "<p class='countryEmpty'>No Results</p>";
        }
        else {
            for (var j = 0; j < matchResults.length; j++) {
                htmlForCountries +=
                    "<p class='country'>" + matchResults[j] + "</p>";
            }    
        }
            //
        // step 2: put it on screen
        resultsContainer.html(htmlForCountries);
    }
    else {
        // clean the old input search results
        resultsContainer.html("");
    }
});

// #2 MOUSEOVER EVENT
// problem, the p tags that we want to listen on for the mouseover, are not present when the script initially loads, so we need to attach our listener to sth that IS there upon loading
// Add highlight when ouse is over
$(".results-container").on("mouseover", "p", function () {
    // make sure to remove any previous highlight actions due to keydown
    var searchList = $(".results-container p");
    for(var i=0; i<searchList.length; i++) {
        searchList.eq(i).removeClass("highlight");
    }
    $(this).addClass("highlight");
    // 😃 first step: log the correct country that the mouse is over to the console!
});

// Remove highlight when mouse is out
$(".results-container").on("mouseout", "p", function () {
    $(this).removeClass("highlight");
});

// #3 MOUSEDOWN EVENT
$(".results-container").on("mousedown", "p", function () {
    // update the input field with the clicked one
    searchField.val($(this).text()) ;
    // clean the old input search results
    resultsContainer.html("");
});

// #4 KEYDOWN EVENT
searchField.on("keydown", function (e) {
    var searchList = $(".results-container p");
    var grabHightlightIndex;
    // grab which item is on highlight
    for(var i=0; i<searchList.length; i++) {
        if(searchList.eq(i).hasClass("highlight")) {
            grabHightlightIndex = i;
        }
    }
    // down arrow key pressed
    if(e.keyCode == 40) {
        // No country has highlight >> put highlight on first country
        if(grabHightlightIndex == undefined) {
            searchList.eq(0).addClass("highlight");
        }
        // when last country has highlight >> do nothing
        else if(grabHightlightIndex == searchList.length-1) {
            // console.log("last elem on highlight");
        }
        // otherwise >> move highlight down to next country
        else {
            searchList.eq(grabHightlightIndex).removeClass("highlight");
            searchList.eq(grabHightlightIndex + 1).addClass("highlight");
        }
    }
    // up arrow key pressed
    else if(e.keyCode == 38) {
        // No country has highlight >> put highlight on last country
        if(grabHightlightIndex == undefined) {
            searchList.eq(searchList.length-1).addClass("highlight");
        }
        // when first country has highlight >> do nothing
        else if(grabHightlightIndex == 0) {
            // console.log("last elem on highlight");
        }
        // otherwise >> move highlight up to previous country
        else {
            searchList.eq(grabHightlightIndex).removeClass("highlight");
            searchList.eq(grabHightlightIndex - 1).addClass("highlight");
        }
    }
    // Enter key pressed
    else if(e.keyCode == 13) {
        // update the input field with the clicked one
        searchField.val(searchList.eq(grabHightlightIndex).text()) ;
        // clean the old input search results
        resultsContainer.html("");
    }
});

// #5 FOCUS EVENT
var inputFlag = false;

searchField.on("click", function(e) {
    inputFlag = true;
    // console.log("input clicked");
    resultsContainer.css("visibility", "visible");
    searchField.addClass("inputActive");
})

// #6 blur EVENT
$(document).on("click", function(e) {
    if(!inputFlag) {
        // console.log("doc clicked");
        resultsContainer.css("visibility", "hidden");
        searchField.removeClass("inputActive");
    }
    inputFlag = false;
});

