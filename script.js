import Toast from "./Toast.js";

document.querySelector("button").addEventListener("click", () => {
  const toast = new Toast({ text: "Hello", autoClose: false, position: "bottom-center"});
});
