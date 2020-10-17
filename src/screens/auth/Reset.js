import React, {Component} from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {styles} from '../../styles/styles';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
    };
  }

  gotoLogin() {
    this.props.navigation.navigate('Login');
  }

  render() {
    return (
      <View style={styles.screen}>
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
            <Text style={styles.loginTitle}>Reset Password </Text>
            <View style={styles.groupContainer}>
              <View style={styles.inputGroup}>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Email</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#a0a1a2"
                    onChangeText={(email) => this.setState({email: email})}
                  />
                </View>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => alert('Not implemented yet')}>
                  <Text style={styles.buttonText}>Reset Password</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default Register;
