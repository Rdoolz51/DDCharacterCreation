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

var charClass;
var charRace;
var charAlign;
var charSex;
var charAge;
var charName;

// $(document).ready(function(){
//   // items we want to fetch
//   const fetchItems = [{
//     "endpoint": "/classes",
//     "id": "#class"
//   },
//   {
//     "endpoint": "/alignments",
//     "id": "#alignment"
//   }
// ];
//   // For each category to fetch
//   $.each(fetchItems, function(i, item) {
//     // Get the data
//     $.get(baseApiUrl + item.endpoint, function(data) {
//       // For each row in the data
//       $.each(data.results, function(j, row) {
//         // Create a new option in the corresponding <select>
//         $(item.id).append($("<option>", {
//           value: row.index,
//           text: row.name
//         }));
//       });
//     });
//   });
// });

var classUrl = 'classes';
var raceUrl = 'races';
var alignUrl = 'alignments';

var classesList = function (event) {
  var requestUrl = baseApiUrl + classUrl;
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      data.results.forEach((result, index) => {
        renderClasses(result.name, index);
      });
    })
    .catch(function (err) {
      console.log(err);
    });
};

var renderClasses = function (data, index) {
  var classOption = '<option value=${index}>${result.name}</option>'
  $("#classMenu").append(classOption);
}

var racesList = function (event) {
  var requestUrl = baseApiUrl + raceUrl;
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      data.results.forEach((result, index) => {
        renderRaces(result.name, index);
      });
    })
    .catch(function (err) {
      console.log(err);
    });
};

var alignList = function (event) {
  var requestUrl = baseApiUrl + alignUrl;
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      data.results.forEach((result, index) => {
        renderAlignments(result.name, index);
      });
    })
    .catch(function (err) {
      console.log(err);
    });
};

$('#saveChar').on("click", saveChars());

var saveChars = $(function() {
  $('#classMenu').change(function() {
    localStorage.setItem(CharacterAttributes.class, this.value);
  });
  $('#raceMenu').change(function() {
    localStorage.setItem(CharacterAttributes.race, this.value);
  });
  $('#alignMenu').change(function() {
    localStorage.setItem(CharacterAttributes.alignment, this.value);
  });
  $('#nameUsed').change(function() {
    localStorage.setItem(CharacterAttributes.name, json.stringify('.nameChoice'.value));
  });
  $('#ageUsed').change(function() {
    localStorage.setItem(CharacterAttributes.age, json.stringify('.ageChoice'.value));
  });
});