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
var submitSpells = $("#submit-spells");
var selectedSpells = ["15", "12", "25"];
var baseApiUrl = "https://www.dnd5eapi.co/api/";

// GOING TO HAVE TO CHANGE ONCE WE GET CLASSES SET UP FROM OTHER PAGES!!!!!!!!!!!!!

var classUrl = `classes/druid/levels/1/spells`;

$(document).ready(function () {
  $(".modal").modal();
});
// $(document).ready(function () {
//   $(".tooltipped").tooltip();
// });
// Event listener on the first submit button shown.
// Hides said submit button and switch.
// creates new submit button at bottom of page

$("#submit-choice").on("click", function () {
  console.log("clicked");
  classSpells();
  $("#submit-choice").remove();
  $("#switch").remove();
  $("#submit-spells").show();
  setUpSubmit();
  if ($("#demo").prop("checked")) {
    console.log("on");
  } else {
    console.log("off");

    var spellRestriction = `<h5 class="choiceNum">You can choose ${cantripsKnown} spells.</h5>`;
    $("#spellsContainer").append(spellRestriction);
  }
});
// })

// fetches spells that the user selected/randomized has available
var classSpells = function (event) {
  var requestUrl = baseApiUrl + classUrl;
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //   console.log(data);
      data.results.forEach((result, index) => {
        renderClasses(result.name, index);
        spellsDes(result.index, index);
      });
    })
    .catch(function (err) {
      console.log(err);
    });
};

// displays spells using data from classSpells
var renderClasses = function (data, index) {
  var spellsCrd = `<div class="row"><h5 class="col 12" id="spellCar${index}">${data}</h5><label><input type="checkbox" class=" spell-box red darken-4s"  data-spell="${data}" id="box${index}" /><span>Check to use this spell</span></label></div>`;
  $("#spellsContainer").append(spellsCrd);
};

// fetches spell description
var spellsDes = function (data, index) {
  var spellUrl = `/spells/${data}`;
  spellApiUrl = baseApiUrl + spellUrl;
  fetch(spellApiUrl)
    .then(function (response1) {
      return response1.json();
    })
    .then(function (result1) {
      //   console.log(result1.desc);
      renderSpellDescription(result1.desc, index);
    })
    .catch(function (err) {
      console.log(err);
    });
};

// displays spell description using data from spellDes
var renderSpellDescription = function (data, index) {
  var spellsDescription = `<p id="spellDesc"><blockquote>${data}</blockquote></p>`;
  $("#spellCar" + index).append(spellsDescription);
};

// Fetches amount of cantrips the class chosen has available
var cantripRestriction = function () {
  var cantripUrl = "classes/druid/levels";
  cantripApiUrl = baseApiUrl + cantripUrl;
  fetch(cantripApiUrl)
    .then(function (response2) {
      return response2.json();
    })
    .then(function (result2) {
      //   console.log(result2[1].spellcasting.cantrips_known);
      cantripsKnown = result2[1].spellcasting.cantrips_known;
    })
    .catch(function (err) {
      console.log(err);
    });
};

// Makes submit button display a tooltip telling user that they have too many spells selected
var setUpSubmit = function () {
  submitSpells.addClass("tooltipped");
  submitSpells.attr("data-position", "right");
  submitSpells.attr(
    "data-tooltip",
    `Your class lets you have no more than ${cantripsKnown} spells selected.`
  );
  submitSpells.tooltip();

  // return;
};

cantripRestriction();
