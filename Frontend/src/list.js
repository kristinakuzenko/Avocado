var value = "list"
$('#mi').keypress(function(e) {
    if (e.which == 13 && this.value) {
        window.location = "list.html";
        value = document.getElementById("mi").value;
        $("#list-name").text("nnn");
    }
});
$("#submit").click(function() {
    value = document.getElementById("mi").value;
});
$("#list-name").text(value);