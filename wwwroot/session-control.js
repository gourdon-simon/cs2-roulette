const url = 'http://localhost:8080/api/'

let playModeArray = Array.from(document.getElementsByClassName("option"));
let selectedMode;

let sessionCreator = document.getElementById("sessionCreator");
let randomizeController = document.getElementById("randomizeController");

let weaponPool;
let weaponGrid = document.getElementById("weaponGrid");
let weaponArray;

let startbutton = document.getElementById("sendButton");

async function loadWeaponPool() {
    const response = await fetch(url+'session/available/weapons');
    if (!response.ok) {
        throw new Error('Failed to fetch weapon pool');
    }

    weaponPool = await response.json();
    
    weaponPool.forEach(weapon => {

        let weaponContainer = document.createElement("div");

        let weaponImg = document.createElement("img");
        weaponImg.src = '.'+weapon.imageUrl;     
        weaponContainer.appendChild(weaponImg);  

        let weaponName = document.createElement("h4");
        let weaponNameNode = document.createTextNode(weapon.name);
        weaponName.appendChild(weaponNameNode);
        weaponContainer.appendChild(weaponName);
        
        weaponContainer.classList.add("weapon");
        weaponGrid.appendChild(weaponContainer);

        weaponContainer.addEventListener("click", function(){
            if (weaponContainer.classList.contains("removed")) {
                weaponContainer.classList.remove("removed");
            }
            else{
                weaponContainer.classList.add("removed");
            }
        });
        weaponContainer.addEventListener("mouseover", function(){
            weaponName.style.display = "block";
        });
        weaponContainer.addEventListener("mouseout", function(){
            weaponName.style.display = "none";
        });
    });

    weaponArray = Array.from(document.getElementsByClassName("weapon"));
}

async function selectWeaponPool() {
    let selectedWeapons = [];
    weaponArray.forEach(weapon => {
        if(!weapon.classList.contains("removed")){
            selectedWeapons.push(weapon.textContent);
        }
    });

    console.log(selectedWeapons);
    
    const response = await fetch(url+'session/select/weapons', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedWeapons),
    })
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => console.error('Error', error));
}

playModeArray.forEach(mode => {
    mode.addEventListener("click", function () {
        playModeArray.forEach(mode2 => {
            if(mode2.classList.contains("activeMode")){
                mode2.classList.remove("activeMode");
            }
        });
        selectedMode = mode.children.item(0).textContent;
        mode.classList.add("activeMode");
    });
});

loadWeaponPool();

let easterEgg = document.getElementById("easterEgg");

let sideType = document.getElementById("sideType");
let roundType = document.getElementById("roundType");

startbutton.addEventListener("click", function(){
    switch (selectedMode){
        case "MISSION":
            switchScreen();
            break;
        case "WEAPON":
            selectWeaponPool();
            switchScreen();
            sideType.style.display = "flex";
            roundType.style.display = "flex";
            break;
        case "BOTH":
            selectWeaponPool();
            switchScreen();
            sideType.style.display = "flex";
            roundType.style.display = "flex";
            break;
        default :
            easterEgg.style.display = "block";
            easterEgg.play();
            setTimeout(() => {
                easterEgg.style.display = "none";
            }, 1000);
    }
    
});

function switchScreen() {
    randomizeController.style.display = "flex";
    document.getElementById("randomizeController").scrollIntoView({
    behavior: "smooth",
    block: "start"   // or "center", "end"
    });
    setTimeout(() => {
        sessionCreator.style.display = "none";
    }, 200);
}

let roundTypeArray = Array.from(document.getElementsByClassName("type"));
let currentRoundType;

roundTypeArray.forEach(roundType => {
    roundType.addEventListener("click", function () {
        roundTypeArray.forEach(roundType2 => {
            if(roundType2.classList.contains("activeRoundType")){
                roundType2.classList.remove("activeRoundType");
            }
        });
        currentRoundType = roundType.children.item(0).textContent;
        roundType.classList.add("activeRoundType");
    });
});

let sideArray = Array.from(document.getElementsByClassName("side"));
let tSide;

sideArray.forEach(side => {
    side.addEventListener("click", function () {
        sideArray.forEach(side2 => {
            if(side2.classList.contains("activeSide")){
                side2.classList.remove("activeSide");
            }
        });
        tSide = side.children.item(0).textContent == "Terrorist";
        side.classList.add("activeSide");
    });
});

let randomizeButton = document.getElementById("sendChallengeButton");

randomizeButton.addEventListener("click", function(){
    switch (selectedMode) {
        case "MISSION":
            sendRandomMission();
            break;
        case "WEAPON":
            sendRandomWeapon();
            break;
        case "BOTH":
            sendRandomBoth();
            break;
        
        default:
            break;
    }
});

async function sendRandomMission() {
    const response = await fetch(url+'randomize/mission');
    if (!response.ok) {
        throw new Error('Failed to send Mission');
    }
    console.log(response.json());
}

async function sendRandomWeapon() {
    const response = await fetch(url+`randomize/weapon?tSide=${tSide}&roundType=${encodeURIComponent(currentRoundType)}`);
    if (!response.ok) {
        throw new Error('Failed to send Weapon');
    }
    console.log(response.json());
    const data = await response.json();
    console.log(data);
    return data;
}

async function sendRandomBoth() {
    const response = await fetch(url+`randomize/full?tSide=${tSide}&roundType=${encodeURIComponent(currentRoundType)}`);
    if (!response.ok) {
        throw new Error('Failed to send Weapon');
    }
    console.log(response.json());
    const data = await response.json();
    console.log(data);
    return data;
}
