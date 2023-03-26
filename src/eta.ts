export interface ETAEvent {
  progress: number;
  progressPercent: number;
  total: number;
  averageSpeed: number;
  msLeft: number;
}

const DEFAULT_MAX_MEASURES = 5;

export interface ETAOptions {
  maxMeasures: number;
}

const defaultOptions: ETAOptions = {
  maxMeasures: DEFAULT_MAX_MEASURES,
};

export class ETA extends EventTarget {
  progress = 0;
  progressPercent = 0;
  total: number;
  latestSpeedMeasures: number[] = [];
  lastProgressAt: Date;
  averageSpeed = 0;
  msLeft = 0;
  done = false;
  options: ETAOptions;

  constructor(total: number, options?: Partial<ETAOptions>) {
    super();
    this.total = total;
    this.lastProgressAt = new Date();
    this.options = { ...defaultOptions, ...options };
  }

  updateProgress(newProgress: number) {
    const now = new Date();
    this.addMeasure(
      (newProgress - this.progress) / (now.getTime() - this.lastProgressAt.getTime()),
    );
    this.averageSpeed =
      this.latestSpeedMeasures.reduce((a, b) => a + b, 0) / this.latestSpeedMeasures.length;
    this.msLeft = (this.total - this.progress) / this.averageSpeed;
    this.progress = newProgress;
    this.lastProgressAt = new Date();
    this.progressPercent = (this.progress / this.total) * 100;
    this.done = this.progress >= this.total;
    this.dispatchEvent(
      new CustomEvent('progress', {
        detail: {
          progress: this.progress,
          progressPercent: this.progressPercent,
          total: this.total,
          averageSpeed: this.averageSpeed,
          msLeft: this.msLeft,
          done: this.done,
        },
      }),
    );
  }

  // Measures in bytes per ms
  addMeasure(measure: number) {
    this.latestSpeedMeasures.push(measure);
    if (this.latestSpeedMeasures.length > this.options.maxMeasures) {
      this.latestSpeedMeasures.shift();
    }
  }

  updateTotal(newTotal: number) {
    this.total = newTotal;
  }
}
