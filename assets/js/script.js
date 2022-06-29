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

}
function equipCreate() {

}
function spellCreate() {

}

function charSheet() {
    if ($('.main-card').css("display") == "flex") {
        if ($('.main-card').css("background-image", "url(/assets/images/instructions.png)")) {
            $('.main-card').css("background-image", "url(/assets/images/charsheet.png)");
        }
        else{
        }
        $('.main-card').css("display", "none")
    }
    else {
        $('.main-card').css("display", "flex")
        $('.main-card').css("background-image", "url(/assets/images/charsheet.png)");
    }
}

function instructions() {
    if ($('.main-card').css("display") == "flex") {
        if ($('.main-card').css("background-image", "url(/assets/images/charsheet.png)")) {
            $('.main-card').css("background-image", "url(/assets/images/instructions.png)");
        }
        else{
        }
        $('.main-card').css("display", "none")
    }
    else {
        $('.main-card').css("display", "flex")
        $('.main-card').css("background-image", "url(/assets/images/instructions.png)");
    }
}