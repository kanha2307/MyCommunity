import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native'; // Import ToastAndroid for displaying messages
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import { useSelector } from 'react-redux'; // To get the current user
import { useNavigation } from '@react-navigation/native';

const PostCard = ({ post, handleLikeOrUnlike, handleSaveOrUnsave }) => {
  const navigation = useNavigation();
  const { _id } = useSelector((state) => state.user); // Get the logged-in user

  // State to track if the post is being saved
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(Array.isArray(post.savedBy) && post.savedBy.includes(_id));

  // Check if the post is liked by the current user
  const isLiked = Array.isArray(post.likes) && post.likes.includes(_id);

  const handleSavePress = async () => {
    setIsSaving(true); // Start the saving process
    try {
      // Call the save/unsave function
      await handleSaveOrUnsave(post._id);
      
      // Update local state based on the new saved state
      setIsSaved(!isSaved);
      
      // Display appropriate message based on the new state
      const message = isSaved ? 'Post unsaved!' : 'Post saved successfully!';
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } catch (error) {
      console.error('Error saving post:', error);
      ToastAndroid.show('Error saving post. Please try again.', ToastAndroid.SHORT);
    } finally {
      setIsSaving(false); // End the saving process
    }
  };

  return (
    <TouchableOpacity onPress={() => navigation.navigate('PostDetail', { postId: post._id })} style={styles.cardContainer}>
      {/* Post Header */}
      <View style={styles.headerContainer}>
        <Image
          source={post.author.avatar ? { uri: post.author.avatar } : require('../assets/avatar3.png')}
          style={styles.authorAvatar}
        />
        <View style={styles.authorDetails}>
          <Text style={styles.authorName}>{post.author.name}</Text>
          <Text style={styles.timestamp}>{moment(post.createdAt).fromNow()}</Text>
        </View>
      </View>
      <View>
        <Text style={styles.postTitle}>{post.title}</Text>
      </View>

      {/* Post Image */}
      {post.imageUrl && (
        <Image
          source={{ uri: post.imageUrl }}
          style={styles.postImage}
        />
      )}

      {/* Post Description */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>{post.description}</Text>
      </View>

      {/* Post Footer */}
      <View style={styles.footerContainer}>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => handleLikeOrUnlike(post._id)} // Trigger like/unlike action
        >
          <Ionicons
            name={isLiked ? "heart" : "heart-outline"} // Conditionally render filled or outlined heart
            size={20}
            color={isLiked ? "red" : "#aaa"} // Red heart if liked, gray otherwise
          />
          <Text style={styles.footerText}>{post.likes.length}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Ionicons name="chatbubble-outline" size={20} color="#aaa" />
          <Text style={styles.footerText}>{post.comments.length}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={handleSavePress} // Trigger save/unsave action
        >
          <Ionicons
            name={isSaved ? "bookmark" : "bookmark-outline"} // Conditionally render filled or outlined bookmark
            size={20}
            color={isSaved ? "white" : "#aaa"} // White bookmark if saved, gray otherwise
          />
          <Text style={styles.footerText}>{post.savedBy.length}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#333', // Updated background to a dark gray
    borderRadius: 10,
    marginVertical: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  authorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  authorDetails: {
    flexDirection: 'column',
  },
  postTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff', // White for better contrast
  },
  authorName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff', // White for better contrast
  },
  timestamp: {
    color: '#ccc', // Light gray for subtle contrast
    fontSize: 12,
  },
  postImage: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginVertical: 10,
  },
  descriptionContainer: {
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#ddd', // Light gray for the description text
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  footerText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#aaa', // Light gray for footer text
  },
});

export default PostCard;
