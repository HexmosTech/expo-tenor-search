# expo-tenor-search

> A component for react native tenor gif search.

[![NPM](https://img.shields.io/npm/v/expo-tenor-search.svg)](https://www.npmjs.com/package/expo-tenor-search) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save expo-tenor-search
```

```sh
yarn add expo-tenor-search
yarn add HexmosTech/expo-tenor-search.git#master

```

## Usage

```jsx
import { GifSearch } from 'expo-tenor-search'

export default function GifScreen() {
  const handleGifSelect = (gifUrl) => {
    console.log(`Selected GIF: ${gifUrl}`)
  }

  return (
    <GifSearch
      tenorkey={'xxx-xxx-xxx-xxx'}
      MediaFilter={'minimal'}
      onGifSelect={handleGifSelect}
    />
  )
}
```

![gifs caregories](./01a84abb-ebe6-4815-bdf5-07509c4b78d4.jpeg)

![gifs](./a268ff98-8703-4946-83fc-0d468cfa1fe3.jpeg)

## License

MIT © [Hexmos Technologies](https://github.com/Hexmos Technologies)
