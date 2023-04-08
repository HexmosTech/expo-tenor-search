import React from 'react';
import { GifSearch } from 'expo-tenor-search';

export default function SecondScreen() {
    const handleGifSelect = (gifUrl) => {
        console.log(`Selected GIF: ${gifUrl}`)
    }

    return (

        <GifSearch tenorkey={'<tennor key>'}
            MediaFilter={'minimal'}
            onGifSelect={handleGifSelect}
        />

    );
}

