import { createButtonDOM } from "./helpers";

export default class SummaryModal {
  DOM = document.createElement("div");
  hideClass = "summary--hide";
  constructor(observer) {
    this.observer = observer;
  }

  open(title, info = {}) {
    this.DOM.classList.add("summary");
    const contentDOM = document.createElement("div");
    contentDOM.classList.add("summary__content");
    const titleDOM = document.createElement("h3");
    titleDOM.innerText = title;
    const handleClick = (buttonDOM) => {
      this.observer.restartGame();
      buttonDOM.removeEventListener("click", handleClick);
      this.DOM.classList.add(this.hideClass);
      setTimeout(() => {
        this.DOM.classList.remove(this.hideClass);
        this.DOM.remove();
        this.DOM.innerHTML = "";
      }, 500);
    };
    contentDOM.append(
      titleDOM,
      this.getInfoBlockDOM(info),
      createButtonDOM("Play again", handleClick, ...["primary", "summary__btn"])
    );
    this.DOM.appendChild(contentDOM);
    return this.DOM;
  }

  getInfoBlockDOM({ tries = null, matches = null, time = null }) {
    const blockDOM = document.createElement("div");
    blockDOM.classList.add("summary__info");
    if (time) {
      const timeDOM = document.createElement("span");
      timeDOM.innerText = `TIME \n ${time}`;
      blockDOM.appendChild(timeDOM);
    }
    if (matches) {
      const matchesDOM = document.createElement("span");
      matchesDOM.innerText = `MATCHES \n ${matches}`;
      blockDOM.appendChild(matchesDOM);
    }
    if (tries) {
      const triesDOM = document.createElement("span");
      triesDOM.innerText = `TRIES \n ${tries}`;
      blockDOM.appendChild(triesDOM);
    }
    return blockDOM;
  }
}
