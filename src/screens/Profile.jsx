import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';

const Profile = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { name, email, phoneNumber, avatar, _id, role } = useSelector((state) => state.user);

  // Update navigation options and header style
  useEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: '#2D3553' },
      headerTintColor: '#fff',
      headerRight: () => (
        <TouchableOpacity onPress={handleLogout} style={styles.iconContainer}>
          <Ionicons name="log-out-outline" size={24} color="white" />
        </TouchableOpacity>
      ),
      headerTitle: 'Profile',
    });
  }, [navigation]);

  // Fetch posts only on mount and when role or _id changes
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://192.168.43.15:3000/posts/getpost');
        const data = await response.json();

        if (Array.isArray(data)) {
          const userPosts = role === 'admin'
            ? data.filter(post => post.author?._id === _id || post.savedBy?.includes(_id))
            : data.filter(post => post.savedBy?.includes(_id));
          setPosts(userPosts);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [_id, role]); // Dependencies: _id and role

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const renderPosts = (title) => (
    <View style={styles.postsContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : posts.length > 0 ? (
        <View style={styles.postsGrid}>
          {posts.map((post) => (
            <TouchableOpacity
              key={post._id}
              onPress={() => navigation.navigate('PostDetails', { post })}
              style={styles.postItem}
            >
              <Image source={{ uri: post.imageUrl }} style={styles.postImage} />
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <Text style={styles.noPostsText}>No posts available.</Text>
      )}
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.profileDetailsContainer}>
          <Image
            source={avatar ? { uri: avatar } : require('../assets/avatar3.png')}
            style={styles.profileImage}
          />
          <View style={styles.profileDetails}>
            <Text style={styles.profileName}>{name}</Text>
            <Text style={styles.profileEmail}>{email}</Text>
            <Text style={styles.profilePhone}>{phoneNumber}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {role === 'admin' && renderPosts('Created Posts')}
      {renderPosts('Saved Posts')}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  profileContainer: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  profileDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: '#fff',
    borderWidth: 2,
    marginRight: 20,
  },
  profileDetails: {
    flex: 1,
  },
  profileName: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
  },
  profileEmail: {
    fontSize: 16,
    color: '#aaa',
  },
  profilePhone: {
    fontSize: 16,
    color: '#aaa',
  },
  logoutButton: {
    backgroundColor: '#E02424',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
  postsContainer: {
    paddingHorizontal: 10,
    marginTop: 20,
  },
  postsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  postItem: {
    width: '48%',
    marginVertical: 5,
  },
  postImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  noPostsText: {
    color: '#888',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  iconContainer: {
    paddingHorizontal: 16,
  },
});

export default Profile;
