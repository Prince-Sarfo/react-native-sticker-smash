import React from "react";
import { Modal, View, Pressable, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function EmojiPicker({ isVisible, children, onClose }) {
  return (
    <>
      <Modal animationType="slide" transparent={true} visible={isVisible}>
        <View style={styles.modalContent}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>
                    Choose a sticker
                </Text>
                <Pressable onPress={onClose}>
                    <MaterialIcons name='close' size={22} color='#fff'/>
                </Pressable>
            </View>
            {children}
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    height: '25%',
    width: '100%',
    backgroundColor: '#25292e',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: 'absolute',
    bottom: 0,
  },
  titleContainer:{
    height: '16%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: '#464c55',
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 16,
  }
});
