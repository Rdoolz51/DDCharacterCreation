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

var load = function () {
    var player = localStorage.getItem('character');
    CharacterAttributes = JSON.parse(player);
    var pState = localStorage.getItem('pageState');
    PageAttributes = JSON.parse(pState);
};
load();
var charClass = CharacterAttributes.class.toLowerCase();
var possibleSpells = [];
var submitSpells = $('#submit-spells');
var selectedSpells = [];

var classUrl = `classes/${charClass}/levels/0/spells`;
var baseApiUrl = 'https://www.dnd5eapi.co/api/';

$(document).ready(function () {
    $('.modal').modal();
});

// Checks to see if the class has any spells available
var classCheck = function () {
    if (
        charClass == 'barbarian' ||
        charClass == 'monk' ||
        charClass == 'paladin' ||
        charClass == 'fighter' ||
        charClass == 'ranger' ||
        charClass == 'rogue'
    ) {
        var noSpellDisp = `<h3 class="no-spell">Your character is a ${charClass} and they do not know any cantrips at level 1. </h3> `;
        $('.if-no-spells').hide();
        $('.endContainer').show();
        $('#endContainer').prepend(noSpellDisp);
    }
};
$(document).ready(classCheck);

// Event listener on the first submit button shown.
// Hides said submit button and switch.
// creates new submit button at bottom of page

$('#submit-choice').on('click', function () {
    console.log('clicked');
    $('#submit-choice').hide();
    $('#submit-spells').show();
    $('.hidden-on-start1').show();
    if ($('#demo').prop('checked')) {
        console.log('on');
        randomSpell();

        $('#switch').hide();
    } else {
        console.log('off');
        $('#instruct').text('Check boxes under each spell description to include choice');
        $('#switch').hide();
        var spellRestriction = `<h5 class="choiceNum">You can choose ${cantripsKnown} spells.</h5>`;
        $('#spellsContainer').append(spellRestriction);
    }
});

// fetches spells that the user selected/randomized has available
var classSpells = function (event) {
    var requestUrl = baseApiUrl + classUrl;
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            //   console.log(data);
            data.results.forEach((result, index) => {
                renderClasses(result.name, index);
                spellsDes(result.index, index);
            });
        })
        .catch(function (err) {
            console.log(err);
        });
};

// displays spells using data from classSpells
var renderClasses = function (data, index) {
    var spellsCrd = `<div class="row"><h5 class="col 12" id="spellCar${index}">${data}</h5><label><input type="checkbox" class=" spell-box red darken-4s"  data-spell="${data}" name="box${index}" id="box${index}" /><span>Check to use this spell</span></label></div>`;
    $('#spellsContainer').append(spellsCrd);
};

// fetches spell description
var spellsDes = function (data, index) {
    var spellUrl = `/spells/${data}`;
    spellApiUrl = baseApiUrl + spellUrl;
    fetch(spellApiUrl)
        .then(function (response1) {
            return response1.json();
        })
        .then(function (result1) {
            //   console.log(result1.desc);
            renderSpellDescription(result1.desc, index);
        })
        .catch(function (err) {
            console.log(err);
        });
};

// displays spell description using data from spellDes
var renderSpellDescription = function (data, index) {
    var spellsDescription = `<p id="spellDesc"><blockquote>${data}</blockquote></p>`;
    $('#spellCar' + index).append(spellsDescription);
};

// Fetches amount of cantrips the class chosen has available
var cantripRestriction = function () {
    var cantripUrl = 'classes/druid/levels';
    cantripApiUrl = baseApiUrl + cantripUrl;
    fetch(cantripApiUrl)
        .then(function (response2) {
            return response2.json();
        })
        .then(function (result2) {
            cantripsKnown = result2[1].spellcasting.cantrips_known;
        })
        .catch(function (err) {
            console.log(err);
        });
};

// if user chooses to select their own spells, this button finds out if they have chosen too many or sends them to the final decision screen
$('#submit-spells').on('click', function () {
    $('#submit-warning').text('');
    $(':checkbox:checked').each(function () {
        var checkedSpell = $(this).data('spell');
        console.log(checkedSpell);
        selectedSpells.push(checkedSpell);
    });
    if (selectedSpells.length <= cantripsKnown) {
        console.log('lower than cantrips');
        $('#submit-spells').hide();
        $('#pre-choices').hide();
        var finalChoiceHead = `<h3>You have selected these spells: </h3>`;
        $('#spells-chosen').append(finalChoiceHead);
        for (let i = 0; i < selectedSpells.length; i++) {
            var selSpellDisp = `<h5 class="col s12 offset-s1 final-choice">${[selectedSpells[i]]}</h5>`;
            $('#spells-chosen').append(selSpellDisp);
        }
        $('.hidden-on-start').show();
    } else {
        console.log('higher than cantrips');
        $('#submit-warning').text(
            'You have submitted more cantrips than your class can have! Please change your selection.'
        );
        selectedSpells = [];
    }
});

// restart button if user doesn't like spell choices

$('#restart').on('click', function () {
    selectedSpells = [];
    location.reload();
});
$('#restart2').on('click', function () {
    selectedSpells = [];
    location.reload();
});

// selects random cantrips according to their allowance

var randomSpell = function () {
    $('.footer').removeClass('hide');
    $('.spell-box').each(function () {
        var potSpell = $(this).data('spell');
        // console.log(potSpell);
        possibleSpells.push(potSpell);
    });

    for (let i = 0; i < cantripsKnown; i++) {
        shuffle(possibleSpells);
        var selRanSpells = possibleSpells[Math.floor(Math.random() * possibleSpells.length)];
        if (selRanSpells[0] === selRanSpells[1]) {
            shuffle(possibleSpells);
            selRanSpells[1] = possibleSpells[Math.floor(Math.random() * possibleSpells.length)];
            selectedSpells.push(selRanSpells[1]);
        } else {
            selectedSpells.push(selRanSpells);
        }
        // selectedSpells.push(selRanSpells);
    }
    $('.hidden-on-start1').hide();
    $('.startup').hide();
    $('#submit-spells').hide();
    $('.hidden-on-start2').show();
    RandomSpellsDisplay();
};

function dupPrevention() {
    var used = selectedSpells.find(selRanSpells);
    if (used) {
        selectedSpells = [];
    } else {
        selectedSpells.push(selRanSpells);
    }
}

// Shuffles the array to get random spell names

var shuffle = function (array) {
    let currentIndex = array.length,
        randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
};
// displays randomly chosen spells
var RandomSpellsDisplay = function () {
    var randomHead = `<div id="rndSpell"><h3>The randomly chosen spells are: </h3></div>`;
    $('#randomSpellsContainer').prepend(randomHead);
    for (let i = 0; i < selectedSpells.length; i++) {
        var randomizedSpell = '<h5 class="col s12 offset-s1 endSpells">' + selectedSpells[i] + '</h5>';
        $('#rndSpell').append(randomizedSpell);
    }
};
// Button to submit spell choices to character sheet(local storage)

$('#submitChar').on('click', function () {
    $('.endContainer').show();
    $('#tut2').show();
    // var endMessage = `<h3>Your chosen spells have been submitted to your character sheet!</h3>`;
    $('#closingMessage').prepend(endMessage);
    $('.hidden-on-start').hide();
    $('.hidden-on-start1').hide();
    $('.hidden-on-start2').hide();

    save();
});
$('#submitChar2').on('click', function () {
    $('.endContainer').show();
    // var endMessage = `<h3>Your chosen spells have been submitted to your character sheet!</h3>`;
    $('#closingMessage').prepend(endMessage);
    $('.hidden-on-start').hide();
    $('.hidden-on-start1').hide();
    $('.hidden-on-start2').hide();
    save();
});

// return to index button(out of use until we get pdf working)
// $('#returnHome').on('click', function () {
//     location.href = './index.html';
// });

// sends user to tutorial video
$('#tut').on('click', function () {
    PageAttributes.spellPage = 'complete';
    localStorage.setItem('pageState', JSON.stringify(PageAttributes));
    location.href = './tutorial.html';
});
var save = function () {
    load();
    CharacterAttributes.spells = selectedSpells;
    PageAttributes.spellPage = 'complete';
    localStorage.setItem('character', JSON.stringify(CharacterAttributes));
    localStorage.setItem('pageState', JSON.stringify(PageAttributes));
};
cantripRestriction();
classSpells();
