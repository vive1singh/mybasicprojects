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
