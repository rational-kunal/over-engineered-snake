export class Engine {
  constructor(engineDelegate, fps) {
    this.engineDelegate = engineDelegate;
    this.fps = fps;
  }

  initialize() {
    this.paused = true; // Initially engine is in paused state
    this.fpsInterval = 1000 / this.fps;
    this.then = Date.now();

    // Add key press event listener
    document.addEventListener('keydown', (event) => {
      this.keyDown(event);
    });

    this.engineDelegate.didInitialize();
  }

  pause() {
    console.info('Engine paused'); // Will pause after one loop
    this.paused = true;
  }

  play() {
    console.info('Engine started');
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

      // Game Tick: Forward call to delegate
      this.engineDelegate.loop();
    }
  }

  keyDown(event) {
    this.engineDelegate.didKeyDown(this, event);
  }
}
