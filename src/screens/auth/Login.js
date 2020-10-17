import AsyncStorage from '@react-native-community/async-storage';
import React, {Component} from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import RegisterSocial from '../../components/RegisterSocial';
import {styles} from '../../styles/styles';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      loading: false,
    };
  }

  gotoRegister() {
    this.props.navigation.navigate('Register');
  }

  gotoReset() {
    this.props.navigation.navigate('Reset');
  }

  gotoHome() {
    this.props.navigation.navigate('Dashboard');
  }

  login() {
    const {email, password} = this.state;

    this.setState({loading: true});
    //POST json
    var dataToSend = {
      email: email,
      password: password,
    };

    //making data to send on server
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    //POST request
    fetch('http://restful-api-laravel-7.herokuapp.com/api/login', {
      method: 'POST', //Request Type
      body: formBody, //post body
      headers: {
        //Header Defination
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then((response) => response.json())
      //If response is in json then in success
      .then((responseJson) => {
        // alert(JSON.stringify(responseJson));
        const {token} = responseJson;
        if (token) {
          alert('Anda berhasil login');
          AsyncStorage.setItem('token', token).then((value) => {
            this.gotoHome();
          });
          this.setState({loading: false});
        } else {
          alert('Email atau kata sandi salah');
          this.setState({loading: false});
        }
      })
      //If response is not in json then in error
      .catch((error) => {
        alert(JSON.stringify(error));
        console.error(error);
      });
  }

  render() {
    return (
      <ScrollView style={styles.screen}>
        <StatusBar backgroundColor="#181f3d" />
        <View style={styles.container}>
          <View style={styles.loginContainer}>
            <View>
              <Image
                style={styles.companyLogo}
                source={require('../..//assets/img/logo.png')}
              />
            </View>
            <Text style={styles.loginTitle}>Login to your account </Text>

            <View style={styles.groupContainer}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="#a0a1a2"
                  onChangeText={(email) => this.setState({email: email})}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Password</Text>
                <TextInput
                  style={styles.input}
                  secureTextEntry={true}
                  placeholder="Password"
                  placeholderTextColor="#a0a1a2"
                  onChangeText={(password) =>
                    this.setState({password: password})
                  }
                />
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={() => this.login()}>
                {this.state.loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={styles.buttonText}>Login</Text>
                )}
              </TouchableOpacity>
            </View>

            <View style={styles.createAccountContainer}>
              <Text
                style={styles.createAccountText}
                onPress={() => this.gotoRegister()}>
                Don't have an account?{' '}
              </Text>
              <Text
                style={styles.createAccountLink}
                onPress={() => this.props.navigation.navigate('Register')}>
                Sign up
              </Text>
            </View>

            <Text
              style={styles.createAccountLink}
              onPress={() => this.gotoReset()}>
              Forgot Password?
            </Text>
            <View style={styles.groupContainer}>
              <RegisterSocial />
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default Login;
