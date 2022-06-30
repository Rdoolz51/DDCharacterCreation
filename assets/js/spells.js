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
  spells: [],
};
var baseApiUrl = "https://www.dnd5eapi.co/api/";

// GOING TO HAVE TO CHANGE ONCE WE GET CLASSES SET UP

var classUrl = `classes/druid/levels/1/spells`;
// var spellUrl = "/spells/result[i].name"
$(document).ready(function () {
  $(".modal").modal();
});

$("#submit-choice").on("click", function () {
  console.log("clicked");
  classSpells();
  if ($("#demo").prop("checked")) {
    console.log("on");
  } else {
    console.log("off");
  }
});
// })

var classSpells = function (event) {
  var requestUrl = baseApiUrl + classUrl;
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      data.results.forEach((result) => {
        renderClasses(result.name);
      });
    })
    .catch(function (err) {
      console.log(err);
    });
};

var renderClasses = function (data) {
  // console.log(data)
  var spellsCard = `<div>Spell name is: ${data}</div>`;
  $("#spellsContainer").append(spellsCard);
};
