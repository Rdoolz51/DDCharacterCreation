var CharacterAttributes = {
    name: '',
    class: '',
    race: '',
    alignment: '',
    sex: '',
    size: '',
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
