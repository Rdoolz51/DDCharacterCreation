$(document).ready(function(){
    $('.modal').modal();
  });

  $(document).ready(function(){
    $('select').formSelect();
  });

var baseApiUrl = "https://www.dnd5eapi.co/api/";

var charClasses = ["barbarian", "bard", "cleric", "druid", "fighter", "monk", "paladin", "ranger", "rogue", "sorcerer", "warlock", "wizard"];
var charRaces = ["dragonborn", "dwarf", "elf", "gnome", "half-elf", "half-orc", "halfling", "human", "tiefling"];
var charAligns = ["chaotic-neutral", "chaotic-evil", "chaotic-good", "lawful-neutral", "lawful-evil", "lawful-good", "neutral", "neutral-evil", "neutral-good"];

var CharacterAttributes = {
  name: "",
  class: "",
  race: "",
  alignment: "",
  sex: "",
  age: "",
  height: "",
  weight: "",
  proficiencies: "",
  strength: "",
  dexterity: "",
  constitution: "",
  intelligence: "",
  wisdom: "",
  charisma: "",
  equipment: [],
  spells: []
}

var classUrl = 'classes';
var raceUrl = 'races';
var alignUrl = 'alignments';

var randomClass;
var randomRace;
var randomAlign;

// check user's gender selection


// check if user wants to randomize their name
var checkName = function(event) {
  if ($('#name-choice').is(":checked")) {
    // randomize their name
    nameGen();
    // CharacterAttributes.name = randomName;
    // $('#nameUsed').value(randomName).change();
    // return randomName;
  };
};
$('#name-choice').on("click", checkName);

// check if user wants to randomize their class
var checkClass = function(event) {
  if ($('#class-choice').is(":checked")) {
    // randomize their class
    var randomClassNum = Math.floor(Math.random() * charClasses.length);
    var randomClass = charClasses[randomClassNum];
    CharacterAttributes.class = randomClass;
    console.log(CharacterAttributes.class);
    // $('#classMenu option[value=randomClass]');
    // $('#classMenu').val(randomClass).change();
    return CharacterAttributes.class;
  };
};
$('#class-choice').on("click", checkClass);

// check if user wants to randomize their race
var checkRace = function(event) {
  if ($('#race-choice').is(":checked")) {
    // randomize their race
    var randomRaceNum = Math.floor(Math.random() * charRaces.length);
    var randomRace = charRaces[randomRaceNum];
    CharacterAttributes.race = randomRace;
    console.log(CharacterAttributes.race);
    // $('#raceMenu').val(randomRace).change();
    return CharacterAttributes.race;
  };
};
$('#race-choice').on("click", checkRace);

// check if user wants to randomize their alignment
var checkAlign = function(event) {
  if ($('#align-choice').is(":checked")) {
    // randomize their alignment
    var randomAlignNum = Math.floor(Math.random() * charAligns.length);
    var randomAlign = charAligns[randomAlignNum];
    CharacterAttributes.alignment = randomAlign;
    console.log(CharacterAttributes.alignment);
    // $('#alignMenu').val(randomAlign).change();
    return CharacterAttributes.alignment;
  };
};
$('#align-choice').on("click", checkAlign);

// save user's selections to localStorage
$('#saveChar').on("click", function() {
  localStorage.setItem(CharacterAttributes, JSON.stringify(CharacterAttributes));
  // localStorage.setItem(CharacterAttributes.race, JSON.stringify("race".value));
  // localStorage.setItem(CharacterAttributes.alignment, JSON.stringify("alignment".value));
  // localStorage.setItem(CharacterAttributes.name, JSON.stringify($('#nameUsed').value));

  console.log(localStorage);
});