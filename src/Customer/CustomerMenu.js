
import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    StyleSheet,
    TouchableHighlight
} from 'react-native';
import { Header, Left, Body, Title, Right, Content } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome';
import GLOBALS from '../GLOBALS';

export default class CustomerMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            customer_id: ""
        };

    }
    componentWillMount() {
        this.onSetState()
    }

    onSetState() {
        this.setState({
            customer_id: this.props.navigation.state.params.data.toString()
        })
    }


    render() {
        console.warn(this.state.customer_id);
        const { goBack } = this.props.navigation;
        return (
            <Content style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
                <View>
                    <Header style={{ backgroundColor: '#FFFFFF' }}>
                        <Left style={{ flex: 0.2 }}>
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

                        <Body style={styles.headerBody}>
                            <Title
                                style={styles.title}
                            >
                                เกี่ยวกับเรา
                        </Title>
                        </Body>
                        <Right style={styles.headerRight}>

                        </Right>

                    </Header>
                    <View style={styles.ViewBody}>
                        <View style={styles.ContentRow}>
                            <View>
                                <TouchableHighlight
                                    onPress={() => this.props.navigation.navigate('CustomerPurchaseOrderList', { data: this.state.customer_id })}
                                >
                                    <View style={styles.ItemIcon}>
                                        <Icon name="rocket" color="#900" />
                                        <Text>
                                            PO
                                </Text>
                                    </View>

                                </TouchableHighlight>
                            </View>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('CustomerInvoiceList', { data: this.state.customer_id })}
                            >
                                <View style={styles.ItemIcon}>
                                    <Icon name="rocket" color="#900" />
                                    <Text>
                                        Invoice
                                </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Content>
        )
    }


}

const styles = StyleSheet.create({
    icon: {
        fontSize: 35,
        color: '#000000',
    },
    title: {
        color: '#000000',
        textAlign: 'center',
    },
    header: {
        paddingTop: 24,
        flex: 0.25,
        backgroundColor: "#ffffff",
        alignItems: 'center',

    },
    headerBody: {
        alignItems: 'center',
        flex: 0.8
    },
    headerRight: {
        alignItems: 'center',
        flex: 0.2
    },
    ViewBody: {
        flex: 1,
        padding: 15,

    },
    ContentRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    ItemIcon: {
        margin: 4,
        width: 70,
        height: 70,
        borderRadius: 10,
        backgroundColor: "#efb",
        justifyContent: 'center',
        alignItems: 'center'

    },
})