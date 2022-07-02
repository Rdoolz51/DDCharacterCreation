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
var selectedSpells = [];
var baseApiUrl = "https://www.dnd5eapi.co/api/";

// GOING TO HAVE TO CHANGE ONCE WE GET CLASSES SET UP FROM OTHER PAGES!!!!!!!!!!!!!

var classUrl = `classes/druid/levels/1/spells`;

$(document).ready(function () {
  $(".modal").modal();
});

// Event listener on the first submit button shown.
// Hides said submit button and switch.
// creates new submit button at bottom of page

$("#submit-choice").on("click", function () {
  console.log("clicked");
  classSpells();
  $("#submit-choice").remove();
  $("#switch").remove();
  $("#submit-spells").show();
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
  var spellsCrd = `<div class="row"><h5 class="col 12" id="spellCar${index}">${data}</h5><label><input type="checkbox" class=" spell-box red darken-4s"  data-spell="${data}" name="box${index}" id="box${index}" /><span>Check to use this spell</span></label></div>`;
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

$("#submit-spells").on("click", function () {
  $("#submit-warning").text("");
  $(":checkbox:checked").each(function () {
    var checkedSpell = $(this).data("spell");
    console.log(checkedSpell);
    selectedSpells.push(checkedSpell);
  });
  if (selectedSpells.length <= cantripsKnown) {
    console.log("lower than cantrips");
    $("#submit-spells").hide();
    $("#pre-choices").hide();
    var finalChoiceHead = `<h3>You have selected these spells: </h3>`;
    $("#spells-chosen").append(finalChoiceHead);
    for (let i = 0; i < selectedSpells.length; i++) {
      var selSpellDisp = `<p class="col s12 offset-s1 final-choice">${[
        selectedSpells[i],
      ]}</p>`;
      $("#spells-chosen").append(selSpellDisp);
    }
    $(".hidden-on-start").show();
  } else {
    console.log("higher than cantrips");
    $("#submit-warning").text(
      "You have submitted more cantrips than your class can have! Please change your selection."
    );
    selectedSpells = [];
  }
});

$("#restart").on("click", function () {
  selectedSpells = [];
  location.reload();
});
cantripRestriction();
