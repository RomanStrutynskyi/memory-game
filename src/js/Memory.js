import SummaryModal from "./SummaryModal";
import Board from "./Board";
import Timer from "./Timer";
import defaultConfig from "./defaultConfig";
import { createButtonDOM } from "./helpers";

export default class Memory {
  DOM = document.createElement("div");
  constructor(config) {
    Object.assign(this, { ...defaultConfig, ...config });
    this.board = new Board(this);
    this.timer = new Timer(this);
    this.summaryModal = new SummaryModal(this);
    this.init();
  }

  init() {
    document.body.classList.add(this.theme)
    this.DOM.classList.add("memory");
    const titleDOM = document.createElement("h2");
    titleDOM.innerText = "Memory Game";

    const buttonsDOM = document.createElement("div");
    buttonsDOM.classList.add("memory__buttons");
    buttonsDOM.append(
      createButtonDOM("Restart", this.restartGame),
      createButtonDOM(
        "Play",
        (buttonDOM) => {
          buttonDOM.setAttribute("disabled", true);
          this.startGame();
        },
        "primary"
      )
    );
    this.handleBoardMouseEvents();
    this.DOM.append(titleDOM, buttonsDOM);
  }

  startGame() {
    this.DOM.append(this.timer.DOM, this.board.DOM);
  }

  pauseGame = () => this.timer.stop();

  continueGame = () => this.timer.start();

  restartGame = () => {
    this.timer.refresh();
    this.board.refresh();
  };

  looseGame() {
    this.DOM.appendChild(
      this.summaryModal.open("Game over!", {
        tries: this.board.tries,
        matches: this.board.matches,
      })
    );
  }

  winGame() {
    this.DOM.appendChild(
      this.summaryModal.open("You win!!!", {
        tries: this.board.tries,
        matches: this.board.matches,
        time: this.timer.time,
      })
    );
    this.timer.stop();
  }

  handleBoardMouseEvents() {
    this.board.DOM.addEventListener("mouseleave", this.pauseGame);
    this.board.DOM.addEventListener("mouseenter", this.continueGame);
  }
}
