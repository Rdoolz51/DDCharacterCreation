var strength = statRoller();
var dexterity = statRoller();
var constitution = statRoller();
var intelligence = statRoller();
var wisdom = statRoller();
var charisma = statRoller();


function d(num) {
   return Math.max(Math.floor(Math.random()* num + 1), 1);
}

function statRoller() {
    //roll 4 d6 and drop the lowest for stats.
    var roll1 = d(6);
    var roll2 = d(6);
    var roll3 = d(6);
    var roll4 = d(6);

    //takes the lowest roll out of the 4 rolls.
    var droppedDie = Math.min(roll1,roll2,roll3,roll4);

    //drops the lowest roll.
    var stat = (roll1 + roll2 + roll3 + roll4) - droppedDie;

    return stat;
}


console.log("strength = " + strength)
console.log("dexterity =  " + dexterity)
console.log("constitution =  "+constitution)
console.log("wisdom = " + wisdom)
console.log("charisma = " + charisma)
