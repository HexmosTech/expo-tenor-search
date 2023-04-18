import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import GifSearch from 'expo-tenor-search';

export default function App() {

  const handleGifSelect = (gifUrl) => {
    console.log(`Selected GIF: ${gifUrl}`)
  }

  const styles = {
    searchbox: {
      searchContainer: {
        height: 45,
      }
    },
    gifbox: {
      img: {
        borderRadius: "10px"
      }
    }
  }
  return (
    <View style={{ width: '100%', height: 90, flex: 1, flexDirection: 'row', marginBottom: 15 }}>
      <GifSearch
        tenorkey={'xxxxxxxx'}
        MediaFilter={'minimal'}
        onGifSelect={handleGifSelect}
        styles={styles}
      />
    </View>
  );
}
