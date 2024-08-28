import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, FlatList, Platform, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { format } from 'path';

const PostDetailScreen = () => {
  const route = useRoute();
  const { postId } = route.params;

  const [post, setPost] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await fetch(`http://192.168.43.15:3000/posts/getpost/${postId}`);
        const data = await response.json();
        setPost(data);
        setComments(data.comments);
        setIsLoading(false);
        console.log(post);
        
      } catch (error) {
        console.error('Error fetching post details:', error);
        setIsLoading(false);
      }
    };

    fetchPostDetails();
  }, [postId,comments]);

  const handleCommentSubmit = async () => {
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await fetch(`http://192.168.43.15:3000/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: newComment }),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('HTTP Error:', response.status, errorText);
        return;
      }
      
      const data = await response.json();
      setComments(prevComments => [data, ...prevComments]);
      console.log("data",data);
      
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  if (isLoading) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }

  if (!post) {
    return <Text style={styles.errorText}>Post not found.</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={comments}
        keyExtractor={(item) => item._id} // Ensure _id is unique
        ListHeaderComponent={
          <View style={styles.postHeader}>
            <View style={styles.row}>
              <Image
                source={post.author.avatar ? { uri: post.author.avatar } : require('../assets/avatar3.png')}
                style={styles.authorAvatar}
              />
              <View style={styles.authorDetails}>
                
                <Text style={styles.authorName}>{post.author.name}</Text>
                <Text style={styles.timestamp}>{moment(post.createdAt).fromNow()}</Text>
              </View>
            </View>
            <Text style={styles.postTitle}>{post.title}</Text>
            {post.imageUrl && (
              <Image
                source={{ uri: post.imageUrl }}
                style={styles.postImage}
              />
            )}
            <Text style={styles.postDescription}>{post.description}</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.comment} key={item._id}>
            <View style={styles.commentHeader}>
              {item.userId?.avatar ? (
                <Image source={{ uri: item.userId.avatar }} style={styles.commentAvatar} />
              ) : (
                <Image source={require('../assets/avatar3.png')} style={styles.commentAvatar} />
              )}
              <View style={styles.commentInfo}>
                <Text style={styles.commentAuthor}>{item.userId?.name || 'Unknown Author'}</Text>
                <Text style={styles.timestamp}>{moment(item.createdAt).fromNow}</Text>
              </View>
            </View>
            <Text style={styles.commentContent}>{item.content || 'No content'}</Text>
          </View>
        )}
        
      />
      <View style={styles.commentInputContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder="Add a comment..."
          placeholderTextColor="#aaa"
          value={newComment}
          onChangeText={setNewComment}
          onSubmitEditing={handleCommentSubmit} // Automatically submit when pressing return
        />
        <TouchableOpacity onPress={handleCommentSubmit} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Dark theme background
  },
  postHeader: {
    padding: 10,
    backgroundColor: '#1e1e1e', // Darker background for post header
  },
  authorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  }, commentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorDetails: {
    flexDirection: 'column', // Align items horizontally
    alignItems: 'flex-start', // Align items to start
    marginBottom: 10,
  },
  authorName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff',
  },
  timestamp: {
    color: '#888',
    fontSize: 12,
  },
  postTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#fff',
    marginVertical: 10,
  },
  postImage: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginVertical: 10,
  },
  postDescription: {
    fontSize: 14,
    color: '#ddd',
  },
  comment: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  commentAuthor: {
    fontWeight: 'bold',
    color: '#fff',
  },
  commentContent: {
    color: '#ddd',
  },
  commentInputContainer: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#333',
    backgroundColor: '#1e1e1e',
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentInput: {
    flex: 1,
    backgroundColor: '#333',
    color: '#fff',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  submitButton: {
    backgroundColor: '#007bff', // Primary color
    padding: 10,
    borderRadius: 5,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  loadingText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    color: '#f00',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default PostDetailScreen;
