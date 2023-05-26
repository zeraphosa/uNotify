import Toast from "./Toast.js";

const toast = new Toast({ text: "Hello" });

setTimeout(() => {
  toast.update({ text: "TEXT CHANGE" });
}, 2000);
