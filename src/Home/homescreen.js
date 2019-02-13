
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
    Dimensions,
    StyleSheet,
    ScrollView,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import { Header, Left, Button, Body, Title, Right, Content } from 'native-base'
import GLOBALS from '../GLOBALS';

class HomeScreen extends Component { 

    constructor(props) {
        super(props);
 
        this.state = {
        };

    }
 

    render() {

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
                        <Title>Header</Title>
                    </Body>
                    <Right>

                    </Right>

                </Header>
                <Text>
                    homescreen
                </Text>
            </View>
        )
    }


} export { HomeScreen };