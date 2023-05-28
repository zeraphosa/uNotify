const DEFAULT_OPTIONS = {
  text: "Hey there !",
  autoClose: 7000,
  position: "top-right",
  onClose: () => {},
  canClose: false,
  showProgress: false,
  toastType: "default",
};

export default class Toast {
  #toastElement;
  #autoCloseInterval;
  #progressInterval;
  #removeBinded;
  #timeVisible = 0;
  #autoClose;
  #isPaused = false;
  #unpause;
  #pause;
  #visibilityChange;
  #shouldUnPause;

  constructor(options) {
    this.#toastElement = document.createElement("div");
    this.#toastElement.classList.add("toast");
    requestAnimationFrame(() => {
      this.#toastElement.classList.add("show");
    });
    this.#removeBinded = this.remove.bind(this);
    this.#unpause = () => (this.#isPaused = false);
    this.#pause = () => (this.#isPaused = true);
    this.#visibilityChange = () => {
      this.#shouldUnPause = document.visibilityState === "visible";
    };
    this.update({ ...DEFAULT_OPTIONS, ...options });
  }

  set autoClose(value) {
    this.#autoClose = value;
    this.#timeVisible = 0;
    if (value === false) return;
    let lastTime;
    const func = (time) => {
      if (this.#shouldUnPause) {
        lastTime = null;
        this.#shouldUnPause = false;
      }
      if (lastTime == null) {
        lastTime = time;
        this.#autoCloseInterval = requestAnimationFrame(func);
        return;
      }
      if (!this.#isPaused) {
        this.#timeVisible += time - lastTime;
        if (this.#timeVisible >= this.#autoClose) {
          this.remove();
          return;
        }
      }
      lastTime = time;
      this.#autoCloseInterval = requestAnimationFrame(func);
    };
    this.#autoCloseInterval = requestAnimationFrame(func);
  }

  set position(value) {
    const currentContainer = this.#toastElement.parentElement;
    const selector = `.toast-container[data-position="${value}"]`;
    const container = document.querySelector(selector) || createContainer(value);
    container.append(this.#toastElement);
    if (currentContainer == null || currentContainer.hasChildNodes()) return;
    currentContainer.remove();
  }

  set text(value) {
    this.#toastElement.textContent = value;
  }

  set canClose(value) {
    this.#toastElement.classList.toggle("can-close", value);
    if (value) {
      this.#toastElement.addEventListener("click", this.#removeBinded);
    } else {
      this.#toastElement.removeEventListener("click", this.#removeBinded);
    }
  }

  set showProgress(value) {
    this.#toastElement.classList.toggle("progress", value);
    this.#toastElement.style.setProperty("--progress", 1);

    if (value) {
      const func = () => {
        if (!this.#isPaused) {
          this.#toastElement.style.setProperty("--progress", 1 - this.#timeVisible / this.#autoClose);
        }
        this.#progressInterval = requestAnimationFrame(func);
      };

      this.#progressInterval = requestAnimationFrame(func);
    }
  }

  set pauseOnHover(value) {
    if (value) {
      this.#toastElement.addEventListener("mouseover", this.#pause);
      this.#toastElement.addEventListener("mouseleave", this.#unpause);
    } else {
      this.#toastElement.removeEventListener("mouseover", this.#pause);
      this.#toastElement.removeEventListener("mouseleave", this.#unpause);
    }
  }

  set pauseOnFocusLoss(value) {
    if (value) {
      document.addEventListener("visibilitychange", this.#visibilityChange);
    } else {
      document.removeEventListener("visibilitychange", this.#visibilityChange);
    }
  }

  set toastType(value) {
    this.#toastElement.classList.add(value);
  }

  update(options) {
    Object.entries(options).forEach(([key, value]) => {
      this[key] = value;
    });
  }

  remove() {
    cancelAnimationFrame(this.#autoCloseInterval);
    cancelAnimationFrame(this.#progressInterval);
    const container = this.#toastElement.parentElement;
    this.#toastElement.classList.remove("show");
    this.#toastElement.addEventListener("transitionend", () => {
      this.#toastElement.remove();
      if (container.hasChildNodes()) return;
      container.remove();
    });
    this.onClose();
  }
}

function createContainer(position) {
  const containerElement = document.createElement("div");
  containerElement.classList.add("toast-container");
  containerElement.dataset.position = position;
  document.body.append(containerElement);
  return containerElement;
}
