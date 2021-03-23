import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import user from "../assets/user.png";
// import moment from 'moment';

export default function App({ comment }) {
  // Pull comment object out of props
  // const { comment } = this.props;
  // Pull data needed to display a comment out of comment object
  console.log("cc", comment);
  // const { content, created, user } = comment;
  // Pull user name and avatar out of user object
  // const { name, avatar } = user;
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image
          resizeMode="contain"
          style={styles.avatar}
          source={{
            uri:
              "https://www.pinclipart.com/picdir/big/559-5590325_avatar-icon-png-clipart.png",
          }}
        />
      </View>
      <View style={styles.contentContainer}>
        <Text>
          {/* <Text style={[styles.text, styles.name]}>{name}</Text>
            {' '} */}
          <Text style={styles.text}>{comment}</Text>
        </Text>
        {/* <Text style={[styles.text, styles.created]}>{moment(created).fromNow()}</Text> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 5,
  },
  avatarContainer: {
    alignItems: "center",
    marginLeft: 5,
    paddingTop: 10,
    width: 40,
  },
  contentContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "#EEE",
    padding: 5,
  },
  avatar: {
    borderWidth: 1,
    // borderColor: "#EEE",
    // borderRadius: 13,
    width: 24,
    height: 24,
  },
  text: {
    color: "#000",
    // fontFamily: "Avenir",
    fontSize: 15,
  },
  name: {
    fontWeight: "bold",
  },
  created: {
    color: "#BBB",
  },
});
