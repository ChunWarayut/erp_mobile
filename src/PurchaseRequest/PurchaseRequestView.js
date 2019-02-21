
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ListView,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    ScrollView
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Header, Left, Body, Title, Right, Container } from 'native-base'
import Swipeout from 'react-native-swipeout';
import GLOBALS from '../GLOBALS';

var purchase_requests = [];

class PurchaseRequestView extends Component {

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            data_source: ds.cloneWithRows(purchase_requests),
            date_start: '',
            date_end: '',
            keyword: '',
            user_id: '',
        };

    }

    componentWillMount() {

        this.fetchData()

    }

    async fetchData() {

        fetch(GLOBALS.SERVICE_URL + '/getPurchaseRequestBy.php', {

            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                date_start: this.state.date_start,
                date_end: this.state.date_end,
                keyword: this.state.keyword,
                user_id: this.state.user_id,
            })

        })
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    data_source: this.state.data_source.cloneWithRows(responseJson),
                    purchase_requests: responseJson,
                })
                console.warn(responseJson);
            })
            .catch((error) => {
                console.error(error);
            });

    }

    editNote(rowData) {
        console.warn('Edit. ', rowData);
    }

    deleteNote(rowData) {
        console.warn('Delete. ', rowData);
    }

    viewNote(id, rowData) {
        console.warn("View Data :", rowData);
    }

    addNode(data) {
        console.warn("Add node.");
    }

    renderRow(rowData) {
        let swipeBtns = [
            {
                text: 'Edit',
                backgroundColor: 'orange',
                underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
                onPress: () => { this.editNote(rowData) }
            },
            {
                text: 'Delete',
                backgroundColor: 'red',
                underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
                onPress: () => { this.deleteNote(rowData) }
            }
        ];
        return (
            <Swipeout right={swipeBtns}
                autoClose='true'
                backgroundColor='transparent'>
                <TouchableHighlight>
                    <View style={styles.listItem}>
                        <View style={styles.listItemIcon}>
                            <Icon name="rocket" color="#900" />
                        </View>

                        <View style={styles.listItemContent}>
                            <View style={styles.listItemContentRow}>
                                <Text style={styles.listItemContentTitle}> {rowData.purchase_request_code} </Text>
                                <Text style={styles.listItemContentDate}> {rowData.purchase_request_date} </Text>
                            </View>
                            <View style={styles.listItemContentRow}>
                                <Text style={styles.listItemContentDetail}> Status : {rowData.purchase_request_accept_status} </Text>
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
                <View>
                    <Header style={{ backgroundColor: '#FFFFFF' }}>
                        <Left>
                            <TouchableOpacity
                                onPress={this.props.OnToggled}
                                style={{ width: 32, height: 32 }}
                            >
                                <Icon
                                    name='bars'
                                    style={styles.headerIcon} />

                            </TouchableOpacity>
                        </Left>

                        <Body>
                            <Title>ใบร้องขอ</Title>
                        </Body>
                        <Right>
                            <TouchableOpacity
                                onPress={this.addNode()}
                                style={{ width: 32, height: 32 }}
                            >
                                <Icon
                                    name='plus-circle'
                                    style={styles.headerIcon} />

                            </TouchableOpacity>
                        </Right>

                    </Header>
                </View>
                <View>
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


} export { PurchaseRequestView };

const styles = StyleSheet.create({
    headerIcon: {

        width: 32,
        height: 32,
        fontSize: 32,
        justifyContent: 'center',
        alignItems: 'center'

    },
    container: {
        flex: 1,
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
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#efb",
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
})