import Card from "./Card";

export default class Board {
  DOM = document.createElement("div");
  rows = 4;
  columns = 4;
  width;
  height;
  flippedCard = null;
  matchInProgress = false;
  assetsList = false;
  matches = 0;
  tries = 0;
  constructor(observer) {
    this.observer = observer;
    this.setCorrectGrid(observer.grid, observer.assets.length);
    this.assetsList = [...observer.assets, ...observer.assets]
      .sort()
      .slice(0, this.rows * this.columns);

    this.init(observer.width, observer.height);
  }

  shuffleCards(cards) {
    for (let current = cards.length - 1; current > 0; current--) {
      const random = Math.floor(Math.random() * (current + 1));
      [cards[current], cards[random]] = [cards[random], cards[current]];
    }
    return cards;
  }

  setCorrectGrid({ rows, columns }, maxCards) {
    const countCards = rows * columns;
    if (maxCards * 2 < countCards) {
      const calcRows = Math.floor(maxCards / 3);
      this.setCorrectGrid(
        { rows: calcRows, columns: Math.floor(maxCards / calcRows) },
        maxCards
      );
      return;
    }
    if (countCards % 2) {
      if (rows < columns) {
        this.setCorrectGrid({ rows: rows + 1, columns }, maxCards);
      } else {
        this.setCorrectGrid({ rows, columns: columns + 1 }, maxCards);
      }
    } else {
      this.rows = rows;
      this.columns = columns;
    }
  }

  init(width, height) {
    this.DOM.classList.add("board");
    this.DOM.style.width = `${width}px`;
    this.DOM.style.height = `${height}px`;
    this.DOM.style.gridTemplateColumns = `repeat(${this.columns}, 1fr)`;
    this.DOM.style.gridTemplateRows = `repeat(${this.rows}, 1fr)`;
    this.cards = this.shuffleCards(
      this.assetsList.map((content, i) => new Card(content, i))
    );
    this.addCardsToDOM();
  }

  refresh = () => {
    this.matches = 0;
    this.tries = 0;
    this.matchInProgress = false;
    this.flippedCard = null;
    this.DOM.innerHTML = "";
    this.cards = this.shuffleCards(
      this.assetsList.map((content, i) => new Card(content, i))
    );
    this.addCardsToDOM();
  };

  addCardsToDOM() {
    for (let i = 0; i < this.rows; i++) {
      console.log(
        this.cards
          .slice(i * this.columns, this.columns * (i + 1))
          .map((card) => card.content)
      );
    }
    this.DOM.append(
      ...this.cards.map((card) => {
        this.provideCardClickListener(card);
        return card.DOM;
      })
    );
  }

  provideCardClickListener(currentCard) {
    const handleClick = () => {
      if (
        !currentCard.isFlipped &&
        !currentCard.isMatched &&
        !this.matchInProgress
      ) {
        currentCard.toggleFlip();
        if (!this.flippedCard) {
          this.flippedCard = currentCard;
          return;
        }
        this.matchInProgress = true;
        this.tries++;
        if (this.flippedCard.content === currentCard.content) {
          this.flippedCard.DOM.removeEventListener("click", handleClick);
          currentCard.DOM.removeEventListener("click", handleClick);
          this.handleMatch(currentCard);
          return;
        }
        this.handleNotMatch(currentCard);
      }
    };
    currentCard.DOM.addEventListener("click", handleClick);
  }

  handleNotMatch = (currentCard) => {
    setTimeout(() => {
      this.matchInProgress = false;
      this.flippedCard.toggleFlip();
      this.flippedCard = null;
      currentCard.toggleFlip();
    }, 1000);
  };

  handleMatch = (currentCard) => {
    currentCard.match();
    this.flippedCard.match();
    this.flippedCard = null;
    this.matches++;
    this.matchInProgress = false;
    if (this.matches === this.cards.length / 2) {
      this.observer && this.observer.winGame();
    }
  };
}
