export default class Card {
  DOM = document.createElement("div");
  classFlip = "card--flip";
  classMatch = "card--match";
  isFlipped = false;
  isMatched = false;
  constructor(content) {
    this.content = content;
    this.init();
  }

  init() {
    this.DOM.classList.add("card");
    const cardFrontDOM = document.createElement("div");
    cardFrontDOM.classList.add("card__front");
    const cardBackDOM = document.createElement("div");
    cardBackDOM.classList.add("card__back");
    cardBackDOM.innerText = this.content;
    this.DOM.append(cardFrontDOM, cardBackDOM);
  }

  toggleFlip = () => {
    this.isFlipped = !this.isFlipped;
    this.DOM.classList.toggle(this.classFlip);
  };

  match = () => {
    this.isMatched = true;
    this.DOM.classList.add(this.classMatch);
  };
}
