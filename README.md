# expo-tenor-search

<!-- > A component for react native tenor gif search. -->

[![NPM](https://img.shields.io/npm/v/expo-tenor-search.svg)](https://www.npmjs.com/package/expo-tenor-search) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


The expo-tenor-search component allows you to easily integrate Tenor GIFs into your React Native app. It features a user-friendly interface. This package is perfect for enhanceing your app's visual appeal and engage users with high-quality animated GIFs.

This package supports Tenor V2 APIs

## Install
Open a Terminal in the project root and run:

```bash
yarn add expo-tenor-search
```

## Usage

The `GifSearch` component is the main feature of the extension.
Here are the features of the GifSearch component based on the code provided:

* *Customizable Search Filters*: You can customize the search filters to provide only the type of GIFs that you want to show in your app. In the code, the MediaFilter parameter is set to 'minimal', which limits the search results to only show GIFs that are safe for all ages.
* *Easy GIF Selection*: The onGifSelect function is called when the user selects a GIF. A function `handleGifSelect` is provided that returns the selected GIF's URL.
* *Tenor API Key*: To use the GifSearch component, you need to provide a Tenor API key. In the code, the tenorkey parameter is used to provide the API key. You can obtain an API key from Tenor's developer portal.



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


[![Draw an image inside the terminal](./01a84abb-ebe6-4815-bdf5-07509c4b78d4.jpeg)](doc/high-level.md#ref.drawImage)

[![Draw an image inside the terminal](./a268ff98-8703-4946-83fc-0d468cfa1fe3.jpeg)](doc/high-level.md#ref.drawImage)

## License

MIT © [Hexmos Technologies](https://github.com/HexmosTech)
