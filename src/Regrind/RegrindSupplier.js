
import React, { Component } from 'react';
import {

    View,
    Image,
    TouchableOpacity,
    StyleSheet,
    ListView,
    ScrollView,
    AsyncStorage,
    TouchableHighlight
} from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Button, Text, Fab, Left, Body, Title, Right } from 'native-base'
import GLOBALS from '../GLOBALS';
import Swipeout from 'react-native-swipeout';
import Icon from 'react-native-vector-icons/FontAwesome';
var TestRequest = [];

class RegrindSupplier extends Component {
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
                        // console.error(error);
                    });
            });
    }

    viewNote(supplier_id) {
        this.props.navigation.navigate('RegrindSupplierList', { supplier_id: supplier_id });
    }
    addNode() {
        // this.props.navigation.navigate('AddRegrindSend');
    }
    addNewSend() {
        this.props.navigation.navigate('AddNewRegrindSend');
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
                            <Icon name="rocket" color="#ffffff" />
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
        return (
            <Container>
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
                            ซัพพลายเออร์
                        </Title>
                    </Body>
                    <Right
                        style={{ flex: 0.2 }}
                    >
                        <TouchableOpacity
                            onPress={() => this.addNewSend()}
                            style={{ width: 32, height: 32 }}
                        >
                            <Icon
                                name='send'
                                style={styles.headerIcon} />

                        </TouchableOpacity>

                    </Right>

                </Header>
                <Content style={styles.ViewBody}>

                    <ScrollView>
                        <ListView
                            style={styles.listBody}
                            dataSource={this.state.data_source}
                            renderRow={this.renderRow.bind(this)} />
                    </ScrollView>

                </Content>
                <Fab
                    active={true}
                    direction="up"
                    containerStyle={{}}
                    style={{ backgroundColor: '#5067FF' }}
                    position="bottomLeft"
                    onPress={() => this.addNewSend()}>
                    <Icon name="plus" />
                </Fab>
            </Container >
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
        backgroundColor: "#ff0000",
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

export { RegrindSupplier };

