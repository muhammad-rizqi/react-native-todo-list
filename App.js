import React, {Component} from 'react';
import {Text, View} from 'react-native';
import DrawerContent from './src/components/DrawerContent';
import AuthStack from './src/routes/AuthStack';
import Login from './src/screens/auth/Login';
import Register from './src/screens/auth/Register';
import Reset from './src/screens/auth/Reset';
import Splash from './src/screens/Splash';

class App extends Component {
  render() {
    return <AuthStack />;
  }
}

export default App;
