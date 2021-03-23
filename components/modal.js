import React, { useRef } from "react";
import { View, Button, Text, TouchableOpacity, StyleSheet } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { AntDesign } from "@expo/vector-icons";
import CommentList from './commentList';

export default function DescriptionModal({ title, description }) {
  const refRBSheet = useRef();
  return (
    <TouchableOpacity
      onPress={() => refRBSheet.current.open()}
      style={styles.titleSection}
    >
      <Text style={styles.title}>
        {title || "Open Bottom Sheet and test the description box."}
      </Text>
      <AntDesign name="up" size={20} color="black" style={styles.iconStyle} />

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={500}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0,0,0,0.4)",
          },
          draggableIcon: {
            backgroundColor: "grey",
          },
          container: {
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            padding: 15,
            paddingTop: 0,
          },
        }}
      >
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            {description || "Video Description, Notes Text Here"}
          </Text>
        </View>
        <CommentList/>

      </RBSheet>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  titleSection: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-around",
    marginTop: 5,
  },
  title: {
    fontWeight: "bold",
    fontSize: 14,
    color: "rgba(0,0,0,0.7)",
    marginLeft: 5,
  },
  iconStyle: { color: "rgba(0,0,0,0.8)", marginTop: 2, marginRight: 5 },
  descriptionContainer: {},
  description: {
    paddingTop: 10,
  },
  seprate: {
    marginBottom: 20,
  },
});
