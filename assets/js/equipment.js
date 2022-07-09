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
var PageAttributes = {
    characterPage: '',
    statsPage: '',
    equipPage: '',
    spellPage: '',
};
//pState is to manage which cards are available or grayed out on index.html
var pState = localStorage.getItem('pageState');
PageAttributes = JSON.parse(pState);
//player stores all of our character attributes
var player = localStorage.getItem('character');
CharacterAttributes = JSON.parse(player);

var equipArr = [];
var playerClass = CharacterAttributes.class.toLowerCase();
$('#spells').hide();
//searches through equipment categories for martial/simple weapons
function queryEquipment(equipmentUrl, choose) {
    return fetch(`https://www.dnd5eapi.co${equipmentUrl}`)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
        })
        .then(function (data) {
            let chosen = [];
            for (let i = 0; i < choose; i++) {
                const equipChoice = Math.floor(Math.random() * data.equipment.length);
                chosen.push({ name: data.equipment[equipChoice].name, quantity: 1 });
            }
            return chosen;
        });
}
function selectEquipment(from) {
    //picks a piece of equipment randomly from the 'from' array
    const choice = Math.floor(Math.random() * from.length);
    //if the next item after from[randomNumber 0-from.length] is a .equipment, get the name and quantity
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
        //searches categories like simple weapons and martial weapons
        //condition ? if condition is true : if condition is false. if from[choice] is an equipment_option, navigate past to the from then the equip category url (if from[choice] is not an equipment_option, then grab the equipment_category url)
        const url = from[choice].equipment_option
            ? from[choice].equipment_option.from.equipment_category.url
            : from[choice].equipment_category.url;

        const choose = from[choice].equipment_option ? from[choice].equipment_option.choose : 1;

        return queryEquipment(url, choose);
    }
}
getClassEquipmentApi(playerClass);

//initializes the instructions modal
$(document).ready(function () {
    $('.modal').modal();
});
//calls the api for the CharacterAttributes.class named playerClass
function getClassEquipmentApi(playerClass) {
    var equipmentArr = [];
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
            //sift through starting_equipment for equipment and quantity
            for (let i = 0; i < data.starting_equipment.length; i++) {
                promises.push(
                    Promise.resolve({
                        name: data.starting_equipment[i].equipment.name,
                        quantity: data.starting_equipment[i].quantity,
                    })
                );
            }
            //sift through starting_equipment_options for equipment and add the endpoint to the promises array
            for (let i = 0; i < data.starting_equipment_options.length; i++) {
                for (let j = 0; j < data.starting_equipment_options[i].choose; j++) {
                    promises.push(selectEquipment(data.starting_equipment_options[i].from));
                }
            }
            Promise.all(promises).then((values) => {
                // set equipment and render UI
                //flatten the values puts them neatly into 1 array 1 by 1 for every element in promises. display the quanitity as well
                values.flat().forEach((result) => {
                    equipmentArr.push(result.quantity + ' ' + result.name);
                    var displayEquip = `<p class="item">${result.quantity} ${result.name}</p>`;
                    $('#equipmentBox').append(displayEquip);
                });

                CharacterAttributes.equipment = equipmentArr;
            });
            equipmentArr = equipArr;
        })
        .catch(function (error) {
            console.log(error);
        });
}
//loads data to prevent overwriting, then sets equipment array to CharacterAttributes.
function save() {
    var player = localStorage.getItem('character');
    CharacterAttributes = JSON.parse(player);

    CharacterAttributes.equipment = equipArr;
    PageAttributes.equipPage = 'complete';
    localStorage.setItem('character', JSON.stringify(CharacterAttributes));
    localStorage.setItem('pageState', JSON.stringify(PageAttributes));
}
//send player to spells page
$('#submitChar').on('click', function () {
    save();
    $('#spells').show();
});
$('#spells').on('click', function () {
    location.href = './spells.html';
});
