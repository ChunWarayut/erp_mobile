import React, { Component } from 'react';
import {
  StyleSheet, 
  View, 
} from 'react-native';
import {Content } from 'native-base' 
import SideMenu from 'react-native-side-menu';
import Menu from './Menu';
import { HomeScreen } from './HomeScreen'; 



export default class Home extends Component { 

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen : false,
      selectedItem: <HomeScreen OnToggled={this.toggle}/>,
    };

  }

  toggle() {
    this.setState({
      isOpen : !this.state.isOpen 
    })
  }


  updateMenuState(isOpen) {
    this.setState({
      isOpen : isOpen 
    })
  }

  onMenuItemSelected = item => {
    this.setState({
      selectedItem: item,
      isOpen : false,
    }); 
  }
  render() {
    const menu = <Menu onItemSelected={this.onMenuItemSelected} OnToggle={this.toggle} />;
return (


  <SideMenu
    menu={menu}
    isOpen={this.state.isOpen}
    onChange={isOpen => this.updateMenuState(isOpen)}
  >
    <Content style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <View style={styles.container}>
        {this.state.selectedItem}
      </View>
    </Content>
  </SideMenu>

);
  }
}


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
  icon: {
    fontSize: 30,
    color: '#FFFFFF',
    flex: 0.3
  },
});

// export function toggle() {

// }
//module.exports = Home;