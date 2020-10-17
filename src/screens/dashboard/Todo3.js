import AsyncStorage from '@react-native-community/async-storage';
import React, {Component} from 'react';
import {
  ActivityIndicator,
  Image,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  Button,
  TextInput,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import FloatingActionBar from '../../components/FloatingActionBar';

import {styles} from '../../styles/styles';
class Todo3 extends Component {
  constructor() {
    super();
    this.state = {
      token: '',
      todos: [],
      loading: true,
      photo: '',
      task: '',
      desc: '',
      modal: false,
      addLoading: false,
    };
  }

  addTodo() {
    const {task, desc, photo, token} = this.state;
    this.setAddLoading(true);
    if (task !== '' && desc !== '' && photo !== '') {
      const todo = {
        task: task,
        desc: desc,
        is_done: 0,
      };
      fetch('http://restful-api-laravel-7.herokuapp.com/api/todo', {
        method: 'POST',
        body: this.createFormData(photo, todo),
        headers: {
          Authorization: `Bearer ${this.state.token}`,
        },
      })
        .then((response) => response.json())
        .then((response) => {
          if (response) console.log('upload succes', response);
          alert('Data ditambahkan!');
          this.getTodos();
          this.showModal(false);
          this.setAddLoading(false);
        })
        .catch((error) => {
          console.log('upload error', error);
          alert('Gagal ditambahkan');
          this.setAddLoading(false);
        });
    } else {
      alert('Isi dengan benar');
    }
  }

  handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.uri) {
        this.setState({photo: response});
      }
    });
  };

  setLoading(loading) {
    this.setState({loading: loading});
  }

  createFormData = (photo, body) => {
    const data = new FormData();

    data.append('image', {
      name: photo.fileName,
      type: photo.type,
      uri:
        Platform.OS === 'android'
          ? photo.uri
          : photo.uri.replace('file://', ''),
    });

    Object.keys(body).forEach((key) => {
      data.append(key, body[key]);
    });

    return data;
  };

  getToken() {
    AsyncStorage.getItem('token')
      .then((token) => {
        if (token !== null) {
          this.setState({token: token});
        } else {
          this.logOut();
        }
      })
      .then(() => this.getTodos());
    //setelah token muncul maka ambil data todo
  }

  getTodos() {
    this.setLoading(true);
    console.log(this.state.token);
    fetch('http://restful-api-laravel-7.herokuapp.com/api/todo/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        const {status} = responseJson;
        if (status) {
          alert(status);
          this.logOut();
        } else {
          this.setState({todos: responseJson});
          console.log(responseJson);
          this.setLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // checkTodo(id) {
  //   this.setLoading(true);

  //   //mengambil data dari state intuk difilter berdasarkan id
  //   const todo = this.state.todos.find((todo) => todo.id == id);

  //   //ganti kondisi todo
  //   todo.is_done = !todo.is_done;

  //   console.log(todo);

  //   //update todo berdasarkan data yg di update
  //   fetch(`http://restful-api-laravel-7.herokuapp.com/api/todo/${id}`, {
  //     method: 'PUT',
  //     body: JSON.stringify(todo),
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${this.state.token}`,
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((json) => {
  //       console.log(json);
  //       this.getTodos();
  //     });
  // }

  deleteTodo(id) {
    this.setLoading(true);
    fetch(`http://restful-api-laravel-7.herokuapp.com/api/todo/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        const {status} = json;
        if (status == 'success') {
          this.getTodos();
        } else {
          alert('Gagal menghapus');
        }
      });
  }
  componentDidMount() {
    this.getToken();
  }

  logOut() {
    AsyncStorage.clear();
    this.props.navigation.navigate('Login');
  }

  showModal(visible) {
    this.setState({modal: visible});
  }

  setAddLoading(loading) {
    this.setState({addLoading: loading});
  }

  render() {
    return (
      <View style={styles.screen}>
        <Modal visible={this.state.modal} transparent={true} style={{flex: 1}}>
          <View style={styles.modal}>
            <TouchableOpacity style={styles.closeModal}>
              <Text
                style={styles.buttonText}
                onPress={() => this.showModal(false)}>
                x
              </Text>
            </TouchableOpacity>
            <Text style={styles.title}> Add Todo Here </Text>
            <TouchableOpacity
              style={{justifyContent: 'center', alignItems: 'center'}}
              onPress={() => this.handleChoosePhoto()}>
              {this.state.photo !== '' ? (
                <Image
                  source={{uri: this.state.photo.uri}}
                  style={{width: 100, height: 100}}
                />
              ) : (
                <View style={styles.imagePlacholder}>
                  <Text>Upload Image</Text>
                </View>
              )}
            </TouchableOpacity>

            <TextInput
              style={[styles.input, styles.marginSmallV]}
              placeholderTextColor="#aaaaaa"
              placeholder="Task todo"
              onChangeText={(task) => this.setState({task: task})}
            />
            <TextInput
              style={[styles.input, styles.marginSmallV]}
              placeholderTextColor="#aaaaaa"
              placeholder="Description here"
              onChangeText={(desc) => this.setState({desc: desc})}
            />
            <TouchableOpacity
              style={[styles.button, styles.marginSmallV]}
              onPress={() => this.addTodo()}>
              {this.state.addLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.buttonText}>Add Todo</Text>
              )}
            </TouchableOpacity>
          </View>
        </Modal>
        <ScrollView style={styles.contentWrapper}>
          <Text style={styles.title}>What's Up, Rizqi </Text>
          <View>
            <View style={styles.todoList}>
              <Text style={styles.text}>TODAY TASKS</Text>
              <View>
                {this.state.loading ? (
                  <ActivityIndicator color="red" />
                ) : this.state.todos.length === 0 ? (
                  <Text>Kosong</Text>
                ) : (
                  this.state.todos.map((todo, index) => (
                    <View
                      key={todo.id}
                      style={[styles.todo, {alignItems: 'flex-start'}]}>
                      <Image
                        source={{
                          uri: `http://restful-api-laravel-7.herokuapp.com/img/${todo.image}`,
                        }}
                        style={{width: 64, height: 64, borderRadius: 10}}
                      />
                      <View style={{marginHorizontal: 8, flex: 1}}>
                        <Text style={styles.categoryTitle}>{todo.task}</Text>
                        <Text style={styles.text}>{todo.desc}</Text>
                      </View>

                      <TouchableOpacity
                        onPress={() => this.deleteTodo(todo.id)}>
                        <Image
                          source={require('../../assets/icon/rubbish-bin-delete-button.png')}
                          style={styles.todoIcon}
                        />
                      </TouchableOpacity>
                    </View>
                  ))
                )}
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={styles.floatActionBar}>
          <FloatingActionBar onPress={() => this.showModal(true)} />
        </View>
      </View>
    );
  }
}
export default Todo3;
