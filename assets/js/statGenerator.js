var strength;
var dexterity;
var constitution;
var intelligence;
var wisdom;
var charisma;
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

  //rolls the dice to give each stat a value. (6,3 means its rolling a 6 sided die 3 times)
  strength = d(6, 3);
  dexterity = d(6, 3);
  constitution = d(6, 3);
  intelligence = d(6, 3);
  wisdom = d(6, 3);
  charisma = d(6, 3);

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
  localStorage.setItem("strength", JSON.stringify(strength));
  localStorage.setItem("wisdom", JSON.stringify(wisdom));
  localStorage.setItem("intelligence", JSON.stringify(intelligence));
  localStorage.setItem("charisma", JSON.stringify(charisma));
  localStorage.setItem("dexterity", JSON.stringify(dexterity));
});
// return to home button
$("#returnBtn").on("click", function () {
  location.href = "/index.html";
});

// gets modal ready for use
$(document).ready(function () {
  $(".modal").modal();
});
