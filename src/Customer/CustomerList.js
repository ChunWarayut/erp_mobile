
import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    StyleSheet,
    ListView,
    TouchableHighlight,
    ScrollView,
} from 'react-native';
import { Header, Left, Body, Title, Right } from 'native-base'
import Swipeout from 'react-native-swipeout';
import Icon from 'react-native-vector-icons/FontAwesome';
import GLOBALS from '../GLOBALS';

var customer = [];

class CustomerList extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

        this.state = {
            data_source: ds.cloneWithRows(customer),
        };

    }
    componentWillMount() {

        this.fetchData()

    }

    async fetchData() {

        fetch(GLOBALS.SERVICE_URL + '/getCustomerAll.php', {

            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

            })

        })
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    data_source: this.state.data_source.cloneWithRows(responseJson.customer),
                    customer: responseJson.customer,
                })
                console.warn(responseJson);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    renderRow(rowData) {
        return (

            <Swipeout
                autoClose='true'
                backgroundColor='transparent'
            >
                <TouchableHighlight onPress={() => this.props.navigation.navigate('CustomerMenu', { data: rowData.customer_id })}>
                    <View style={styles.listItem}>
                        <View style={styles.listItemIcon}>
                            <Icon name="rocket" color="#900" />
                        </View>

                        <View style={styles.listItemContent}>
                            <View style={styles.listItemContentRow}>
                                <Text style={styles.listItemContentTitle}>  {rowData.customer_name_en} </Text>
                                {/* <Text style={styles.listItemContentDate}> {rowData.customer_name_th} </Text> */}
                            </View>
                            <View style={styles.listItemContentRow}>
                                <Text style={styles.listItemContentDetail}> TAX ID : {rowData.customer_tax} </Text>
                            </View>
                            <View style={styles.listItemContentRow}>
                                <Text style={styles.listItemContentDetail}> Mobile : {rowData.customer_tel} </Text>
                            </View>
                            <View style={styles.listItemContentRow}>
                                <Text style={styles.listItemContentDetail}> Type : {rowData.customer_type_name} </Text>
                            </View>
                        </View>
                    </View>
                </TouchableHighlight>
            </Swipeout>

        )


    }


    render() {

        return (

            <View >
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

                    <Body style={styles.headerbody}>
                        <Title
                            style={styles.title}
                        >
                            ลูกค้า
                        </Title>
                    </Body>
                    <Right style={styles.headerright}>

                    </Right>

                </Header>

                <View style={{ padding: 15 }}>
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
    header: {
        paddingTop: 24,
        flex: 0.25,
        backgroundColor: "#ffffff",
        alignItems: 'center',

    },
    headerbody: {
        alignItems: 'center',
        flex: 0.8
    },
    headerright: {
        alignItems: 'center',
        flex: 0.2
    },
    title: {
        color: '#000000',
        textAlign: 'center',
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
})

export { CustomerList };
