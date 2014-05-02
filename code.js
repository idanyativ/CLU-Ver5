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
var carousels = {};
var history;
var firstTap = true;
var removedItem = 0;
var numberOfSearch = 0;
                                
$(document).on('keydown', '#mainSearch',function(noa) {
//    console.log(e);
    if (noa.keyCode === 13){
        getCLU($(this).val());
        $(".loader").fadeIn("slow"); 
    }
    
});
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
       // alert("idan");
        build();

        // use to test locally 
        /**
         result = localSend(value);
         other = JSON.parse(JSON.stringify(result));
         threeRes = cutResults(other);
         buildPage(threeRes);
         **/

    }
}
function sendValueToServer(value) {
    console.log("Get Clue About " + value);
    $.ajax({
        type: "GET",
        url: 'http://noanimrodidan.milab.idc.ac.il/?q=' + value})
            .done(function(response){
            console.log(response);
            $(".loader").fadeOut("slow"); 
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
                history[numberOfSearch] = value;
                numberOfSearch++;
                console.log(history);
                    }
    return false;
});
}

function build(){
    $(document).ajaxStop(function(){
      buildPage(resultsInString, image);
      });
  // $.when(sendValueToServer).done(buildPage(resultsInString, image));
}

/**
 * 
 * @param  value - get the input value and send it to server
 * @returns {Boolean}
 */
//function sendValueToServer(value) {
//    console.log("Get Clue About " + value);
//    $.ajax({
//        type: "GET",
//        url: 'http://noanimrodidan.milab.idc.ac.il/?q=' + value,
//        success: function(response,function(callback)) {    
//            console.log(response);
//            var incomeResults = JSON.parse(response);
//            result = JSON.parse(response);
//            // valid that the results isn't null
//            if (incomeResults === null) {
//                console.log("no results");
//            } else {
//                
//                // if not null - build the page 
//                length = incomeResults.results.length;
//                resultsInString = JSON.parse(JSON.stringify(incomeResults));
//                threeResults = cutResults(resultsInString);
//                image = incomeResults.imageURL;
//                history[numberOfSearch] = value;
//                numberOfSearch++;
//                console.log(history); 
//            }
//        },function(){
//            
//        }
//        complete:function() {
//            buildPage(resultsInString, image);
//        }
//    });
//    return false;
//}

/**
 * Open the input value in wikipedia
 * @param {type} value
 * @returns {undefined}
 */
function goToWiki() {
    window.open("http://en.wikipedia.org/wiki/" + getInputValue(), "_self");
}

function getInputValue() {
    return value;
}

/**
 * 
 * @param {type} results
 * @param {type} image
 * @returns {undefined}
 */
function buildPage(results, image)
{   
    $.mobile.changePage('#resultPage');
    $("#resultContent").empty();
    count = 0;
    numberOfSearch = 0;
    removedItem = 0;
    $('#resultSearch').val(getInputValue());
    $('#resultImages').css({"background-image": "url" + "(" + image + ")", "background-repeat": "no-repeat", "background-size": "100% 100%"});
    showOnlyValue();

   // $("#resultContent").empty();
//    setPicText();
    var incomeResults = results;
    if (incomeResults !== null)
    {
//        var holder = document.getElementById("resultContent");
        for (var i = 0; i < 3; i++) {
            addElement(i);
        }
        console.log("count" + count);
    }
     $('#resultPage').html();
    $('#resultPage').trigger("create");//refreashing dynamically
    $('#resultPage a').on('click', function(e) {
        e.preventDefault();
    });
};

function getContext(i) {
    if (firstTap) {
        $('#lineup').html("<b>" + result.results[i].value + "</b><br>" + result.results[i].context).css({"font-size": "100%"});
        $('#lineup').css({top: '70%'});
        $('#lineup').animate({height: '30%'});
        $('#lineup').attr("onClick", "showOnlyValue()");
        firstTap = !firstTap;
    } else {
        $('#lineup').attr("onClick", "showOnlyValue()");
        firstTap = !firstTap;
        showOnlyValue();
    }
}

function showOnlyValue() {
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

function cutResults(res) {
    var newRes = res;
    newRes.results = newRes.results.splice(0, 3);
    return newRes;
}

function removeFromList(el) {
    $(el).remove();
    removedItem++;
    $('#resultPage').trigger("refresh");
}

function randomPage() {
    var holder = document.getElementById("resultContent");
  $(holder).css({"text-align":"center","background":"white","margin-top":"0%","width":"100%","margin-left":"0%","font-size":"130%"});

//    var randomvalue = Math.floor((Math.random() * 4) + 1);
//    console.log(randomvalue);
//    switch (randomvalue) {
//        case 1:
//            getCLU("einstein");
//            break;
//        case 2:
//            getCLU("cola");
//            break;
//        case 3:
//            getCLU("rihanna");
//            break;
//        case 4:
//            getCLU("google");
//            break;
//    }
console.log("Get Random Clue ");
    $.ajax({
        type: "GET",
        url: 'http://noanimrodidan.milab.idc.ac.il/?q=randomValue'})
            .done(function(response){
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
                history[numberOfSearch] = value;
                numberOfSearch++;
                console.log(history);
                build();
                    }
    return false;
});
}

function startOver() {
    var holder = document.getElementById("resultContent");
        $(holder).css({"text-align":"center","background":"white","margin-top":"0%","width":"100%","margin-left":"0%","font-size":"130%"});

    index = 0;
    count = 0;
    getCLU(getInputValue());
}

function getAnotherValue(toRemove) {
    // no more words to show
//    if (count == length-1) {
    if (count == 6) {
        if (removedItem == 5) {
            removeFromList(toRemove);
            addWikiElement();
        } else {
            removeFromList(toRemove);
        }
    } else {
        console.log("this" + $(this).value);
        removeFromList(toRemove);
        addElement(count);
    }
}

function addElement(nextSeq) {
    var holder = document.getElementById("resultContent");
    $(holder).append("<div id=\carousel" + nextSeq + ">" + "</div>");
    var resultsList = document.getElementById("carousel" + nextSeq);
     $(resultsList).css({"width":"100%"});
    $(resultsList).append("<ul id=\listBricks" + nextSeq + ">");
    $("#listBricks" + nextSeq).css({"width":"relative"});
    $("#listBricks" + nextSeq).css({"height": "72px", "text-align": "center", "border": "solid 1px black"});
    var resultsList2 = document.getElementById("listBricks" + nextSeq);
    $(resultsList2).append("<li id=\"pane1\">Get New CLU</li>");
    $("#listBricks" + nextSeq + " > " + "#pane1").css({"background": "rgb(72,182,233)", "background-position": "right", "background-image": "url(searchListItem.png)", "background-repeat": "no-repeat", "background-size": " 20% 100%", "height": "100%", "font-weight": "bold", "font-style": "italic", "font-size": "150%"});
    $(resultsList2).append("<li id=\"pane2\"><a>" + result.results[nextSeq].value + "</a></li>");
    $("#listBricks" + nextSeq + " > " + "#pane2").css({"height": "100%", "color": "grey", "font-style": "italic", "font-size": "150%", "font-family": "'Lato', sans-serif"});
    $(resultsList2).append("<li id=\"pane3\">Throw This CLU</li>");
    $("#listBricks" + nextSeq + " > " + "#pane3").css({"background": "rgb(250,20,20)", "background-image": "url(delListItemRed.png)", "background-repeat": "no-repeat", "background-size": "20% 100%", "height": "100%", "font-weight": "bold", "font-style": "italic", "font-size": "150%"});
    $(resultsList).append("</ul>");
    carousels[nextSeq] = new Carousel("#carousel" + nextSeq);
    carousels[nextSeq].init();
    console.log("next number " + nextSeq);
    count++;
} 

function addWikiElement(){
    $('#lineup').html("<b>" + "Need Another Clu?!" + "</b>").css({"font-size": "200%","text-align":"center","line-height":"5"});
    $('#lineup').css({top: '0%'});
    $('#lineup').animate({height: '100%'});
    var holder = document.getElementById("resultContent");
    $(holder).append("<div onClick=\"randomPage()\">" + "Get Random Clu"  + "</div>");
    $(holder).css({"text-align":"center","background":"red","margin-top":"5%","width":"70%","margin-left":"15%","font-size":"130%"});
    $(holder).append("<div onClick=\"startOver()\">" + "Start Over"  + "</div>");
    //$(holder).css({"text-align":"center","background":"red","margin-top":"5%","width":"70%","margin-left":"15%","font-size":"130%"});

    }
//     $(holder).append("<ul data-role=\"listview\"");
//    $(holder).append("<li id=\random"+" onClick=\"randomPage()\">"+"Get Random" + "</li>").css({"text-align":"center","background":"red"});
//    $(holder).append("<li id=\wiki"+" onClick=\"gotowiki()\">"+"Go To Wiki" + "</li>").css({"text-align":"center","background":"blue"});
//    $(holder).append("<li id=\startOver"+" onClick=\"startOver()\">"+"Start Over" + "</li").css({"text-align":"center","background":"pink"});
//}   $(holder).append("</ul>");.

function parseFromString(value){
    var parsedNumber;
    console.log(value.length);
    for (var i = 0; i < value.length; i++) { 
            parsedNumber= Number(new String(value.charAt(i)));
            console.log("pasre: " +parsedNumber + isNaN(parsedNumber));
            if(!(isNaN(parsedNumber))){
                return parsedNumber;
            }
        }
}