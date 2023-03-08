import React, { useState } from 'react';
import { View, Text, Touchable, TouchableOpacity } from 'react-native';
import Background from '../components/Background';
import Btn from '../components/Btn';
import { darkGreen, white } from '../components/Constants';
import Field from '../components/Field';


const Signup = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [errMsg, setErrMsg] = useState('');


  const isValid = () => {
    const val = [firstName, lastName, email, phone, password].some((v) => { !v })
    if (val) {
      return false;
    }
    return true;
  };

  const authenticate = async () => {
    try {
      const response = await fetch('http://192.168.8.64:4000/auth/signup', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ firstName, lastName, email, phone, password }),
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

  const handleSubmit = async () => {

    if (isValid()) {
      try {
        const token = await authenticate();

        storeToken(token);

      } catch (error) {
        console.error(error);
        setErrMsg("password or email is not correct*")
      }

    } else {
      setErrMsg("password or email is empty*")
    }
  };

  const storeToken = (token) => {
    try {
      navigation.navigate("Login")
      localStorage.setItem('userToken', token);
    } catch (error) {
      console.error(error);
      throw new Error('Failed to store token');
    }
  };
  return (
    <Background>
      <View style={{ alignItems: 'center', width: 460, marginTop: 200 }}>

        <View
          style={{
            backgroundColor: white,
            height: 750,
            width: 460,
            borderTopLeftRadius: 150,
            paddingTop: 50,
            alignItems: 'center',
          }}>
          <Text style={{ fontSize: 40, color: darkGreen, fontWeight: 'bold' }}>
            Welcome
          </Text>
          <Text
            style={{
              color: 'grey',
              fontSize: 19,
              fontWeight: 'bold',
              marginBottom: 20,
            }}>
            Create a new account
          </Text>

          <Field
            label="First Name"
            icons="person"
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
          />
          <Field
            label="Last Name"
            icons="person"
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}

          />
          <Field
            label="Email Address"
            icons="mail"
            placeholder="Email Address"
            value={email}
            keyboardType="email-address"
            onChangeText={setEmail}

          />
          <Field
            placeholder="Contact Number"
            keyboardType={'number'}
            label="Contact Number"
            icons="phone"
            value={phone}
            onChangeText={setPhone}

          />
          <Field
            label="Password"
            icons="lock"
            placeholder="Password"
            value={password}
            secureTextEntry={hidePassword}
            isPassword={true}
            hidePassword={hidePassword}
            setHidePassword={setHidePassword}
            onChangeText={setPassword}

          />
          <Field
            label="Confirm Password"
            icons="lock"
            placeholder="Confirm Password"
            value={confirmPassword}
            secureTextEntry={hidePassword}
            isPassword={true}
            hidePassword={hidePassword}
            setHidePassword={setHidePassword}
            onChangeText={setConfirmPassword}

          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '78%',
              paddingRight: 16,
              marginVertical: 20
            }}>
            <Text style={{ color: 'grey', fontSize: 16 }}>
              By signing in, you agree to our{' '}
            </Text>
            <Text style={{ color: darkGreen, fontWeight: 'bold', fontSize: 16 }}>
              Terms & Conditions
            </Text>
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: "center",
              width: '78%',
              paddingRight: 16,
              marginBottom: 10
            }}>
            <Text style={{ color: 'grey', fontSize: 16 }}>
              and {" "}
            </Text>
            <Text style={{ color: darkGreen, fontWeight: 'bold', fontSize: 16 }}>
              Privacy Policy
            </Text>
          </View>
          <Btn
            textColor="white"
            bgColor={darkGreen}
            btnLabel="Signup"
            Press={() => {
              handleSubmit()
            }}
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
              Already have an account ?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}>
              <Text
                style={{ color: darkGreen, fontWeight: 'bold', fontSize: 16 }}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Background>
  );
};

export default Signup;
