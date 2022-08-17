export class Engine {
  constructor(canvasEl, width, height, fps) {
    this.canvasEl = canvasEl;
    this.width = width;
    this.height = height;
    this.fps = fps;
  }

  initialize() {
    this.fpsInterval = 1000 / this.fps;
    this.then = Date.now();

    this.canvasEl.width = this.width;
    this.canvasEl.height = this.height;

    // Add key press event listener
    document.addEventListener('keydown', (event) => {
      this.keyDown(event.key);
    });
  }

  pause() {
    this.paused = true;
  }

  play() {
    this.paused = false;

    // Trigger loop
    window.requestAnimationFrame(() => this.loop());
  }

  loop() {
    if (!this.paused) {
      window.requestAnimationFrame(() => this.loop());
    }

    const now = Date.now();
    const elapsed = now - this.then;
    if (elapsed > this.fpsInterval) {
      this.then = now - (elapsed % this.fpsInterval);

      // Game Tick
      // HACK: Show something dynamic on canvas
      this.canvasEl
        .getContext('2d')
        .fillRect(Math.random() * 500, Math.random() * 500, 10, 10);
    }
  }

  keyDown(key) {
    // HACK: To check if play pause is working as intended
    if (key === ' ') {
      this.paused ? this.play() : this.pause();
    }
  }
}
