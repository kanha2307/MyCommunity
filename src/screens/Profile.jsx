import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';

const Profile = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const { name, email, phoneNumber, avatar, id } = useSelector((state) => state.user); // Assuming user ID is stored in the state

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

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
          onPress={handleLogout}
          style={styles.iconContainer}
        >
          <Ionicons name="log-out-outline" size={24} color="white" />
        </TouchableOpacity>
      ),
      headerTitle: 'Profile',
    });
  }, [navigation]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://192.168.43.15:3000/posts/getpost'); // Replace with your actual API URL
        const data = await response.json();
        // Filter posts created by the current user
        const userPosts = data.posts.filter(post => post.author._id === id);
        setPosts(userPosts);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [id]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={avatar ? { uri: avatar } : require('../assets/avatar3.png')}
          style={styles.profileImage}
        />
        <View style={styles.profileDetails}>
          <Text style={styles.profileName}>{name}</Text>
          <Text style={styles.profileInfo}>{phoneNumber}</Text>
          <Text style={styles.profileInfo}>{email}</Text>
        </View>
      </View>

      <View style={styles.postsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#007bff" />
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <View key={post._id} style={styles.postCard}>
              <Text style={styles.postTitle}>{post.title}</Text>
              <Text style={styles.postDescription}>{post.description}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noPostsText}>No posts available.</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  profileContainer: {
    width: '90%',
    padding: 20,
    display:"flex",
    alignItems:"center",
    justifyContent:'space-around',
    flexDirection:"row",
    backgroundColor: '#8f98ff',
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  profileDetails: {
    alignItems: 'center',
  },
  profileName: {
    fontSize: 23,
    color: '#fff',
    fontWeight: 'bold',
  },
  profileInfo: {
    fontSize: 16,
    color: '#EDEDFC',
    marginTop: 5,
  },
  postsContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
  },
  postCard: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  postDescription: {
    fontSize: 14,
    color: '#333',
  },
  noPostsText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#6c757d',
    marginVertical: 20,
  },
  iconContainer: {
    paddingHorizontal: 16,
  },
});

export default Profile;
