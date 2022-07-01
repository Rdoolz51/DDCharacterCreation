$(document).ready(function(){
    $('.modal').modal();
  });

  $(document).ready(function(){
    $('select').formSelect();
  });

var baseApiUrl = "https://www.dnd5eapi.co/api/";

var charClass;
var charRace;
var charAlign;
var charSex;
var charAge;
var charSize;
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