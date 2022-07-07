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
var load = function () {
    var player = localStorage.getItem('character');
    CharacterAttributes = JSON.parse(player);
};

load();
const equipmentArr = [];
var playerClass = CharacterAttributes.class;

function queryEquipment(equipmentUrl, choose) {
    return fetch(`https://www.dnd5eapi.co${equipmentUrl}`) //from[choice].equipment_option.from.equipment_category.url
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
        })
        .then(function (data) {
            let chosen = [];
            //from[choice].equipment_option.choose
            for (let i = 0; i < choose; i++) {
                const equipChoice = Math.floor(Math.random() * data.equipment.length);
                chosen.push({ name: data.equipment[equipChoice].name, quantity: 1 });
            }
            return chosen;
        });
}
function selectEquipment(from) {
    const choice = Math.floor(Math.random() * from.length);
    if (from[choice].equipment) {
        return Promise.resolve([
            {
                name: from[choice].equipment.name,
                quantity: from[choice].quantity,
            },
        ]);
    } else if (from[choice]['0']) {
        let chosen = [];
        const promises = [];

        if (from[choice]['0'].equipment) {
            let chosen = [];

            chosen.push({
                name: from[choice]['0'].equipment.name,
                quantity: from[choice]['0'].quantity,
            });

            promises.push(Promise.resolve(chosen));
        } else if (!from[choice]['0'].equipment) {
            promises.push(
                queryEquipment(
                    from[choice]['0'].equipment_option.from.equipment_category.url,
                    from[choice]['0'].equipment_option.choose
                )
            );
        }

        if (from[choice]['1'].equipment) {
            let chosen = [];

            chosen.push({
                name: from[choice]['1'].equipment.name,
                quantity: from[choice]['1'].quantity,
            });

            promises.push(Promise.resolve(chosen));
        } else if (!from[choice]['1'].equipment) {
            promises.push(
                queryEquipment(
                    from[choice]['1'].equipment_option.from.equipment_category.url,
                    from[choice]['1'].equipment_option.choose
                )
            );
        }

        if (from[choice]['2']) {
            if (from[choice]['2'].equipment) {
                let chosen = [];

                chosen.push({
                    name: from[choice]['2'].equipment.name,
                    quantity: from[choice]['2'].quantity,
                });

                promises.push(Promise.resolve(chosen));
            } else if (!from[choice]['2'].equipment) {
                promises.push(
                    queryEquipment(
                        from[choice]['2'].equipment_option.from.equipment_category.url,
                        from[choice]['2'].equipment_option.choose
                    )
                );
            }
        }

        return Promise.all(promises).then((values) => {
            return values.flat();
        });
    } else {
        const url = from[choice].equipment_option
            ? from[choice].equipment_option.from.equipment_category.url
            : from[choice].equipment_category.url;

        const choose = from[choice].equipment_option ? from[choice].equipment_option.choose : 1;

        return queryEquipment(url, choose);
    }
}
getClassEquipmentApi(playerClass);

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
            const promises = [];

            for (let i = 0; i < data.starting_equipment.length; i++) {
                promises.push(
                    Promise.resolve({
                        name: data.starting_equipment[i].equipment.name,
                        quantity: data.starting_equipment[i].quantity,
                    })
                );
            }

            for (let i = 0; i < data.starting_equipment_options.length; i++) {
                // console.log(data.starting_equipment_options[i]);
                for (let j = 0; j < data.starting_equipment_options[i].choose; j++) {
                    promises.push(selectEquipment(data.starting_equipment_options[i].from));
                }
            }
            Promise.all(promises).then((values) => {
                // set equipment and render UI
                // CharacterAttributes.equipment = values.flat();
                values.flat().forEach((result) => {
                    equipmentArr.push(result.name);
                    debugger;
                });

                // $('#loader').addClass('hide')
                // $('#content').removeClass('hide')

                CharacterAttributes.equipment = equipmentArr;
                debugger;
                console.log(equipmentArr);
                console.log(playerClass);
            });
        })
        .catch(function (error) {
            console.log(error);
        });
}
buttonEl = `<a class="waves-effect waves-light red darken-4 btn" id="statBtn"><i class="material-icons left">keyboard_arrow_right</i>Generate Stats</a>`;
$('#equipmentBox').append(buttonEl);
function save() {
    localStorage.setItem('character', JSON.stringify(CharacterAttributes));
    console.log(JSON.stringify(CharacterAttributes));
}

$(buttonEl).on('click', save);
