var CharacterAttributes = {
  name: "fartimus",
  charClass: "cleric",
  race: "gnome",
  alignment: "neutral",
  sex: "M",
  size: "medium",
  proficiencies: ["farting", "pooping"],
  strength: "15",
  dexterity: "9",
  constitution: "12",
  intelligence: "18",
  wisdom: "8",
  charisma: "6",
  equipment: ["poop knife", "plunger"],
  spells: ["toxic fart", "deadly BO"],
};

var playerName = CharacterAttributes.name;
var playerClass = CharacterAttributes.charClass;
var playerRace = CharacterAttributes.race;
var playerAlignment = CharacterAttributes.alignment;
var playerSex = CharacterAttributes.sex;
var playerSize = CharacterAttributes.size;
var playerProficiencies = CharacterAttributes.proficiencies;
var playerStrength = CharacterAttributes.strength;
var playerDexterity = CharacterAttributes.dexterity;
var playerConstitution = CharacterAttributes.constitution;
var playerIntelligence = CharacterAttributes.intelligence;
var playerWisdom = CharacterAttributes.wisdom;
var playerCharisma = CharacterAttributes.charisma;
var playerEquipment = CharacterAttributes.equipment;
// var playerEquipment = JSON.stringify(pEquipment);
var playerSpells = CharacterAttributes.spells;
// var playerSpells = JSON.stringify(pSpells);

var apiKey = "AIzaSyD_iuxaxY56u4gH6ja49Z5q2ZuAcofE7rM";
var baseApiUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&type=video&q=handbook%20helper%205e%20${CharacterAttributes.charClass}&maxResults=1`;
var videoKey;

// finds video from Critical Role to help user with new class
var ClassVideo = function () {
  $.ajax({
    method: "GET",
    url: baseApiUrl,
    success: function (data) {
      videoKey = data.items[0].id.videoId;
      var videoplayer = `<iframe
width="560"
height="315"
src="https://www.youtube.com/embed/${videoKey}"
title="YouTube video player"
frameborder="0"
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
allowfullscreen
></iframe>`;
      $("#video").append(videoplayer);
    },
  });
};
// loads from local storage
var load = function () {
  var charFromPrev = localStorage.getItem("character");
  CharacterAttributes = JSON.parse(charFromPrev);
};
// returns user to home page on click
$("#returnHome").on("click", function () {
  location.href = "./index.html";
});
var displayStats = function () {
  var dispName = `<p class="stats"> Your character's Name is ${playerName}</p>`;
  var dispClass = `<p class="stats"> Your character's Class is ${playerClass}</p>`;
  var dispRace = `<p class="stats"> Your character's Race is ${playerRace}</p>`;
  var dispAlign = `<p class="stats"> Your character's alignment is ${playerAlignment}</p>`;
  var dispSex = `<p class="stats"> Your character's sex is ${playerSex}</p>`;
  var dispSize = `<p class="stats"> Your character's size is ${playerSize}</p>`;
  var dispProf = `<p class="stats"> Your character's proficiencies are ${playerProficiencies}</p>`;
  var dispStr = `<p class="stats"> Your character's Strength is ${playerStrength}</p>`;
  var dispDex = `<p class="stats"> Your character's Dexterity is ${playerDexterity}</p>`;
  var dispCon = `<p class="stats"> Your character's Constitution is ${playerConstitution}</p>`;
  var dispInt = `<p class="stats"> Your character's Intelligence is ${playerIntelligence}</p>`;
  var dispWis = `<p class="stats"> Your character's Wisdom is ${playerWisdom}</p>`;
  var dispChar = `<p class="stats"> Your character's Charisma is ${playerCharisma}</p>`;
  var dispEquip = `<p class="stats"> Your character's Equipment is ${playerEquipment}</p>`;
  var dispSpells = `<p class="stats"> Your character's Spells are ${playerSpells}</p>`;
  $("#character-stats").append(dispName);
  $("#character-stats").append(dispClass);
  $("#character-stats").append(dispRace);
  $("#character-stats").append(dispAlign);
  $("#character-stats").append(dispSex);
  $("#character-stats").append(dispSize);
  $("#character-stats").append(dispProf);
  $("#character-stats").append(dispStr);
  $("#character-stats").append(dispDex);
  $("#character-stats").append(dispCon);
  $("#character-stats").append(dispInt);
  $("#character-stats").append(dispWis);
  $("#character-stats").append(dispChar);
  $("#character-stats").append(dispEquip);
  $("#character-stats").append(dispSpells);
};

load();
ClassVideo();
displayStats();
