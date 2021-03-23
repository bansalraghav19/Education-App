import React, { useEffect, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
// import { get, put } from '../../api';
import Comment from "./comment";
import Input from "./inputComment";

export default function App() {

const [state, setState]= useState({
  comments: [], // array for comments fetched from the API backend
  refreshing: false, // whether comments list is being refreshed or not
})

  // Fetch comments when component is about to mount
  // componentWillMount = () => this.fetchComments();

  // Re-fetch comments when user pulls the list down
  // onRefresh = () => this.fetchComments();

  // // Call API to fetch comments
  // fetchComments = async () => {
  //   setState({ refreshing: true });
  //   try {
  //     // Make API call
  //     const response = await get("comments");
  //     // Convert response to JSON
  //     const json = await response.json();
  //     setState({
  //       refreshing: false,
  //       comments: json.comments,
  //     });
  //   } catch (error) {
  //     alert(error);
  //   }
  // };

  // Call API to submit a new comment
  submitComment = async (comment) => {
    // const { user } = this.props;
    _scrollView.scrollTo({ y: 0 });
    try {
      // Make API call
      // const response = await put('comments', {
      //   user_id: user._id,
      //   content: comment,
      // });
      // // Convert response to JSON
      // const json = await response.json();
      setState({
        // Push new comment to state before existing ones
        comments: [comment, ...state.comments],
      });
    } catch (error) {
      alert(error);
    }
  };
let _scrollView;
console.log(state,'.')
  // Pull comments out of state
  const { comments } = state;
  return (
    <View style={styles.container}>
      {/* Scrollable list */}
      <Input onSubmit={submitComment} />

      <ScrollView
        ref={(scrollView) => {
          _scrollView = scrollView;
        }}
        refreshControl={
          <RefreshControl
            refreshing={state.refreshing}
            // onRefresh={onRefresh}
          />
        }
      >
        {/* Render each comment with Comment component */}
        {comments.map((comment, index) => (
          <Comment comment={comment} key={index} />
        ))}
      </ScrollView>
      {/* Comment input box */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: 20,
  },
});
