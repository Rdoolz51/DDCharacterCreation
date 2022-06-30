var strength;
var dexterity;
var constitution;
var intelligence;
var wisdom;
var charisma;
//creates a button and appends it to whatever div you fill in.
buttonEl = $('<button>')
buttonEl.text("GENERATE STATS")
$("{REPLACE THIS WITH THE ELEMENT YOU WANT TO APPEND THE BUTTON TO}").append(buttonEl)
buttonEl.on('click', randomizeStats)

strEl = $('<p>')
dexEl = $('<p>')
conEl = $('<p>')
intEl = $('<p>')
wisEl = $('<p>')
chaEl = $('<p>')

//dice roller. takes in how many sides on the side, then how many dice youd like to roll.
function d(num,numDice = 1) {
    var roll = 0;
    for(i=0; i<numDice; i++) {
       roll += Math.max(Math.floor(Math.random()* num + 1), 1);

    }
    return roll;
}

function randomizeStats() {
    //clears each stat every time the button is clicked
    $('.str').empty();
    $('.dex').empty();
    $('.con').empty();
    $('.int').empty();
    $('.wis').empty();
    $('.cha').empty();

    //rolls the dice to give each stat a value. (6,3 means its rolling a 6 sided die 3 times)
    strength = d(6,3);
    dexterity = d(6,3)
    constitution = d(6,3)
    intelligence = d(6,3)
    wisdom = d(6,3)
    charisma = d(6,3)

    //gives the html elements the stat value
    strEl.text("STR : " + strength)
    dexEl.text("DEX : " + strength)
    conEl.text("CONST : " + strength)
    intEl.text("INT : " + strength)
    wisEl.text("WIS : " + strength)
    chaEl.text("CHA : " + strength)
    //appends each stat to its own div on a page (Must create the divs first)
    $('.str').append("strength = " + strength);
    $('.dex').append("dexterity =  " + dexterity);
    $('.con').append("constitution =  " + constitution);
    $('.int').append("intelligence =  " + intelligence);
    $('.wis').append("wisdom = " + wisdom);
    $('.cha').append("charisma = " + charisma);
}

