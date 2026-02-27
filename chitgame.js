// ----------------------
// 1. Game State (Data)
// ----------------------

let team = [];
let chits = [];
let historyEntries = [];
let currentTeamIndex = 0;
let mode = "per-chit";
let fixedScoreValue = 10;

// "Pick + Reveal container where our User can pick the chits and reveal it"
let pendingChit = null;

const STORAGE_KEY = "chitBowlGameState";

// --------------------
// 2. DOM Elements 
// --------------------

// this where setup screen container start:
const teamInput = document.getElementById("team-input");
const  addTeamBtn = document.getElementById("add-team-btn");
const teamList = document.getElementById("team-list");

const chitTextInput = document.getElementById("chit-text-input");
const chitScoreInput = document.getElementById("chit-score-input");
const addChitBtn = document.getElementById("add-chit-btn");
const chitList = document.getElementById("chit-list");

const modeSelect = document.getElementById("mode-select");
const fixedScoreInput = document.getElementById("fixed-score-input");

const startGameBtn = document.getElementById("start-game-btn");
const setupScreen = document.getElementById("setup-screen");
const gameScreen = document.getElementById("game-screen");

// Game Screen container starts from Here :
const currentTeamNameEl = document.getElementById("current-team-name");
const pickChitBtn = document.getElementById("pick-chit-btn");
const endGameBtn = document.getElementById("end-game-btn");

const pickedChitBox = document.getElementById("picked-chit-box");
const pickedChitTextEl = document.getElementById("picked-chit-text");
const pickedChitScoreEl = document.getElementById("picked-chit-score");

const funMessageEL = document.getElementById("fun-message");

const scoreboardEL =document.getElementById("scoreboard");
const historyEl = document.getElementById("history");
const resetGameBtn = document.getElementById("reset-game-btn");

// Winner Modal
const winnerModel = document.getElementById("winner-model");
const winnerTextEl = document.getElementById("winner-text");
const newRoundBtn = document.getElementById("new-round-btn");
const closeModelBtn = document.getElementById("close-model-btn");

// --------------------
// 3. local Storage Helpers .
// --------------------

function saveState() {
    const state = {
        team,
        chits,
        currentTeamIndex,
        mode,
        fixedScoreInput,
        // we are not saving pending chits in turn of refreshing the chits :

    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));

}

// loading the state in browser :
function loadState() {
    const raw =  localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
        const state = JSON.parse(raw);
        team = state.team;
        chits = state.chits;
        historyEntries = state.historyEntries || [];
        currentTeamIndex = state.currentTeamIndex || 0;
        mode = state.mode || "per-chit";
        fixedScoreValue = state.fixedScoreValue || 10;
    } catch (e) {
        console.error("Error loading state:", e);
    }
}

// ------------------
// 4. Render Function 
// ------------------

// To Show team list in the Screen :
function renderTeam() {
    teamList.innerHTML = "";
    team.forEach((team) => {
        const li = document.createElement("li");
        li.textContent = `${team.name} (Score: ${team.score})`;
        teamList.appendChild(li);
    });
}

// to Show Chits in setup Screen :

function renderChits() {
    chitList.innerHTML = "";
    chits.forEach((chit) => {
        const li = document.createElement("li");
        li.textContent = `${chit.text} (${sign} ${chit.score})`;
        chitList.appendChild(li);
    });
}

// To Create Cards :
function renderChits (){
    scoreboardEL.innerHTML = "";
    if (team.length === 0) return;

    const maxScore = Math.max (...team.map((t) => t.score)); //its for showing highest team score :

    team.forEach((team) => {
        const card = document.createElement("div");
    card.className = "score-card";
    if (team.score === maxScore && maxScore >0) {
        card.classList.add("winner");
        }
    const nameEl = document.createElement("div");
    nameEl.className = "team-name";
    nameEl.textContent = team.name;
    
    const scoreEl = document.createElement("div");
    scoreEl.className = "team-score";
    scoreEl.textContent = team.score;

    card.appendChild(nameEl);
    card.appendChild(scoreEl);
    scoreboardEL.appendChild(card);
    });
}

// History panel Container Start from Here :

function renderHistory() {
    historyEl.innerHTML = "";
    if (historyEntries.length === 0) {
        historyEl.textContent = "No Chits Picked yet ";
        return;
    }
    const ul = document.createElement("ul");
    historyEntries.forEach((entry) => {
        const li = document.createElement("li");
        const sign = entry.delta >= 0 ? "+" : "";
        li.textContent = `${entry.teamName} -> "${entry.chitText}" (${sign}${entry.delta})`;
        ul.appendChild(li);
    });
    historyEl.appendChild(ul);        
}