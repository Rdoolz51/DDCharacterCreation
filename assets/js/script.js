var CharacterAttributes = {
    name: '',
    class: '',
    race: '',
    alignment: '',
    sex: '',
    proficiencies: [],
    strength: '',
    dexterity: '',
    constitution: '',
    intelligence: '',
    wisdom: '',
    charisma: '',
    equipment: [],
    spells: [],
    hitpoints: '',
};

var ccCardEl = $('#ccCard');
var statCardEl = $('#statCard');
var equipCardEl = $('#equipCard');
var spellCardEl = $('#spellCard');
var charSheetEl = $('#vcs');

$(document).ready(function () {
    $('.modal').modal();
});

$('#ccCard').on('click', charCreate);
$('#statCard').on('click', statCreate);
$('#equipCard').on('click', equipCreate);
$('#spellCard').on('click', spellCreate);
$('#vcs').on('click', charSheet);
$('#ins').on('click', instructions);

$('#burger').on('click', hamburgerMenu);

function hamburgerMenu() {
    if ($('.c-pan').hasClass('zero')) {
        $('.c-pan').css('transform', 'translateX(-1000px)');
        $('.c-pan').removeClass('zero');
    } else {
        $('.c-pan').css('transform', 'translateX(0)');
        $('.c-pan').addClass('zero');
        $('.side').css('display', 'block');
    }
}

function charCreate() {
    $('#ccCard').css('background-image', 'url(/assets/images/player2done.jpg)');
    $('#ccCard').css('background-size', 'cover');
    $('#ccCard').css('color', 'green');
    $('#ccCard').css('border', '10px solid green');
}
function statCreate() {
    $('#statCard').css('background-image', 'url(/assets/images/stats2Done.jpg)');
    $('#statCard').css('background-size', 'cover');
    $('#statCard').css('color', 'green');
    $('#statCard').css('border', '10px solid green');
}
function equipCreate() {
    $('#equipCard').css('background-image', 'url(/assets/images/equip2done.jpg)');
    $('#equipCard').css('background-size', 'cover');
    $('#equipCard').css('background-position', '0px -45px');
    $('#equipCard').css('color', 'green');
    $('#equipCard').css('border', '10px solid green');
}
function spellCreate() {
    $('#spellCard').css('background-image', 'url(/assets/images/spells2done.jpg)');
    $('#spellCard').css('background-size', 'cover');
    $('#spellCard').css('background-position', 'left');
    $('#spellCard').css('color', 'green');
    $('#spellCard').css('border', '10px solid green');
}

function charSheet() {
    $('.main-card').css('background-image', 'url(/assets/images/charsheet.png)');
}

function instructions() {}
