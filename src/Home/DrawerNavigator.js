import { Icon } from "react-native-elements";
import { Container, Content, Header, Body } from 'native-base';
import { AppRegistry, Dimensions } from 'react-native';
import React, { Component } from 'react';
import {
    createStackNavigator,
    createAppContainer,
    createDrawerNavigator,
    DrawerItem,
    DrawerNavigator
}
    from 'react-navigation';

import home from './home';
import menu from './menu';


const DrawerNav = createDrawerNavigator({
    Home: home ,
    Menu: menu 

    }, {
        initialRouteName: 'Home'
    }
 ) 


export default DrawerNav;