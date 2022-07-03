nameGen(gender);

function nameGen(gender) {
    var randomName = '';
    var rMFirst = Math.floor(Math.random() * maleFirstName.length);
    var rFFirst = Math.floor(Math.random() * femaleFirstName.length);
    var rLast = Math.floor(Math.random() * lastName.length);
    var rEither = Math.floor(Math.random() * eitherFirstName[0].length);

    if (gender == 'Male') {
        randomName = maleFirstName[rMFirst] + ' ' + lastName[rLast];
    } else if (gender == 'Female') {
        randomName = femaleFirstName[rFFirst] + ' ' + lastName[rLast];
    } else {
        randomName = eitherFirstName[0][rEither] + ' ' + lastName[rLast];
    }

    return randomName;
}

console.log(nameGen(gender));

