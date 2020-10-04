/*  This is a code for a memory game app based on colors. 
    Built By: Prem Dahal [with the help from SpringBoard BootCamp]
    Last modified: Oct. 4th, 2020
*/
// selecting the content from HTML page
const gameContainer = document.getElementById("game");
const prevScore = document.getElementById("highScore");
const reset = document.querySelector('#reset');

// Initializing the values
let firstCard = null;
let secondCard = null;
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
// setting up an array for localStorage.
let nums = new Array ();
let numClick = 0;
// calling on localstorage
const previousGameScore = JSON.parse(localStorage.getItem('nums'));
// appending the score on the line of Previous Game Score
prevScore.append(previousGameScore);

function handleCardClick(event) {
  numClick++;

  if (noClicking) return;   // function immediately stops if noClicking is true
  if (event.target.classList.contains("flipped")) return; // function immediately stops if it contains 'flipped' class

// this section gives the div its class color as user clicks
        let currentCard = event.target; // prints name of the color
        currentCard.style.backgroundColor = currentCard.classList[0];
  
// if its not first or the second card, give it a class of flipped 
       if (!firstCard || !secondCard) {
         currentCard.classList.add("flipped");
         firstCard = firstCard || currentCard;
         secondCard = currentCard === firstCard ? null: currentCard;
       }

       // when clicked on first and second card, get its className and save it as gif
       if (firstCard && secondCard) {
         noClicking = true;
         let firstColor = firstCard.className;
         let secondColor = secondCard.className;

         if ( firstColor === secondColor) {
            console.log("its a match!");
            cardsFlipped +=2; // adding 2 every time a pair is matched

            // we then remove EventListener from both first and second card
            firstCard.removeEventListener('click', handleCardClick);
            secondCard.removeEventListener('click', handleCardClick);
            // resetting both cards to its inital or null form
            firstCard = null;
            secondCard = null;
            noClicking = false;
         } else {
          setTimeout(function() {
            firstCard.style.backgroundColor = "";
            secondCard.style.backgroundColor = "";
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            firstCard = null;
            secondCard = null;
            noClicking = false;
          }, 1000);
    
         }
        }
        // The logic for calculating score.
        let score = Math.round((10/numClick)*100);
      
        // when the game is finsihed, alert the message with the current score. 
        if (cardsFlipped === COLORS.length){
          window.confirm("Your Score is " + score + ". Game is now over");
          nums.push(score);

          // setting the localStorage. 
          let JSONReadyNumbers = JSON.stringify(nums);
          localStorage.setItem('nums', JSONReadyNumbers);
      }


    } 
        // Reset the colors when reset button is clicked on.
    reset.addEventListener('click', function (e) {
      e.preventDefault();
      location.reload();
      })

    
      createDivsForColors(shuffledColors);

    
