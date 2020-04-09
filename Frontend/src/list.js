var $product_list = $("#product-container");
var Templates = require('./Templates');
var api = require('./API');
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
function showProducts(list) {
    $product_list.html("");
    function showOneProduct(product) {
        var html_code = Templates.BuyList_OneItem({ product: product });
        var $node = $(html_code);
        $product_list.append($node);
    }

    list.forEach(showOneProduct);
};
api.getProductList(function(err, productlist) {
    if (err) {
        //Обробляємо помилку,	якщо можемо або повертаємо її
        //return	callback(err);
    }
    showProducts(productlist)
});
const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const name = urlParams.get('name');
$("#list-name").text(name);