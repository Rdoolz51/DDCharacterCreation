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
    speed: '',
};
var PageAttributes = {
    characterPage: '',
    statsPage: '',
    equipPage: '',
    spellPage: '',
};

var checkIfAttStored = JSON.parse(localStorage.getItem('pageState'));
if (!checkIfAttStored) {
    localStorage.setItem('pageState', JSON.stringify(PageAttributes));
}

load();

function load() {
    var pState = localStorage.getItem('pageState');
    PageAttributes = JSON.parse(pState);
}
var ccCardEl = $('#ccCard');
var statCardEl = $('#statCard');
var equipCardEl = $('#equipCard');
var spellCardEl = $('#spellCard');
var charSheetEl = $('#vcs');
charCreate();
statCreate();
equipCreate();
spellCreate();

$(document).ready(function () {
    $('.modal').modal();
});

// $('#ccCard').on('click', charCreate);
// $('#statCard').on('click', statCreate);
// $('#equipCard').on('click', equipCreate);
// $('#spellCard').on('click', spellCreate);
// $('#vcs').on('click', charSheet);

$('#burger').on('click', hamburgerMenu);

function hamburgerMenu() {
    if ($('.c-pan').hasClass('zero')) {
        $('.c-pan').css('transform', 'translateX(-1000px)');
        $('.c-pan').removeClass('zero');
    } else {
        $('.c-pan').css('transform', 'translateX(0)');
        $('.c-pan').addClass('zero');
    }
}
function charCreate() {
    if (PageAttributes.characterPage === 'complete') {
        $('#ccCard').css('background-image', 'url(/assets/images/player2done.jpg)');
        $('#ccCard').css('background-size', 'cover');
        $('#ccCard').css('color', 'green');
        $('#ccCard').css('border', '10px solid green');
        $('#ccCard').on('click', function () {
            $('#ccCardAnchor').attr('href', '#');
        });
    } else {
        $('#ccCardAnchor').attr('href', './character.html');
        $('#statCardAnchor').attr('href', '#');
        $('#statCard').css('filter', 'grayscale()');
        $('#equipCardAnchor').attr('href', '#');
        $('#equipCard').css('filter', 'grayscale()');
        $('#spellCardAnchor').attr('href', '#');
        $('#spellCard').css('filter', 'grayscale()');
        PageAttributes.characterPage = '';
    }
}
function statCreate() {
    if (PageAttributes.statsPage == 'complete') {
        $('#statCard').css('background-image', 'url(/assets/images/stats2Done.jpg)');
        $('#statCard').css('background-size', 'cover');
        $('#statCard').css('color', 'green');
        $('#statCard').css('border', '10px solid green');
        $('#statCard').on('click', function () {
            $('#statCardAnchor').attr('href', '#');
        });
    } else {
        if (PageAttributes.characterPage == 'complete') {
            $('#statCardAnchor').attr('href', './stats.html');
            $('#equipCardAnchor').attr('href', '#');
            $('#equipCard').css('filter', 'grayscale()');
            $('#spellCardAnchor').attr('href', '#');
            $('#spellCard').css('filter', 'grayscale()');
            PageAttributes.statsPage = '';
        }
    }
}
function equipCreate() {
    if (PageAttributes.equipPage == 'complete') {
        $('#equipCard').css('background-image', 'url(/assets/images/equip2done.jpg)');
        $('#equipCard').css('background-size', 'cover');
        $('#equipCard').css('background-position', '0px -45px');
        $('#equipCard').css('color', 'green');
        $('#equipCard').css('border', '10px solid green');
        $('#equipCard').on('click', function () {
            $('#equipCardAnchor').attr('href', '#');
        });
    } else {
        if (PageAttributes.statsPage == 'complete') {
            $('#equipCardAnchor').attr('href', './equipment.html');
            $('#spellCardAnchor').attr('href', '#');
            $('#spellCard').css('filter', 'grayscale()');
            PageAttributes.equipPage = '';
        }
    }
}
function spellCreate() {
    if (PageAttributes.spellPage == 'complete') {
        $('#spellCard').css('background-image', 'url(/assets/images/spells2done.jpg)');
        $('#spellCard').css('background-size', 'cover');
        $('#spellCard').css('background-position', 'left');
        $('#spellCard').css('color', 'green');
        $('#spellCard').css('border', '10px solid green');
        $('#spellCard').on('click', function () {
            $('#spellCardAnchor').attr('href', '#');
        });
    } else {
        if (PageAttributes.equipPage == 'complete') {
            $('#spellCardAnchor').attr('href', './spells.html');
            PageAttributes.spellPage = '';
        }
    }
}

function charSheet() {
    $('.main-card').css('background-image', 'url(/assets/images/charsheet.png)');
}

$('#resetCharacter').on('click', function () {
    console.log('clicked');
    PageAttributes.characterPage = '';
    PageAttributes.statsPage = '';
    PageAttributes.equipPage = '';
    PageAttributes.spellPage = '';
    localStorage.setItem('pageState', JSON.stringify(PageAttributes));
    localStorage.setItem('character', JSON.stringify(CharacterAttributes));
    location.reload();
});
