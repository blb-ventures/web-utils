export class ProgressStream extends TransformStream {
  loaded = 0;

  constructor(callback: (progress: number) => void, signal?: AbortSignal) {
    super({
      transform: (chunk, controller) => {
        if (signal?.aborted) {
          controller.terminate();
          throw new Error('Aborted Progress');
        }
        this.loaded += chunk.byteLength;
        callback(this.loaded);
        controller.enqueue(chunk);
      },
    });
  }
}
