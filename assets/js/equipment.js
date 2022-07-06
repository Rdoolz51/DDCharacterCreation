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
};

var charAtt = localStorage.getItem('character');
CharacterAttributes = JSON.parse(charAtt)

function queryEquipment(equipmentUrl, choose) {
    return fetch(`https://www.dnd5eapi.co${equipmentUrl}`) //from[choice].equipment_option.from.equipment_category.url
        .then(function (response) {
            if (response.ok) {
                return response.json()
            }
        })
        .then(function (data) {
            let chosen = [];
            //from[choice].equipment_option.choose
            for (let i = 0; i < choose; i++) {
                const equipChoice = Math.floor(Math.random() * data.equipment.length)
                chosen.push({ name: data.equipment[equipChoice].name, quantity: 1 })

            }
            return chosen;
        })
}