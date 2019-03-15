
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
            employee_id: '12',
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
                employee_id: this.state.employee_id,
            })

        })
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    data_source: this.state.data_source.cloneWithRows(responseJson),
                    purchase_requests: responseJson,
                })
                //console.warn(responseJson);
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

    viewNote(rowData) {
        //console.warn(rowData);
        this.props.navigation.navigate('PurchaseRequestDetail', {purchase_request_id: rowData.purchase_request_id});
    }

    addNode() {
        this.props.navigation.navigate('PurchaseRequestSubject', {employee_id: this.state.employee_id});
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

        var icon_status = "";
        var icon_color = "";

        if(rowData.purchase_request_accept_status == "Approve"){
            icon_status = 'check-circle';
            icon_color = '#0F0';
        }else if (rowData.purchase_request_accept_status == "Waiting"){
            icon_status = 'info-circle';
            icon_color = '#F00';
        }

        return (
            <Swipeout right={swipeBtns}
                autoClose='true'
                backgroundColor='transparent'>
                <TouchableHighlight 
                onPress={() => { this.viewNote(rowData) }} 
                >
                    <View style={styles.listItem}>
                        <View style={styles.listItemIcon}>
                            <Icon name={icon_status} color={icon_color} style={{fontSize:32}} />
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
                                onPress={()=>this.addNode()}
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
})