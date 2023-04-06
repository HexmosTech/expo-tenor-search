import React from 'react'

// import { ExampleComponent } from 'expo-tenor-search'
import 'expo-tenor-search/dist/index.css'
import GifSearch from '../../src/gifSearch'

const App = () => {
  const handleGifSelect = (gifUrl) => {
    console.log(`Selected GIF: ${gifUrl}`)
  }

  return (
    <GifSearch
      tenorkey={'AIzaSyAWrnLQu6Xu-4DcnzAVGyV-nDzc0xaClI4'}
      MediaFilter={'minimal'}
      onGifSelect={handleGifSelect}
    />
  )
}

export default App
