var ccCardEl = $("#ccCard")
var statCardEl = $("#statCard")
var equipCardEl = $("#equipCard")
var spellCardEl = $("#spellCard")
var charSheetEl = $("#vcs")

$("#ccCard").on('click', charCreate)
$("#statCard").on('click', statCreate)
$("#equipCard").on('click', equipCreate)
$("#spellCard").on('click', spellCreate)
$("#vcs").on('click', charSheet)
$("#ins").on('click', instructions)

$('#burger').on('click', hamburgerMenu)


function hamburgerMenu() {
    if ($('.c-pan').hasClass("zero")) {
        $('.c-pan').css("transform", "translateX(1000px)")
        $('.c-pan').removeClass("zero")

    }
    else {
        $('.c-pan').css("transform", "translateX(0)")
        $('.c-pan').addClass("zero")
        $('.side').css("display", "block")
    }
}

function charCreate() {
}
function statCreate() {
    $('#statCard').css("background-image", "url(/assets/images/statsDone.png)")
    $('#statCard').css("background-size", "cover")
    $('#statCard').css("color", "green")

}
function equipCreate() {

}
function spellCreate() {

}

function charSheet() {
    $('.main-card').css("background-image", "url(/assets/images/charsheet.png)")
}

function instructions() {

    $('.main-card').css("background-image", "url(/assets/images/instructions.png)")
}