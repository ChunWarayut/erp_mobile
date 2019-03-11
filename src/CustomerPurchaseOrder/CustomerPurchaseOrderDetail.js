
import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ListView,
    ScrollView,
} from 'react-native';
import { Header, Left, Body, Title, Right, Container } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome';
import GLOBALS from '../GLOBALS';

customer_purchase_order_lists = [];
export default class CustomerPurchaseOrderDetail extends Component {


    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        const itemId = this.props.navigation.getParam('customer_purchase_order_id', '0')
        // console.warn(itemId);
        this.state = {
            data_source: ds.cloneWithRows(customer_purchase_order_lists),
            customer_purchase_order_id: itemId,
            customer_purchase_order: [],
            customer_purchase_order_lists: []
        };

        this.fetchData(itemId)
    }

    componentWillMount() {

    }

    async fetchData(customer_purchase_order_id) {

        fetch(GLOBALS.SERVICE_URL + '/getCustomerPurchaseOrderListByID.php', {

            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                customer_purchase_order_id: customer_purchase_order_id,
            })

        })
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    customer_purchase_order: responseJson.customer_purchase_order,
                    data_source: this.state.data_source.cloneWithRows(responseJson.customer_purchase_order_list),
                })
                // console.warn(responseJson);
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

                    }}> {rowData.customer_purchase_order_list_qty} </Text>
                </View>

            </View>

        )
    }

    render() {

        const { goBack } = this.props.navigation;
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
                            {this.state.customer_purchase_order.customer_purchase_order_code}
                        </Title>
                    </Body>
                    <Right style={{ flex:0.2 }}>

                    </Right>

                </Header>
                <View style={{ height: 240, padding: 15 }}>

                    <View style={styles.ContentRow}>
                        <View style={{ flex: 1 }}>
                            <View style={styles.ContentRow}>
                                <Text style={styles.ContentItemTitle}> รหัสลูกค้า </Text>
                            </View>
                            <View style={styles.ContentRow}>
                                <Text style={styles.ContentItemDetail}>
                                    {this.state.customer_purchase_order.customer_code}
                                </Text>
                            </View>
                        </View>

                        <View style={{ flex: 1 }}>
                            <View style={styles.ContentRow}>
                                <Text style={styles.ContentItemTitle}> ลูกค้า  </Text>
                            </View>
                            <View style={styles.ContentRow}>
                                <Text style={styles.ContentItemDetail}>
                                    {this.state.customer_purchase_order.customer_name_en}
                                </Text>
                            </View>
                        </View>

                    </View>
                    <View style={styles.ContentRow}>
                        <View style={{ flex: 1 }}>
                            <View style={styles.ContentRow}>
                                <Text style={styles.ContentItemTitle}> เลขที่ใบสั่งซื้อ </Text>
                            </View>
                            <View style={styles.ContentRow}>
                                <Text style={styles.ContentItemDetail}>
                                    {this.state.customer_purchase_order.customer_purchase_order_code}
                                </Text>
                            </View>
                        </View>

                        <View style={{ flex: 1 }}>
                            <View style={styles.ContentRow}>
                                <Text style={styles.ContentItemTitle}> วันที่ออกใบสั่งซื้อ  </Text>
                            </View>
                            <View style={styles.ContentRow}>
                                <Text style={styles.ContentItemDetail}>
                                    {this.state.customer_purchase_order.customer_purchase_order_date}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.ContentRow}>
                        <View style={{ flex: 1 }}>
                            <View style={styles.ContentRow}>
                                <Text style={styles.ContentItemTitle}> จ่ายเงินภายใน (วัน)  </Text>
                            </View>
                            <View style={styles.ContentRow}>
                                <Text style={styles.ContentItemDetail}>
                                    {this.state.customer_purchase_order.customer_purchase_order_credit_term}
                                </Text>
                            </View>
                        </View>

                        <View style={{ flex: 1 }}>
                            <View style={styles.ContentRow}>
                                <Text style={styles.ContentItemTitle}> พนักงานขาย  </Text>
                            </View>
                            <View style={styles.ContentRow}>
                                <Text style={styles.ContentItemDetail}>
                                    {this.state.customer_purchase_order.user_name}  {this.state.customer_purchase_order.user_lastname}
                                </Text>
                            </View>
                        </View>

                    </View>


                </View>
                <ScrollView>
                    <ListView
                        style={styles.listBody}
                        dataSource={this.state.data_source}
                        renderRow={this.renderRow.bind(this)} />
                </ScrollView>
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
    ContentRow: {
        flex: 1,
        flexDirection: 'row',
        // alignItems: 'stretch'
    },
    ContentItemTitle: {
        flex: 1,
        textAlign: 'left',
        fontWeight: 'bold',
        padding: 8,
    },
    ContentItemDetail: {
        flex: 1,
        textAlign: 'left',
        color: "#aaa",
        padding: 8,
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
    }
});