import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Platform } from 'react-native';
import ImageViewer from './components/ImageViewer';
import Button from './components/Button';
import * as ImagePicker from 'expo-image-picker';
import { useRef, useState } from 'react';
import IconsButton from './components/IconButton';
import CircleButton from './components/CircleButton';
import EmojiPicker from './components/EmojiPicker';
import EmojiList from './components/EmojiList';
import EmojiSticker from './components/EmojiSticker';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { captureRef } from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
import domtoimage from 'dom-to-image';




const PlaceholderImage = require('./assets/images/background-image.png');


export default function App() {

  const [selectedImage, setSelectedImage] = useState(null);
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pickEmoji, setPickEmoji] = useState(null);
  const [status,requestPermission] = MediaLibrary.usePermissions();
  const imageRef = useRef()

// function onReset
const onReset = ()=>{
  setShowAppOptions(false)
}


// function for onAddSticker
const onAddSticker = ()=>{
  setIsModalVisible(true)
}

// function to close the modal
const onModalClose = ()=>{
  setIsModalVisible(false)
}

// function for onSaveImageAsync to take a screenshot
const onSaveImageAsync = async ()=>{
  if(Platform.OS !=='web'){
  try {
    const localUri = await captureRef(imageRef,{height: 400, quality: 1})
    await MediaLibrary.saveToLibraryAsync(localUri)
    if(localUri){
      alert('saved!')
    }
  } catch (e) {
    console.log(e)
  }
}
else{
  // saving for web using dom-to-image
  try {
    const dataurl = await domtoimage.toJpeg(imageRef.current,{quality: 0.95, width: 320, height: 440});
    let link = document.createElement('a');
    link.download = 'sticker-smash.jpeg'
    link.href = dataurl
    link.click()
  } catch (e) {
    console.log(e)
  }
}
}

// get the image from the phone using lauchImageLibraryAsync from expo-image-picker
  const PickImageAsync = async ()=>{
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    })
    // check to see if it was successful
    if(!result.canceled){
      setSelectedImage(result.assets[0].uri)
      setShowAppOptions(true)
    }else{
      alert('You did not select an image')
    }
  }


  // checking if we have access to user's media
  if(status===null){
    requestPermission()

  }

  return(
    <GestureHandlerRootView style={styles.container}>
     {/* to display image */}
      <View style={styles.imageContainer}>
         <View ref={imageRef} collapsable={false}>
            <ImageViewer placeholderImageSource={PlaceholderImage}
           selectedImage={selectedImage}/>
           {pickEmoji && <EmojiSticker imageSize={40} stickerSource={pickEmoji}/>}
           </View>
         </View>

      {showAppOptions ? (
        <View style={styles.optionContainer}>
            <View style={styles.optionRow}>
                <IconsButton icon='refresh' label='Refresh' onPress={onReset}/>
                <CircleButton onPress={onAddSticker}/>
                <IconsButton icon='save-alt' label='Save' onPress={onSaveImageAsync}/>      
            </View>
        </View>
      ):(
         <View style={styles.footerContainer}>
          <Button theme='primary' label='choose a photo' onPress={PickImageAsync}/>       
          <Button label='use this photo' onPress={()=>setShowAppOptions(true)}/>       
            </View>
      )}
      {/* display emojis */}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose} >
          <EmojiList onCloseModal={onModalClose} onSelect={setPickEmoji}/>
      </EmojiPicker>
      <StatusBar style="auto" />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer:{
    flex: 1,
    paddingTop: 58,
  },
  footerContainer:{
    flex:1/3,
    alignItems: 'center'
  },
  optionContainer:{
    position: 'absolute',
    bottom: 80,
  },
  optionRow:{
    alignItems: 'center',
    flexDirection: 'row'
  }
});
