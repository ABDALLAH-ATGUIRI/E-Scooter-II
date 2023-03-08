import React, { useState } from 'react';
import { View, Text, Touchable, TouchableOpacity } from 'react-native';
import Background from '../components/Background';
import Btn from '../components/Btn';
import { darkGreen, white } from '../components/Constants';
import Field from '../components/Field';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState("");


  const isValid = () => {
    if (!email || !password) {
      return false;
    }

    return true;
  };

  const authenticate = async () => {
    try {
      const response = await fetch('http://192.168.8.64:4000/auth/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (data.token) {
        // Login successful
        return data.token;
      } else {
        // Login failed
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      throw new Error('Failed to authenticate');
    }
  };

  const handleLogin = async () => {

    if (isValid()) {
      try {
        const token = await authenticate();
        storeToken(token);
      } catch (error) {
        setErrMsg("password or email is not correct*")
      }

    } else {
      setErrMsg("password or email is empty*")
    }
  };

  const storeToken = (token) => {
    try {
      navigation.navigate("Home")
      localStorage.setItem('userToken', token);
    } catch (error) {
      throw new Error('Failed to store token');
    }
  };


  return (
    <Background>
      <View style={{ alignItems: 'center', width: 460, marginTop: 300 }}>

        <View
          style={{
            backgroundColor: white,
            height: 700,
            width: 460,
            borderTopLeftRadius: 150,
            paddingTop: 60,
            alignItems: 'center',
          }}>
          <Text style={{ fontSize: 40, color: darkGreen, fontWeight: 'bold' }}>
            Welcome Back
          </Text>
          <Text
            style={{
              color: 'grey',
              fontSize: 19,
              fontWeight: 'bold',
              marginBottom: 50,
            }}>
            Login to your account
          </Text>

          <Field
            onChangeText={setEmail}
            placeholder="Email"
            keyboardType={'email-address'}
            label="Email Address"
            icons="mail"
            value={email}
          />
          <Field
            onChangeText={setPassword}
            label="Password"
            icons="lock"
            value={password}
            isPassword={true}
            placeholder="Password"
            secureTextEntry={true}
          />

          <View
            style={{ alignItems: 'flex-end', width: '78%', paddingRight: 16, marginBottom: 50 }}>
            <Text style={{ color: darkGreen, fontWeight: 'bold', fontSize: 16 }}>
              Forgot Password ?
            </Text>
          </View>
          {
            // errMsg &&
            // <View
            //   style={{ alignItems: 'flex-center', width: '78%', marginBottom: 10 }}>
            //   <Text style={{ color: "red", fontWeight: 'bold', fontSize: 16 }}>
            //     {errMsg}*
            //   </Text>
            // </View>
          }
          <Btn textColor='white' bgColor={darkGreen} btnLabel="Login" Press={() => { handleLogin() }} />
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: "center" }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>Don't have an account ? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
              <Text style={{ color: darkGreen, fontWeight: 'bold', fontSize: 16 }}>Signup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Background >
  );
};

export default Login;
