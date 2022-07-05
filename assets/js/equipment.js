var CharacterAttributes = {
    name: '',
    class: '',
    race: '',
    alignment: '',
    sex: '',
    age: '',
    height: '',
    weight: '',
    proficiencies: [],
    strength: '',
    dexterity: '',
    constitution: '',
    intelligence: '',
    wisdom: '',
    charisma: '',
    equipment: [],
    spells: [],
};
const equipBox = document.getElementById("equipmentBox")
const equipUl = document.createElement("ul");
const liEl = document.createElement("li");
const pEl = document.createElement("p");



function selectEquipment(listLength) {
    return Math.floor(Math.random() * listLength);
    
}
getClassEquipmentApi('barbarian');

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
        if (playerClass == 'paladin') {
            for (let i = 0; i < data.starting_equipment.length; i++) {
                const link = data.starting_equipment[i];
                // Guaranteed Starting
                console.log(data.starting_equipment[i].equipment.name) //chain mail
                console.log(data.starting_equipment_options[3].from[0].equipment_category.name); //holy symbols
                //Equipment
                console.log("");
                console.log(" CHOICES : ");
                console.log("");
                for (let j = 0; j < data.starting_equipment_options[i].from.length; j++) {
                    console.log('[1 ' + data.starting_equipment_options[i].from[0][0].equipment.name + " AND " + "1 " + data.starting_equipment_options[i].from[j][1].equipment_option.from.equipment_category.name + "]"); //shield
                    console.log("OR");
                        console.log("[2 " + data.starting_equipment_options[i].from[1].equipment_option.from.equipment_category.name + "]");
                        console.log(" ");
                        console.log("5 " + data.starting_equipment_options[1].from[0].equipment.name);
                        console.log("OR");
                        console.log("1 " + data.starting_equipment_options[1].from[1].equipment_option.from.equipment_category.name);
                        console.log("");
                        console.log("1 " + data.starting_equipment_options[2].from[0].equipment.name);
                        console.log("OR");
                        console.log("1 " + data.starting_equipment_options[2].from[1].equipment.name);
                        
                    }
                }
            }
            if (playerClass == 'barbarian') {
                for (let i = 0; i < data.starting_equipment.length; i++) {
                    const link = data.starting_equipment[i];
                    // Guaranteed Starting
                    var num = link.quantity;
                    console.log(num + " " + link.equipment.name);
                    //Equipment
                }
                console.log("");
                console.log(" CHOICES : ");
                console.log("");

                for(let i = 0; i < data.starting_equipment_options.length; i++) {
                    const link = data.starting_equipment_options[i];
                    var num = link.from[0].quantity
                        console.log(num + " " + link.from[0].equipment.name);
                        console.log("OR");
                        console.log(num + " " + link.from[1].equipment_option.from.equipment_category.name);
                        console.log(" ");
                }
            }

        })
        .catch(function (error) {
            console.log(error);
        });
}

function getEquipmentApi(data) { }
