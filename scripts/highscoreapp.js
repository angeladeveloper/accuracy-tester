const highscoreInput = document.querySelector("#highscore-input")


document.querySelector("#submit-btn").addEventListener("submit", e => {
  e.preventDefault()
  const startBtn = document.createElement("button")
  startBtn.innerHTML = ` <button id="startButton" class="start-button">Start Quiz</button>`
  updateHighScoreArray()
})



function displayHighscorePage(array) {
  const highscoreList = document.querySelector("#highscore-ul")
  array.forEach(score => {
    const scoreLi = document.createElement("li")
    scoreLi.innerText = score;
    highscoreList.appendChild(scoreLi)

  })
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