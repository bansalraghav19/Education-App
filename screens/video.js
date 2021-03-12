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
  StatusBar,
} from "react-native";
import { Video, AVPlaybackStatus } from "expo-av";

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

export default function App() {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [index, setIndex] = useState(0);
  const [selectedId, setSelectedId] = useState("0");

  // React.useEffect(() => {
  //   if (status.didJustFinish) setIndex((index + 1) % 2);
  // }, [status.didJustFinish]);

  // let playlist = [
  //   "https://ia800501.us.archive.org/11/items/popeye_i_dont_scare/popeye_i_dont_scare_512kb.mp4",

  //   "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
  // ];

  const renderVideoCard = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "white";
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
        }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 0.35 }}>
        <ActivityIndicator
          color="grey"
          animating={status?.isBuffering == true && status?.isPlaying == false}
          size="large"
          style={{
            position: "absolute",
            top: "20%",
            zIndex: 100,
            left: "45%",
            opacity: 0.5,
          }}
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
          // isLooping
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          // style={[{opacity:0.7}]}
        />
      </View>

      <View style={{ flex: 0.65 }}>
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
    // marginTop: StatusBar.currentHeight || 0,
    // justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  video: {
    alignSelf: "center",
    width: 320,
    height: 200,
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
