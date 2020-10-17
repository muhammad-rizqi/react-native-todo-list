import AsyncStorage from '@react-native-community/async-storage';
import React, {Component} from 'react';
import {ActivityIndicator, Image, StatusBar, Text, View} from 'react-native';
import {styles} from '../styles/styles';

class Splash extends Component {
  constructor() {
    super();
    this.state = {
      splash: true,
    };
  }
  gotoLogin() {
    this.props.navigation.navigate('Login');
  }

  gotoHome() {
    this.props.navigation.navigate('Dashboard');
  }

  componentDidMount() {
    setTimeout(() => {
      AsyncStorage.getItem('token').then((token) => {
        if (token !== null) {
          this.gotoHome();
        } else {
          this.gotoLogin();
        }
      });
    }, 2000);
  }

  render() {
    return (
      <View style={styles.screen}>
        <StatusBar backgroundColor="#181f3d" />
        <View style={styles.container}>
          <View>
            <Image
              style={styles.companyLogo}
              source={require('../assets/img/logo.png')}
            />
            <ActivityIndicator color="white" size="large" />
          </View>
        </View>
      </View>
    );
  }
}

export default Splash;
