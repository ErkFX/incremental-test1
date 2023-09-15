let clickingPower = 1000;
let logs = 0;
let lumberjackCost = 15;
let lumberjacks = 0;
let axeCost = 100;
let axes = 0;
let chainsawCost = 1000;
let chainsaws = 0;
let logsPerSecond = 0;

function addToLogs(amount) {
    logs = logs + amount;
    document.getElementById("logs").innerHTML = logs;
}

function updateLogsPerSecond() {
    logsPerSecond = lumberjacks + (axes * 5) + (chainsaws * 25);
    document.getElementById("logsPerSecond").innerHTML = logsPerSecond;
}

function buyLumberjack() {
    if (logs >= lumberjackCost) {
        logs -= lumberjackCost;
        lumberjacks++;
        lumberjackCost = Math.round(lumberjackCost * 1.15);

        document.getElementById("logs").innerHTML = logs;
        document.getElementById("lumberjackCost").innerHTML = lumberjackCost;
        document.getElementById("lumberjacks").innerHTML = lumberjacks;
        updateLogsPerSecond();
    }
}

function buyAxe() {
    if (logs >= axeCost) {
        logs -= axeCost;
        axes++;
        axeCost = Math.round(axeCost * 1.15);

        document.getElementById("logs").innerHTML = logs;
        document.getElementById("axeCost").innerHTML = axeCost;
        document.getElementById("axes").innerHTML = axes;
        updateLogsPerSecond();
    }
}

function buyChainsaw() {
    if (logs >= chainsawCost) {
        logs -= chainsawCost;
        chainsaws++;
        chainsawCost = Math.round(chainsawCost * 1.15);

        document.getElementById("logs").innerHTML = logs;
        document.getElementById("chainsawCost").innerHTML = chainsawCost;
        document.getElementById("chainsaws").innerHTML = chainsaws;
        updateLogsPerSecond();
    }
}

// Because the saveGame is saved in a JSON file, it has been parsed. We now need to unparse the gameSave. You use getItem to get the item out that you set with .setItem in the save function.

// all of the if statements are checking to see if the type of each savedGame files type is not undefined. If they are not undefined, the variables that run the game will be set to = the savedGame variables.

// you will need to add an if statement for every variable that you have saved just like this.
function loadGame() {
    let savedGame = JSON.parse(localStorage.getItem("gameSave"));
    if (typeof savedGame.logs !== "undefined") logs = savedGame.logs;
    if (typeof savedGame.clickingPower !== "undefined") clickingPower = savedGame.clickingPower;
    if (typeof savedGame.lumberjackCost !== "undefined") lumberjackCost = savedGame.lumberjackCost;
    if (typeof savedGame.lumberjacks !== "undefined") lumberjacks = savedGame.lumberjacks;
    if (typeof savedGame.axeCost !== "undefined") axeCost = savedGame.axeCost;
    if (typeof savedGame.axes !== "undefined") axes = savedGame.axes;
    if (typeof savedGame.chainsawCost !== "undefined") chainsawCost = savedGame.chainsawCost;
    if (typeof savedGame.chainsaws !== "undefined") chainsaws = savedGame.chainsaws;
}

// The names on the left of the ":" are going to be the folder names. logs: is basically the score folder while clickingPower: is the clickingPower folder.
function saveGame() {
    let gameSave = {
        logs: logs,
        clickingPower: clickingPower,
        lumberjackCost: lumberjackCost,
        lumberjacks: lumberjacks,
        axeCost: axeCost,
        axes: axes,
        chainsawCost: chainsawCost,
        chainsaws: chainsaws
    };
    //localStorage = cookies in the browser. The rest of the code stores the gameSave in the cookies, JSON.stringify turns the gameSave into a string. JSON files are a file format that stores variables. Putting it in a JSON inputs a parse.
    localStorage.setItem("gameSave", JSON.stringify(gameSave));
}

//Brings up an alert asking to confirm if you want to reset the game. If you click confirm, your game will reset. The gameSave variable is empty, so it's overwriting the normal gameSave variable from the saveGame function. location.reload() makes it so it reloads the page after performing the action of saving/overwriting the old save or else after 30 seconds the game would just save where it was already at. Forcing the page (location) to reload prevents this from happening.

function resetGame() {
    if (confirm("Are you sure you want to reset your game?")) {
        let gameSave = {};
        localStorage.setItem("gameSave", JSON.stringify(gameSave));
        location.reload();
    }
}

// This will load the game when you refresh or open the webpage. This will also update logs per second and all purchased upgrades.

window.onload = function() {
    loadGame();
    updateLogsPerSecond();
    document.getElementById("logs").innerHTML = logs;
    document.getElementById("lumberjackCost").innerHTML = lumberjackCost;
    document.getElementById("lumberjacks").innerHTML = lumberjacks;
    document.getElementById("axeCost").innerHTML = axeCost;
    document.getElementById("axes").innerHTML = axes;
    document.getElementById("chainsawCost").innerHTML = chainsawCost;
    document.getElementById("chainsaws").innerHTML = chainsaws;
}

//This updates the title of the game every second by showing how many logs you have followed by the name of the game

setInterval(function() {
    logs += lumberjacks;
    logs += axes * 5;
    logs += chainsaws * 25;
    document.getElementById("logs").innerHTML = logs;
    document.title = logs + " log(s) - Tree Clicker";
}, 1000); //1000ms = 1 second

//Every 30 seconds we want the game to save so we put the gameSave() function into a setInterval and set it to 30000ms

setInterval (function() {
    saveGame();
}, 30000); //30000ms = 30 seconds

//Makes it so the default save file page doesn't pop up, but instead saves the game

document.addEventListener("keydown", function(event){
    if (event.ctrlKey && event.which == 83) { //if control + s are pressed
        event.preventDefault();
        saveGame();
    }
}, false);