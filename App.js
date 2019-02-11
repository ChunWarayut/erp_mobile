/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import ChoiceLogin from './src/Login/ChoiceLogin';
import SplashScreen from './src/SplashScreen';
import LoginArno from './src/Login/LoginArno';
import Home from './src/Home/Home';
// import search_product from './src/Search_Product/search_product';

import {
  createStackNavigator,
  createAppContainer,
  DrawerNavigator,
  DrawerItems, SafeAreaView,createDrawerNavigator,ScrollView
}
  from 'react-navigation';

const AppNavigation = createStackNavigator(
  {
    Splash: {
      screen: SplashScreen,
      navigationOptions: {
        header: null,
        tabBarLabel: 'Splash'
      }
    },
    Login: {
      screen: ChoiceLogin,
      navigationOptions: {
        header: null,
        tabBarLabel: 'Login'
      },
    },
    LoginArno: {
      screen: LoginArno,
      navigationOptions: {
        header: null,
        tabBarLabel: 'Arno'
      }
    },
    HomeArno: {
      screen: Home,
      navigationOptions : { 
      header: null,
       }
    },
   
  },
  {
    initialRouteName: 'HomeArno'
  }
);

const AppContainer = createAppContainer(AppNavigation);

export default class App extends Component {
  render() {
    return < AppContainer />;
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});