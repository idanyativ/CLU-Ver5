/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var result;
var threeResults = null;
var count = 0;
var resultsInString = null;
var length = 0;
var value = null;
var image = null;
var firstLoad = false;
/**
 * 
 * @param inputValue - Get the value from the user
 * @ build the 
 */
function getCLU(inputValue) {
    value = inputValue;
    console.log("getCLu : " + value);

    // valid that value isn't null
    if (value === "") {
        console.log("value cant be null");
    } else {
        // replace space to underline
        if (value.search(" ") !== -1) {
            value.replace(" ", "_");
        }
        // send value to server
        sendValueToServer(value);


        // use to test locally 
        /**
         result = localSend(value);
         other = JSON.parse(JSON.stringify(result));
         threeRes = cutResults(other);
         buildPage(threeRes);
         **/

    }
}


/**
 * 
 * @param  value - get the input value and send it to server
 * @returns {Boolean}
 */
function sendValueToServer(value) {
    console.log("Get Clue About " + value);
//    preventDefault();
    $.ajax({
        type: "GET",
        url: 'http://noanimrodidan.milab.idc.ac.il/?q=' + value,
        success: function(response) {
            console.log(response);
            var incomeResults = JSON.parse(response);
            result = JSON.parse(response);
            // valid that the results isn't null
            if (incomeResults === null) {
                console.log("no results");
            } else {

                // if not null - build the page 
                length = incomeResults.results.length;
                resultsInString = JSON.parse(JSON.stringify(incomeResults));
                threeResults = cutResults(resultsInString);
                image = incomeResults.imageURL;
                buildPage2(resultsInString, image);

            }
        }
    });

    return false;
}

/**
 * Local Testing
 * @param {type} val
 * @returns {Array|Object}
 */
function localSend(val) {
    var resultAsJson = null;
    //post to server and get result as json
    switch (val) {
        case "Retention" :
            resultAsJson = '{"results":[{"value":"Buisness Term","context":"AAA"},{"value":"Marketing","context":"BBB"},{"value":"customer service","context":"CCC"},{"value":"Consumer Behavior","context":"Retention is a term in customer behavior which indicate the lifetime of the user with the product"}]}';
            break;
        case "Consumer Behavior" :
            resultAsJson = '{"results":[{"value":"Consumer buying behavior","context":"AAA"},{"value":"Psychology, decision making","context":"BBB"},{"value":"Marketing service","context":"CCC"}]}';
            break;
        case "Neymar" :
            resultAsJson = '{"results":[{"value":"Footballer","context":"is a Brazilian footballer"},{"value":"Barcelona","context":"plays for La Liga club FC Barcelona"},{"value":"Winger","context":"play as a forward or winger"},{"value":"Santos","context":"Neymar joined Santos in 2003"},{"value":"Ronaldinho","context":"Ronaldinho states he will be the best in the world"}]}';
            break;
        default :
            resultAsJson = '{"results":[{"value":"Electrical engineering","context":"CCC"},{"value":"Thomas Edison","context":"BBB"},{"value":"Alternating current","context":"AAA"}]}';
    }
    console.log(resultAsJson);
    if (resultAsJson !== null) {
        var resultAsString = JSON.parse(resultAsJson);
        return resultAsString;
    } else {
        alert("result it null!");
    }
}

/**
 * Open the input value in wikipedia
 * @param {type} value
 * @returns {undefined}
 */
function goToWiki(value) {
    window.open("http://en.wikipedia.org/wiki/" + value, "_self");
}

function getInputValue() {
    return value;
}

/**
 * 
 * @param {type} res
 * @param {type} image
 * @returns {undefined}
 */
function buildPage(results, image)
{
    $.mobile.changePage('#resultPage');
    $('#resultSearch').val(getInputValue());
    $('#resultImages').css({"background-image": "url" + "(" + image + ")", "background-repeat": "no-repeat", "background-size": "100% 100%"});
    showOnlyValue();
    $("#resultList").empty();
//    setPicText();
    var incomeResults = results;
    resultsList = document.getElementById("resultList");
    if (incomeResults !== null)
    {
        // Building each reminders record in the page
        for (var i = 0; i < 3; i++) {
            $(resultsList).append("<li><a onclick=\"getContext(" + i + ")\" data-iconshadow=\"false\"  data-icon=\"false\" id=\list" + i + ">" + incomeResults.results[i].value + "</a></li>");
            // console.log(resultsList);
            $("#list" + i).css({"height": "30px", "text-align": "center", "color": "grey", "background-color": "white", "padding-top": "25px", "font-family": "Geneva, Tahoma, Verdana, sans-serif", "text-overflow": "ellipsis"});
            count++;
        }

    }
    $('#resultPage').html();
    $('#listcontainer').html(resultsList);
    //$('#listcontainer').trigger("create");//refreashing dynamically
    $('#resultPage a').on('click', function(e) {
        e.preventDefault();
    });
}
;

function buildPage2(results, image)
{
    $.mobile.changePage('#resultPage');
    $('#resultSearch').val(getInputValue());
    $('#resultImages').css({"background-image": "url" + "(" + image + ")", "background-repeat": "no-repeat", "background-size": "100% 100%"});
    showOnlyValue();
    var carousels = {};
    $("#resultContent").empty();
//    setPicText();
    var incomeResults = results;
    //   resultsList = document.getElementById("listcontainer");
    if (incomeResults !== null)
    {
        var holder = document.getElementById("resultContent");
        for (var i = 0; i < 3; i++) {
            $(holder).append("<div id=\carousel" + i + ">" + "</div>");
            var resultsList = document.getElementById("carousel" + i);
            $(resultsList).append("<ul id=\listBricks" + i + ">");
            $("#listBricks" + i).css({"height": "50px", "text-align": "center", "border": "solid 1px black"});
            var resultsList2 = document.getElementById("listBricks" + i);
            $(resultsList2).append("<li id=\"pane1\">Get New CLU</li>");
            $("#listBricks" + i + " > " + "#pane1").css({"background": "green","background-image": "url(searchListItem.png)", "background-repeat": "no-repeat", "background-size": " 20% 100%", "height": "100%"});
            //    $("#listBricks0 > li").css({"background-image": "url" + "(\"delListItem.png\")", "background-repeat": "no-repeat","background-size": " 20% 100%","height":"100%","backgroung":"green"});

            $(resultsList2).append("<li id=\"pane2\"><a>" + result.results[i].value + "</a></li>");
            $("#listBricks" + i + " > " + "#pane2").css({"height": "100%"});

            //$("#pane2").css({"height":"100%"});
            $(resultsList2).append("<li id=\"pane3\">Throw This CLU</li>");
           // $("#pane3").css({"background-image": "url" + "(\"searchListItem.PNG\")", "background-repeat": "no-repeat", "background-size": "20% 100%", "height": "100%", "backgroung": "blue"});
           $("#listBricks" + i + " > " + "#pane3").css({"background": "red","background-image": "url(delListItem.png)", "background-repeat": "no-repeat", "background-size": "20% 100%", "height": "100%"});

            $(resultsList).append("</ul>");
            carousels[i] = new Carousel("#carousel" + i);
//               $("#carousel" + i).css({"height":"50px","padding": "0","margin":"0","position": "relative","overflow": "hidden","width": "100%","-webkit-backface-visibility": "hidden","-webkit-transform": "translate3d(0,0,0) scale3d(1,1,1)","-webkit-transform-style": "preserve-3d"});
//                $("#carousel"+i + " " + "ul.animate").css({"-webkit-transition": "all .3s","-moz-transition": "all .3s","-o-transition": "all .3s","transition":" all .3s"});
//                $("#carousel"+i + " " +"ul").css({ "-webkit-transform": "translate3d(0%,0,0) scale3d(1,1,1)"," -moz-transform":"translate3d(0%,0,0) scale3d(1,1,1)","-ms-transform":"translate3d(0%,0,0) scale3d(1,1,1)","-o-transform":"translate3d(0%,0,0) scale3d(1,1,1)","transform": "translate3d(0%,0,0) scale3d(1,1,1)","overflow": "hidden","-webkit-backface-visibility": "hidden","-webkit-transform-style": "preserve-3d"});
//                $("#carousel"+i +" " + "ul").css({"-webkit-box-shadow":"0 0 20px rgba(0,0,0,.2)"," box-shadow":"0 0 20px rgba(0,0,0,.2)","position": "relative"});
//                $("#carousel"+i + " " +"li").css({"float": "left","overflow": "hidden","-webkit-transform-style": "preserve-3d","-webkit-transform": "translate3d(0,0,0)"});
//                $("#carousel"+i + " " +"ul.pane2").css({"background": "red"});
            carousels[i].init();
        }
    }
    $('#resultPage').html();
//        $('#listcontainer').html(resultsList);
    $('#resultPage').trigger("create");//refreashing dynamically
    $('#resultPage a').on('click', function(e) {
        e.preventDefault();
    });
}
;
//function buildPage2(res, image)
//{
//    $.mobile.changePage('#resultPage');
//    $('#resultSearch1').val(getInputValue());
//    $('#resultImages').css({"background-image": "url" + "(" + image + ")", "background-repeat": "no-repeat", "background-size": "100% 100%"});
//    showOnlyValue();
//var carousels= {};
//
//    var listValues = res;
//  var  holder = document.getElementById("resultContentForm");
////$(resultsList).append("<ul id=\idan" + 1 + ">");
////            var resultsList2 = document.getElementById("idan" + 1);
////            $(resultsList2).append("<li class=\"pane1\"><a>" + "yes" + "</a></li>");
////            $(resultsList2).append("<li class=\"pane2\"><a>" + "no" + "</a></li>");
////            $(resultsList2).append("<li class=\"pane3\"><a>" + "may" + "</a></li>");
////            $(resultsList).append("</ul>");
//    if (listValues !== null)
//    {
//        for (var i = 0; i < 3; i++) {
//          //  alert(i);
//            $(holder).append("<div id=\carousel" + i + ">"+"</div>");
//            var  resultsList = document.getElementById("carousel"+i);
//            $(resultsList).append("<ul id=\idan" + i + ">");
//            var resultsList2 = document.getElementById("idan" + i);
//            $(resultsList2).append("<li class=\"pane1\">white</li>");
//            $(resultsList2).append("<li class=\"pane2\"><a>" + result.results[i] + "</a></li>");
////            $(resultsList2).append("<li class=\"pane2\"><a>" + result.results[i].value + "</a></li>");
//            $(resultsList2).append("<li class=\"pane3\">white</li>");
//            $(resultsList).append("</ul>");
//            carousels[i] = new Carousel("#carousel"+i);
//            carousels[i].init();
//        }
//        
//    console.log("asdasdasdddddddddddddddddddd=" + resultsList);
//    }
////    console.log("listString=" + resultsList);
//    $('#resultPage').html();
////    $('#listcontainer').html(resultsList);
//    $('#listcontainer').trigger("create");//refreashing dynamically
//    $('#resultPage a').on('click', function(e) {
//        e.preventDefault();
//    });
//}
//;

//    $(document).on("swiperight", "li", function(event) {
//        console.log("User Search Next Value : " + result.results[$(this).index()]);
//        searchItem(this, result.results[$(this).index()]);
////    
////    console.log("User Search Next Value : "+ result.results[$(this).index()]);
////    searchItem(this, result.results[$(this).index()].value);
//
//    });
////$(document).on("swipeleft", "li", function(e) {
////    removeItem(this);
//////     setTimeout(function(){alert("Hello")},3000);
//////     setTimeout(function(){appendToList()}(),5000000);
////
//////   removeItem(this);
//////           defer.then(appendToList());
//////   console.log("countaaaaaaaaaaaaaaaaaa:" + count);
//////   console.log("length:" + length);
//////           appendToList();
//////        $("#resultList").listview("refresh");
//////        console.log("count:" + count);
//////        console.log("index:" + index);
//////        console.log("length:" + length);
//////        console.log("removed:" + removed);
//////        index++;
//////        console.log(resultsList);
////});
//    var index = 0;
//    var removed = 0;
//    $(document).on("swipeleft", "li", function(event) {
//        event.preventDefault();
//        var projIndex = $(this).index();
//
//        var listitem = $(this),
//                // These are the classnames used for the CSS transition
//                dir = event.type === "swipeleft" ? "left" : "right",
////             Check if the browser supports the transform (3D) CSS transition
//                transition = $.support.cssTransform3d ? dir : false;
//        console.log(transition);
////    if (transition) {
////        console.log(transition);
////        $(this).removeClass("ui-btn-down-d").addClass(transition);
////    }
//        if (removed === length - 1) {
//            removeFromList(projIndex);
//            console.log("index:" + index);
//            console.log("length:" + length);
//            console.log("removed:" + removed);
//            $("#resultList").append("<li  data-iconshadow=\"flase\"><a id=\"listWiki\" onclick=\"goToWiki(getValueZ())\" >" + "Dont Have A CLU? GO TO WIKI" + "</a></li>");
//            $("#listWiki").css({"height": "30px", "text-align": "center", "color": "white", "background-color": setColor(length + 1), "padding-top": "25px"});
//            $("#resultList").append("<li data-icon=\"back\" data-iconpos=\"bottom\"><a id=\"listStartOver\" onclick=\"startOver( )\" >" + "Start Over" + "</a></li>");
//            $("#listStartOver").css({"height": "30px", "text-align": "center", "color": "white", "background-color": setColor(length + 2), "padding-top": "25px"});
//            $("#resultList").listview("refresh");
//        } else {
//            removeFromList(projIndex);
//            removed++;
//            appendToList();
//            $("#resultList").listview("refresh");
//            console.log("count:" + count);
//            console.log("index:" + index);
//            console.log("length:" + length);
//            console.log("removed:" + removed);
//            index++;
//            console.log(resultsList);
//        }
//    });
//function getContext(i) {
//    var action = "getContext(" + i + ")";
//    if ($('#list' + i).attr("onClick") === action) {
//        $('#list' + i).text(result.results[i].context);
//        $('#list' + i).attr("onClick", "getValue(" + i + ")");
//        $('#list' + i).css({"background-color": "white", "color": "#85C2FF"});
//    }
//
//    console.log(i);
//    console.log(resultsList);
//}

function getContext(i) {
    alert(i);
    var action = "getContext(" + i + ")";
//    var valueAndContext = getInputValue(); 
    console.log(result.results);
//        if ($('#list' + i).attr("onClick") === action) {
    $('#lineup').html(getInputValue() + "-" + result.results[i].context).css({"font-size": "100%"});
    $('#lineup').css({top: '70%'});
    $('#lineup').animate({height: '30%'});
    $('#lineup').attr("onClick", "showOnlyValue()");
//    $('#lineup').css({top: '85%'});
//        }
//        console.log(i);
//        console.log(resultsList);
}

function showOnlyValue() {
//    alert("show");
    $('#lineup').css({
        "color": "white",
        "font-size": "2em",
        "background-color": "black",
        "opacity": "0.6",
         "height": "15%",
        "width": "100%",
        "bottom": "0px",
        "position": "relative",
        "top": "85%"
    });
    $('#lineup').text(getInputValue());
    var action = "onclick()";
    if ($('#lineup').attr("onclick") === action) {
        $('#lineup').removeAttribute("onclick");
    }
}




//function getValue(i) {
//    var pp = "getValue(" + i + ")";
//    if ($('#list' + i).attr("onClick") === pp) {
//        $('#list' + i).text(result.results[i].value);
//        $('#list' + i).attr("onClick", "getContext(" + i + ")");
//        $('#list' + i).css({"background-color": setColor(i), "color": "white"});
//    }
//    console.log(i);
//    console.log(resultsList);
//}

function cutResults(res) {
    var newRes = res;
    newRes.results = newRes.results.splice(0, 3);
    return newRes;
}

function appendToList() {
//    if (count !== length) {
    $("#resultList").append("<li><a onclick=\"getContext(" + count + ")\" id=\list" + count + ">" + result.results[count].value + "</a></li>");
//        var color = setColor(count);
    $("#list" + count).css({"text-align": "center", "color": "grey", "background-color": "white", "padding": "25px", "font-family": "Geneva, Tahoma, Verdana, sans-serif", "text-overflow": "ellipsis"});
    //  $("#list" + count).css({"height": "30px", "text-align": "center", "color": "white", "background-color": color, "padding-top": "25px","text-overflow": "ellipsis"});
    count++;
    console.log("count:" + count);
//    }
}

function removeFromList(index) {
    console.log(index);
//    $("#list" + index).animate({width: 'toggle'}, function() {
//        // And fade in the menu
//        $("#list" + index).fadeOut();
//    });
    $("#list" + index).remove();
    $("#list" + index).css("height", 0);

}



function randomPage() {
    getCLU("Nikola Tesla");
}

function startOver() {
    index = 0;
    count = 0;
    getCLU(getInputValue());
}

//function getHistory() {
//    $.mobile.changePage('#historyPage');
//    historyList = document.getElementById("historyList");
//    for (var i = 0; i < numberOfSearch; i++) {
//        $(historyList).append("<li><a onClick=\"getCLU(historySearches[" + i + "])\">" + historySearches[i] + "</a></li>");
//        console.log(historyList);
//    }
//}

//function fullScreen(url) {
//    var myWindow = window.open(url, "_self", 'scrollbars=yes,resizable=yes,fullscreen=yes');
//}

//$("#resultTitle").text(getInputValue());

//function setColor(i) {
//    if (i % 2 === 0) {
//        console.log(i + "=" + "blue");
//        return "#3399FF";
//    } else {
//        console.log(i + "=" + "blueee");
//    }
//    return "#85C2FF";
//}

//function setPicText() {
//    $("#img11").text("asdasd");
//    var img1 = document.getElementById(getInputValue());
//    var img2 = document.getElementById("img2");
//    var ctx = img1.getContext("2d");
//    ctx.clearRect(0, 0, $('#resultPage').width(), $('#resultPage').height());
//    ctx.font = "10px Arial";
//    ctx.fillText("pic " + getInputValue() + "1", 80, 80);
//    ctx = img2.getContext("2d");
//    ctx.clearRect(50, 50, $('#resultPage').width(), $('#resultPage').height());
//    ctx.font = "10px Arial";
//    ctx.fillText("pic " + getInputValue() + "2", 80, 80);
//}

function removeItem(item) {
    var li = $(item);
    var contents = $(li.children()[0]);
    var item = contents.text(); // Get the item value
    var itemId = contents.attr("id");

    var delButton = $("<a>").text("Yes").click(function(e) {
        // Delete button handler, fade out menu and remove the row
        e.stopPropagation();
        menu.fadeOut("slow", function() {
            li.remove();
            // Do something in order to delete item, send request to server or similar
            // alert("Deleted " + item + " with ID = " + itemId);
            appendToList();
        });
    });
    var cancelButton = $("<a>").text("No").click(function(e) {
        // Cancel Handler, remove menu and show the item
        e.stopPropagation();
        menu.fadeOut("slow", function() {
            contents.animate({width: 'toggle'}, function() {
                menu.remove();
            });
        });
    });

    // Create the menu
    var menu = $("<span />").append("Remove Value? - ").append(delButton).append(" | ").append(cancelButton)
            .css("display", "none")
            .addClass("menu");

    // Insert the menu
    contents.after(menu);
    // Slide the item 
    contents.animate({width: 'toggle'}, function() {
        // And fade in the menu
        menu.fadeIn();
    });
}

function searchItem(item, nextValue) {
    var li = $(item);
    console.log(li);
    var contents = $(li.children()[0]);
    var item = contents.text(); // Get the item value
    var itemId = contents.attr("id");

    var delButton = $("<a>").text("Yes").click(function(e) {
        // Delete button handler, fade out menu and remove the row
        e.stopPropagation();
        menu.fadeOut("slow", function() {
            li.remove();
            // Do something in order to delete item, send request to server or similar
            //   alert("Deleted " + item + " with ID = " + itemId);
            getCLU(nextValue);

        });
    });
    var cancelButton = $("<a>").text("No").click(function(e) {
        // Cancel Handler, remove menu and show the item
        e.stopPropagation();
        menu.fadeOut("slow", function() {
            contents.animate({width: 'toggle'}, function() {
                menu.remove();
            });
        });
    });

    // Create the menu
    var menu = $("<span />").append("Search Next Value? - ").append(delButton).append(" | ").append(cancelButton)
            .css("display", "none")
            .addClass("menu");

    // Insert the menu
    contents.after(menu);
    // Slide the item 
    contents.animate({width: 'toggle'}, function() {
        // And fade in the menu
        menu.fadeIn();
    });
}