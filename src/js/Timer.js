export default class Timer {
  DOM = document.createElement("div");
  timerDOM = document.createElement("span");
  timer;
  time = 0;
  constructor(observer) {
    this.observer = observer;
    this.initTime = observer.timeLimit;
    this.init();
  }

  init() {
    this.DOM.classList.add('timer');
    this.DOM.append("🕒", this.timerDOM);
    this.timerDOM.innerText = this.initTime;
  }

  start() {
    this.timer = setInterval(() => {
      this.time++;
      this.timerDOM.innerText = this.initTime - this.time;
      if (this.time === this.initTime) {
        this.stop();
        this.time = 0;
        this.observer && this.observer.looseGame();
      }
    }, 1000);
  }

  stop = () => clearInterval(this.timer);

  refresh() {
    this.stop();
    this.time = 0;
    this.timerDOM.innerText = this.initTime - this.time;
  }
}
