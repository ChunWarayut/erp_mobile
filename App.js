/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import { Button, Icon } from 'native-base';
import ChoiceLogin from './src/login/ChoiceLogin';
import SplashScreen from './src/SplashScreen';
import login_arno from './src/login/login_arno';
import home from './src/Home/home';
import menu from './src/Home/menu';
import DrawerNav from './src/Home/DrawerNavigator'
import {
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator,
  DrawerItem,
  DrawerNavigator
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
      screen: DrawerNav,

      navigationOptions:  ({ navigation }) => ({
        header: null,
      })
      // navigationOptions:  {
      //   headerTitleStyle: {
      //     width: '90%',
      //     textAlign: 'center',
      // },
      // headerTitle: 'HOME',
      // headerLeft: (
      //     <Button transparent onPress={() => this.props.navigation.dispatch(DrawerActions.toggleDrawer())} >
      //       <Icon name='menu' />
      //     </Button>
      //   ),
      // headerRight: (
      //     <View>   

      //     </View> 
      //   ),
      // }
    }
  },
  {
    initialRouteName: 'Home_Arno'
  });


const AppContainer = createAppContainer(AppNavigation);

export default class App extends Component {


  constructor(props) {
    super(props);
    this.state = {};
  }



  render() {
    return < AppContainer />;
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
