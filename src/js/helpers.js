export const createButtonDOM = (text, handleClick, className = "secondary") => {
  const buttonDOM = document.createElement("button");
  buttonDOM.classList.add("memory__btn", className);
  buttonDOM.innerText = text;
  buttonDOM.addEventListener("click", () => handleClick(buttonDOM));
  return buttonDOM;
};
