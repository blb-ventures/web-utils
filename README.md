# Web Utils

A collection of typescript utilities shared between our projects.

## Install

```bash
npm i @blb-ventures/resource
# or
yarn add @blb-ventures/resource
# or
pnpm i @blb-ventures/resource
```

## Usage and Examples

All examples are also in the `src/playground.ts` file and I recommend using [Deno](https://deno.land) to easily run them.

### ETA (eta.ts)

A class to estimate the time to finish a task given a series of progress updates. It keeps by default the last 5 progress changes and uses that to estimate the time left for completion.

```typescript
const eta = new ETA(10_000);
// Start updating the progress
eta.updateProgress(100);
eta.updateProgress(200);
eta.updateProgress(300);

// To keep up with the progress
eta.addEventListener('progress', event => {
  console.log(event.detail.progress);
});

// Or if you are in React land, use our @blb-ventures/react-hooks useEvent
import { useEvent } from '@blb-ventures/react-hooks';
const ProgressComponent = () => {
  const progressEvent = useEvent(eta, 'progress');
  return <div>{progressEvent.progress}</div>
}
```

### compressFile (file-compress.ts)

It uses Browser's `CompressionStream` to compress a file, also uses `stream/progress-stream` to report the progress of compression.
It returns a promise that can resolve into the compressed file.

```typescript
const abortController = new AbortController();
compressFile({
  file,
  callback: progress => console.log('Compression progress', progress),
  signal: abortController.signal, // optional
  encoding: 'gzip' // default = gzip
});
```

## filterObjKeys and filterObjNullValues (filter-obj-keys.ts)

filterObjKeys filters the object keys by the value

```typescript
const obj = {
  a: 'foo',
  b: 'bar',
};
const filtered = filterObjKeys(obj, 'foo');
// filtered = { b: 'bar' }
```

filterObjNullValues filters the object keys by null values

```typescript
const obj = {
  a: null,
  b: 'bar'
};
const filtered = filterObjNullValues(obj);
// filtered = { b: 'bar' }
```

### findKey (find-key.ts)

Find key returns the value of a key that can be in up to the fifth level of a object of objects

```typescript
const obj = {
  a: {
    b: {
      c: 'foo',
    },
    d: 'bar',
  },
  e: 'baz',
}
const findCValue = findKey('c', obj);
// findCValue = 'foo'
```

### formatBytes (formatters.ts)

Formats a number of bytes into a shorter value

```typescript
console.log(formatBytes(1024)) // output: 1KB
console.log(formatBytes(4096)) // output: 4KB
console.log(formatBytes(5000)) // output: 4.88KB
console.log(formatBytes(5000, 1)) // output: 4.9KB
```

### getInitials (get-initials.ts)

Given a string returns the uppercase letter of each word

```typescript
console.log(getInitials('Eduardo Sigrist Ciciliato')) // outputs: ESC
```

### groupBy (group-by.ts)

Groups a list of objects by a key or key path (using dot notation) and optionally maps the items

```typescript
const items = [
  { name: 'apple', type: 'fruit' },
  { name: 'banana', type: 'fruit' },
  { name: 'car', type: 'object' },
];
const grouped = groupBy(items, 'type', (it) => it.name);
// grouped = { fruit: ['apple', 'banana'], object: ['car'] }
```

### randString (rand-string.ts)

Generates a random string of alpha numerical characters length N

```typescript
console.log(randString(10)) // outputs: bDf8lOjkNf
```

### decodeId, encodeId, decodeIdOrNull and encodeIdOrNull (relay.ts)

Util functions to encode or decode Relay formatted ("<Interface>:<ID>", i.e "User:1") base64 ids.
The null versions return a null value instead of throwing errors when there is invalid input.

```typescript
console.log(encodeId('User', '1')) // outputs: 'VXNlcjox'
console.log(decodeId('VXNlcjox')) // outputs: { type: 'User', id: '1' }
```

### resolvePath (resolve-path.ts)

Walks an object using the dot notation path, returning a default value if it can't resolve

```typescript
const user = {
  name: 'John',
  permissions: {
    product: {
      edit: true
    }
  }
};
console.log(user, 'permissions.product.edit', null) // outputs: true
```

### safeParseJson (safe-parse-json.ts)

Tries to parse a JSON and returns null instead of throwing

```typescript
console.log(safeParseJson("{invalid_json: ---}")) // outputs: null
console.log(safeParseJson("[]")) // outputs: []
```

### linkedInShare, facebookShare and twitterShare (share-urls.ts)

Generates share urls for some major social networks

```typescript
console.log(facebookShare('https://eduardociciliato.com.br')) // outputs: https://www.facebook.com/sharer.php?u=https%3A%2F%2Feduardociciliato.com.br
```

### stringToColor (string-to-color.ts)

It generates a hexadecimal color from a given string. We usually use this together with the `getInitials` to generate a user's avatar from their name.

```typescript
console.log(stringToColor('Eduardo Ciciliato')) // outputs: #53c094
```

### throttle (throttle.ts)

Throttles a function execution by a set amount of time

```typescript
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
console.time('throttle');
const throttled = throttle(() => {console.timeLog('throttle')}, 300);
for(let i = 0; i < 100; i++) {
  throttled();
  await sleep(i);
}
console.timeEnd('throttle')
// outputs:
// throttle: 0ms
// throttle: 315ms
// throttle: 649ms
// throttle: 971ms
// throttle: 1303ms
// throttle: 1628ms
// throttle: 1989ms
// throttle: 2315ms
// throttle: 2666ms
// throttle: 2968ms
// throttle: 3283ms
// throttle: 3617ms
// throttle: 3966ms
// throttle: 4331ms
// throttle: 4713ms
// throttle: 5112ms
```

### formatTimeLeft (time.ts)

Formats the time left as "9999a 99m 99d 99:99:99" a short way of showing time specifically localized to Brazilian Portuguese

```typescript
console.log(formatTimeLeft(1_000_000)); // outputs: 00:16:40
console.log(formatTimeLeft(10_000_000)); // outputs: 02:46:40
console.log(formatTimeLeft(100_000_000)); // outputs: 1d 03:46:40
console.log(formatTimeLeft(1_000_000_000)); // outputs: 11d 13:46:40
console.log(formatTimeLeft(10_000_000_000)); // outputs: 3m 25d 17:46:40
console.log(formatTimeLeft(100_000_000_000)); // outputs: 1a 2m 2d 09:46:4
```

### whatsappLink (whatsapp.ts)

Generates a link to open a chat with a Whatsapp number and optionally a preset text

```typescript
console.log(whatsappLink({ phone: 5511999999999, text: 'Hi'})); // outputs: https://wa.me/5511999999999?text=Hi
```
