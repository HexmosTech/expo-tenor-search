import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity,StyleSheet } from 'react-native'
import tenor from './tenorjs'
import { WebView } from 'react-native-webview'
const he = require('he')

export default function GifSearch({ tenorkey, MediaFilter, onGifSelect,styles }) {
  const [jsonString, setJsonString] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedGif, setSelectedGif] = useState(null)
  const [previousCategory, setPreviousCategory] = useState(null)
  const [gifSearchData , setGifSearchData] = useState(null)

  const myKey = tenorkey
  const myFilter = MediaFilter

  const Tenor = tenor.client({
    Key: myKey,
    Filter: 'off',
    Locale: 'en_US',
    MediaFilter: myFilter,
    DateFormat: 'D/MM/YYYY - H:mm:ss A'
  })

  let htmlPage = `<!DOCTYPE html>  <html lang=\"en\"><head><meta charset=\"UTF-8\" /><meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" /><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" /><title>Trending</title><style>  .gpr-search {padding: 10px;margin-right: 10px;font-size: 16px;border-radius: 5px;border: 1px solid #ccc;width: 300px;}.gpr-search-container {display: flex;align-items: center;background-color: #f5f5f5;border-radius: 4px;padding: 8px;} button { background-color: transparent; border: none; padding: 0; margin: 0; font: inherit; color: inherit; cursor: pointer; appearance: none; } .row {display: flex;flex-wrap: wrap;}.column {max-width: 50%;padding: 0px 5px;flex-grow: 100;position: relative;text-align: center;flex-grow: 1;}.gif-text {color: white;font-size: 20px;font-weight: bold;position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);overflow: hidden;}@media screen and (max-width: 300px) {.column {  width: 100%;}}.row:after {content: \"\";display: table;clear: both;max-width: 100%;text-align: center;}* {box-sizing: border-box;}img {max-width: 100%;height: 200px;width: 100%;object-fit: cover;} .search-wrapper {position: relative;display: inline-block;} .close {position: absolute;top: 50%;right: 20px;transform: translateY(-50%);font-size: 45px;font-weight: 600;} </style>   </head> `

  function onMessage(data) {
    if (data.nativeEvent.data === 'removecategorie') {
      setSelectedCategory(null)
      setGifSearchData(null)
    } else if (
      typeof data.nativeEvent.data === 'string' &&
      data.nativeEvent.data.includes('https://')
    ) {
      setSelectedGif(data.nativeEvent.data)
      setSelectedCategory('selectedGif')
    } else {
      setSelectedCategory(data.nativeEvent.data)
      setGifSearchData(data.nativeEvent.data)
      setPreviousCategory(data.nativeEvent.data)
    }
  }

  // List of gifs
  useEffect(() => {
    if (selectedCategory === 'selectedGif') {
      onGifSelect(selectedGif)
    } else if (selectedCategory != null) {
      Tenor.search
        .Query(selectedCategory, '30')
        .then((Results) => {
          htmlPage += `<body>`
          htmlPage += '<div class="row">'
          let count = 0
          Results.forEach((Category) => {
            htmlPage += `<div class="column"><button onclick="sendDataToReactNativeApp('${Category.media_formats.gif.url}')"
      >`
            htmlPage += `<img src="${
              Category.media_formats.gif.url
            }" alt="Image${count + 1}" />`
            htmlPage += `</button></div>`
            count++
          })
          htmlPage += `</div> <script>    const sendDataToReactNativeApp = async (data) => {   window.ReactNativeWebView.postMessage(data);    }; const removeCategorie = async() =>{window.ReactNativeWebView.postMessage("removecategorie"); }; </script> </body>  </html>  `
          const escapedHtml = he
            .encode(htmlPage)
            .replace(/"/g, '\\"')
            .replace(/\n/g, '')
          const decodedHtml = he.decode(escapedHtml)
          const resultingJson = JSON.stringify({ html: decodedHtml })
          const jsonResults = JSON.parse(resultingJson)
          setJsonString(jsonResults['html'])
        })
        .catch(console.error)
    } else {
      Tenor.categories
        .List('emoji')
        .then((Results) => {
          htmlPage += '<body> '
          htmlPage += '<div class="row">'
          let count = 0
          Results.forEach((Category) => {
            htmlPage += `<div class="column"><button onclick="sendDataToReactNativeApp('${Category.searchterm}')"
        >`
            htmlPage += `<img src="${Category.image}" alt="Image${
              count + 1
            }" style="filter: brightness(50%);"/>`
            htmlPage += `<div class="gif-text">${Category.searchterm}</div></button></div>`
            count++
          })
          htmlPage +=
            '</div> <script>    const sendDataToReactNativeApp = async (data) => {    window.ReactNativeWebView.postMessage(data);    };    </script> </body>  </html>  '
          const escapedHtml = he
            .encode(htmlPage)
            .replace(/"/g, '\\"')
            .replace(/\n/g, '')
          const decodedHtml = he.decode(escapedHtml)
          const resultingJson = JSON.stringify({ html: decodedHtml })
          const jsonResults = JSON.parse(resultingJson)
          setJsonString(jsonResults['html'])
        })
        .catch(console.error)
    }
  }, [jsonString, selectedCategory])

  //  On selection fo a gif
  useEffect(() => {
    Tenor.search
        .Query(gifSearchData, '30')
        .then((Results) => {
          htmlPage += `<body>`
          htmlPage += '<div class="row">'
          let count = 0
          Results.forEach((Category) => {
            htmlPage += `<div class="column"><button onclick="sendDataToReactNativeApp('${Category.media_formats.gif.url}')"
      >`
            htmlPage += `<img src="${
              Category.media_formats.gif.url
            }" alt="Image${count + 1}" />`
            htmlPage += `</button></div>`
            count++
          })
          htmlPage += `</div> <script>    const sendDataToReactNativeApp = async (data) => {   window.ReactNativeWebView.postMessage(data);    }; const removeCategorie = async() =>{window.ReactNativeWebView.postMessage("removecategorie"); }; </script> </body>  </html>  `
          const escapedHtml = he
            .encode(htmlPage)
            .replace(/"/g, '\\"')
            .replace(/\n/g, '')
          const decodedHtml = he.decode(escapedHtml)
          const resultingJson = JSON.stringify({ html: decodedHtml })
          const jsonResults = JSON.parse(resultingJson)
          setJsonString(jsonResults['html'])
        })
        .catch(console.error)
  }, [selectedGif])



  const onCloseButtonPress = () => {
    setSelectedCategory(null)
    setGifSearchData(null)
  }
  const defaultStyles = StyleSheet.create({
    searchContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 4
    },
    closeButton: {
      width: 20,
      height: 20,
      backgroundColor: '#F6F6F6',
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: '#D1D1D1'
    },
    closeButtonText: {
      color: '#777777',
      fontSize: 18,
      lineHeight: 20,
      textAlign: 'center'
    }
  });

  const mergedStyles = {
    ...defaultStyles,
    ...styles,
    
  }
  

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
        <View
          style={mergedStyles.searchContainer}
        >
          <TextInput
            style={{
              flex: 1,
              height: 40,
              paddingLeft: 10
            }}
            placeholder='Search for GIFs'
            onChangeText={(text) => {
              setSelectedCategory(text);
              setGifSearchData(text);
            }}
            value={gifSearchData}
          />
          {selectedCategory ? (
            <TouchableOpacity
              onPress={onCloseButtonPress}
              style={{ paddingRight: 5 }}
            >
              <View
                style={mergedStyles.closeButton}
              >
                <Text
                  style={mergedStyles.closeButtonText}
                >
                  X
                </Text>
              </View>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
      {jsonString ? (
        <WebView
          originWhitelist={['*']}
          source={{ html: jsonString }}
          javaScriptEnabled={true}
          onMessage={onMessage}
          mixedContentMode='compatibility'
          scalesPageToFit={false}
        />
      ) : (
        <Text>Loading the Gifs...</Text>
      )}
    </View>
  )
}
