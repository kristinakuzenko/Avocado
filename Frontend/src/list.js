var Templates = require('./Templates');
var api = require('./API');
var $filter = $("#filter");
var Filter = require('./Filter');
var ProdList = [];
var suggestion=[];
var noteItem_height = 67;
function showFilter(list) {
    $filter.html("");
    function showOneFilter(pf1) {
        var html_code = Templates.BuyList_OneCategory({ filter: pf1 });
        var $node = $(html_code);
        $filter.append($node);
        var $product_list=$node.find('.description');
        function showOneProduct(product) {
            var html_code = Templates.BuyList_OneItem({ product: product });
            var $node = $(html_code);
            if(product.id==pf1.id){
                $product_list.append($node);
                suggestion.push(product.title);
                function updateList() {
                    //window.localStorage.setItem('cartArray', JSON.stringify(ProdList));
                    var $note = $("#prodnote");
                    $note.html("");
                    function showOneProd(prod) {
                        var html_code = Templates.Note_Item(prod);
                        var $node1 = $(html_code);
                        $note.append($node1);
                        $node1.find(".close").click(function(){
                            removeFromList(prod);
                        });
                    }
 
                    ProdList.forEach(showOneProd);
                
                }
                function addToMyList(product) {
                    ProdList.push({
                        product:product
                   });
                   updateList();
                }
                function clearList() {
                    ProdList.length = 0;
                    updateList();
                }
 
                $("#clear").click(function() {
                    clearList();
                    $node.find("#in-list").addClass('disp');
                    $node.find("#in-list-pr").addClass('disp');
                    $node.find(".prod").removeClass('disp');
                    $node.find(".prod-text").removeClass('disp'); 
                    updateList();
                });
                function removeFromList(item){
                    ProdList.splice(ProdList.indexOf(item), 1);
                    $node.find("#in-list").addClass('disp');
                    $node.find("#in-list-pr").addClass('disp');
                    $node.find(".prod").removeClass('disp');
                    $node.find(".prod-text").removeClass('disp'); 
                    updateList();
                }
                $node.find("#pr").click(function(){
                    addToMyList(product);
                    $node.find(".prod").addClass('disp');
                    $node.find(".prod-text").addClass('disp');
                    $node.find("#in-list").removeClass('disp');
                    $node.find("#in-list-pr").removeClass('disp')
                });
                $node.find(".item").click(function(){
                    removeFromList(product);

                });
            }
        
        }
        api.getProductList(function(err, productlist) {
            if (err) {
            }
            //sort by alphabet
            var sorted = productlist.slice(0);
            sorted.sort(function(a,b){
                var x = a.title.toLowerCase();
                var y = b.title.toLowerCase();
                return x < y ? -1 : x > y ? 1 : 0;
            });
            sorted.forEach(showOneProduct);
        });
    

        //my list
       

    }
    list.forEach(showOneFilter); 
}
showFilter(Filter);

$('#mi').keypress(function(e) {
    if (e.which == 13 && this.value) {
        var value = document.getElementById("mi").value;
        window.location = "list.html?name="+value;
    }
});
$("#submit").click(function() {
    var value = document.getElementById("mi").value;
    window.location = "list.html?name="+value;
});

// Add a "checked" symbol when clicking on a list item
/*var list = document.querySelector('#listik ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);*/

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const name = urlParams.get('name');
$(".name span").html(name);

   // var contentHeight = (windowHeight - 25);

  //  contentElement.style.minHeight = contentHeight + "px";

  
   // if(currentContentHeight>2)
  //  var navigationElement = document.getElementById("navigation");
 //   var differenceInHeight = currentContentHeight - windowHeight;
  //  var navigationHeight = (windowHeight + differenceInHeight);

 //   navigationElement.style.minHeight = navigationHeight + "px";

 $('.title').click(function(){
    var $parent = $(this).parents('.item');
    var $expanded=$('.expanded');
    if ($parent.hasClass('expanded')) {
        $expanded.removeClass('expanded');
      } else {
        $expanded.removeClass('expanded');
        $parent.addClass('expanded');
      }
    
  });




  
  function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
            b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
  }
  
  /*An array containing all the country names in the world:*/
  var countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua & Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia & Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre & Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts & Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad & Tobago","Tunisia","Turkey","Turkmenistan","Turks & Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
  autocomplete(document.getElementById("myInput"), suggestion);
  /*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/


