const net = new brain.NeuralNetwork();

initLocalStorage();

net.train(getDataFromLS());

const colorEl = document.getElementById("box");
const guessEl = document.getElementById("guess");
const whiteButton = document.getElementById("white-button");
const blackButton = document.getElementById("black-button");
const resetButton = document.getElementById("reset-button");
let color;
setRandomColor();

whiteButton.addEventListener("click", () => {
  chooseColor(1);
});

blackButton.addEventListener("click", () => {
  chooseColor(0);
});

resetButton.addEventListener("click", () => {
  resetLS();
  window.alert("Trained data has been reseted");
});

function chooseColor(value) {
  let newObject = [];
  newObject = getDataFromLS();
  newObject.push({
    input: color,
    output: [value],
  });
  localStorage.setItem("data", JSON.stringify(newObject));
  net.train(getDataFromLS());
  setRandomColor();
}

function print() {
  console.log(JSON.stringify(getDataFromLS()));
}

function setRandomColor() {
  color = {
    r: Math.random(),
    g: Math.random(),
    b: Math.random(),
  };
  const guess = net.run(color)[0];
  guessEl.style.color = guess > 0.5 ? "#FFF" : "#000";
  colorEl.style.backgroundColor = `rgba(${color.r * 255}, ${color.g * 255}, ${
    color.b * 255
  })`;
}

function initLocalStorage() {
  if (!localStorage.getItem("data")) {
    resetLS();
  }
}

function resetLS() {
  localStorage.setItem(
    "data",
    JSON.stringify([
      { input: { r: 0, g: 0, b: 0 }, output: [1] },
      { input: { r: 1, g: 1, b: 1 }, output: [0] },
    ])
  );
}

function getDataFromLS() {
  return JSON.parse(localStorage.getItem("data"));
}
