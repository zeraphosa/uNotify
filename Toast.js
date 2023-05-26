export default class Toast {
  #toastElement;

  constructor(options) {
    this.#toastElement = document.createElement("div");
    this.#toastElement.classList.add("toast");

    Object.entries(options).forEach(([key, value]) => {
      this[key] = value;
    });
  }
  set position(value) {
    console.log(value);
  }
 
  update() {}
  remove() {}
}
