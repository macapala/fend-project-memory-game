/*
 * Create a list that holds all of your cards
 */
const icons = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor","fa fa-bolt", "fa fa-cube", "fa fa-anchor", "fa fa-leaf", "fa fa-bicycle", "fa fa-diamond","fa fa-camera-retro", "fa fa-leaf", "fa fa-camera-retro", "fa fa-bolt", "fa fa-bicycle",
"fa fa-paper-plane-o", "fa fa-cube"];

const cardsContainer = document.querySelector(".deck");

let openedCards = [];
let matchedCards = [];


// timer variables
let timer, second, minutes;


// start a timer 
function startTimer() {
    timer = setInterval(displayTimer, 1000);
}

// Show the timer while the user plays 
function displayTimer() {
    seconds++;
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }
    if (seconds >= 60) {
        minutes++;
        seconds = "00";
    }
   
  
  document.querySelector('.clock').innerHTML = "0" + minutes + ":" + seconds;
}


// Stop incrementing the timer
function stopTimer() {
    clearInterval(timer);
    seconds = -1;
    minutes = 0;
}
/*
 * Initialize Game
 */

function init() {
   const shuffledIcons = shuffle(icons);
   for(let i = 0; i < icons.length; i++) {
       const card = document.createElement("li");
       card.classList.add("card");
       card.innerHTML = `<i class="${icons[i]}"></i>`;
       cardsContainer.appendChild(card);

       //Add click event to each cards
       click(card);
     
      // call start timer function
     stopTimer();  
     startTimer();
       
   }
}


/*
 *click Event
 */

function click(card) {
     //card click event
     card.addEventListener("click", function() {

       const currentCard = this;
       const previousCard = openedCards [0];


       //we have an existing open card
       if(openedCards.length === 1) {


          card.classList.add("open", "show", "disable");
          openedCards.push(this);

          //we should compare our two opened cards
          compare(currentCard, previousCard);

      } else {
         //we don't have any opened cards
         currentCard.classList.add("open", "show", "disable");
         openedCards.push(this);
    }

  });
}

/*
*compare two cards
*/

function compare(currentCard, previousCard) {

   //Match
   if(currentCard.innerHTML === previousCard.innerHTML) {

       // Matched
       currentCard.classList.add("match");
       previousCard.classList.add("match");

       matchedCards.push(currentCard, previousCard);

       openedCards = [];

       //Add new move
       addMove();

       //check if the game is over
       isOver();

    } else {


       //Wait 500 ms, then do this
        setTimeout(function() {
           currentCard.classList.remove("open", "show", "disable");
           previousCard.classList.remove("open", "show", "disable");
           
       }, 500);
       
       openedCards = [];

     }

   }


/*
 *Check if the game is over
 */

function isOver() {
     if(matchedCards.length === icons.length) {
       alert("GAME OVER!");
     }

   }
/*
 * Add move
*/
const movesContainer = document.querySelector(".moves");
let moves = 0;
movesContainer.innerHTML = 0;
function addMove() {
  moves ++;
  movesContainer.innerHTML = moves;

  //Set the rating
  rating();
}

/*
 * Rating
 */
 const starsContainer = document.querySelector(".stars");
 starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
 <li><i class="fa fa-star"></i></li>
 <li><i class="fa fa-star"></i></li>`;
 function rating() {

   if(17 < moves < 25) {
     starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
     <li><i class="fa fa-star"></i></li>`;
   } else if(moves > 25) {
     starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>`;
   } else {
     starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
     <li><i class="fa fa-star"></i></li>
     <li><i class="fa fa-star"></i></li>`;
   }
 }

/*
 * Restart Button
 */
 const restartBtn = document.querySelector(".restart");
  restartBtn.addEventListener("click", function() {
    //Delete all cards
    cardsContainer.innerHTML = "";
    
    

    //Call Init to create new cardsContainer
    init();

   // Reset Any Related Variables
   matchedCards = [];
   moves = 0;
   movesContainer.innerHTML = moves;
   starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
   <li><i class="fa fa-star"></i></li>
   <li><i class="fa fa-star"></i></li>`;
 });



   /// Start game for the first time
init();



// Shuffle function from 
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/* Modal box help from https://www.w3schools.com/howto/howto_css_modals.asp*/


function showModal() {
  const modal = document.querySelector('.modal-overlay');
  modal.style.display = 'block';
  modalStats();
}

function modalStats() {
  const finalMoves = document.querySelector('.modal-moves');
  finalMoves.innerHTML = 'Moves: ' + moves;
  const timeStat = document.querySelector('.modal-time');
  const finalTime = document.querySelector('.timer').innerHTML;
  timeStat.innerHTML = `Time: ${finalTime}`;
  const finalStars = document.querySelector('.modal-stars');
  const stars = numStars();
  finalStars.innerHTML = `Stars: ${stars}`;

}

function numStars() {
  hideStar();
}

function closeModal() {
  const modal = document.querySelector('.modal-overlay');
  const closed = document.querySelector('.closeBtn');
  closed.addEventListener('click', closeModal);
  modal.style.display = 'none';
}

closeModal();
showModal();









/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
