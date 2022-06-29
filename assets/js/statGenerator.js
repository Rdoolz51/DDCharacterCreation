var strength;
var dexterity;
var constitution;
var intelligence;
var wisdom;
var charisma;

buttonEl = $('<button>')
buttonEl.text("GENERATE STATS")
$(".stats").append(buttonEl)
buttonEl.on('click', doStuff)

strEl = $('<p>')
dexEl = $('<p>')
conEl = $('<p>')
intEl = $('<p>')
wisEl = $('<p>')
chaEl = $('<p>')


function d(num,numDice = 1) {
    var roll = 0;
    for(i=0; i<numDice; i++) {
       roll += Math.max(Math.floor(Math.random()* num + 1), 1);

    }
    return roll;
}
// function statRoller() {
//     //roll 4 d6 and drop the lowest for stats.
//     var roll1 = d(6);
//     var roll2 = d(6);
//     var roll3 = d(6);
//     var roll4 = d(6);
    
//     //takes the lowest roll out of the 4 rolls.
//     var droppedDie = Math.min(roll1,roll2,roll3,roll4);
    
//     //drops the lowest roll.
//     var stat = (roll1 + roll2 + roll3 + roll4) - droppedDie;
    
    
//     return stat;
// }


function doStuff() {
    $('.str').empty();
    $('.dex').empty();
    $('.con').empty();
    $('.int').empty();
    $('.wis').empty();
    $('.cha').empty();
    strength = d(6,3);
    dexterity = d(6,3)
    constitution = d(6,3)
    intelligence = d(6,3)
    wisdom = d(6,3)
    charisma = d(6,3)
    strEl.text("STR : " + strength)
    dexEl.text("DEX : " + strength)
    conEl.text("CONST : " + strength)
    intEl.text("INT : " + strength)
    wisEl.text("WIS : " + strength)
    chaEl.text("CHA : " + strength)
    $('.str').append("strength = " + strength);
    $('.dex').append("dexterity =  " + dexterity);
    $('.con').append("constitution =  " + constitution);
    $('.int').append("intelligence =  " + intelligence);
    $('.wis').append("wisdom = " + wisdom);
    $('.cha').append("charisma = " + charisma);
}

