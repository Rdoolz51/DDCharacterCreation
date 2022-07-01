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

// GOING TO HAVE TO CHANGE ONCE WE GET CLASSES SET UP FROM OTHER PAGES

var classUrl = `classes/druid/levels/1/spells`;

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
      data.results.forEach((result, index) => {
        renderClasses(result.name, index);
        spellsDes(result.index, index);
      });
    })
    .catch(function (err) {
      console.log(err);
    });
};

var renderClasses = function (data, index) {
  var spellsCrd = `<div class="row"><h5 class="col 12" id="spellCar${index}">${data}</h5><label><input type="checkbox" class="red darken-4s" id="box${index}" /><span>Check to use this spell</span></label></div>`;
  $("#spellsContainer").append(spellsCrd);
};

var spellsDes = function (data, index) {
  var spellUrl = `/spells/${data}`;
  spellApiUrl = baseApiUrl + spellUrl;
  fetch(spellApiUrl)
    .then(function (response1) {
      return response1.json();
    })
    .then(function (result1) {
      console.log(result1.desc);
      renderSpellDescription(result1.desc, index);
    })
    .catch(function (err) {
      console.log(err);
    });
};

var renderSpellDescription = function (data, index) {
  var spellsDescription = `<blockquote>${data}</blockquote>`;
  $("#spellCar" + index).append(spellsDescription);
};
