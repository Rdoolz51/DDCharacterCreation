
//change $("#check") to whatever div you want to attach the button to.
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
    $('.content').append(labelEl)
    $(labelEl).append(textEl)
    // console.log(randomName);
    
    return randomName;
}

