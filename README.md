# [Spelling Tester](https://angeladeveloper.github.io/spelling-game/)

---

## Test and practice your spelling!

---

## User Story

AS the user I want to test my spelling ability
so that I can improve over time

- WHEN the user opens the webpage they are presented with the rules, a difficulty selector, and a start button.
- THEN user can select how long they would like the words to be
- WHEN they click on start,
- THEY hear a random word
- THEN the user asked to spell the word
- IF they get the word right, the scores incresase
- IF they get it wrong, the score doesnt change
- THEY are presented with 6 words.
- THE user is asked to what name they would like to store their score under.

---

## APIs, frameworks and languages.

- We will use WORDSAPI to gen a random word.
- We will use Pexels to display a matching picture
- Bootstrap
- Javascript
- CSS
- HTML

---

## Collaboration

### HTML - Ahmed

- basic skeleton
- bootstrap
- set up layout

### CSS - David

- pick colors
- pick fonts
- css

### Javascript - Angela

- getting random word API set up
- take user difficulty and applying to search
- take user input to compare to word
- track and display score
- set up screenreader
- change screen elements based on answer

### Javascript - Yousef

- set up random pic api
- display pic based on random word
- move to High-score page and the end of the game.
- store user score in local storage.

---

## Updates to come...

We would _love_ to implament a better way to read words out. Oxford dictionaries and Webster dictionaries both offer APIs with pronucination libraies , but we would need a back end too get this feture into production. Current free resources have some audio files available, but only for a small selection of the words.

We would also love to implament a sound affect feature. So a sound plays based on the users guess.

---

## Wireframe

- Proto Concept

![wireframe](/wireframe.jpg)

WIP

![GIF](/ezgif.com-gif-maker.gif)

---

### Issues / Challenges

- the screen reader sometimes reads out the word incorrectly, which is obviously really frustrating for the user. Finding a new way to read the words allowed could significatly increase UX
- a similar case for the pictures. Some words either don't have images that match very well, or it is unable to fetch a piture at all.
- We wanted to display a happy or sad sound depending on the users guess, but we were unable to find a good API for just sound affects.
