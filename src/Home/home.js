import React, {Component} from 'react';
import {Platform, 
        StyleSheet, 
        Text, 
        View,
        Image,
        TouchableHighlight,
        Alert
        } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import GLOBALS from '../GLOBALS';
import {  Button , Left, Right, Body, Icon } from 'native-base';
export default class home_arno extends Component {
    static navigationOptions = {
        
        headerTitleStyle: {
            width: '90%',
            textAlign: 'center',
        },
        
        headerStyle:{
        //backgroundColor:'red',
        },
        headerTitle: 'HOME',
        headerLeft: (
            <Button transparent>
              <Icon name='menu' />
            </Button>
          ),
        headerRight: (
            <View>   

            </View> 
          ),
        };

    render( ){
        return (
            <View>
                

            </View> 
        )
    }
       
  
}