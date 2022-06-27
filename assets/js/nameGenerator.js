//fill out each array with fantasy names
var firstName = ["Ryan", "Dan", "Alfred", "Tod", "Asher", "Carter", "Turner", "Piper"];
var lastName = ["Savage", "Alonso", "Remmington", "Glide","Atwood", "Bellsmith", "Clarkwright"];

//change $("#check") to whatever div you want to attach the button to.
buttonEl = $('<button>')
buttonEl.text("GENERATE NAME")
$("#check").append(buttonEl)
buttonEl.on('click', nameGen)


function nameGen() {
    var rFirst = Math.floor(Math.random() * firstName.length);
    var rLast = Math.floor(Math.random() * lastName.length);
    
    var randomName = firstName[rFirst] + " " + lastName[rLast];
    
    console.log(randomName);
    
    return randomName;
}

