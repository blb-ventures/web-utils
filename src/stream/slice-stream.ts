export class SliceStream extends TransformStream<Uint8Array, string> {
  seek = 0;
  loaded = 0;

  constructor(start: number, end: number, signal?: AbortSignal) {
    super({
      transform: (chunk, controller) => {
        if (start > end) throw new Error('Start must be less than end');
        if (signal?.aborted) {
          controller.terminate();
          throw new Error('Aborted Progress');
        }
        const maxSize = end - start;
        this.seek += chunk.byteLength;
        if (this.seek >= start && (this.seek < end || this.loaded === 0)) {
          let idealChunk = chunk;
          if (this.loaded + idealChunk.byteLength > maxSize) {
            idealChunk = idealChunk.slice(0, maxSize - this.loaded);
          }
          this.loaded += idealChunk.byteLength;
          controller.enqueue(new TextDecoder().decode(idealChunk));
        }
        if (this.loaded >= maxSize) controller.terminate();
      },
    });
  }
}
