
import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    StyleSheet,
    ListView,
    ScrollView,
    AsyncStorage,
    TouchableHighlight,
    Platform
} from 'react-native';
import { Header, Left, Body, Title, Right } from 'native-base'
import GLOBALS from '../GLOBALS';
import Swipeout from 'react-native-swipeout';
import Icon from 'react-native-vector-icons/FontAwesome';


class TestRequestView extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };

    }



    goStandardRequest() {
        this.props.navigation.navigate('StandardToolRequestView');
    }



    render() {

        return (

            <View>
                <Header style={{ backgroundColor: '#FFFFFF' }}>
                    <Left style={{ flex: 0.2 }}>
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

                    <Body
                        style={styles.headerBody}
                    >
                        <Title
                            style={styles.title}
                        >
                            สั่งสินค้าทดลอง
                        </Title>
                    </Body>
                    <Right
                        style={{ flex: 0.2 }}
                    >


                    </Right>

                </Header>
                <View style={styles.ViewBody}>

                    <View style={styles.BoxMenu}>
                        <TouchableOpacity
                            onPress={() => this.goStandardRequest()}
                        >
                            <View style={styles.BoxMenuItem}>

                                <Text style={styles.titleItem}>  สินค้ามาตรฐาน  </Text>

                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.BoxMenu}>
                        <TouchableOpacity

                        >
                            <View style={styles.BoxMenuItem}>

                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.BoxMenu}>
                        <TouchableOpacity

                        >
                            <View style={styles.BoxMenuItem}>

                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }


}
const styles = StyleSheet.create({
    headerBody: {
        alignItems: 'center',
        flex: 0.8
    },
    title: {
        color: '#000000',
        textAlign: 'center',
    },
    headerIcon: {

        width: 32,
        height: 32,
        fontSize: 32,
        justifyContent: 'center',
        alignItems: 'center'

    },
    ViewBody: {
        justifyContent: 'center',
        padding: 15,
        // backgroundColor: '#CBCED1',

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
    listBody: {
        flex: 1,
    },
    listItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'stretch',
        paddingTop: 8,
        paddingBottom: 8
    },
    listItemIcon: {
        margin: 4,
        width: 60,
        height: 60,
        borderRadius: 10,
        backgroundColor: "#efb",
        justifyContent: 'center',
        alignItems: 'center'

    },
    listItemContent: {
        flex: 1,
        alignItems: 'stretch',
        paddingRight: 4,
        paddingLeft: 5,
    },
    listItemContentRow: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'stretch'
    },
    listItemContentTitle: {
        flex: 1,
        //textAlign: 'left',
    },
    listItemContentDate: {
        flex: 1,
        textAlign: 'right',
    },
    listItemContentDetail: {
        flex: 1,
        color: "#aaa"
    },

    BoxMenu: {
        padding: 10,
        marginTop: 10

    },
    BoxMenuItem: {
        backgroundColor: 'white',
        ...Platform.select({
            ios: {
                shadowColor: '#dedede',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 2,
            },
            android: {
                elevation: 5,
            },
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'stretch',
        }),
        flex: 0.7,
        height: 90
    },
    ButtonItem: {
        marginTop: 10,
        height: 40
    },
    titleItem: {
        marginTop: 25,
        color: '#000000',
        textAlign: 'center',
        flexDirection: 'column',
        justifyContent: 'space-between',
        fontSize: 18,
        fontWeight: 'bold',
    }
})





export { TestRequestView };