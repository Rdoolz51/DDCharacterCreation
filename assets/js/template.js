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

$(document).ready(function () {
    $('.modal').modal();
});
$("#demo").on("click", function() {
    if ($("#demo").prop('checked') == true){
        console.log("on")
    } else {
        console.log("off")
    }
})

