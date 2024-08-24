import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import PostCard from '../components/PostCard'; // Assuming you've created the PostCard component as suggested earlier

const Home = ({ navigation }) => {
  const { avatar } = useSelector((state) => state.user);
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
      console.log('Fetched posts data:', data);
      
      // Set posts directly if data is an array
      if (Array.isArray(data)) {
        setPosts(data);
      } else {
        console.error('Unexpected data format:', data);
        setPosts([]);
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setPosts([]);
      setIsLoading(false);
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
          posts.map((post, index) => <PostCard key={post._id} post={post} />) // Use post._id for unique keys
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
    backgroundColor: '#f8f9fa',
  },
  headerImage: {
    height: 40,
    width: 40,
    borderRadius: 100,
  },
  iconContainer: {
    paddingHorizontal: 16,
  },
  noPostsText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#6c757d',
    fontFamily: 'Urbanist',
    marginTop: 20,
  },
});

export default Home;
