import Toast from "./Toast.js";

document.querySelector("button").addEventListener("click", () => {
  const toast = new Toast({ text: "Hello", autoClose: 2000, showProgress: false });
});
