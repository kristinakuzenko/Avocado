var $product_list = $("#product-container");
var Templates = require('./Templates');
var details = require('./details');
var api = require('./API');
var $filter = $("#filter");
var Filter = require('./Filter');
var ProdList = [];
var noteItem_height = 67;
initialiseList();
function showFilter(list) {
    $filter.html("");

    function showOneFilter(pf1) {
        var html_code = Templates.BuyList_OneCategory({ filter: pf1 });
        var $node = $(html_code);
        $filter.append($node);
    }

    list.forEach(showOneFilter);
    
}

//i will do
function filterProduct(filter) {
   
        var prod = [];

        Pizza_List.forEach(function(pizza) {
            if (pizza.filter.includes(filter.id)) {
                pizza_shown.push(pizza);
            }

        });

       
        showPizzaList(pizza_shown);
    
}
showFilter(Filter);

//need to be redone
const selected = document.querySelector(".selected");
const optionsContainer = document.querySelector(".options-container");

const optionsList = document.querySelectorAll(".option");

selected.addEventListener("click", () => {
  optionsContainer.classList.toggle("active");
});

optionsList.forEach(o => {
  o.addEventListener("click", () => {
    selected.innerHTML = o.querySelector("label").innerHTML;
    optionsContainer.classList.remove("active");
  });
});
//

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

function resizeImg(){
    var length = ProdList.length;
    if((length*noteItem_height)>267){
        var currentHeight= $("#one_prod").find("img").height();
        $("#one_prod").find("img").height(currentHeight+noteItem_height);
        $("#one_prod").find("img").width($("#one_prod").find("img").width()+5);
    }
   
}

function addToMyList(product) {
    ProdList.push({
        product:product
   });
   updateList();
}
function removeFromList(item){
    ProdList.splice(ProdList.indexOf(item), 1);
    updateList();
}
function clearList() {
    ProdList.length = 0;
    updateList();
}
function initialiseList(){
    $("#clear").click(function() {
        clearList();
        initialiseProduct();
    });
  /*  if (window.localStorage.getItem('cartArray'))
    ProdList = JSON.parse(window.localStorage.getItem('cartArray'));
    else
    ProdList = [];
*/
    updateList();
}
function updateList() {
    //window.localStorage.setItem('cartArray', JSON.stringify(ProdList));
    var $note = $("#prodnote");
    $note.html("");
    function showOneProd(prod) {
        var html_code = Templates.Note_Item(prod);
        var $node = $(html_code);
        $node.find(".close").click(function(){
            removeFromList(prod);
        });
        $note.append($node);
    }
    ProdList.forEach(showOneProd);

}

function showProducts(list) {
    $product_list.html("");
    function showOneProduct(product) {
        var html_code = Templates.BuyList_OneItem({ product: product });
        var $node = $(html_code);
        details.inputReady();
        $product_list.append($node);
        $node.find("#pr").click(function(){
            addToMyList(product);
            $node.find(".prod").addClass('disp');
            $node.find(".prod-text").addClass('disp');
            $node.find("#in-list").removeClass('disp');
            $node.find("#in-list-pr").removeClass('disp')
        });
        $node.find(".item").click(function(){
            removeFromList(product);
            $node.find("#in-list").addClass('disp');
            $node.find("#in-list-pr").addClass('disp');
            $node.find(".prod").removeClass('disp');
            $node.find(".prod-text").removeClass('disp');
        });
    }
    list.forEach(showOneProduct);
}

function initialiseProduct(){
    api.getProductList(function(err, productlist) {
        if (err) {
        }
        showProducts(productlist)
    });
}
initialiseProduct();


// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('#listik ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

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


