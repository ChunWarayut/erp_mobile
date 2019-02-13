
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';
import { Header, Left, Button, Body, Title, Right, Content } from 'native-base'
import Swipeout from 'react-native-swipeout';
import GLOBALS from '../GLOBALS';

const data = [{
    purchase_request_id: '1',
    purchase_request_code: "PR1901001-TH",
    purchase_request_date: "2019-02-07",
    img_status: "https://banner2.kisspng.com/20180421/uew/kisspng-computer-icons-check-mark-royalty-free-true-or-false-5adb4ad84b3f16.6675153715243209843082.jpg",
}, {
    purchase_request_id: '2',
    purchase_request_code: "PR1901002-TH",
    purchase_request_date: "2019-02-09",
    img_status: "https://banner2.kisspng.com/20180421/uew/kisspng-computer-icons-check-mark-royalty-free-true-or-false-5adb4ad84b3f16.6675153715243209843082.jpg",
}, {
    purchase_request_id: '3',
    purchase_request_code: "PR1901003-TH",
    purchase_request_date: "2019-02-11",
    img_status: "https://banner2.kisspng.com/20180421/uew/kisspng-computer-icons-check-mark-royalty-free-true-or-false-5adb4ad84b3f16.6675153715243209843082.jpg",

}];

class PurchaseRequestView extends Component { 

    constructor(props) {
        super(props);
 
        this.state = {
        };

    }

    toggle() {
        this.isOpenGlobals = !this.isOpenGlobals
    }

    render() {
        var swipeoutBtns = [
            {
                text: 'Button'
            }
        ]

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

                <Swipeout right={swipeoutBtns}>
                    <View>
                        <Text>Swipe me left</Text>
                    </View>
                </Swipeout>

            </View>

        )
    }


} export { PurchaseRequestView };