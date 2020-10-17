import React, {Component} from 'react';
import {ScrollView, Text, View, TouchableOpacity, Image} from 'react-native';
import {styles} from '../../styles/styles';
import AsyncStorage from '@react-native-community/async-storage';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
    };
  }

  showModal(visible) {
    this.setState({showModal: visible});
  }

  retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('todo');
      if (value !== null) {
        // We have data!!
        // console.log(value);
        const data = JSON.parse(value);
        this.setState({todos: data});
      }
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  };

  componentDidMount() {
    this.retrieveData();
  }

  render() {
    console.log('Render');
    return (
      <View style={styles.screen}>
        <ScrollView style={styles.contentWrapper}>
          <View style={styles.appBar}>
            <TouchableOpacity
              onPress={() => this.props.navigation.openDrawer()}>
              <Image
                source={require('../../assets/icon/list.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
          <View style={{paddingBottom: 64}}>
            <Text style={styles.title}>What's Up, Rizqi </Text>
            <Text style={styles.title}>Lets organize your task here </Text>
            <Text style={styles.text}>Write notes and save it to cloud</Text>
            <Text style={styles.text}>
              Organizing your task for better life
            </Text>
            <Image
              source={require('../../assets/img/checklist.png')}
              style={styles.imgBanner}
            />
          </View>
          <View>
            <Text style={styles.text}>CATEGORIES</Text>
            <ScrollView horizontal={true} style={styles.categoryContainer}>
              <TouchableOpacity
                style={styles.category}
                onPress={() => this.props.navigation.navigate('Todo1')}>
                <Text style={styles.text}>Temporary Storage</Text>
                <Text style={styles.categoryTitle}>Fast Notes</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.category}
                onPress={() => this.props.navigation.navigate('Todo2')}>
                <Text style={styles.text}>Internal Storage</Text>
                <Text style={styles.categoryTitle}>Mobile Notes</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.category}
                onPress={() => this.props.navigation.navigate('Todo3')}>
                <Text style={styles.text}>Cloud Storage</Text>
                <Text style={styles.categoryTitle}>Universal Notes</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    );
  }
}
