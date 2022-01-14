const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

let counter=0;
let card1;
let card2;
let card1color;
let card2color;
let pair;

function handleCardClick(event) {
    event.target.style.backgroundColor = event.target.getAttribute('class');
    event.target.classList.add('clicked');
    counter++;

    if (counter === 2){ 
      let allDivs = document.querySelectorAll('div > div');
      for (let divs of allDivs) {
        divs.removeEventListener("click", handleCardClick);
      }
      console.log("let's check for a match!");
      pair = Array.from(document.querySelectorAll('div.clicked'));
      card1 = pair[0];
      card2 = pair[1];
      card1color = card1.getAttribute('class'); console.log(card1, card1color);
      card2color = card2.getAttribute('class'); console.log(card2, card2color);
      console.log(pair);
    
      if (card1color !== card2color){
        setTimeout(noMatch, 1000);
      }
      else
        setTimeout(match, 1000);

      function match(){
        card1.classList.add('matched');
        card2.classList.add('matched');
        card1.classList.remove('clicked');
        card2.classList.remove('clicked');
        console.log("It's a match!");
        counter = 0;
        pair=[];
        let allMatches = document.querySelectorAll('div.matched');
        if (allMatches.length === COLORS.length) {
          alert('Congratulations! You win!');
        }
        let allDivs = document.querySelectorAll('div > div');
        for (let divs of allDivs) {
          divs.addEventListener("click", handleCardClick);
        }
        for (let matches of allMatches) {
          matches.removeEventListener("click", handleCardClick);
        }
      }    
      function noMatch(){
        card1.classList.remove('clicked');
        card2.classList.remove('clicked');
        console.log('Sorry, no match!');
        card1.style.backgroundColor = 'gray';
        card2.style.backgroundColor = 'gray';
        counter = 0;
        let allDivs = document.querySelectorAll('div > div');
        for (let divs of allDivs) {
          divs.addEventListener("click", handleCardClick);
        }
        let allMatches = document.querySelectorAll('div.matched');
        for (let matches of allMatches) {
          matches.removeEventListener("click", handleCardClick);
        } 
      }
  }
}
createDivsForColors(shuffledColors);
