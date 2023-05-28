import Toast from "./Toast.js";

var toastEl = document.getElementById("toasts");
var positionEl = document.getElementById("positions");

let toastValue;
let positionValue;

toastEl.addEventListener("change", () => {
  toastValue = toastEl.value;
});
positionEl.addEventListener("change", () => {
  positionValue = positionEl.value;
});

document.querySelector("button").addEventListener("click", () => {
  new Toast({ toastType: toastValue, position: positionValue, pauseOnHover: true, pauseOnFocusLoss: true, autoClose: false });
});
