const timer = document.querySelector('#timer');
const randomWordEle = document.querySelector(".random-word");
const userInputIEle = document.querySelector('#user-guess');
const nextBtn = document.querySelector('#btn');
const startBtn = document.querySelector('#startButton')
const difficultSelect = document.querySelector("select")
let diff = 4

let userScore = 0;
let userGuessTotal = 0;

startBtn.addEventListener("click", () => {
    userScore = 0;
    getDifficulty()
    nextBtn.classList.remove("hide");
})


nextBtn.addEventListener('click', e => {
    e.preventDefault()
    userInputIEle.innerText = " "
    getDifficulty()
    getUserGuess();
})

function getDifficulty() {
    diff = difficultSelect.value
    getRandomWordCall(diff);
    console.log(diff);

}

function getRandomWordCall(length) {
    startBtn.style.visibility = "hidden"
    let randomURL = `https://random-word-api.herokuapp.com/word?length=${length}`
    fetch(randomURL)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const randomWord = data;
            displayRandomWord(randomWord);
            // searchRandomPic(randomWord);
        })
        .catch('error')
}
// function getRandomWordCall() {
//     startBtn.style.visibility = "hidden"
//     let randomURL = "https://random-word-api.herokuapp.com/word?length=7"
//     fetch(randomURL)
//         .then(response => response.json())
//         .then(data => {
//             console.log(data);
//             const randomWord = data;
//             displayRandomWord(randomWord);
//             // searchRandomPic(randomWord);
//         })
//         .catch('error')
// }

//I wanted emojis ⬅️🤷🏽‍♂️
function displayRandomWord(word) {
    localStorage.setItem("randomWord", word)
    randomWordEle.innerText = `➡️ ${word} ⬅️`
    setTimeout(() => {
        randomWordEle.innerText = "❓❔❓"
    }, 2000)

}
// get the users guess - add event listener? 
function getUserGuess() {
    const userGuess = userInputIEle.value
    console.log(userGuess);
    compareWords(userGuess);
}
// compare the words
//get the random word from storage
function compareWords(userWord, randomWord) {
    userGuessTotal++;
    randomWord = localStorage.getItem('randomWord');
    randomWord = randomWord.toUpperCase();
    userWord = userWord.toUpperCase();
    if (randomWord === userWord) {
        console.log("YOU WIN!");
        document.querySelector("#user-guess").classList.add("correct")
        userScore++;
        document.getElementById('final-score').innerText = userScore
        correctGuess()
        // add score here
    } else {
        console.log("YOU LOSE!");
        wrongGuess()
    }
    console.log(userGuessTotal);
    stopGame();
}

// test test test
function correctGuess() {
    document.querySelector("#user-guess").classList.add("correct");
    document.querySelector("#input-label").innerText = "Correct ✅"
    setTimeout(() => {
        document.querySelector("#user-guess").classList.add("neutral")
        document.querySelector("#input-label").innerText = ""
    }, 1000)
}

function wrongGuess() {
    document.querySelector("#input-label").innerText = "Wrong ⛔"
    document.querySelector("#user-guess").classList.remove("correct");
    document.querySelector("#user-guess").classList.add("wrong")
    setTimeout(() => {
        document.querySelector("#user-guess").classList.add("neutral")
        document.querySelector("#input-label").innerText = ""
    }, 1000)
}

function stopGame() {
    if (userGuessTotal === 6) {
        console.log("endGame");
        displayHighscorePage();
    }
}