// import { ETA } from './eta.ts';
// import { compressFile } from './file-compress.ts';
// import { filterObjKeys, filterObjNullValues } from './filter-obj-keys.ts';
// import { findKey } from './find-key.ts';
// import { formatBytes } from './formatters.ts';
// import { getInitials } from './get-initials.ts';
// import { groupBy } from './group-by.ts';
// import { randString } from './rand-string.ts';
// import { decodeId, encodeId } from './relay.ts';
// import { resolvePath } from './resolve-path.ts';
// import { safeParseJson } from './safe-parse-json.ts';
// import { facebookShare } from './share-urls.ts';
// import { stringToColor } from './string-to-color.ts';
// import { throttle } from "./throttle.ts";
// import { formatTimeLeft } from "./time.ts";
// import { whatsappLink } from "./whatsapp.ts";


// const eta = new ETA(10_000);
// Start updating the progress
// eta.updateProgress(100);
// eta.updateProgress(200);
// eta.updateProgress(300);

// To keep up with the progress
// eta.addEventListener('progress', event => {
//   console.log(event.detail.progress);
// });

// Or if you are in React land, use our @blb-ventures/react-hooks useEvent
// import { useEvent } from '@blb-ventures/react-hooks';
// const ProgressComponent = () => {
//   const progressEvent = useEvent(eta, 'progress');
//   return <div>{progressEvent.progress}</div>
// }

// const file = new File([], 'file.txt');
// const abortController = new AbortController();
// compressFile({
//   file,
//   callback: progress => console.log('Compression progress', progress),
//   signal: abortController.signal, // optional
//   encoding: 'gzip' // default = gzip
// });

// const obj = {
//   a: 'foo',
//   b: 'bar',
// };
// const filtered = filterObjKeys(obj, 'foo');
// filtered = { b: 'bar' }

// const obj = {
//   a: null,
//   b: 'bar'
// };
// const filtered = filterObjNullValues(obj);
// filtered = { b: 'bar' }

// const obj = {
//   a: {
//     b: {
//       c: 'foo'
//     },
//     d: 'bar',
//   },
//   e: 'baz',
// }
// const findCValue = findKey('c', obj);
// findCValue = 'foo'

// console.log(formatBytes(1024)) // output: 1KB
// console.log(formatBytes(4096)) // output: 4KB
// console.log(formatBytes(5000)) // output: 4.88KB
// console.log(formatBytes(5000, 1)) // output: 4.9KB

// console.log(getInitials('Eduardo Sigrist Ciciliato')) // outputs: ESC

// const items = [
//   { name: 'apple', type: 'fruit' },
//   { name: 'banana', type: 'fruit' },
//   { name: 'car', type: 'object' },
// ];
// const grouped = groupBy(items, 'type', (it) => it.name);
// grouped = { fruit: ['apple', 'banana'], object: ['car'] }

// console.log(randString(10)) // outputs: bDf8lOjkNf

// console.log(encodeId('User', '1')) // outputs: 'VXNlcjox'
// console.log(decodeId('VXNlcjox')) // outputs: { type: 'User', id: '1' }

// const user = {
//   name: 'John',
//   permissions: {
//     product: {
//       edit: true
//     }
//   }
// };
// console.log(resolvePath(user, 'permissions.product.edit', null)) // outputs: true

// console.log(safeParseJson("{invalid_json: ---}")) // outputs: null
// console.log(safeParseJson("[]"))

// console.log(facebookShare('https://eduardociciliato.com.br'))

// console.log(stringToColor('Eduardo Ciciliato'));

// const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
// console.time('throttle');
// const throttled = throttle(() => {console.timeLog('throttle')}, 300);
// for(let i = 0; i < 100; i++) {
//   throttled();
//   await sleep(i);
// }
// console.timeEnd('throttle')

// console.log(formatTimeLeft(1_000_000)); // outputs: 00:16:40
// console.log(formatTimeLeft(10_000_000)); // outputs: 02:46:40
// console.log(formatTimeLeft(100_000_000)); // outputs: 1d 03:46:40
// console.log(formatTimeLeft(1_000_000_000)); // outputs: 11d 13:46:40
// console.log(formatTimeLeft(10_000_000_000)); // outputs: 3m 25d 17:46:40
// console.log(formatTimeLeft(100_000_000_000)); // outputs: 1a 2m 2d 09:46:40

// console.log(whatsappLink({ phone: 5511999999999, text: 'Hi'})); // outputs: https://wa.me/5511999999999?text=Hi
