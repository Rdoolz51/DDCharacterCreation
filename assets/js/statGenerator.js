var CharacterAttributes = {
    name: "",
    class: "warlock",
    race: "dwarf",
    alignment: "",
    sex: "",
    age: "",
    height: "",
    weight: "",
    proficiencies: [],
    strength: "",
    dexterity: "",
    constitution: "",
    intelligence: "",
    wisdom: "",
    charisma: "",
    equipment: [],
    spells: [],
};
 let player = JSON.parse(localStorage.getItem("character"));
 
 console.log(player);
 
 
 var strength = 0;
 var dexterity = 0;
 var constitution = 0;
 var intelligence = 0;
 var wisdom = 0;
 var charisma = 0;
 //creates a button and appends it to whatever div you fill in.
 buttonEl = `<a class="waves-effect waves-light red darken-4 btn" id="statBtn"><i class="material-icons left">keyboard_arrow_right</i>Generate Stats</a>`;
 $("#statContainer").append(buttonEl);
 $("#statBtn").on("click", randomizeStats);
 
 // strEl = $("<p>");
 // dexEl = $("<p>");
 // conEl = $("<p>");
 // intEl = $("<p>");
 // wisEl = $("<p>");
// chaEl = $("<p>");

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
    $("#str").empty();
    $("#dex").empty();
    $("#con").empty();
    $("#int").empty();
    $("#wis").empty();
    $("#cha").empty();
    $(".hidden-on-start").show();
    
    roll1 = d(6, 3);
    roll2 = d(6, 3);
    roll3 = d(6, 3);
    roll4 = d(6, 3);
    roll5 = d(6, 3);
    roll6 = d(6, 3);
    
    let rolls = [
        roll1,
        roll2,
        roll3,
        roll4,
        roll5,
        roll6
    ];

    
    //rolls can never be negative so we can just do a simple subtraction
    rolls.sort(function (a, b) {
        return a - b;
    });
    console.log(rolls);
    
    let prioRoll = rolls[rolls.length - 1];
    let nextPrioRoll = rolls[rolls.length - 2];
    
    //removes last 2 numbers from array and stores them in priorityRolls
    let priorityRolls = rolls.splice(-2);
    
    console.log(rolls);
    //need to sort the remaining rolls to assign remaining 4 stats
    for (i = rolls.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * i)
        k = rolls[i]
        rolls[i] = rolls[j]
        rolls[j] = k
    }
    
    //  let player = localStorage.getItem("character");
    let race = player.race;
    let playerClass = player.class
    
    //determines whether fighter is dex or str
    var fighterID = Math.floor(Math.random(1, 2) * 2 + 1)
    
    if (playerClass == 'barbarian') {
        //str + con
        strength = priorityRolls[1];  //highest roll
        constitution = priorityRolls[0]; //2nd highest roll
        wisdom = rolls[0]
        intelligence = rolls[1]
        charisma = rolls[2]
        dexterity = rolls[3]
    }
    if (playerClass == 'bard') {
        //Char + Dex
        charisma = priorityRolls[1];  //highest roll
        dexterity = priorityRolls[0]; //2nd highest roll
        wisdom = rolls[0]
        intelligence = rolls[1]
        strength = rolls[2]
        constitution = rolls[3]
    }
    if (playerClass == 'cleric') {
        //Wis + con
        wisdom = priorityRolls[1];  //highest roll
        constitution = priorityRolls[0]; //2nd highest roll
        strength = rolls[0]
        intelligence = rolls[1]
        charisma = rolls[2]
        dexterity = rolls[3]
    }
    if (playerClass == 'druid') {
        //Wis + con
        wisdom = priorityRolls[1];  //highest roll
        constitution = priorityRolls[0]; //2nd highest roll
        strength = rolls[0]
        intelligence = rolls[1]
        charisma = rolls[2]
        dexterity = rolls[3]
    }
    if (playerClass == 'fighter') {
        //(Str OR Dex) + con
        //make a fighterID that is a random num between 1 & 2. if 1: str = prio, dex = nextPrio if 2: dex = prio str = nextPrio
        if (fighterID == '1') {
            strength = priorityRolls[1] //highest roll
            dexterity = rolls[3]
        } else if (fighterID == 2) {
            dexterity = priorityRolls[1] //highest roll
            strength = rolls[3];
        }
        constitution = priorityRolls[0]; //2nd highest roll
        wisdom = rolls[0]
        intelligence = rolls[1]
        charisma = rolls[2]
    }
    if (playerClass == 'monk') {
        //Dex + Wis
        dexterity = priorityRolls[1];  //highest roll
        wisdom = priorityRolls[0]; //2nd highest roll
        constitution = rolls[0]
        intelligence = rolls[1]
        charisma = rolls[2]
        strength = rolls[3]
    }
    if (playerClass == 'paladin') {
        //Str + Char
        strength = priorityRolls[1];  //highest roll
        charisma = priorityRolls[0]; //2nd highest roll
        wisdom = rolls[0]
        intelligence = rolls[1]
        constitution = rolls[2]
        dexterity = rolls[3]
    }
    if (playerClass == 'ranger') {
        //Dex + Wis
        dexterity = priorityRolls[1];  //highest roll
        wisdom = priorityRolls[0]; //2nd highest roll
        constitution = rolls[0]
        intelligence = rolls[1]
        charisma = rolls[2]
        strength = rolls[3]
    }
    if (playerClass == 'rogue') {
        //Dex + Int
        dexterity = priorityRolls[1];  //highest roll
        intelligence = priorityRolls[0]; //2nd highest roll
        wisdom = rolls[0]
        constitution = rolls[1]
        charisma = rolls[2]
        strength = rolls[3]
    }
    if (playerClass == 'sorcerer') {
        //Char + Con
        strength = priorityRolls[1];  //highest roll
        constitution = priorityRolls[0]; //2nd highest roll
        wisdom = rolls[0]
        intelligence = rolls[1]
        charisma = rolls[2]
        dexterity = rolls[3]
    }
    if (playerClass == 'warlock') {
        //Char + Con
        charisma = priorityRolls[1];  //highest roll
        constitution = priorityRolls[0]; //2nd highest roll
        wisdom = rolls[0]
        intelligence = rolls[1]
        strength = rolls[2]
        dexterity = rolls[3]
    }
    if (playerClass == 'wizard') {
        //Int + Wis
        intelligence = priorityRolls[1];  //highest roll
        wisdom = priorityRolls[0]; //2nd highest roll
        constitution = rolls[0]
        strength = rolls[1]
        charisma = rolls[2]
        dexterity = rolls[3]
    }
    
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
    //appends each stat to its own div on a page (Must create the divs first)
    $("#str").append("strength = " + strength);
    $("#dex").append("dexterity =  " + dexterity);
    $("#con").append("constitution =  " + constitution);
    $("#int").append("intelligence =  " + intelligence);
    $("#wis").append("wisdom = " + wisdom);
    $("#cha").append("charisma = " + charisma);
}

//submits stats to local storage
$("#submitChar").on("click", function () {
    $(".hide-post").hide();
    
    var finalSubmit = `<h4>Your stats have been submitted to your character!</h4>`;
    $(".returnBtn").prepend(finalSubmit);
    $("#returnBtn").show();
    CharacterAttributes.strength = strength;
    CharacterAttributes.dexterity = dexterity;
    CharacterAttributes.constitution = constitution;
    CharacterAttributes.intelligence = intelligence;
    CharacterAttributes.charisma = charisma;
    CharacterAttributes.wisdom = wisdom;
    localStorage.setItem("character", JSON.stringify(CharacterAttributes));
});
// return to home button
$("#returnBtn").on("click", function () {
    location.href = "/index.html";
});

// gets modal ready for use
$(document).ready(function () {
    $(".modal").modal();
});
