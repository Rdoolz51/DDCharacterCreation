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

//loads Character Attributes from local storage

var load = function () {
    var charFromPrev = localStorage.getItem('character');
    CharacterAttributes = JSON.parse(charFromPrev);
    var pState = localStorage.getItem('pageState');
    PageAttributes = JSON.parse(pState);
};
load();

//create variables for each part of Character Attributes
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
// var playerEquipment = JSON.stringify(pEquipment);
var playerSpells = CharacterAttributes.spells;
var playerHp = CharacterAttributes.hitpoints;
var playerSpeed = CharacterAttributes.speed;
// var playerSpells = JSON.stringify(pSpells);

var apiKey = 'AIzaSyBZsuBMiz1R9DYR75Hr6VbSs74eJFb2FHk';
var baseApiUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&type=video&q=handbook%20helper%205e%20${playerClass}&maxResults=1`;

var videoKey;

// finds video from Critical Role to help user with new class
var ClassVideo = function () {
    $.ajax({
        method: 'GET',
        url: baseApiUrl,
        success: function (data) {
            videoKey = data.items[0].id.videoId;
            var videoplayer = `<iframe
width="560"
height="315"
src="https://www.youtube.com/embed/${videoKey}"
title="YouTube video player"
frameborder="0"
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
allowfullscreen
></iframe>`;
            $('#video').append(videoplayer);
        },
    });
};

// returns user to home page on click
$('#returnHome').on('click', function () {
    location.href = './index.html';
});

//Displays stats under video for user to see and read.
var displayStats = function () {
    var dispName = `<p class="stats"> Your character's Name is :  <span class="highlight">${playerName}</span></p>`;
    var dispClass = `<p class="stats"> Your character's Class is :  <span class="highlight"> ${playerClass}</span></p>`;
    var dispRace = `<p class="stats"> Your character's Race is :  <span class="highlight"> ${playerRace}</span></p>`;
    var dispAlign = `<p class="stats"> Your character's alignment is :  <span class="highlight"> ${playerAlignment}</span></p>`;
    var dispSex = `<p class="stats"> Your character's sex is :  <span class="highlight"> ${playerSex}</span></p>`;
    var playerProf = playerProficiencies.join(' , ');
    var dispProf = `<p class="stats"> Your character's proficiencies are :  <span class="highlight"> ${playerProf}</span></p>`;
    var dispStr = `<p class="stats"> Your character's Strength is :  <span class="highlight"> ${playerStrength}</span></p>`;
    var dispDex = `<p class="stats"> Your character's Dexterity is :  <span class="highlight"> ${playerDexterity}</span></p>`;
    var dispCon = `<p class="stats"> Your character's Constitution is :  <span class="highlight"> ${playerConstitution}</span></p>`;
    var dispInt = `<p class="stats"> Your character's Intelligence is :  <span class="highlight"> ${playerIntelligence}</span></p>`;
    var dispWis = `<p class="stats"> Your character's Wisdom is :  <span class="highlight"> ${playerWisdom}</span></p>`;
    var dispChar = `<p class="stats"> Your character's Charisma is :  <span class="highlight"> ${playerCharisma}</span></p>`;
    var playerEquip = playerEquipment.join(' , ');
    var dispEquip = `<p class="stats"> Your character's Equipment is :  <span class="highlight"> ${playerEquip}</span></p>`;
    if (playerSpells.length === 0) {
        var dispSpells = `<p class="stats"> Your character doesn't know any spells</p>`;
    } else {
        var playerSpls = playerSpells.join(' , ');
        var dispSpells = `<p class="stats"> Your character's Spells are :  <span class="highlight"> ${playerSpls}</span></p>`;
    }
    var dispHp = `<p class="stats"> Your character's hitpoints are :  <span class="highlight"> ${playerHp}</span></p>`;
    var dispSpeed = `<p class="stats"> Your character's speed is :  <span class="highlight"> ${playerSpeed}</span></p>`;
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
};

ClassVideo();
displayStats();
