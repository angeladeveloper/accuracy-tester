const timer = document.querySelector('#timer');
const randomWordEle = document.getElementById("random-word");
const userInputIEle = document.querySelector('#user-guess');
const nextBtn = document.querySelector('#btn');
const startBtn = document.querySelector('#startButton')
let userScore = 0;

startBtn.addEventListener("click", () => {
    getRandomWordCall();
})


nextBtn.addEventListener('click', e => {
    e.preventDefault()
    userInputIEle.innerText = " "
    getRandomWordCall();
    getUserGuess();
})

function getRandomWordCall() {
    let randomURL = "https://random-word-api.herokuapp.com/word?length=7"
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
// get random word and store in local storage
function displayRandomWord(word) {
    localStorage.setItem("randomWord", word)
    randomWordEle.innerText = word
    setTimeout(() => {
        randomWordEle.innerText = ""
    }, 1000)

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
}


// test test test
function correctGuess() {
    setTimeout(() => {
        document.querySelector("#user-guess").classList.add("correct");
        document.querySelector("#input-label").innerText = "Correct ✅"
    }, 2000)
}

function wrongGuess() {
    setTimeout(() => {
        document.querySelector("#user-guess").classList.add("wrong")
        document.querySelector("#input-label").innerText = "Wrong ⛔"
    }, 2000)
}