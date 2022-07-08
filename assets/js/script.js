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
displayStats();
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

$('#burger').on('click', hamburgerMenu);
//transforms hamburger menu the hard way :)
function hamburgerMenu() {
    if ($('.c-pan').hasClass('zero')) {
        $('.c-pan').css('transform', 'translateX(-1000px)');
        $('.c-pan').removeClass('zero');
    } else {
        $('.c-pan').css('transform', 'translateX(0)');
        $('.c-pan').addClass('zero');
    }
}
//each of the following functions hides its respective card on the index.html page until the previous page(s) has been marked completed
function charCreate() {
    if (PageAttributes.characterPage === 'complete') {
        $('#ccCard').css('background-image', 'url(./assets/images/player2done.jpg)');
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
        $('#statCard').css('background-image', 'url(./assets/images/stats2done.jpg)');
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
        $('#equipCard').css('background-image', 'url(./assets/images/equip2done.jpg)');
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
        $('#spellCard').css('background-image', 'url(./assets/images/spells2done.jpg)');
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

//reset button on index. Empties strings/arrays in localStorage so that the user can make a new character if they want
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

// either displays stats or new player message
function displayStats() {
    CharacterAttributes = JSON.parse(localStorage.getItem('character', PageAttributes));
    if (PageAttributes.spellPage != 'complete') {
        var NewUser = `<h5>You have not created a character yet! To begin your journey please click the character picture!</h5>`;
        $('#character-stats').append(NewUser);
    } else {
        var playerName = CharacterAttributes.name;
        var playerClass = CharacterAttributes.class;
        var playerRace = CharacterAttributes.race;
        var playerAlignment = CharacterAttributes.alignment;
        var playerSex = CharacterAttributes.sex;
        var playerProficiencies = CharacterAttributes.proficiencies;
        var playerStrength = CharacterAttributes.strength;
        var playerDexterity = CharacterAttributes.dexterity;
        var playerConstitution = CharacterAttributes.constitution;
        var playerIntelligence = CharacterAttributes.intelligence;
        var playerWisdom = CharacterAttributes.wisdom;
        var playerCharisma = CharacterAttributes.charisma;
        var playerEquipment = CharacterAttributes.equipment;
        var playerSpells = CharacterAttributes.spells;
        var playerHp = CharacterAttributes.hitpoints;
        var playerSpeed = CharacterAttributes.speed;
        var dispName = `<p class="stats"> Your character's Name is <span class="highlight">${playerName}</span></p>`;
        var dispClass = `<p class="stats"> Your character's Class is <span class="highlight"> ${playerClass}</span></p>`;
        var dispRace = `<p class="stats"> Your character's Race is <span class="highlight"> ${playerRace}</span></p>`;
        var dispAlign = `<p class="stats"> Your character's alignment is <span class="highlight"> ${playerAlignment}</span></p>`;
        var dispSex = `<p class="stats"> Your character's sex is <span class="highlight"> ${playerSex}</span></p>`;
        var playerProf = playerProficiencies.join(' , ');
        var dispProf = `<p class="stats"> Your character's proficiencies are <span class="highlight"> ${playerProf}</span></p>`;
        var dispStr = `<p class="stats"> Your character's Strength is <span class="highlight"> ${playerStrength}</span></p>`;
        var dispDex = `<p class="stats"> Your character's Dexterity is <span class="highlight"> ${playerDexterity}</span></p>`;
        var dispCon = `<p class="stats"> Your character's Constitution is <span class="highlight"> ${playerConstitution}</span></p>`;
        var dispInt = `<p class="stats"> Your character's Intelligence is <span class="highlight"> ${playerIntelligence}</span></p>`;
        var dispWis = `<p class="stats"> Your character's Wisdom is <span class="highlight"> ${playerWisdom}</span></p>`;
        var dispChar = `<p class="stats"> Your character's Charisma is <span class="highlight"> ${playerCharisma}</span></p>`;
        var playerEquip = playerEquipment.join(' , ');
        var dispEquip = `<p class="stats"> Your character's Equipment is <span class="highlight"> ${playerEquip}</span></p>`;
        if (playerSpells.length === 0) {
            var dispSpells = `<p class="stats"> Your character doesn't know any spells</p>`;
        } else {
            var playerSpls = playerSpells.join(' , ');
            var dispSpells = `<p class="stats"> Your character's Spells are <span class="highlight"> ${playerSpls}</span></p>`;
        }
        var dispHp = `<p class="stats"> Your character's hitpoints are <span class="highlight"> ${playerHp}</span></p>`;
        var dispSpeed = `<p class="stats"> Your character's speed is <span class="highlight"> ${playerSpeed}</span></p>`;
        $('#character-stats').append(dispName);
        $('#character-stats').append(dispClass);
        $('#character-stats').append(dispRace);
        $('#character-stats').append(dispAlign);
        $('#character-stats').append(dispSex);
        $('#character-stats').append(dispProf);
        $('#character-stats').append(dispStr);
        $('#character-stats').append(dispDex);
        $('#character-stats').append(dispCon);
        $('#character-stats').append(dispInt);
        $('#character-stats').append(dispWis);
        $('#character-stats').append(dispChar);
        $('#character-stats').append(dispEquip);
        $('#character-stats').append(dispSpells);
        $('#character-stats').append(dispHp);
        $('#character-stats').append(dispSpeed);
    }
}
