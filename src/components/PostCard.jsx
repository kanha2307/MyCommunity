import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

const PostCard = ({ post }) => {
  console.log(post);
  
  return (
    
    <View style={styles.cardContainer}>
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
        <Text style={styles.posttitle}>{post.title}</Text>
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
        <TouchableOpacity style={styles.footerButton}>
          <Ionicons name="heart-outline" size={20} color="#333" />
          <Text style={styles.footerText}>{post.likes.length}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Ionicons name="chatbubble-outline" size={20} color="#333" />
          <Text style={styles.footerText}>{post.comments.length}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Ionicons name="bookmark-outline" size={20} color="#333" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
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
    objectFit:"cover"
  },
  authorDetails: {
    flexDirection: 'column',
  },
  posttitle:{
    fontWeight: 'bold',
    fontSize: 16,
  },
  authorName: {
    fontWeight: 'bold',
    fontSize: 19,
  },
  timestamp: {
    color: '#666',
    fontSize: 12,
  },
  postImage: {
    width: '100%',
    height: 250,
    
    borderRadius: 10,
    marginVertical: 10,
    objectFit:"cover",
    
  },
  descriptionContainer: {
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#333',
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
    color: '#333',
  },
});

export default PostCard;
