/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import ChoiceLogin from './src/login/ChoiceLogin';
import SplashScreen from './src/SplashScreen';
import login_arno from './src/login/login_arno';
import home from './src/Home/home';
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
    Login_Arno: {
      screen: login_arno,
      navigationOptions: {
        header: null,
        tabBarLabel: 'Arno'
      }
    },
    Home_Arno: {
      screen: home,
      navigationOptions : { 
      header: null,
      //   title: 'HOME'
       }
    },
    // Search_Product: {
    //   screen: search_product , 
    //   navigationOptions : {

    //  
    //   }
    //}



  },
  {
    initialRouteName: 'Home_Arno'
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