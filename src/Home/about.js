
import React, { Component } from 'react';
import { 
    View,
    Image,
    Text,
    TouchableOpacity,
} from 'react-native';
import { Header, Left, Body, Title, Right } from 'native-base'
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
                        <Title>เกี่ยวกับเรา</Title>
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