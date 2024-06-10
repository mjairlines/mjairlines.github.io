const gridContainer = document.querySelector(".grid-container");
let cards = [];
let firstCard, secondCard;
let lockBoard = false;
let score = 0;

document.querySelector(".score").textContent = score;

// 1 ... slika prvi šolski dan
// 2 ... konec osnovne šole - dejavnost
// 3 ... priimek in ime
cards_names = [
  "mandic_marin",
  "hocevar_zan",
  "gruden_maj",
  "angelovska_iva",
  "dakskobler_lovro",
  "dolenc_erin",
  "vukovic_patrik",
  "sustersic_kaja_lina",
  "strucelj_simon",
  "lukin_kavs_korina",
  "lavric_ziga",
  "bencina_ziva",
  "polanc_tolja",
  "matkovic_niko",
  "kesar_tara",
  "bobek_mija",
];

cards_1 = [];
cards_2 = [];
cards_3 = [];

for(var i = 0; i < cards_names.length; i++) {
  cards_1.push(
    { 
      "image": "assets/" + cards_names[i] + "-1.png",
      "name": cards_names[i]
    }
  );
  
  cards_2.push(
    { 
      "image": "assets/" + cards_names[i] + "-2.png",
      "name": cards_names[i]
    }
  );

  cards_3.push(
    { 
      "image": "assets/" + cards_names[i] + "-3.png",
      "name": cards_names[i]
    }
  );
}

cards = [...cards_1, ...cards_3];
cards_new = [];

shuffleCards();
generateCards();

function shuffleCards() {
  let currentIndex = cards.length,
    randomIndex,
    temporaryValue;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = cards[currentIndex];
    cards[currentIndex] = cards[randomIndex];
    cards[randomIndex] = temporaryValue;
  }
}

function generateCards() {
  for (let card of cards) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.setAttribute("data-name", card.name);
    cardElement.innerHTML = `
      <div class="front">
        <img class="front-image" src=${card.image} />
      </div>
      <div class="back"></div>
    `;
    gridContainer.appendChild(cardElement);
    cardElement.addEventListener("click", flipCard);
  }
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  score++;
  document.querySelector(".score").textContent = score;
  lockBoard = true;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.name === secondCard.dataset.name;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetBoard();
  }, 1000);
}

function resetBoard() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

function restart() {
  resetBoard();
  shuffleCards();
  score = 0;
  document.querySelector(".score").textContent = score;
  gridContainer.innerHTML = "";
  generateCards();
}

function onlyOneCheckBox() {
	var checkboxgroup = document.getElementById('checkboxgroup').getElementsByTagName("input");
	
  //Note #2 Change max limit here as necessary
  var limit = 2;
  
	for (var i = 0; i < checkboxgroup.length; i++) {
		checkboxgroup[i].onclick = function() {
      cards_new = [];
			var checkedcount = 0;
				for (var i = 0; i < checkboxgroup.length; i++) {
          if(checkboxgroup[i].checked) {
            checkedcount += 1;
            
            switch(i) {
              case 0:
                cards_new = [...cards_new, ...cards_1];
                break;
              case 1:
                cards_new = [...cards_new, ...cards_2];
                break;
              case 1:
                cards_new = [...cards_new, ...cards_3];
                break;
              default:
                break;
            }
          }
				// checkedcount += (checkboxgroup[i].checked) ? 1 : 0;        
			}
			if (checkedcount > limit) {
				console.log("You can select maximum of " + limit + " checkbox.");
				// alert("You can select maximum of " + limit + " checkbox.");
				this.checked = false;
			}
      if (checkedcount < limit) {
        cards = [];
        restart()
      }
      if(checkedcount == limit) {
        cards = cards_new;
        cards_new = [];
        restart()
      }
		}
	}
}
