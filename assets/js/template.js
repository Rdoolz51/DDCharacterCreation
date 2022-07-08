var CharacterAttributes = {
    name: '',
    class: '',
    race: '',
    alignment: '',
    sex: '',
    proficiencies: [],
    strength: '',
    dexterity: '',
    constitution: '',
    intelligence: '',
    wisdom: '',
    charisma: '',
    equipment: [],
    spells: [],
    hitpoints: '',
    speed: '',
};
$(document).ready(function () {
    $('.modal').modal();
});
$('#demo').on('click', function () {
    if ($('#demo').prop('checked') == true) {
        console.log('on');
    } else {
        console.log('off');
    }
});
