var CharacterAttributes = {
  name: "",
  class: "",
  race: "",
  alignment: "",
  sex: "",
  age: "",
  height: "",
  weight: "",
  proficiencies: [],
  strength: "",
  dexterity: "",
  constitution: "",
  intelligence: "",
  wisdom: "",
  charisma: "",
  equipment: [],
  spells: [],
};

var apiKey = "AIzaSyD_iuxaxY56u4gH6ja49Z5q2ZuAcofE7rM";
var baseApiUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&type=video&q=handbook%20helper%205e%20${CharacterAttributes.class}&maxResults=1`;
var videoKey;
var ClassVideo = function () {
  $.ajax({
    method: "GET",
    url: baseApiUrl,
    success: function (data) {
      //   console.log(data.items[0].id.videoId);
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
var load = function () {
  var charFromPrev = localStorage.getItem("character");
  CharacterAttributes = JSON.parse(charFromPrev);
};
load();
ClassVideo();
