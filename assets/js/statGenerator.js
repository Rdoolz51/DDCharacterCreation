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

//loads character info from localStorage
var load = function () {
    var player = localStorage.getItem('character');
    CharacterAttributes = JSON.parse(player);
    var pState = localStorage.getItem('pageState');
    PageAttributes = JSON.parse(pState);
};
load();
var strength = 0;
var dexterity = 0;
var constitution = 0;
var intelligence = 0;
var wisdom = 0;
var charisma = 0;
var hitpoints = 0;
var speed = 0;
var proficiencies = [];
var mulliganCounter = 0;
//creates a button and appends it to whatever div you fill in.
buttonEl = `<a class="waves-effect waves-light red darken-4 btn" id="statBtn"><i class="material-icons left">keyboard_arrow_right</i>Generate Stats</a>`;
$('#statContainer').append(buttonEl);
$('#statBtn').on('click', function () {
    randomizeStats();
    //allows player to reroll stats 1 time
    if (mulliganCounter >= 2) {
        $('#statBtn').hide();
    }
});

//dice roller. takes in how many sides on the side, then how many dice youd like to roll.
function d(num, numDice = 1) {
    var roll = 0;
    for (i = 0; i < numDice; i++) {
        roll += Math.max(Math.floor(Math.random() * num + 1), 1);
    }
    return roll;
}

function randomizeStats() {
    //clears each stat every time the button is clicked
    $('#str').empty();
    $('#dex').empty();
    $('#con').empty();
    $('#int').empty();
    $('#wis').empty();
    $('#cha').empty();
    $('.hidden-on-start').show();

    roll1 = d(6, 3);
    roll2 = d(6, 3);
    roll3 = d(6, 3);
    roll4 = d(6, 3);
    roll5 = d(6, 3);
    roll6 = d(6, 3);

    let rolls = [roll1, roll2, roll3, roll4, roll5, roll6];
    //sorts rolls array. if a-b = a negative number, a stays ahead of b. if its a positive number, then a goes behind
    //rolls can never be negative so we can just do a simple subtraction
    rolls.sort(function (a, b) {
        return a - b;
    });

    let prioRoll = rolls[rolls.length - 1];
    let nextPrioRoll = rolls[rolls.length - 2];

    //removes last 2 numbers from array and stores them in priorityRolls
    let priorityRolls = rolls.splice(-2);

    //need to sort the remaining rolls to assign remaining 4 stats
    for (i = rolls.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * i);
        k = rolls[i];
        rolls[i] = rolls[j];
        rolls[j] = k;
    }

    let race = CharacterAttributes.race.toLowerCase();
    let playerClass = CharacterAttributes.class.toLowerCase();

    //used for testing

    // let race = 'dwarf';
    // let playerClass = 'paladin';

    //determines whether fighter is dex or str
    var fighterID = Math.floor(Math.random(1, 2) * 2 + 1);

    //presets each classes favored attributes. (It would suck to end up with a barbarian with 18 int and 6 strength  )
    if (playerClass == 'barbarian') {
        //str + con
        strength = priorityRolls[1]; //highest roll
        constitution = priorityRolls[0]; //2nd highest roll
        wisdom = rolls[0];
        intelligence = rolls[1];
        charisma = rolls[2];
        dexterity = rolls[3];
    }
    if (playerClass == 'bard') {
        //Char + Dex
        charisma = priorityRolls[1]; //highest roll
        dexterity = priorityRolls[0]; //2nd highest roll
        wisdom = rolls[0];
        intelligence = rolls[1];
        strength = rolls[2];
        constitution = rolls[3];
    }
    if (playerClass == 'cleric') {
        //Wis + con
        wisdom = priorityRolls[1]; //highest roll
        constitution = priorityRolls[0]; //2nd highest roll
        strength = rolls[0];
        intelligence = rolls[1];
        charisma = rolls[2];
        dexterity = rolls[3];
    }
    if (playerClass == 'druid') {
        //Wis + con
        wisdom = priorityRolls[1]; //highest roll
        constitution = priorityRolls[0]; //2nd highest roll
        strength = rolls[0];
        intelligence = rolls[1];
        charisma = rolls[2];
        dexterity = rolls[3];
    }
    if (playerClass == 'fighter') {
        //(Str OR Dex) + con
        if (fighterID == '1') {
            strength = priorityRolls[1]; //highest roll
            dexterity = rolls[3];
        } else if (fighterID == 2) {
            dexterity = priorityRolls[1]; //highest roll
            strength = rolls[3];
        }
        constitution = priorityRolls[0]; //2nd highest roll
        wisdom = rolls[0];
        intelligence = rolls[1];
        charisma = rolls[2];
    }
    if (playerClass == 'monk') {
        //Dex + Wis
        dexterity = priorityRolls[1]; //highest roll
        wisdom = priorityRolls[0]; //2nd highest roll
        constitution = rolls[0];
        intelligence = rolls[1];
        charisma = rolls[2];
        strength = rolls[3];
    }
    if (playerClass == 'paladin') {
        //Str + Char
        strength = priorityRolls[1]; //highest roll
        charisma = priorityRolls[0]; //2nd highest roll
        wisdom = rolls[0];
        intelligence = rolls[1];
        constitution = rolls[2];
        dexterity = rolls[3];
    }
    if (playerClass == 'ranger') {
        //Dex + Wis
        dexterity = priorityRolls[1]; //highest roll
        wisdom = priorityRolls[0]; //2nd highest roll
        constitution = rolls[0];
        intelligence = rolls[1];
        charisma = rolls[2];
        strength = rolls[3];
    }
    if (playerClass == 'rogue') {
        //Dex + Int
        dexterity = priorityRolls[1]; //highest roll
        intelligence = priorityRolls[0]; //2nd highest roll
        wisdom = rolls[0];
        constitution = rolls[1];
        charisma = rolls[2];
        strength = rolls[3];
    }
    if (playerClass == 'sorcerer') {
        //Char + Con
        strength = priorityRolls[1]; //highest roll
        constitution = priorityRolls[0]; //2nd highest roll
        wisdom = rolls[0];
        intelligence = rolls[1];
        charisma = rolls[2];
        dexterity = rolls[3];
    }
    if (playerClass == 'warlock') {
        //Char + Con
        charisma = priorityRolls[1]; //highest roll
        constitution = priorityRolls[0]; //2nd highest roll
        wisdom = rolls[0];
        intelligence = rolls[1];
        strength = rolls[2];
        dexterity = rolls[3];
    }
    if (playerClass == 'wizard') {
        //Int + Wis
        intelligence = priorityRolls[1]; //highest roll
        wisdom = priorityRolls[0]; //2nd highest roll
        constitution = rolls[0];
        strength = rolls[1];
        charisma = rolls[2];
        dexterity = rolls[3];
    }

    //determines which ability scores to increase due to racial bonus
    if (race == 'dwarf') {
        constitution += 2;
    }
    if (race == 'elf') {
        dexterity += 2;
    }
    if (race == 'halfling') {
        dexterity += 2;
    }
    if (race == 'human') {
        strength += 1;
        dexterity += 1;
        constitution += 1;
        intelligence += 1;
        wisdom += 1;
        charisma += 1;
    }
    if (race == 'dragonborn') {
        strength += 2;
        constitution += 1;
    }
    if (race == 'gnome') {
        intelligence += 2;
    }
    if (race == 'half-elf') {
        charisma += 2;
        constitution += 1;
        wisdom += 1;
    }
    if (race == 'half-orc') {
        strength += 2;
        constitution += 1;
    }
    if (race == 'tiefling') {
        intelligence += 1;
        charisma += 2;
    }
    //determing constitution Modifier(used to determine hp) - info follows chart found in 5e player handbook
    var conMod = 0;
    if (constitution == 1) {
        conMod = -5;
    }
    if (constitution >= 2 && constitution <= 3) {
        conMod = -4;
    }
    if (constitution >= 4 && constitution <= 5) {
        conMod = -3;
    }
    if (constitution >= 6 && constitution <= 7) {
        conMod = -2;
    }
    if (constitution >= 8 && constitution <= 9) {
        conMod = -1;
    }
    if (constitution >= 10 && constitution <= 11) {
        conMod = 0;
    }
    if (constitution >= 12 && constitution <= 13) {
        conMod = 1;
    }
    if (constitution >= 14 && constitution <= 15) {
        conMod = 2;
    }
    if (constitution >= 16 && constitution <= 17) {
        conMod = 3;
    }
    if (constitution >= 18 && constitution <= 19) {
        conMod = 4;
    }
    if (constitution >= 20 && constitution <= 21) {
        conMod = 5;
    }
    if (constitution >= 22 && constitution <= 23) {
        conMod = 6;
    }
    if (constitution >= 24 && constitution <= 25) {
        conMod = 7;
    }
    //determines player hitpoints based on hit die(found in player handbook) + con modifier
    if (playerClass == 'barbarian') {
        hitpoints = 12 + conMod;
    }
    if (playerClass == 'bard') {
        hitpoints = 8 + conMod;
    }
    if (playerClass == 'cleric') {
        hitpoints = 8 + conMod;
    }
    if (playerClass == 'druid') {
        hitpoints = 8 + conMod;
    }
    if (playerClass == 'fighter') {
        hitpoints = 10 + conMod;
    }
    if (playerClass == 'monk') {
        hitpoints = 8 + conMod;
    }
    if (playerClass == 'paladin') {
        hitpoints = 10 + conMod;
    }
    if (playerClass == 'ranger') {
        hitpoints = 10 + conMod;
    }
    if (playerClass == 'rogue') {
        hitpoints = 8 + conMod;
    }
    if (playerClass == 'sorcerer') {
        hitpoints = 6 + conMod;
    }
    if (playerClass == 'warlock') {
        hitpoints = 8 + conMod;
    }
    if (playerClass == 'wizard') {
        hitpoints = 6 + conMod;
    }
    //finds the speed of the character based on their race
    fetch('https://www.dnd5eapi.co/api/races/' + race)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
        })
        .then(function (data) {
            speed = data.speed;
        });

    //gets proficiencies for each race

    fetch('https://www.dnd5eapi.co/api/classes/' + playerClass + '/proficiencies')
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
        })
        .then(function (data) {
            proficiencies = [];
            data.results.forEach((result) => {
                proficiencies.push(result.name);
            });
        });
    //appends each stat to its own div on a page (Must create the divs first)
    $('#str').append('strength = ' + strength);
    $('#dex').append('dexterity =  ' + dexterity);
    $('#con').append('constitution =  ' + constitution);
    $('#int').append('intelligence =  ' + intelligence);
    $('#wis').append('wisdom = ' + wisdom);
    $('#cha').append('charisma = ' + charisma);
    //adds 1 to mulligan counter to suggest that the user has already used up their 1 reroll
    mulliganCounter++;
}
//submits stats to local storage
$('#submitChar').on('click', function () {
    $('#next').show();
    CharacterAttributes.strength = strength;
    CharacterAttributes.dexterity = dexterity;
    CharacterAttributes.constitution = constitution;
    CharacterAttributes.intelligence = intelligence;
    CharacterAttributes.charisma = charisma;
    CharacterAttributes.wisdom = wisdom;
    CharacterAttributes.hitpoints = hitpoints;
    CharacterAttributes.speed = speed;
    CharacterAttributes.proficiencies = proficiencies;
    PageAttributes.statsPage = 'complete';
    localStorage.setItem('character', JSON.stringify(CharacterAttributes));
    localStorage.setItem('pageState', JSON.stringify(PageAttributes));
});

// return to home button(out of use until we get pdf working)
// $('#returnBtn').on('click', function () {
//     location.href = '/index.html';
// });

// gets modal ready for use
$(document).ready(function () {
    $('.modal').modal();
});
// next button
$('#next').on('click', function () {
    location.href = './equipment.html';
});
