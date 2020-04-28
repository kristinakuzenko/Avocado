var Templates = require('./Templates');
var Suggestion = require('./Suggestion');
var SuggestionItem = require('./SuggestionItem');
var $suggestion = $("#suggestion");
function showSug(list) {
    var temp=$('#sug').text();

    var info=$('#info').text();
    $suggestion.html("");
    function showOneSug(suggestion) {
        var html_code = Templates.Suggestion({ suggestion: suggestion });
        var $node = $(html_code);
        var $item = $node.find("#item-place");
        $item.html("");
        function showOneItem(suggestionitem){
            var html_code2 = Templates.SuggestionItem({ suggestionitem: suggestionitem });
            var $node2 = $(html_code2);
            if(suggestion.reason==suggestionitem.id){
                $item.append($node2);
            }
        }
        SuggestionItem.forEach(showOneItem);
        if(temp<15&& suggestion.reason==2){
            $suggestion.append($node);
        }
        if(temp>=15&& suggestion.reason==7){
            $suggestion.append($node);
        }
        if(info=="clear-day"&& suggestion.reason==1){
            $suggestion.append($node);
        }
        if((info=="clear-night"||info=="partly-cloudy-night")&& suggestion.reason==6){
            $suggestion.append($node);
        }
        if((info=="rain"||info=="snow"||info=="sleet"||info=="wind"||info=="fog"||info=="hail"||info=="thunderstorm"||info=="tornado")&& suggestion.reason==4){
            $suggestion.append($node);
        }
        if((info=="partly-cloudy-day"||info=="cloudy")&& suggestion.reason==5){
            $suggestion.append($node);
        }
        $node.find("#items").click(function() {
            $node.find("#item-place").removeClass('none');
            $node.find("#items-hide").removeClass('none');
            $node.find("#items").addClass('none');
        });
        $node.find("#items-hide").click(function() {
            $node.find("#item-place").addClass('none');
            $node.find("#items-hide").addClass('none');
            $node.find("#items").removeClass('none');
        });
    }
    list.forEach(showOneSug);
}
$("#show-sug").click(function() {
    showSug(Suggestion);
    $("#hide-sug").removeClass('none');
    $("#show-sug").addClass('none');
    $("#suggestion").removeClass('none');
});
$("#hide-sug").click(function() {
    $("#suggestion").addClass('none');
    $("#hide-sug").addClass('none');
    $("#show-sug").removeClass('none');
});
$("#more").click(function() {
    $("#current-weather-details").removeClass('none');
    $("#current-weather-details").addClass('current-weather-details');
    $("#more").addClass('none');
});
$("#hide").click(function() {
    $("#current-weather-details").addClass('none');
    $("#current-weather-details").removeClass('current-weather-details');
    $("#more").removeClass('none');
});

