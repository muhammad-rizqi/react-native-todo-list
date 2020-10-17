import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from '../screens/Splash';
import Register from '../screens/auth/Register';
import Reset from '../screens/auth/Reset';
import Login from '../screens/auth/Login';
import DrawerNav from './DrawerNav';

const Snack = createStackNavigator();

const AuthStack = () => {
  return (
    <NavigationContainer>
      <Snack.Navigator headerMode={false}>
        <Snack.Screen name="Splash" component={Splash} />
        <Snack.Screen name="Login" component={Login} />
        <Snack.Screen name="Register" component={Register} />
        <Snack.Screen name="Reset" component={Reset} />
        <Snack.Screen name="Dashboard" component={DrawerNav} />
      </Snack.Navigator>
    </NavigationContainer>
  );
};

export default AuthStack;
