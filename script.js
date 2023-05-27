import Toast from "./Toast.js";

document.querySelector("button").addEventListener("click", () => {
  const toast = new Toast({ pauseOnHover: true, pauseOnFocusLoss: true, autoClose: false});
});
