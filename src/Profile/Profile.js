
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
    Dimensions,
    StyleSheet,
    ScrollView,
    View,
    Image,
    Text,
} from 'react-native'; 
import {ListItem } from'native-base'
import Icon from 'react-native-vector-icons/FontAwesome'

const window = Dimensions.get('window');



class Profile extends Component {
   
    render(){

        return(
        
            <View>
                <View style={styles.header}>
                    <Text>
                    Profile
                    </Text>
                </View>

                <View style={styles.body} >
                    <Text>
                         body
                    </Text>
                </View>
            </View>
        )
    }

    
}

const styles = StyleSheet.create({
    header:{
     
      height: window.height - (window.height*0.75) ,
      backgroundColor: "#03A9D1",
      padding: 5,
      
    },
    body:{
     
        height: window.height - (window.height*0.25) ,
        backgroundColor: "#ffffff",
        padding: 5,
        
      },
})
export { Profile };