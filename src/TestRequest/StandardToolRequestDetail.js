
import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ListView,
    ScrollView,
    Platform,
    Button,
    Alert
} from 'react-native';
import { Header, Left, Body, Title, Right, Container } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome';
import GLOBALS from '../GLOBALS';

dataSTR_lists = [];
export default class StandardToolRequestDetail extends Component {


    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        const itemSTR = this.props.navigation.getParam('request_standard_id', '0')

        this.state = {
            dataProduct: itemId,
            dataSTR: itemSTR,
            data_source: ds.cloneWithRows(itemId),
            UserName: "",
            SuppliersName: "",
            request_standard:[]

        };
        this.fetchData(itemSTR)
    }
    componentWillMount() {

    }

    async fetchData(request_standard_id) {
        //console.warn(item);
        fetch(GLOBALS.SERVICE_URL + '/getStandardRequestByID.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                request_standard_id: request_standard_id,
            })

        })
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    request_standard: responseJson.request_standard,
                    // request_standard_lists: responseJson.request_standard_lists,
                    //     dataSTR: responseJson.dataSTR,
                    data_source: this.state.data_source.cloneWithRows(responseJson.request_standard_lists),
                })
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
                        <Text style={styles.listItemContentTitle}> {rowData.product_code} </Text>
                    </View>
                    <View style={styles.listItemContentRow}>
                        <Text style={styles.listItemContentDetail}>{rowData.product_name} </Text>
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
                    }}> {rowData.product_qty} </Text>
                </View>

            </View>

        )
    }

    render() {
        const { goBack } = this.props.navigation;
        console.warn(this.state.dataProduct)
        // console.warn(this.state.dataSTR)
        return (
            <Container>
                <Header style={{ backgroundColor: '#FFFFFF' }}>
                    <Left style={{ flex: 0.2 }}>
                        <TouchableOpacity
                            onPress={() => goBack()}
                            style={{ width: 32, height: 32 }}
                        >
                            <Icon name='angle-left' style={styles.headerIcon} />
                        </TouchableOpacity>
                    </Left>
                    <Body style={styles.headerBody}>
                        <Title
                            style={styles.title}
                        >
                            เพิ่มใบร้องขอสั่งซื้อสินค้าทดลอง
                        </Title>
                    </Body>
                    <Right style={{ flex: 0.2 }}>
                    </Right>
                </Header>
                <View style={styles.BoxlistItem}>
                    <View style={{ flex: 1 }}>
                        <View style={styles.ContentItem}>
                            <Text style={styles.ContentItemTitle}>  ประเภทใบร้องขอสั่งซื้อสินค้าทดลอง / STR Code </Text>
                        </View>
                        <View style={styles.ContentItem}>
                            <Text style={styles.ContentItemDetail1}>
                                {this.state.request_standard.gencode}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.ContentRow}>
                        <View style={{ flex: 1 }}>
                            <View style={styles.ContentItem}>
                                <Text style={styles.ContentItemTitle}>  ผู้ร้องขอ / Request by  </Text>
                            </View>
                            <View style={styles.ContentItem}>
                                <Text style={styles.ContentItemDetail}>
                                    {this.state.request_standard}
                                </Text>
                            </View>
                        </View>
                        <View style={{ flex: 1 }}>
                            <View style={styles.ContentItem}>
                                <Text style={styles.ContentItemTitle}> ผู้ขาย / Supplier </Text>
                            </View>
                            {/* <View style={styles.ContentItem}> */}
                            <Text style={styles.ContentItemDetail}>
                                {this.state.request_standard}
                            </Text>
                            {/* </View> */}
                        </View>
                    </View>
                    <View style={styles.ContentRow}>
                        <View style={{ flex: 1 }}>
                            <View style={styles.ContentItem}>
                                <Text style={styles.ContentItemTitle}> หมายเหตุ / Remark </Text>
                            </View>
                            <View style={styles.ContentItem}>
                                <Text style={styles.ContentItemDetail}>
                                    {this.state.request_standard.textRemark}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.BoxlistItem}>
                    <ScrollView>
                        <ListView
                            style={styles.listBody}
                            dataSource={this.state.data_source}
                            renderRow={this.renderRow.bind(this)} />
                    </ScrollView>
                </View>
            </Container>
        )
    }



};

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
    ContentItem: {
        flex: 1,
        alignItems: 'stretch'
    },
    ContentRow: {
        flex: 1,
        flexDirection: 'row',
        //alignItems: 'stretch'
    },
    ContentItemTitle: {
        flex: 1,
        textAlign: 'left',
        fontWeight: 'bold',
        padding: 3,

    },
    ContentItemDetail: {
        flex: 1,
        textAlign: 'left',
        color: "#aaa",
        padding: 3,
        fontSize: 14,
        paddingLeft: 5
    },
    ContentItemDetail1: {
        flex: 1,
        textAlign: 'left',
        color: "#aaa",
        padding: 3,
        fontSize: 16,
        paddingLeft: 10
    },
    listBody: {
        flex: 1,
    },
    listItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'stretch',
        paddingTop: 15,
        paddingBottom: 8
    },
    listItemIcon: {
        margin: 4,
        width: 32,
        height: 32,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center'

    },
    listItemContent: {
        flex: 1,
        alignItems: 'stretch',
        paddingRight: 4,
    },
    listItemContentRow: {
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
    BoxlistItem: {
        justifyContent: 'center',
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
        }),
        flex: 0.9,
        padding: 15,
        marginTop: 5

    },
    ButtonItem: {
        marginTop: 10,
        marginBottom: 10
    },
});