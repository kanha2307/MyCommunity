import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import PostCard from '../components/PostCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({ navigation }) => {
  const { avatar, _id } = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#2D3553',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontFamily: 'Urbanist',
        fontWeight: '400',
      },
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            try {
              navigation.reset({
                index: 0,
                routes: [{ name: 'Profile' }],
              });
            } catch (error) {
              console.error('Error during navigation:', error);
            }
          }}
          style={styles.iconContainer}
        >
          <Image
            source={avatar ? { uri: avatar } : require('../assets/avatar3.png')}
            style={styles.headerImage}
          />
        </TouchableOpacity>
      ),
      headerTitle: 'Home',
    });
  }, [navigation, avatar]);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://192.168.43.15:3000/posts/getpost'); // Replace with your actual API URL
      const data = await response.json();

      if (Array.isArray(data)) {
        // Add current user ID to posts for save/unsave checks
        const updatedPosts = data.map(post => ({
          ...post,
          savedBy: post.savedBy || [], // Ensure savedBy is an array
          currentUserId: _id,
        }));
        setPosts(updatedPosts);
      } else {
        console.error('Unexpected data:', data);
        setPosts([]);
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setPosts([]);
      setIsLoading(false);
    }
  };

  const likePost = async (postId) => {
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await fetch(`http://192.168.43.15:3000/posts/like/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('HTTP Error:', response.status, errorText);
        return;
      }

      fetchPosts();
    } catch (error) {
      console.error('Error liking the post:', error);
    }
  };

  const unlikePost = async (postId) => {
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await fetch(`http://192.168.43.15:3000/posts/unlike/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('HTTP Error:', response.status, errorText);
        return;
      }

      fetchPosts();
    } catch (error) {
      console.error('Error unliking the post:', error);
    }
  };

  const handleLikeOrUnlike = async (postId) => {
    const targetPost = posts.find(post => post._id === postId);
    if (!targetPost) return;

    const isPostLiked = targetPost.likes.includes(_id);
    try {
      if (isPostLiked) {
        await unlikePost(postId);
      } else {
        await likePost(postId);
      }
    } catch (error) {
      console.error('Error handling like/unlike:', error);
    }
  };

  const savePost = async (postId) => {
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await fetch(`http://192.168.43.15:3000/posts/${postId}/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('HTTP Error:', response.status, errorText);
        return;
      }

      fetchPosts();
    } catch (error) {
      console.error('Error saving the post:', error);
    }
  };

  const unsavePost = async (postId) => {
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await fetch(`http://192.168.43.15:3000/posts/${postId}/unsave`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('HTTP Error:', response.status, errorText);
        return;
      }

      fetchPosts();
    } catch (error) {
      console.error('Error unsaving the post:', error);
    }
  };

  const handleSaveOrUnsave = async (postId) => {
    const targetPost = posts.find(post => post._id === postId);
    if (!targetPost) return;

    const isPostSaved = targetPost.savedBy.includes(_id);
    try {
      if (isPostSaved) {
        await unsavePost(postId);
      } else {
        await savePost(postId);
      }
    } catch (error) {
      console.error('Error handling save/unsave:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        posts.length > 0 ? (
          posts.map((post) => (
            <PostCard key={post._id} post={post} handleLikeOrUnlike={handleLikeOrUnlike} handleSaveOrUnsave={handleSaveOrUnsave} />
          ))
        ) : (
          <Text style={styles.noPostsText}>No posts available.</Text>
        )
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
    backgroundColor: '#000',
  },
  headerImage: {
    height: 40,
    width: 40,
    borderRadius: 100,
    borderColor: '#fff',
    borderWidth: 1,
  },
  iconContainer: {
    paddingHorizontal: 16,
  },
  noPostsText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#aaa',
    fontFamily: 'Urbanist',
    marginTop: 20,
  },
});

export default Home;
