import React, {Component} from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import RegisterSocial from '../../components/RegisterSocial';
import {styles} from '../../styles/styles';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      loading: false,
    };
  }

  gotoLogin() {
    this.props.navigation.navigate('Login');
  }

  register() {
    const {name, email, password, confirmPassword} = this.state;
    this.setState({loading: true});
    //POST json
    var dataToSend = {
      name: name,
      email: email,
      password: password,
      password_confirmation: confirmPassword,
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
    fetch('http://restful-api-laravel-7.herokuapp.com/api/register', {
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
          alert('Anda berhasil mendaftar');
          this.props.navigation.goBack();
          this.setState({loading: false});
        } else {
          this.setState({loading: false});

          const {email, password} = JSON.parse(responseJson);
          if (email) {
            alert(email);
          } else if (password) {
            alert(password);
          } else {
            alert(responseJson);
          }
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

        <TouchableOpacity
          style={styles.backIcon}
          onPress={() => this.gotoLogin()}>
          <Image
            source={require('../../assets/icon/arrow_back_24px_outlined.png')}
          />
        </TouchableOpacity>
        <View style={styles.container}>
          <View style={styles.loginContainer}>
            <Text style={styles.loginTitle}>Create an Account </Text>
            <View style={styles.groupContainer}>
              <View style={styles.inputGroup}>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Username</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Username"
                    placeholderTextColor="#a0a1a2"
                    onChangeText={(name) => this.setState({name: name})}
                  />
                </View>

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

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Confirm Password</Text>
                <TextInput
                  style={styles.input}
                  secureTextEntry={true}
                  placeholder="Confirm Password"
                  placeholderTextColor="#a0a1a2"
                  onChangeText={(confirmPassword) =>
                    this.setState({confirmPassword: confirmPassword})
                  }
                />
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={() => this.register()}>
                {this.state.loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={styles.buttonText}>Sign Up</Text>
                )}
              </TouchableOpacity>
            </View>

            <View style={styles.createAccountContainer}>
              <Text style={styles.createAccountText}>
                Already have an account?{' '}
              </Text>
              <Text
                style={styles.createAccountLink}
                onPress={() => this.gotoLogin()}>
                Login
              </Text>
            </View>

            <View style={styles.groupContainer}>
              <RegisterSocial />
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default Register;
