export default class Toast {
  #toastElement;
  #autoCloseTimeout;

  constructor(options) {
    this.#toastElement = document.createElement("div");
    this.#toastElement.classList.add("toast");

    Object.entries(options).forEach(([key, value]) => {
      this[key] = value;
    });
  }

  set autoClose(value) {
    if (value === false) return;
    if (this.#autoCloseTimeout != null) clearTimeout(this.#autoCloseTimeout);
    this.#autoCloseTimeout = setTimeout(() => this.remove(), value);
  }

  set position(value) {
    const selector = `.toast-container[data-position="${value}"]`;
    const container = document.querySelector(selector) || createContainer(value);
    container.append(this.#toastElement);
  }

  set text(value) {
    this.#toastElement.textContent = value;
  }

  update() {}
  remove() {
    const container = this.#toastElement.parentElement;
    this.#toastElement.remove();
    if (container.hasChildNodes()) return;
    container.remove();
  }
}

function createContainer(position) {
  const containerElement = document.createElement("div");
  containerElement.classList.add("toast-container");
  containerElement.dataset.position = position;
  document.body.append(containerElement);
  return containerElement;
}
