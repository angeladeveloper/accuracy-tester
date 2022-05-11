const timer = document.querySelector('#timer');
const randomWordEle = document.querySelector('#random-word');
const userInputIEle = document.querySelector('#user-guess');


//make api call and grab random word
function getRandomWordCall() {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const randomWord = data.title;
            console.log(randomWord);
            displayRandomWord(randomWord);

        })
        .catch('error')
 
}

function displayRandomWord(word) {
    console.log(word);
    randomWordEle.innerText = word
}

getRandomWordCall();
