var CharacterAttributes = {
    name: '',
    class: '',
    race: '',
    alignment: '',
    sex: '',
    age: '',
    height: '',
    weight: '',
    proficiencies: '',
    strength: '',
    dexterity: '',
    constitution: '',
    intelligence: '',
    wisdom: '',
    charisma: '',
    equipment: [],
    spells: [],
};
getClassEquipmentApi('paladin');

$(document).ready(function () {
    $('.modal').modal();
});
function getClassEquipmentApi(playerClass) {
    var apiURL = 'https://www.dnd5eapi.co/api/classes/' + playerClass + '/';
    fetch(apiURL)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject(response);
            }
        })
        .then(function (data) {
            for (let i = 0; i < data.starting_equipment_options.length; i++) {
                if (data.starting_equipment_options[i].from != undefined) {
                    for (let j = 0; j < data.starting_equipment_options[i].from.length; j++) {
                        console.log(data.starting_equipment_options[i]);
                        if (
                            data.starting_equipment_options[i].from[j].equipment != undefined ||
                            data.starting_equipment_options[i].from[j].equipment_category
                        ) {
                            //end of line for some equipment
                        } else {
                            // console.log(data.starting_equipment_options[i].from[j]);
                        }
                    }
                }
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

function getEquipmentApi(data) {}
