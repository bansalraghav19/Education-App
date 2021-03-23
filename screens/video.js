import * as React from "react";
import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Button,
  Text,
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import InputComment from '../components/inputComment'
import CommentList from '../components/commentList'
import { Video, AVPlaybackStatus } from "expo-av";

import Modal from "../components/modal";
const playlist = [
  {
    videoUrl: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",

    name: "Big buck bunny - They Keep Silen Silenc",
    image: "https://i.vimeocdn.com/video/924124243_640.jpg",
    id: "0",
  },
  {
    videoUrl:
      "https://ia800501.us.archive.org/11/items/popeye_i_dont_scare/popeye_i_dont_scare_512kb.mp4",

    name: "Popaye the sailor man - Connection",
    image: "https://i.vimeocdn.com/video/924124243_640.jpg",
    id: "1",
  },
  {
    videoUrl: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
    name: "Big buck bunny - They Keep Silence",
    image: "https://i.vimeocdn.com/video/924124243_640.jpg",
    id: "2",
  },
  {
    videoUrl:
      "https://ia800501.us.archive.org/11/items/popeye_i_dont_scare/popeye_i_dont_scare_512kb.mp4",
    name: "Hoody - Like You",
    image: "https://i.vimeocdn.com/video/924124243_640.jpg",
    id: "3",
  },
  {
    videoUrl: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
    name: "Big buck bunny - They Keep Silence ",
    image: "https://i.vimeocdn.com/video/924124243_640.jpg",
    id: "4",
  },
  {
    videoUrl:
      "https://ia800501.us.archive.org/11/items/popeye_i_dont_scare/popeye_i_dont_scare_512kb.mp4",

    name: "Jambinai - Connection",
    image: "https://i.vimeocdn.com/video/924124243_640.jpg",
    id: "5",
  },
  {
    videoUrl: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
    name: "Jambinai - They Keep Silence",
    image: "https://i.vimeocdn.com/video/924124243_640.jpg",
    id: "6",
  },
  {
    videoUrl:
      "https://ia800501.us.archive.org/11/items/popeye_i_dont_scare/popeye_i_dont_scare_512kb.mp4",
    name: "Hoody - Like You",
    image: "https://i.vimeocdn.com/video/924124243_640.jpg",
    id: "7",
  },
  {
    videoUrl: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
    name: "Jambinai11 - They Keep Silence",
    image: "https://i.vimeocdn.com/video/924124243_640.jpg",
    id: "8",
  },
];

function VideoCard({ title, img, onPress, style }) {
  return (
    <TouchableOpacity onPress={onPress} style={[style]}>
      <Image
        style={styles.thumbnail}
        source={{
          uri: img,
        }}
      />
      <Text style={{ color: "rgba(0,0,0,0.7)", fontSize: 18 }}>{title}</Text>
    </TouchableOpacity>
  );
}

export default function App({ navigation, route }) {
  const { id, otherParam } = route.params;

  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [index, setIndex] = useState(0);
  const [selectedId, setSelectedId] = useState("0");

  const renderVideoCard = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#E6F7FF" : "white";
    return (
      <VideoCard
        title={item.name}
        img={item.image}
        onPress={() => {
          console.log("mlm");
          setSelectedId(item.id);
        }}
        style={{
          backgroundColor,
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
          paddingRight: 80,
          // boxShadow: '10px 0px 0px #1890FF',
        }}
      />
    );
  };

  //Blur Event: to be fired when the HomeScreen loses focus.
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      console.log("Blur");
      //Every time the screen loses focus the Video.current is paused
      if (video.current) {
        video.current.pauseAsync();
      }
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.videoContainer}>
        <ActivityIndicator
          color="grey"
          animating={status?.isBuffering == true && status?.isPlaying == false}
          size="large"
          style={styles.activityIndicator}
        />
        <Video
          // rate={4}
          ref={video}
          style={styles.video}
          source={{
            uri: playlist[+selectedId].videoUrl,
          }}
          useNativeControls
          resizeMode="contain"
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />
        <Modal />
      </View>

      <View style={styles.listContainer}>
        {/* <Text>dcd {id}</Text> */}
        {/* <InputComment/> */}
        <FlatList
          data={playlist}
          renderItem={renderVideoCard}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(18, 18, 29, 0.01)",
  },
  videoContainer: {
    flex: 0.41,
    marginTop: 5,
  },
  activityIndicator: {
    position: "absolute",
    top: "35%",
    zIndex: 100,
    left: "45%",
    opacity: 0.5,
  },
  video: {
    alignSelf: "center",
    width: 320,
    height: 200,
  },
  listContainer: {
    flex: 0.59,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  thumbnail: {
    width: 66,
    height: 58,
    marginRight: 10,
  },
});
