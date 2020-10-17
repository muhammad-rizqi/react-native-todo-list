import React, {Component} from 'react';
import {Text, View} from 'react-native';

class Reset extends Component {
  gotoLogin() {
    this.props.navigation.navigate('Login');
  }

  render() {
    return (
      <View>
        <Text onPress={() => this.gotoLogin()}>Reset</Text>
      </View>
    );
  }
}

export default Reset;
