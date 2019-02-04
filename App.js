/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import ChoiceLogin from './src/login/ChoiceLogin';
import SplashScreen from './src/SplashScreen';
import login_arno from './src/login/login_arno';
import home from './src/Home/home';
import{createStackNavigator , 
        createAppContainer ,
      } 
      from 'react-navigation';
const Navigation = createStackNavigator(
  {
    Splash:{
      screen: SplashScreen ,
      navigationOptions : {
        header: null,
        tabBarLabel: 'Splash'
      }
    },
    Login: {
      screen: ChoiceLogin ,
      navigationOptions : {
        header: null,
        tabBarLabel: 'Login'
      }, 
    },
    Login_Arno: {
      screen: login_arno , 
      navigationOptions : {
        header: null,
        tabBarLabel: 'Arno'
      }
    },
    Home_Arno: {
      screen: home , 
      // navigationOptions : {
      //   title: 'HOME'
      // }
  }

    
  },
  { 
    initialRouteName: 'Home_Arno'  
  }
 );

const AppContainer = createAppContainer(Navigation);

export default class App extends Component{
  render(){
    return < AppContainer/>;
  }
}
  


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
});
