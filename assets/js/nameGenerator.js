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

buttonEl = $('<button>')
buttonEl.text("GENERATE NAME")
$("{REPLACE WITH WHAT YOU WANT TO APPEND TO}").append(buttonEl)
buttonEl.on('click', nameGen)


function nameGen() {
    var rFirst = Math.floor(Math.random() * firstName.length);
    var rLast = Math.floor(Math.random() * lastName.length);

    var randomName = firstName[rFirst] + " " + lastName[rLast];

    $('.randomName').remove();

    textEl = $('<p>')
    textEl.addClass("randomName")

    labelEl = $('<label>')
    labelEl.addClass("randomName")
    labelEl.text("Random Name: ")

    textEl.text(randomName)
    $('{REPLACE WITH WHEREVER YOU WANT TO APPEND THIS TO}').append(labelEl)
    $(labelEl).append(textEl)

    return randomName;
}

