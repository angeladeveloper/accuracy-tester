const timer = document.querySelector('#timer');
const randomWordEle = document.querySelector(".random-word");
const userInputIEle = document.querySelector('#user-guess');
const nextBtn = document.querySelector('#btn');
const startBtn = document.querySelector('#startButton')
const difficultSelect = document.querySelector("select")
const whatButton = document.querySelector("#what-button")
const rulesContainer = document.querySelector(".rules")
const correctWordsList = document.querySelector("#correct-ul")
const highscoreInput = document.querySelector("#highscore-input")

const API_KEY_PICS = '27501504-923f8173978218652c763b49a';

const highscoreArray = JSON.parse(localStorage.getItem("scores")) || [];

let diff = 4

let userScore = 0;
let userGuessTotal = 0;
let newWordArray = ["WORDS👩‍🏫"]



startBtn.addEventListener("click", () => {
    userInputIEle.placeholder = "Wait...."
    userScore = 0;
    newWordArray = ["Correct Words"]
    getDifficulty()
    nextBtn.classList.remove("hide");
    whatButton.classList.remove("hide");

})

nextBtn.addEventListener('click', e => {
    e.preventDefault()
    getDifficulty()
    getUserGuess();
})

function getDifficulty() {
    diff = difficultSelect.value
    getRandomWordCall(diff);
    console.log(diff);

}

function getRandomWordCall(length) {
    if (userGuessTotal === 6) { // check to see if we need to end the game
        nextBtn.classList.add("hide");
        window.location.assign('high-score.html')
        // rulesContainer.style.visibility = "visible"
        // document.querySelector("#user-guess").classList.add("neutral")
        userGuessTotal = 0;
        // displayCorrectWords(newWordArray);
        window.location.replace('./high-score.html')
        return
    } else {
        rulesContainer.style.visibility = "hidden"
    }
    // startBtn.style.visibility = "hidden"
    let randomURL = `https://random-word-api.herokuapp.com/word?length=${length}`
    fetch(randomURL)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const randomWord = data;
            displayRandomWord(randomWord);
            // getPic(randomWord[0]);
            imagesearch(randomWord);
        })
        .catch('error')
    displayCorrectWords(newWordArray);
}

// api for images
function imagesearch(randomWord) {
    const url = "https://api.pexels.com/v1/search?query=" + randomWord + "&per_page=1";
    fetch(url, {
        method: "GET",
        withCredentials: true,
        headers: {
            "Authorization": "563492ad6f91700001000001524417ab089d4a73998c49062467e805",
            "Content-Type": "application/json"
        }
    })
        .then(resp => resp.json())
        .then(function (data) {
            const photo = data.photos;
            // displayimage(photo);
            var randomImage = photo[0].src.original
            console.log(randomImage);
            document.querySelector('#image-container').innerHTML = `<img src=${randomImage} alt=${randomImage}>`
        })
        .catch(function (error) {
            console.log(error);
            document.querySelector('#image-container').innerHTML = `<img src='https://wellesleysocietyofartists.org/wp-content/uploads/2015/11/image-not-found.jpg' alt='image not found'>`
        });
}
// get random word and store in local storage


//Display the word for set time- I wanted emojis ⬅️🤷🏽‍♂️

function displayRandomWord(word) {

    // setTimeout(() => {
    // this will read the WORD OUTLOUT
    // }, 1000)
    var msg = new SpeechSynthesisUtterance();
    msg.text = word;
    window.speechSynthesis.speak(msg);
    localStorage.setItem("randomWord", word)
    randomWordEle.innerText = `🔉${word} ⬅️`
    setTimeout(() => {
        randomWordEle.innerText = "❓❔❓"
    }, 200)
    userInputIEle.placeholder = "Enter Word...."
    userInputIEle.value = ""
    newWordArray.push(word[0])
    console.log(newWordArray);
}

whatButton.addEventListener("click", () => {
    console.log(`s`);
    randomWord = localStorage.getItem('randomWord');
    var msg = new SpeechSynthesisUtterance();
    msg.text = randomWord;
    window.speechSynthesis.speak(msg);
})
// Get the users guess
function getUserGuess() {
    const userGuess = userInputIEle.value
    console.log(userGuess);
    compareWords(userGuess);
}


// Compare the words
// Get the random word from storage
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
        // window.clearInterval(update);
        wrongGuess()
        return

    }
    console.log(userGuessTotal);

}

// test test test
function correctGuess() {

    document.querySelector("#input-label").innerText = "Correct ✅"
    document.querySelector("#user-guess").classList.remove("wrong")
    document.querySelector("#user-guess").classList.add("correct");
    setTimeout(() => {
        document.querySelector("#user-guess").classList.add("neutral")
        document.querySelector("#input-label").innerText = "😄"
    }, 1000)

}

function wrongGuess() {
    document.querySelector("#input-label").innerText = "Wrong ⛔"
    document.querySelector("#user-guess").classList.remove("correct");
    document.querySelector("#user-guess").classList.add("wrong")
    setTimeout(() => {
        document.querySelector("#user-guess").classList.add("neutral")
        document.querySelector("#input-label").innerText = "😥"
    }, 1000)

}

function stopGame() {
    if (userGuessTotal === 6) {
        console.log("endGame");
        rulesContainer.style.visibility = "visible"
        nextBtn.classList.add("hide");
        whatButton.classList.add("hide");
        displayHighscorePage();
    }
}

function displayCorrectWords(list) {
    clearElement(correctWordsList)
    console.log(list);
    list.forEach(correctWord => {
        const word = document.createElement("p")
        word.classList.add("correct-words-li")
        word.innerText = correctWord
        correctWordsList.appendChild(word);
    });
}

function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}



function updateHighScoreArray() {
    const inputValue = highscoreInput.value
    document.getElementById.querySelector("#highscore-header").innerHTML = `< header > FINAL SCORE: ${userScore}</header >`
    let currentScore = `${inputValue}: ${userScore}`
    console.log(currentScore);
    highscoreArray.push(currentScore)
    localStorage.setItem("score", JSON.stringify(highscoreArray));
    displayHighscores(highscoreArray);
}

// document.querySelector("#submit-btn").addEventListener("submit", e => {
//     e.preventDefault()
//     const startBtn = document.createElement("button")
//     startBtn.innerHTML = ` <button id="startButton" class="start-button">Start Quiz</button>`
//     updateHighScoreArray()
// })



// function displayHighscorePage(array) {
//     const highscoreList = document.querySelector("#highscore-ul")
//     array.forEach(score => {
//         const scoreLi = document.createElement("li")
//         scoreLi.innerText = score;
//         highscoreList.appendChild(scoreLi)

//     })
// }


// make it harder by not displaying a hint
// another version where if you get one wrong, you lose there
//add another timing function? you have to type the word quickly?
//I would have to use a diffrent api, but I could have it read out the parts of speech that the word is apart of , just like anormal spelling bee.
//right now, I only display a few changes when the user gets it wrong, but we could add a ton. shake the box when they get it wrong? 