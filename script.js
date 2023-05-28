import Toast from "./Toast.js";

var toastEl = document.getElementById("toasts");
var positionEl = document.getElementById("positions");
var autoCloseEl = document.getElementById("op1");
var progressEl = document.getElementById("op2");
var canCloseEl = document.getElementById("op3");

let toastValue = "default";
let positionValue = "top-right";
let autoCloseStatus = 5000;
let progressStatus = false;
let canCloseStatus = true;

toastEl.addEventListener("change", () => {
  toastValue = toastEl.value;
});
positionEl.addEventListener("change", () => {
  positionValue = positionEl.value;
});
autoCloseEl.addEventListener("change", () => {
  if (autoCloseStatus === 5000) {
    autoCloseStatus = false;
  } else if (autoCloseStatus === false) {
    autoCloseStatus = 5000;
  }
});
progressEl.addEventListener("change", () => {
  progressStatus = !progressStatus;
});
canCloseEl.addEventListener("change", () => {
  canCloseStatus = !canCloseStatus;
});

document.querySelector("button").addEventListener("click", () => {
  new Toast({ text: "Hey There !", autoClose: autoCloseStatus, position: positionValue, canClose: canCloseStatus, showProgress: progressStatus, toastType: toastValue });
});
