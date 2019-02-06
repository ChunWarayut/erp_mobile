import React, { Component } from 'react';
import { View , Text } from 'react-native'
import { Button , Icon} from 'native-base';

class Menu extends Component {

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
            <Button transparent >
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
                
                <Text>Welcome sdasd</Text>
               
            </View> 
        )
    }
 }
 export default Menu