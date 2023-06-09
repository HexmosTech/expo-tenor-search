import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import tenor from './tenorjs'
import { WebView } from 'react-native-webview'
const he = require('he')

export default function GifSearch({
  tenorkey,
  Filter,
  onGifSelect,
  styles
}) {
  const SearchBoxstyles = styles['searchbox']
  const gifStyles = styles['gifbox']

  const [jsonString, setJsonString] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedGif, setSelectedGif] = useState(null)
  const [previousCategory, setPreviousCategory] = useState(null)
  const [gifSearchData, setGifSearchData] = useState(null)
  const [gifMetadata, setGifMetadata] = useState(null)
  const [selectedGifMetadata, setSelectedGifMetadata] = useState(null)

  const myKey = tenorkey
  const myFilter = 'gif'
  const filterContent  = Filter
  const Tenor = tenor.client({
    Key: myKey,
    Filter: filterContent,
    Locale: 'en_US',
    MediaFilter: myFilter,
    DateFormat: 'D/MM/YYYY - H:mm:ss A'
  })

  const initialStyles = `
  * {box-sizing: border-box;}
  @media screen and (max-width: 300px) {.column {  width: 100%;}}.row:after {display: table;clear: both;max-width: 100%;text-align: center;}
  `
  const cssObject = {
    button: {
      backgroundColor: 'transparent',
      border: 'none',
      padding: '0',
      margin: '0',
      font: 'inherit',
      color: 'inherit',
      cursor: 'pointer',
      appearance: 'none'
    },
    '.row': { display: 'flex', flexWrap: 'wrap' },
    '.column': {
      'max-width': '50%',
      padding: '0px 5px',
      flexGrow: 100,
      position: 'relative',
      textAlign: 'center'
    },
    '.giftext': {
      color: 'white',
      fontSize: '20px',
      fontWeight: 'bold',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      overflow: 'hidden'
    },
    img: {
      maxWidth: '100%',
      height: '200px',
      width: '100%',
      objectFit: 'cover'
    }
  }

  const gifStyleNames = Object.keys(cssObject)
  for (const styleName of gifStyleNames) {
    if (gifStyles[styleName]) {
      cssObject[styleName] = {
        ...cssObject[styleName],
        ...gifStyles[styleName]
      }
    }
  }

  function convertKeys(obj) {
    return Object.keys(obj).reduce((acc, key) => {
      const kebabKey = key.replace(
        /[A-Z]/g,
        (match) => `-${match.toLowerCase()}`
      )
      acc[kebabKey] =
        typeof obj[key] === 'object' ? convertKeys(obj[key]) : obj[key]
      return acc
    }, {})
  }

  const stylesWithKebabKeys = convertKeys(cssObject)

  // object to string 1 fais
  const cssString = Object.keys(stylesWithKebabKeys)
    .map((selector) => {
      const rules = stylesWithKebabKeys[selector]
      const rulesString = Object.keys(rules)
        .map((property) => `${property}: ${rules[property]};`)
        .join('\n')
      return `${selector} {\n${rulesString}\n}`
    })
    .join('\n')

  const allCSS = cssString + initialStyles
  let htmlPage = `<!DOCTYPE html>  <html lang=\"en\"><head><meta charset=\"UTF-8\" /><meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" /><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" /><title>Trending</title>
  <style>${allCSS}</style>
  </head> `

  function findObjectById(id) {
    let match = null
    gifMetadata.forEach((obj) => {
      if (obj.id == id) {
        match = obj
      }
    })
    if (!match) {
      throw new Error(`No object found with ID ${id}`)
    }
    return match
  }
  const pattern = /^[0-9]+$/

  function onMessage(data) {
    if (data.nativeEvent.data === 'removecategorie') {
      setSelectedCategory(null)
      setGifSearchData(null)
    } else if (pattern.test(data.nativeEvent.data)) {
      const idNumber = data.nativeEvent.data
      const myMatch = findObjectById(idNumber)
      setSelectedGif(data.nativeEvent.data)
      setSelectedGifMetadata(myMatch)
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
      onGifSelect(JSON.stringify(selectedGifMetadata))
      console.log('selectedGifMetadata:', selectedGifMetadata)
      setSelectedCategory(gifSearchData)
    } else if (selectedCategory != null) {
      Tenor.search
        .Query(selectedCategory, '30')
        .then((Results) => {
          htmlPage += `<body>`
          htmlPage += '<div class="row">'
          let count = 0
          setGifMetadata(Results)
          Results.forEach((Category) => {
            htmlPage += `<div class="column"><button class="gifButton" onclick="sendDataToReactNativeApp('${Category.id}')"
      >`
            htmlPage += `<img class="gif-img" src="${
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
            htmlPage += `<img class="gif-img" src="${
              Category.image
            }" alt="Image${count + 1}" style="filter: brightness(50%);"/>`
            htmlPage += `<div class="giftext">${Category.searchterm}</div></button></div>`
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
        setGifMetadata(Results)
        Results.forEach((Category) => {
          htmlPage += `<div class="column"><button onclick="sendDataToReactNativeApp('${Category.id}')"
      >`
          htmlPage += `<img class="gif-img" src="${
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
  })

  // list of keys
  const styleNames = Object.keys(defaultStyles)

  for (const styleName of styleNames) {
    if (SearchBoxstyles[styleName]) {
      defaultStyles[styleName] = {
        ...defaultStyles[styleName],
        ...SearchBoxstyles[styleName]
      }
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
        <View style={defaultStyles.searchContainer}>
          <TextInput
            style={{
              flex: 1,
              height: 40,
              paddingLeft: 10
            }}
            placeholder='Search for GIFs'
            onChangeText={(text) => {
              setSelectedCategory(text)
              setGifSearchData(text)
            }}
            value={gifSearchData}
          />
          {selectedCategory ? (
            <TouchableOpacity
              onPress={onCloseButtonPress}
              style={{ paddingRight: 5 }}
            >
              <View style={defaultStyles.closeButton}>
                <Text style={defaultStyles.closeButtonText}>X</Text>
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
