
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
var TestRequest = [];

class RegrindListView extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            data_source: ds.cloneWithRows(TestRequest),
        };

    }
    componentWillMount() {

        this.fetchData()

    }

    async fetchData() {
        await AsyncStorage.getItem('Login_token')
            .then((token) => {
                // console.warn(token)
                fetch(GLOBALS.SERVICE_URL + '/getRegrindListViewBy.php', {

                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        user_id: token,
                        supplier: ""
                    })

                })
                    .then((response) => response.json())
                    .then((responseJson) => {

                        if (responseJson.result == true) {
                            this.setState({
                                data_source: this.state.data_source.cloneWithRows(responseJson.regrind_supplier),
                                TestRequest: responseJson.regrind_supplier,
                            })
                        }

                    })
                    .catch((error) => {
                        console.error(error);
                    });
            });
    }

    viewNote(supplier_id) {
        this.props.navigation.navigate('RegrindSupplier', { supplier_id: supplier_id });
    }
    addNode() {
        // this.props.navigation.navigate('AddRegrindSend');
    }
    renderRow(rowData) {
        return (
            <Swipeout
                autoClose='true'
                backgroundColor='transparent'
            >
                <TouchableHighlight
                    onPress={() => { this.viewNote(rowData.supplier_id) }}
                >
                    <View style={styles.listItem}>
                        <View style={styles.listItemIcon}>
                            <Icon name="rocket" color="#900" />
                        </View>

                        <View style={styles.listItemContent}>
                            <View style={styles.listItemContentRow}>
                                <Text style={styles.listItemContentTitle}>{rowData.supplier_name} </Text>

                            </View>
                            <View style={styles.listItemContentRow}>
                                <Text style={styles.listItemContentDetail}> Tel : {rowData.supplier_tel} </Text>
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
                            รายการรีกรายน์
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

export { RegrindListView };

