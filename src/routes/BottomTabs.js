import React from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/dashboard/Home';
import Todo1 from '../screens/dashboard/Todo1';
import Todo2 from '../screens/dashboard/Todo2';
import Profile from '../screens/dashboard/Profile';
import Todo3 from '../screens/dashboard/Todo3';

const TabBottom = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <TabBottom.Navigator
      tabBarOptions={{
        showLabel: false,
        activeTintColor: '#e91e63',
        inactiveTintColor: '#aaa',
        inactiveBackgroundColor: '#080f2d',
        activeBackgroundColor: '#181f3d',
      }}>
      <TabBottom.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('../assets/icon/home-button.png')}
              style={{tintColor: color, width: 20, height: 20}}
            />
          ),
        }}
      />
      <TabBottom.Screen
        name="Todo1"
        component={Todo1}
        options={{
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('../assets/icon/check-box.png')}
              style={{tintColor: color, width: 20, height: 20}}
            />
          ),
        }}
      />
      <TabBottom.Screen
        name="Todo2"
        component={Todo2}
        options={{
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('../assets/icon/underline-button.png')}
              style={{tintColor: color, width: 20, height: 20}}
            />
          ),
        }}
      />
      <TabBottom.Screen
        name="Todo3"
        component={Todo3}
        options={{
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('../assets/icon/list.png')}
              style={{tintColor: color, width: 20, height: 20}}
            />
          ),
        }}
      />
      <TabBottom.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('../assets/icon/round-account-button-with-user-inside.png')}
              style={{tintColor: color, width: 20, height: 20}}
            />
          ),
        }}
      />
    </TabBottom.Navigator>
  );
};

export default BottomTabs;
