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

// check if user wants to randomize their name
var checkName = function(event) {
  if ($('#name-choice').is(":checked")) {
    nameGen();
    // $('#nameUsed').value(randomName).change();
    return randomName;
  }
  else {
  }
};
$('#name-choice').on("click", checkName);

// check if user wants to randomize their class
var checkClass = function(event) {
  if ($('#class-choice').is(":checked")) {
    var randomClassNum = Math.floor(Math.random() * charClasses.length);
    var randomClass = charClasses[randomClassNum];
    console.log(randomClass);
    // $('#classMenu option[value=randomClass]');
    // $('#classMenu').val(randomClass).change();
    return randomClass;
  }
  else {
  }
};
$('#class-choice').on("click", checkClass);

// check if user wants to randomize their race
var checkRace = function(event) {
  if ($('#race-choice').is(":checked")) {
    var randomRaceNum = Math.floor(Math.random() * charRaces.length);
    var randomRace = charRaces[randomRaceNum];
    console.log(randomRace);
    // $('#raceMenu').val(randomRace).change();
    return randomRace;
  }
  else {
  }
};
$('#race-choice').on("click", checkRace);

// check if user wants to randomize their alignment
var checkAlign = function(event) {
  if ($('#align-choice').is(":checked")) {
    var randomAlignNum = Math.floor(Math.random() * charAligns.length);
    var randomAlign = charAligns[randomAlignNum];
    console.log(randomAlign);
    // $('#alignMenu').val(randomAlign).change();
    return randomAlign;
  }
  else {
  }
};
$('#align-choice').on("click", checkAlign);

// save user's selections to localStorage
var saveChars = $(function() {
  // $('#classMenu').change(function() {
    localStorage.setItem(CharacterAttributes.class, randomClass.value);
  // });
  // $('#raceMenu').change(function() {
    localStorage.setItem(CharacterAttributes.race, randomRace.value);
  // });
  // $('#alignMenu').change(function() {
    localStorage.setItem(CharacterAttributes.alignment, randomAlign.value);
  // });
  // $('#nameUsed').change(function() {
    // localStorage.setItem(CharacterAttributes.name, JSON.stringify($('#nameUsed').value));
  // });
  console.log(localStorage);
});
$('#saveChar').on("click", saveChars);