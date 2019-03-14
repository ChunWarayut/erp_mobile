
import React, { Component } from 'react';
import { 
    Text,
    View,
    Image,
    TouchableOpacity,
    Button,
    AsyncStorage
} from 'react-native';
import { Header, Left, Body, Title, Right } from 'native-base'
import GLOBALS from '../GLOBALS';

class HomeScreen extends Component { 

    constructor(props) {
        super(props);
 
        this.state = {
        };

    }

    Logout(){
        AsyncStorage.setItem('Login_token', '');
        this.props.navigation.replace('Login');
    }
 

    render() {
                console.warn(this.props)
        return (

            <View>
                <Header style={{ backgroundColor: '#FFFFFF' }}>
                    <Left>
                        <TouchableOpacity
                            onPress={this.props.OnToggled}
                            style={{ width: 32, height: 32 }}
                        >
                            <Image
                                source={GLOBALS.image}
                                style={{ width: 32, height: 32 }}
                            />
                        </TouchableOpacity>
                    </Left>

                    <Body>
                        <Title>หน้าหลัก</Title>
                    </Body>
                    <Right>

                    </Right>

                </Header>
                <Text>

                    homescreen
               
                </Text>

                <Button
                   onPress={ this.Logout.bind(this)}
                   title="Learn More"
                   color="#841584"
                   accessibilityLabel="Learn more about this purple button"
                 />
    
            </View>
        )
    }


} export { HomeScreen };