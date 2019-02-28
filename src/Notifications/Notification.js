import React, { Component } from 'react';

import {
    View,
    StyleSheet,
    Alert,
    TouchableOpacity,
    Text,
    Image,
    TouchableHighlight,
    ListView,
    ScrollView,
    Button,
    Platform,






} from 'react-native';
import { Container, Content, Picker, Form, Header, Left, Body, Title, Right, Spinner } from 'native-base';

// import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';


import GLOBALS from '../GLOBALS';

notifications = [];
export default class Notification extends Component {

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            data_source: ds.cloneWithRows(notifications),
            user_id: '25',
            notifications: [],
        };

    }

    componentWillMount() {

        this.fetchData()

    }

    async fetchData() {

        fetch(GLOBALS.SERVICE_URL + '/getNotification.php', {

            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: this.state.user_id,
            })

        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.result == true) {
                    this.setState({
                        notifications: responseJson.notifications,
                        data_source: this.state.data_source.cloneWithRows(responseJson.notifications),

                    })
                }
                console.warn(responseJson);
            })
            .catch((error) => {
                console.error(error);
            });

    }

    renderRow(rowData, sectionID, rowID, higlightRow) {

        return (
            <View style={styles.listItem}>
                <View style={{
                    flex: 1,
                    width: 32
                }}>
                    <Text style={{
                        flex: 1,
                        textAlign: 'center'
                    }}> {parseInt(rowID) + 1}. </Text>
                </View>

                <View style={{
                    flex: 8,
                }}>
                    <View style={styles.listItemContentRow}>
                        <Text style={styles.listItemContentTitle}> {rowData.notification_detail} </Text>
                    </View>
                </View>

                <View style={{
                    flex: 1,
                    width: 64
                }}
                >
                    <Text style={{
                        flex: 1,
                        textAlign: 'right',
                        paddingRight: 8,

                    }}> {rowData.notification_seen} </Text>
                </View>

            </View>

        )
    }


    render() {
        // const { goBack } = this.props.navigation;
        // console.warn(this.props.navigation.state.params.data.toString());
        return (
            <Container >
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

                    <Body>
                        <Title style={styles.title}>การแจ้งแตือน</Title>
                    </Body>
                    <Right>

                    </Right>

                </Header>


                {/* <View style={{ height: 240, }}>

                    <View style={styles.ContentRow}>
                        <View style={{ flex: 1 }}>
                            <View style={styles.ContentRow}>
                                <Text style={styles.ContentItemTitle}> รหัสสินค้า </Text>
                            </View>
                            <View style={styles.ContentRow}>
                                <Text style={styles.ContentItemDetail}>
                                    {this.state.product_detail.product_code}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.ContentRow}>
                        <View style={{ flex: 1 }}>
                            <View style={styles.ContentRow}>
                                <Text style={styles.ContentItemTitle}> ชื่อสินค้า </Text>
                            </View>
                            <View style={styles.ContentRow}>
                                <Text style={styles.ContentItemDetail}>
                                    {this.state.product_detail.product_name}
                                </Text>
                            </View>
                        </View>
                    </View>



                    <View style={styles.ContentRow}>
                        <View style={{ flex: 1 }}>
                            <View style={styles.ContentRow}>
                                <Text style={styles.ContentItemTitle}> ลักษณะ </Text>
                            </View>
                            <View style={styles.ContentRow}>
                                <Text style={styles.ContentItemDetail}>
                                    {this.state.product_detail.product_category_name}
                                </Text>
                            </View>
                        </View>

                        <View style={{ flex: 1 }}>
                            <View style={styles.ContentRow}>
                                <Text style={styles.ContentItemTitle}> กลุ่มสินค้า </Text>
                            </View>
                            <View style={styles.ContentRow}>
                                <Text style={styles.ContentItemDetail}>
                                    {this.state.product_detail.product_group}
                                </Text>
                            </View>
                        </View>
                    </View>


                    <View style={styles.ContentRow}>
                        <View style={{ flex: 1 }}>
                            <View style={styles.ContentRow}>
                                <Text style={styles.ContentItemTitle}> ประเภท </Text>
                            </View>
                            <View style={styles.ContentRow}>
                                <Text style={styles.ContentItemDetail}>
                                    {this.state.product_detail.product_type}
                                </Text>
                            </View>
                        </View>

                        <View style={{ flex: 1 }}>
                            <View style={styles.ContentRow}>
                                <Text style={styles.ContentItemTitle}> หน่วยสินค้า </Text>
                            </View>
                            <View style={styles.ContentRow}>
                                <Text style={styles.ContentItemDetail}>
                                    {this.state.product_detail.product_unit}
                                </Text>
                            </View>
                        </View>
                    </View>


                    <View style={styles.ContentRow}>
                        <View style={{ flex: 1 }}>
                            <View style={styles.ContentRow}>
                                <Text style={styles.ContentItemTitle}> รายละเอียดสินค้า </Text>
                            </View>
                            <View style={styles.ContentRow}>
                                <Text style={styles.ContentItemDetail}>
                                    {this.state.product_detail.product_description}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View> */}
                <View>
                    <ScrollView>
                        <ListView
                            style={styles.listBody}
                            dataSource={this.state.data_source}
                            renderRow={this.renderRow.bind(this)} />
                    </ScrollView>
                </View>
                {/* <View>
                    <Image
                        style={{ width: 430, height: 300 }}
                        source={require('../../image/default.png')}
                    />
                </View> */}

            </Container >
        );
    }
}
export { Notification };

const styles = StyleSheet.create({
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
    listItemIcon: {
        margin: 4,
        width: 32,
        height: 32,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center'

    },
    listItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'stretch',
        paddingTop: 8,
        paddingBottom: 8
    },
    listItemContentRow: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'stretch'
    },
    listItemContent: {
        flex: 1,
        alignItems: 'stretch',
        paddingRight: 4,
    },
    ContentRow: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'stretch'
    },
    listItemContentTitle: {
        flex: 1,
        textAlign: 'left',
    },
    listItemContentDate: {
        flex: 1,
        textAlign: 'right',
    },
    listItemContentDetail: {
        flex: 1,
        color: "#aaa"
    },

})