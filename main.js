const stage = document.getElementById("flashcard-stage");
const indicator = document.getElementById("size-indicator");
const decreaseButton = document.getElementById("decrease-size");
const increaseButton = document.getElementById("increase-size");
const visionButtons = document.querySelectorAll(".vision-button");
const visionModes = ["protanopia", "deuteranopia", "tritanopia"];

let scale = 1;

function updateScale() {
  stage.style.setProperty("--card-scale", scale.toFixed(2));
  indicator.textContent = `${Math.round(scale * 100)}%`;
  decreaseButton.disabled = scale <= 0.8;
  increaseButton.disabled = scale >= 1.3;
}

function setVision(mode) {
  stage.classList.remove(...visionModes);
  visionButtons.forEach((button) => {
    const active = button.id === mode;
    button.classList.toggle("is-selected", active);
    button.setAttribute("aria-pressed", String(active));
  });

  if (mode !== "normal-vision") {
    stage.classList.add(mode);
  }
}

decreaseButton.addEventListener("click", () => {
  scale = Math.max(0.8, scale - 0.1);
  updateScale();
});

increaseButton.addEventListener("click", () => {
  scale = Math.min(1.3, scale + 0.1);
  updateScale();
});

visionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const mode = button.id === "normal-vision" ? "normal-vision" : button.id;
    setVision(mode);
  });
});

updateScale();
