import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Header , Left ,Button, Body,Title,Right,Content} from'native-base'
import Icon from 'react-native-vector-icons/FontAwesome'
import SideMenu from 'react-native-side-menu';
import Menu from './Menu';
//import {About} from './about';
import {HomeScreen} from './HomeScreen';
import GLOBALS from '../GLOBALS';
const image = require('../../image/menu.png');



export default class Home extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      isOpen: false,
      selectedItem:<HomeScreen/>,
    };

  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
    GLOBALS.isOpen =!GLOBALS.isOpen
  }

  updateMenuState(isOpen) {
    this.setState({ isOpen });
    GLOBALS.isOpen =isOpen
  }

  onMenuItemSelected = item =>{
    this.setState({
      isOpen: false,
      selectedItem: item,
    });
    GLOBALS.isOpen = false
  }
  render() {
    const menu = <Menu onItemSelected={this.onMenuItemSelected }   />;
    const OpenMenu = this.state.isOpen || GLOBALS.isOpen
    return (
     

      <SideMenu
        menu={menu}
        isOpen={OpenMenu}
        onChange={isOpen => this.updateMenuState(isOpen)}
      > 
      
       <Header style={{ backgroundColor: '#FFFFFF'}}> 
        <Left>
            <TouchableOpacity
              onPress={this.toggle}
              style={{ width: 32, height: 32 }}
            >
             <Image
              source={image}
              style={{ width: 32, height: 32 }}
              />

            </TouchableOpacity>
        </Left> 

          <Body>
            <Title>Header</Title>
          </Body>
          
      </Header> 
      <Content style={{flex: 1 , backgroundColor: '#FFFFFF'}}>
        <View  style={styles.container}>
            {this.state.selectedItem}
        </View>
        </Content>
      </SideMenu>
     
    );
  }
}

{/* <TouchableOpacity
onPress={this.toggle}
style={styles.button}
>
<Image
  source={image}
  style={{ width: 32, height: 32 }}
/>
</TouchableOpacity> */}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 20,
    padding: 10,
  },
  caption: {
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  icon:{
    fontSize: 30, 
    color: '#FFFFFF', 
    flex: 0.3
  },
});

// export function toggle() {
  
// }
//module.exports = Home;