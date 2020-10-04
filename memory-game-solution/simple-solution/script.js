const gameContainer = document.getElementById("game");
let card1 = null;
let card2 = null;
let cardsFlipped = 0;
let noClicking = false;

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
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}

function handleCardClick(e) {
  if (noClicking) return;   // function immediately stops at this point
  if (e.target.classList.contains("flipped")) return;   //checking to see if the target contains the classlist of "flipped". 

  let currentCard = e.target; // sets current card to the div class
  currentCard.style.backgroundColor = currentCard.classList[0]; // we are setting its background color to the class color

  if (!card1 || !card2) {           // if its not a card1 or card2, add the class of 'flipped'.  
    currentCard.classList.add("flipped");
    card1 = card1 || currentCard;   // now, card1 = card1 or the current card
    card2 = currentCard === card1 ? null : currentCard; // if card2 = currentCard === card1 null, set that to current card. 
      }
      // if current card is equal to card1, then card2 equals null. Otherwise, card2 equals current card. 
      // ternary operator
      // justjavascript.com 
    

  if (card1 && card2) {
    noClicking = true;
    // debugger
    let gif1 = card1.className;
    let gif2 = card2.className;

    if (gif1 === gif2) {
      cardsFlipped += 2;
      card1.removeEventListener("click", handleCardClick);
      card2.removeEventListener("click", handleCardClick);
      card1 = null;
      card2 = null;
      noClicking = false;
    } else {
      setTimeout(function() {
        card1.style.backgroundColor = "";
        card2.style.backgroundColor = "";
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        card1 = null;
        card2 = null;
        noClicking = false;
      }, 1000);
    }
  }

  if (cardsFlipped === COLORS.length) alert("game over!");
}

createDivsForColors(shuffledColors);
