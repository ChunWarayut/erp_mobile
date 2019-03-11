
import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    StyleSheet,
    TouchableHighlight,
    ListView,
    ScrollView,
    AsyncStorage
} from 'react-native';
import { Header, Left, Body, Title, Right } from 'native-base'
import Swipeout from 'react-native-swipeout';
import Icon from 'react-native-vector-icons/FontAwesome';
import GLOBALS from '../GLOBALS';

var CustomerInvoiceList = [];

export default class CustomerInvoiceListView extends Component {

    constructor(props) {

        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            data_source: ds.cloneWithRows(CustomerInvoiceList),
        };

    }
    componentWillMount() {

        this.fetchData()

    }

    async fetchData() {

        await AsyncStorage.getItem('Login_token')
            .then((token) => {
                console.warn(token)
                fetch(GLOBALS.SERVICE_URL + '/getInvoiceCustomerBy.php', {

                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        user_id: "",
                        customer_id: this.props.navigation.state.params.data.toString(),

                    })

                })
                    .then((response) => response.json())
                    .then((responseJson) => {
                        // console.warn(responseJson);
                        if (responseJson.result == true) {
                            this.setState({
                                data_source: this.state.data_source.cloneWithRows(responseJson.invoice_customer),
                                CustomerPurchaseOrderList: responseJson.invoice_customer,
                            })
                        }

                    })
                    .catch((error) => {
                        console.error(error);
                    });
            });
    }
    viewNote(Data) {
        // console.warn(Data);
        this.props.navigation.navigate('CustomerInvoiceDetail', { invoice_customer_id: Data });
    }

    renderRow(rowData) {
        return (

            <Swipeout
                autoClose='true'
                backgroundColor='transparent'
            >
                <TouchableHighlight
                    onPress={() => { this.viewNote(rowData.invoice_customer_id) }}
                >
                    <View style={styles.listItem}>
                        <View style={styles.listItemIcon}>
                            <Icon name="rocket" color="#900" />
                        </View>

                        <View style={styles.listItemContent}>
                            <View style={styles.listItemContentRow}>
                                <Text style={styles.listItemContentTitle}>  {rowData.invoice_customer_code} </Text>

                            </View>
                            <View style={styles.listItemContentRow}>
                                <Text style={styles.listItemContentDetail}> Date : {rowData.invoice_customer_date} </Text>
                            </View>

                        </View>
                    </View>
                </TouchableHighlight>
            </Swipeout>

        )


    }




    render() {
        // console.warn(this.props.navigation.state.params.data.toString());
        const { goBack } = this.props.navigation;
        return (

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
                            รายการใบกำกับภาษี
                        </Title>
                    </Body>
                    <Right style={styles.headerRight}>

                    </Right>

                </Header>

                <View style={styles.ViewBody}>

                    <ScrollView>
                        <ListView
                            style={styles.listBody}
                            dataSource={this.state.data_source}
                            renderRow={this.renderRow.bind(this)} />
                    </ScrollView>

                </View>

            </View >
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
    }
})