import React, { useEffect, useState } from 'react'
import { ScrollView, Text, View, TextInput, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import styles from "./style";
import Ionicons from 'react-native-vector-icons/Ionicons'

const Login = () => {
  const [username, setUsername] = React.useState()
  const [password, setPassword] = React.useState()
  const [masked, setMasked] = React.useState(true)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [token, setToken] = useState<string>('')

  useEffect(() => {
    setIsLoading(false)
  }, [])

  const onSubmit = async () => {
    try {

      if (notNull(username) && notNull(password)) {
        setError(false)
        setErrorMessage('')
        console.log('username ---', username)
        console.log('password ---', password)

        let data = {
          username, password
        }

        console.log(data);

        setIsLoading(true)

        let result: any = await login(data)

        console.log('Login -----', result)

        setToken(result.token)

        setIsLoading(false)

      } else {
        setError(true)
        setErrorMessage('Please fill both fields.')
      }
    } catch (e) {
      setIsLoading(false)
      console.log('onSubmit ---', e)
    }
  }

  const login = async (data: any) => {
    return new Promise(async (resolve, reject) => {
      try {
        let fetchParameter = {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        }
        let serverResponse = await fetch('http://192.168.1.66:3000/v1/auth/login', fetchParameter);
        console.log(serverResponse)
        let response = await serverResponse.json();
        resolve(response);
      }
      catch (error) {
        console.log(error)
        reject(error);
      }
    })
  }

  function notNull(val: any) {
    return (val !== null && val !== undefined && val !== "NULL" && val !== "null" && val !== "undefined" && val !== "UNDEFINED" && (val + "").trim() !== "")
  }

  return <ScrollView style={{
    flex: 1,
    flexDirection: "column",
  }} contentContainerStyle={{
    flexGrow: 1, alignItems: 'center', justifyContent: 'center'
  }} showsVerticalScrollIndicator={false}>
    <View style={{
      padding: 10
    }}>
      <Image source={require('../../assets/logo.png')}
        style={{
          height: 100,
          width: 100
        }}
      />
    </View>
    <View style={styles.phoneTextInputContainer}>
      <TextInput
        style={styles.phoneTextInput}
        maxLength={10}
        value={username}
        onChangeText={(val: any) => {
          setUsername(val)
        }}
        keyboardType='default'
        placeholder="Enter Username"
      >
      </TextInput>
    </View>

    <View style={styles.textInputAndButtonContainer}>
      <TextInput
        style={styles.passwordInput}
        maxLength={10}
        value={password}
        onChangeText={(val: any) => {
          setPassword(val)
        }}
        secureTextEntry={masked}
        placeholder="Enter Password"
      />
      <TouchableOpacity style={styles.eyeIcon}
        onPress={() => {
          setMasked(!masked);
        }}
      >
        <Ionicons
          name={masked ? "eye-off" : "eye"}
          size={24}
          color={'#ccc'}
        />
      </TouchableOpacity>
    </View>

    <View style={styles.errorContainer}>
      {error ?
        <Text style={styles.errorText}>{errorMessage}</Text>
        : null
      }
    </View>

    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.buttonPill} onPress={onSubmit}>
        {isLoading ?
          <ActivityIndicator size={20} color={'white'} />
          :
          <Text style={styles.buttonText}>
            Login
          </Text>
        }
      </TouchableOpacity>
    </View>

    {notNull(token) ?
      <View style={{ width: '100%', backgroundColor: 'lightgrey', padding: 20, marginTop: 20 }}>
        <Text style={{ color: 'black', fontSize: 10 }}>
          {token}
        </Text>
      </View>
      : null
    }

  </ScrollView>

}

export default Login

