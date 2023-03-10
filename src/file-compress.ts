import { throttle } from './throttle';

interface CompressOptions {
  file: File;
  callback?: (progress: number) => void;
  signal?: AbortSignal;
  encoding?: string;
}

const COMPRESS_THROTTLE_DELAY = 500;

interface CompressReturn {
  data: File;
  encoding?: string;
}

export const compressFile = async ({
  file,
  callback,
  signal,
  encoding = 'gzip',
}: CompressOptions): Promise<CompressReturn> => {
  if (signal?.aborted) return { data: file };
  const { ProgressStream } = await import('./stream/progress-stream');
  try {
    const data = await new Response(
      file
        .stream()
        .pipeThrough(new ProgressStream(throttle(callback, COMPRESS_THROTTLE_DELAY), signal))
        .pipeThrough(new window.CompressionStream(encoding) as ReadableWritablePair),
      { headers: { 'Content-Type': file.type } },
    ).blob();
    return { data: new File([data], file.name, { type: file.type }), encoding };
  } catch (_) {}
  return { data: file };
};
