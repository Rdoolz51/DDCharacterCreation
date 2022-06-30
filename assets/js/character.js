$(document).ready(function(){
    $('.modal').modal();
  });

// var classes = ["barbarian", "bard", "cleric", "druid", "fighter", "monk", "paladin", "ranger", "rogue", "sorcerer", "warlock", "wizard"];
// var races = ["dragonborn", "dwarf", "elf", "gnome", "half-elf", "half-orc", "halfling", "human", "tiefling"];
// var alignments = ["chaotic-neutral", "chaotic-evil", "chaotic-good", "lawful-neutral", "lawful-evil", "lawful-good", "neutral", "neutral-evil", "neutral-good"];
var sexes = ["male", "female"];

var baseApiUrl = "https://www.dnd5eapi.co/api/";

var charClass;
var charRace;
var charAlign;
var charSex;
var charAge;
var charHeight;
var charWeight;
var charProf;
var charName;

$(document).ready(function(){
  // items we want to fetch
  const fetchItems = [{
    "endpoint": "/classes",
    "id": "#class"
  },
  {
    "endpoint": "/alignments",
    "id": "#alignment"
  }
];
  // For each category to fetch
  $.each(fetchItems, function(i, item) {
    // Get the data
    $.get(baseApiUrl + item.endpoint, function(data) {
      // For each row in the data
      $.each(data.results, function(j, row) {
        // Create a new option in the corresponding <select>
        $(item.id).append($("<option>", {
          value: row.index,
          text: row.name
        }));
      });
    });
  });
});