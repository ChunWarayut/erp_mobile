
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
    Dimensions,
    StyleSheet,
    ScrollView,
    View,
    Image,
    Text,
    TouchableOpacity,
} from 'react-native';
import GLOBALS from '../GLOBALS';

class About extends Component { 
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
                    About
                </Text>
            </View>
        )
    }


} export { About };