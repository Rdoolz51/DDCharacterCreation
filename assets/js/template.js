$(document).ready(function () {
    $('.modal').modal();
});
$("#demo").on("click", function() {
    if ($("#demo").prop('checked') == true){
        console.log("on")
    } else {
        console.log("off")
    }})