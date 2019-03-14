
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
    TouchableHighlight
} from 'react-native';
import { Header, Left, Body, Title, Right } from 'native-base'
import GLOBALS from '../GLOBALS';
import Swipeout from 'react-native-swipeout';
import Icon from 'react-native-vector-icons/FontAwesome';
var regrind_supplier = [];

export default class RegrindSupplierList extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        const supplier_id = this.props.navigation.getParam('supplier_id', '0')
        this.state = {
            data_source: ds.cloneWithRows(regrind_supplier),
        };
        this.fetchData(supplier_id)
    }
    componentWillMount() {

    }

    async fetchData(supplier_id) {
        await AsyncStorage.getItem('Login_token')
            .then((token) => {
                console.warn(token)
                fetch(GLOBALS.SERVICE_URL + '/getRegrindSupplierListBy.php', {

                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        user_id: token,
                        supplier: supplier_id,
                    })

                })
                    .then((response) => response.json())
                    .then((responseJson) => {
                        console.warn(responseJson.regrind_supplier_list);
                        if (responseJson.result == true) {
                            this.setState({
                                data_source: this.state.data_source.cloneWithRows(responseJson.regrind_supplier_list),
                                regrind_supplier: responseJson.regrind_supplier_list,
                            })
                        }

                    })
                    .catch((error) => {
                        console.error(error);
                    });
            });
    }

    viewNote(regrind_supplier_id) {
        // this.props.navigation.navigate('StandardToolRequestDetail', { regrind_supplier_id: regrind_supplier_id });
    }
    addNode() {
        // this.props.navigation.navigate('AddRegrindReceive');
    }
    renderRow(rowData) {
        return (
            <Swipeout
                autoClose='true'
                backgroundColor='transparent'
            >
                <TouchableHighlight
                    onPress={() => { this.viewNote(rowData.regrind_supplier_id) }}
                >
                    <View style={styles.listItem}>
                        <View style={styles.listItemIcon}>
                            <Icon name="rocket" color="#fff" />
                        </View>

                        <View style={styles.listItemContent}>
                            <View style={styles.listItemContentRow}>
                                <Text style={styles.listItemContentTitle}>รหัสสินค้า :{rowData.product_code} </Text>

                            </View>
                            <View style={styles.listItemContentRow}>
                                <Text style={styles.listItemContentDetail}> ชื่อสินค้า : {rowData.product_name} </Text>
                            </View>
                            <View style={styles.listItemContentRow}>
                                <Text style={styles.listItemContentDetail}> จำนวน : {rowData.qty} </Text>
                            </View>

                        </View>
                    </View>
                </TouchableHighlight>
            </Swipeout>
        )
    }




    render() {
        const { goBack } = this.props.navigation;
        return (

            <View>
                <Header style={{ backgroundColor: '#FFFFFF' }}>
                    <Left style={{ flex: 0.2 }}>
                        <TouchableOpacity
                            onPress={() => goBack()}
                            style={{ width: 32, height: 32 }}
                        >
                            <Icon name='angle-left' style={styles.headerIcon} />

                        </TouchableOpacity>
                    </Left>

                    <Body
                        style={styles.headerBody}
                    >
                        <Title
                            style={styles.title}
                        >
                            รายการสินค้าที่ส่งรีกรายน์
                        </Title>
                    </Body>
                    <Right
                        style={{ flex: 0.2 }}
                    >
                        <TouchableOpacity
                            onPress={() => this.addNode()}
                            style={{ width: 32, height: 32 }}
                        >
                            <Icon
                                name='plus-circle'
                                style={styles.headerIcon} />

                        </TouchableOpacity>

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
        paddingBottom: 8,
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
    },
    listItemIcon: {
        margin: 4,
        width: 60,
        height: 60,
        borderRadius: 10,
        backgroundColor: "#f00",
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
        alignItems: 'stretch',
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



