
import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { Header, Left, Body, Title, Right } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome'
import GLOBALS from '../GLOBALS';

export default class EditProfilePhon extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };

    }


    render() {
        console.warn(this.props)
        const { goBack } = this.props.navigation;
        return (

            <View>
                <Header style={{ backgroundColor: '#FFFFFF' }}>
                    <Left>
                        <TouchableOpacity
                            onPress={() => goBack()}
                            style={{ width: 32, height: 32 }}
                        >
                            {/* <Image
                                source={GLOBALS.IconBack}
                                style={styles.icon}
                            /> */}
                             <Icon name='angle-left' style={styles.icon} />

                        </TouchableOpacity>
                    </Left>

                    <Body>
                        <Title>เกี่ยวกับเรา</Title>
                    </Body>
                    <Right>

                    </Right>

                </Header>
                <Text>
                    EditProfilePhon
                </Text>
            </View>
        )
    }


}

const styles = StyleSheet.create({
    icon: { 
           width: 32, 
           height: 32
         }
})