const timer = document.querySelector('#timer');
const randomWordEle = document.getElementById("random-word");
const userInputIEle = document.querySelector('#user-guess');
const nextBtn = document.querySelector('#btn');

let userScore = 0;
//this is a place holder until i want to use the real api, essientally calls a fake word
let randomindex = Math.floor(Math.random() * 100)
//btn to start the game
nextBtn.addEventListener('click', e => {
    e.preventDefault()
    userInputIEle.innerText = ""
    getRandomWordCall();
    getUserGuess();
})
//make api call and grab random word
function getRandomWordCall() {
    let randomURL = `https://jsonplaceholder.typicode.com/posts/${randomindex}`
    fetch(randomURL)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const randomWord = data.title;
            displayRandomWord(randomWord);
            // searchRandomPic(randomWord);
        })
        .catch('error')
}
// get random word and store in local storage
function displayRandomWord(word) {
    randomWordEle.innerText = word
    localStorage.setItem("randomWord", word)
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
        userScore++;
        document.getElementById('final-score').innerText = userScore
        // add score here
    } else {
        console.log("YOU LOSE!");

    }
    randomindex = Math.floor(Math.random() * 100)

}


// test test test
