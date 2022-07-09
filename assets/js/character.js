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
localStorage.setItem('character', JSON.stringify(CharacterAttributes));
loadPage();
function loadPage() {
    var pState = localStorage.getItem('pageState');
    PageAttributes = JSON.parse(pState);
}
$(document).ready(function () {
    $('.modal').modal();
});

$(document).ready(function () {
    $('select').formSelect();
});

var baseApiUrl = 'https://www.dnd5eapi.co/api/';

// define arrays of classes, races, and alignments
var charClasses = [
    'barbarian',
    'bard',
    'cleric',
    'druid',
    'fighter',
    'monk',
    'paladin',
    'ranger',
    'rogue',
    'sorcerer',
    'warlock',
    'wizard',
];
var charRaces = ['dragonborn', 'dwarf', 'elf', 'gnome', 'half-elf', 'half-orc', 'halfling', 'human', 'tiefling'];
var charAligns = [
    'chaotic-neutral',
    'chaotic-evil',
    'chaotic-good',
    'lawful-neutral',
    'lawful-evil',
    'lawful-good',
    'neutral',
    'neutral-evil',
    'neutral-good',
];

// list name options
var maleFirstName = [
    'Zokad',
    'Eirsod',
    'Kidorth',
    'Jenu',
    'Esi',
    'Thrand',
    'Alder',
    'Galmar',
    'Vermund',
    'Sigfred',
    'Aelfric',
    'Balder',
    'Arnvidar',
    'Ragnar',
    'Frodo',
    'Bilbo',
    'Aeragar',
    'Lindir',
    'Nethion',
    'Alagion',
    'Nendo',
    'Teldion',
    'Pastion',
    'Buior',
    'Parthion',
    'Penyo',
    'Glan',
    'Forben',
    'Galion',
    'Maur',
    'Sereg',
    'Angaran',
    'Calarben',
    'Gilornor',
    'Muinor',
    'Ingem',
    'Gondor',
    'Falasdir',
    'Ashraf',
    'Wadood',
    'Nizaar',
    'Al-Rahman',
    'Ivor',
    'Taino',
    'Gulben',
    'Mormeri',
    'Gaerlin',
    'Anchogol',
    'Fernor',
    'Nullo',
    'Ulundir',
    'Dagion',
    'Calarphen',
    'Sauron',
    'Gandalf',
    'Mordor',
    'Vanwo',
    'Gorogon',
    'Thochon',
    'Fuithor',
    'Esgalwathion',
    'Balhalph',
    'Amlugaer',
    'Uanor',
    'Nahtaro',
    'Rivophen',
    'Alphaear',
    'Dúvain',
    'Vaniþaura',
    'Agarwaenor',
    'Daedhrog',
    'Sanarion',
    'Tyawindion',
    'Maito',
    'Siciltan',
    'Finwa',
    'Lilótion',
    'Ceutarion',
    'Rúþea',
    'Wandil',
    'Nullo',
    'Airehíse',
    'Quildo',
    'Etto',
    'Lission',
    'Ilfirin',
    'Feaquildo',
    'Nípion',
    'Cottion',
    'Varyaro',
    'Arcaro',
    'Malpenar',
    'Oritonde',
    'Arenar',
    'Dan-Za',
    'Milos',
    'Tedril',
    'Bovkin',
    'Irarvy',
    'Gadaves',
];

var femaleFirstName = [
    'Luinie',
    'Oialiel',
    'Linte',
    'Malwafinde',
    'Hwarine',
    'Hendunárie',
    'Arosse',
    'Nimpiel',
    'Linde',
    'Ohtare',
    'Quildalótie',
    'Alwiel',
    'Urde',
    'Quilda',
    'Wáre',
    'Sámondur',
    'Cunyar',
    'Mírime',
    'Vasaryariel',
    'Írnith',
    'Túnith',
    'Fainthel',
    'Elnith',
    'Annuinith',
    'Celairthel',
    'Esgarthel',
    'Ingemdis',
    'Daehel',
    'Ninde',
    'Rothruindis',
    'Fandis',
    'Fainith',
    'Nimhel',
    'Laiviel',
    'Taer',
    'Bainthaurel',
    'Quantiel',
    'Vanisaura',
    'Círil',
    'Achathriw',
    'Glúdhel',
    'Maeldis',
    'Hissaeldis',
    'Þenniel',
    'Esgalthel',
    'Paran',
    'Malunith',
    'Círbes',
    'Fainien',
    'Fingaer',
    'Túgiel',
    'Írthel',
    'Baralinien',
    'Dae',
    'Gloreth',
    'Emdiril',
    'Muindis',
    'Fainith',
    'Geleth',
    'Belegurwen',
    'Rivaleth',
    'Eriar',
    'Remlasdis',
    'Aeniel',
    'Tarene',
    'Seanaami',
    'Tunenrene',
    'Hyaril',
    'Ialien',
    'Rýnel (70)',
    'Nídhel',
    'Grathel',
    'Rýnel',
    'Lithel',
    'Roitariel',
    'Hallothel',
    'Eryn',
    'Ialien',
    'Ivo',
    'Thestra',
    'Linseh',
    'Dymre',
    'Ghelni',
    'Stima',
    'Thriphlane',
    'Shesimi',
    'Paevadi',
    'Niemri',
    'Gafla',
    'Dhasi',
    'Alnivi',
    'Sivi',
    'Pevi',
    'Eaos',
    'Chiesis',
    'Sotteus',
    'Warenar',
    'Kratrix',
    'Qaaris',
    'Elone',
];

var lastName = [
    'Acoff-Sereno',
    'Coffey-Macklin',
    'Mintz',
    'Mullinax',
    'Malenko',
    'Molinari',
    'Truthbelly',
    'Steele',
    'Zaba',
    'Arslani',
    'Amana',
    'Barlowe',
    'Caddel',
    'Villarreal',
    'Pinebreath',
    'Truthblight',
    'Amberdrifter',
    'Dirgeore',
    'Fistless',
    'Farrowbender',
    'Alpenreaver',
    'Fusebringer',
    'Gloryhair',
    'Hawkcleaver',
    'Duriou',
    'Radieu',
    'Chaballi',
    'Astagnon',
    'Roquenie',
    'Cardaiseul',
    'Neremières',
    'Alileilles',
    'Albion',
    'Albimbert',
    'Astaseul',
    'Bizeveron',
    'Boneflare',
    'Brightdoom',
    'Cragore',
    'Clanwillow',
    'Crestbreeze',
    'Crowstrike',
    'Distantwind',
    'Echethier',
    'Elffire',
    'Elfwind',
    'Gaimbert',
    'Grasshammer',
    'Hazerider',
    'Hardarm',
    'Jouvempes',
    'Keenstone',
    'Laughingsnout',
    'Lauregnory',
    'Lonerider',
    'Montalli',
    'Marblemaw',
    'Macherac',
    'Nightwind',
    'Nicklewhisk',
    'Nobledane',
    'Orbarrow',
    'Paleforce',
    'Proudchaser',
    'Pellerelli',
    'Runebraid',
    'Ronchessac',
    'Regalshade',
    'Rochegne',
    'Sharpdoom',
    'Slateflayer',
    'Snowscar',
    'Suteuil',
    'Tarrencloud',
    'Thundermourn',
    'Tusksnarl',
    'Vassezac',
    'Warbelly',
    'Wisekeep',
    'Whispercrest',
    'Warbreaker',
    'Atréides',
    'Kholin',
    'Dondarrion',
    'Celebrimbor',
    'Weatherwax',
    'Mandragoran',
    'Ninefingers',
    'Anomander',
    'var-Emreis 90',
    'Mallson',
    'Gothlson',
    'Bonesless',
    'Hakkon',
    'Godwin',
    'Siegfreid',
    'Prudeinitis',
    'Frejya',
    'Fenrir',
    'Heimdell',
];

var otherFirstName = [maleFirstName.concat(femaleFirstName)];

// check if user wants to randomize their name
var checkName = function (event) {
    // if they do want to randomize name
    if ($('#name-choice').is(':checked')) {
        // check user's gender selection
        if ($('#female').is(':checked')) {
            var gender = 'Female';
            CharacterAttributes.sex = 'Female';
        } else if ($('#male').is(':checked')) {
            var gender = 'Male';
            CharacterAttributes.sex = 'Male';
        } else if ($('#other').is(':checked')) {
            var gender = 'Other';
            CharacterAttributes.sex = 'Other';
        }

        // hide text input allowing them to add a name
        $('#nameUsedDisp').addClass('hide');
        $('#nameRandDisp').removeClass('hide');

        // randomize their name based on gender
        var nameGen = function (gender) {
            var randomName = '';
            var rMFirst = Math.floor(Math.random() * maleFirstName.length);
            var rFFirst = Math.floor(Math.random() * femaleFirstName.length);
            var rLast = Math.floor(Math.random() * lastName.length);
            var rOther = Math.floor(Math.random() * otherFirstName[0].length);

            if (gender == 'Male') {
                randomName = maleFirstName[rMFirst] + ' ' + lastName[rLast];
            } else if (gender == 'Female') {
                randomName = femaleFirstName[rFFirst] + ' ' + lastName[rLast];
            } else if (gender == 'Other') {
                randomName = otherFirstName[0][rOther] + ' ' + lastName[rLast];
            }
            return randomName;
        };
        nameGen();
        // assign to list of character attributes
        CharacterAttributes.name = nameGen(gender);

        // display randomized name on the page
        $('#nameRand').text(CharacterAttributes.name);
    }
    // if user does not want to randomize name
    else {
        // show text input to type their own name
        $('#nameUsedDisp').removeClass('hide');
        $('#nameRandDisp').addClass('hide');
    }
};
$('#name-choice').on('click', checkName);

// check if user wants to randomize their class
var checkClass = function (event) {
    // if they do want to randomize class
    if ($('#class-choice').is(':checked')) {
        // hide menu allowing them to select class
        $('#classMenuDisp').addClass('hide');
        $('#classRandDisp').removeClass('hide');
        // randomize their class
        var randomClassNum = Math.floor(Math.random() * charClasses.length);
        var randomClass = charClasses[randomClassNum];
        // assign to list of character attributes
        CharacterAttributes.class = randomClass[0].toUpperCase() + randomClass.slice(1);

        // display randomized class
        $('#classRand').text(CharacterAttributes.class);

        return CharacterAttributes.class;
    }
    // if user does not want to randomize class
    else {
        // show menu to select class
        $('#classMenuDisp').removeClass('hide');
        $('#classRandDisp').addClass('hide');
    }
};
$('#class-choice').on('click', checkClass);

// check if user wants to randomize their race
var checkRace = function (event) {
    // if they do want to randomize race
    if ($('#race-choice').is(':checked')) {
        // hide menu allowing them to select race
        $('#raceMenuDisp').addClass('hide');
        $('#raceRandDisp').removeClass('hide');
        // randomize their race
        var randomRaceNum = Math.floor(Math.random() * charRaces.length);
        var randomRace = charRaces[randomRaceNum];
        // assign to list of character attributes
        CharacterAttributes.race = randomRace[0].toUpperCase() + randomRace.slice(1);

        // display randomized race
        $('#raceRand').text(CharacterAttributes.race);

        return CharacterAttributes.race;
    }
    // if user does not want to randomize race
    else {
        // show menu to select race
        $('#raceMenuDisp').removeClass('hide');
        $('#raceRandDisp').addClass('hide');
    }
};
$('#race-choice').on('click', checkRace);

// check if user wants to randomize their alignment
var checkAlign = function (event) {
    if ($('#align-choice').is(':checked')) {
        // hide menu allowing them to select alignment
        $('#alignMenuDisp').addClass('hide');
        $('#alignRandDisp').removeClass('hide');
        // randomize their alignment
        var randomAlignNum = Math.floor(Math.random() * charAligns.length);
        var randomAlign = charAligns[randomAlignNum];
        // assign to list of character attributes
        CharacterAttributes.alignment = randomAlign[0].toUpperCase() + randomAlign.slice(1);

        // display randomized alignment
        $('#alignRand').text(CharacterAttributes.alignment);

        return CharacterAttributes.alignment;
    }
    // if user does not want to randomize alignment
    else {
        // show menu to select alignment
        $('#alignMenuDisp').removeClass('hide');
        $('#alignRandDisp').addClass('hide');
    }
};
$('#align-choice').on('click', checkAlign);

// if user chose their own input, save it to the attributes array
var saveInput = function (event) {
    // same typed name value
    if ($('#name-choice').is(':checked')) {
    } else {
        CharacterAttributes.name = $('#nameUsed').val();
    }
    // save selected class
    if ($('#class-choice').is(':checked')) {
    } else {
        CharacterAttributes.class = $('#classMenu').val();
    }
    // save selected race
    if ($('#race-choice').is(':checked')) {
    } else {
        CharacterAttributes.race = $('#raceMenu').val();
    }
    // save selected alignment
    if ($('#align-choice').is(':checked')) {
    } else {
        CharacterAttributes.alignment = $('#alignMenu').val();
    }
    $('#saveChar').removeClass('hide');
};
$('#lockIn').on('click', saveInput);

// add user's selections to their Character Attributes in localStorage
$('#saveChar').on('click', function () {
    PageAttributes.characterPage = 'complete';
    localStorage.setItem('character', JSON.stringify(CharacterAttributes));
    localStorage.setItem('pageState', JSON.stringify(PageAttributes));
    // move on to the next section
    location.href = 'stats.html';
});
