
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
export default class CustomerInvoiceDetail extends Component {


    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        const itemId = this.props.navigation.getParam('invoice_customer_id', '0')
        // console.warn(itemId);
        this.state = {
            data_source: ds.cloneWithRows(customer_purchase_order_lists),
            invoice_customer_id: itemId,
            invoice_customer: [],
            invoice_customer_lists: []
        };

        this.fetchData(itemId)
    }

    // componentWillMount() {

    // }

    async fetchData(invoice_customer_id) {

        fetch(GLOBALS.SERVICE_URL + '/getInvoiceCustomerByID.php', {

            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                invoice_customer_id: invoice_customer_id,
            })

        })
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    invoice_customer: responseJson.invoice_customer,
                    data_source: this.state.data_source.cloneWithRows(responseJson.invoice_customer_list),
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

                    }}> {rowData.invoice_customer_list_qty} </Text>
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
                            {this.state.invoice_customer.invoice_customer_code}
                        </Title>
                    </Body>
                    <Right style={{ flex: 0.2 }}>

                    </Right>

                </Header>
                <View style={{ height: 240, padding: 15 }}>

                    <View style={styles.ContentRow}>
                        <View style={{ flex: 1 }}>
                            <View style={styles.ContentRow}>
                                <Text style={styles.ContentItemTitle}> รหัสผู้ซื้อ </Text>
                            </View>
                            <View style={styles.ContentRow}>
                                <Text style={styles.ContentItemDetail}>
                                    {this.state.invoice_customer.customer_code}
                                </Text>
                            </View>
                        </View>

                        <View style={{ flex: 1 }}>
                            <View style={styles.ContentRow}>
                                <Text style={styles.ContentItemTitle}> ชื่อตามใบกำกับภาษี  </Text>
                            </View>
                            <View style={styles.ContentRow}>
                                <Text style={styles.ContentItemDetail}>
                                    {this.state.invoice_customer.customer_name_en}
                                </Text>
                            </View>
                        </View>


                    </View>
                    <View style={styles.ContentRow}>
                        <View style={{ flex: 1 }}>
                            <View style={styles.ContentRow}>
                                <Text style={styles.ContentItemTitle}> หมายเลขใบกำกับภาษี </Text>
                            </View>
                            <View style={styles.ContentRow}>
                                <Text style={styles.ContentItemDetail}>
                                    {this.state.invoice_customer.invoice_customer_code}
                                </Text>
                            </View>
                        </View>

                        <View style={{ flex: 1 }}>
                            <View style={styles.ContentRow}>
                                <Text style={styles.ContentItemTitle}> วันที่ออกใบกำกับภาษี  </Text>
                            </View>
                            <View style={styles.ContentRow}>
                                <Text style={styles.ContentItemDetail}>
                                    {this.state.invoice_customer.invoice_customer_date}
                                </Text>
                            </View>
                        </View>

                    </View>

                    <View style={styles.ContentRow}>
                        <View style={{ flex: 1 }}>
                            <View style={styles.ContentRow}>
                                <Text style={styles.ContentItemTitle}> เครดิต (วัน)  </Text>
                            </View>
                            <View style={styles.ContentRow}>
                                <Text style={styles.ContentItemDetail}>
                                    {this.state.invoice_customer.invoice_customer_due_day}
                                </Text>
                            </View>
                        </View>

                        <View style={{ flex: 1 }}>
                            <View style={styles.ContentRow}>
                                <Text style={styles.ContentItemTitle}> กำหนดชำระ  </Text>
                            </View>
                            <View style={styles.ContentRow}>
                                <Text style={styles.ContentItemDetail}>
                                   {this.state.invoice_customer.invoice_customer_due}
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