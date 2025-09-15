var connection = new signalR.HubConnectionBuilder().withUrl("https://cs2-roulette.sgpp.uk/sessionHub").build();

let waitingSection = document.getElementById("waitingScreen");
let readyButton = document.getElementById("readyButton");
let pre = Array.from(document.getElementsByClassName("pre"));
let post = Array.from(document.getElementsByClassName("post"));

let weaponContainer = document.getElementById("WEAPON");
let weaponAnimation = document.getElementById("weaponAnimation")
let weaponPicked = document.getElementById("weaponPicked");
let weaponPickedImg = document.getElementById("weaponPickedImg");
let weaponPickedTitle = document.getElementById("weaponPickedTitle");

let missionContainer = document.getElementById("MISSION");
let missionTitle = document.getElementById("missionTitle");
let missionDescription = document.getElementById("missionDescription");

readyButton.addEventListener("click", function () {
    pre.forEach(element => {
        element.style.display = "none";
    });
    post.forEach(element => {
        element.style.display = "block";
    });
});

connection.on("ReceiveRandomizedWeapon", function (weapon) {
    switchScreen();

    missionContainer.style.display = "none";

    weaponContainer.style.display = "flex";
    weaponContainer.style.height = "100%";

    showWeapon(weapon.name, weapon.imageUrl);

    console.log("Received weapon: " + weapon.name);
});

connection.start().catch(function (err) {
    return console.error(err.toString());
});

connection.on("ReceiveRandomizedMission", function (mission) {
    switchScreen();
    weaponContainer.style.display = "none";

    missionContainer.style.display = "block";
    missionContainer.style.height = "100%";

    showMission(mission.title, mission.description);

    console.log("Received mission: " + mission.title + " - " + mission.description);
});

connection.on("ReceiveFullRandomization", function (data) {
    switchScreen();
    weaponContainer.style.display = "flex";
    weaponContainer.style.height = "auto";

    missionContainer.style.display = "block";
    missionContainer.style.height = "auto";

    showWeapon(data.weapon.name, data.weapon.imageUrl);
    showMission(data.mission.title, data.mission.description);

    console.log("Received full randomization: " + data.weapon.name + ", " + data.mission.title + " - " + data.mission.description);
});

function switchScreen(){
    waitingSection.style.display = "none";
}

function showWeapon(name, url) {
    weaponPicked.style.display = "none";
    weaponPicked.style.opacity = 0;

    setTimeout(() => {
        weaponPicked.style.display = "flex";
    }, 3000);

    weaponAnimation.style.display = "block";

    weaponAnimation.play();

    weaponPickedTitle.textContent = name;
    weaponPickedImg.src = url;

    // After 5 seconds, fade in the weapon image
    setTimeout(() => {
        weaponPicked.style.opacity = 1;
    }, 5000);
}

function showMission(title, description) {
    missionTitle.textContent="";
    missionDescription.textContent="";

    typeText(missionTitle, "Mission : " + title, 50, function () {
        typeText(missionDescription, description, 20);
    });   
}

function typeText(element, text, speed, callback) {
    let i = 0;
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else if (callback) {
            callback();
        }
    }
    type();
}