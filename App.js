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
import SearchProduct from './src/SearchProduct/SearchProduct';
import ProductList from './src/SearchProduct/ProductList'
import EditPhon from './src/Profile/EditProfilePhon'
import PurchaseRequestDetail from './src/PurchaseRequest/PurchaseRequestDetail';
import EditEmail from './src/Profile/EditEmail'
import EditPassword from './src/Profile/EditPassword'
import EditSignature from './src/Profile/EditSignature'
import CustomerMenu from './src/Customer/CustomerMenu'

// import search_product from './src/Search_Product/search_product';

import {
  createStackNavigator,
  createAppContainer,
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
    EditProfilePhon: {
      screen: EditPhon,
      navigationOptions : { 
      header: null,
       }
    }, 
    PurchaseRequestDetail: {
      screen: PurchaseRequestDetail,
      navigationOptions : { 
      header: null,
       }
    },


    ProductList: {
      screen: ProductList,
      navigationOptions : { 
      header: null,
       }
    },
    EditEmail: {
      screen: EditEmail,
      navigationOptions: {
        header: null,
      }
    },
    EditPassword: {
      screen: EditPassword,
      navigationOptions: {
        header: null,
      }
    },
    EditSignature: {
      screen: EditSignature,
      navigationOptions: {
        header: null,
      }
    },

    CustomerMenu: {
      screen: CustomerMenu,
      navigationOptions: {
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