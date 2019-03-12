
import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    StyleSheet,
    ListView,
    ScrollView,
    TouchableHighlight,
    Picker,
    Button,
    Platform
} from 'react-native';
import { Header, Left, Body, Title, Right, Container, Content } from 'native-base'
import GLOBALS from '../GLOBALS';
import Icon from 'react-native-vector-icons/FontAwesome';

var products = [];
export default class AddProductSpecialRequest extends Component {
    constructor(props) {
        super(props);
        const dataSTR = this.props.navigation.getParam('dataSTR', '0')
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            data_source: ds.cloneWithRows(products),
            dataSTR: dataSTR,
            selected: false,
            check: [],
            dataProduct: [],

        };

    }
    // state = {

    // }

    onSelect = data => {
        products.push(data)
        this.setState({
            check: [...this.state.check, data],
        });
        this.setState({
            data_source: this.state.data_source.cloneWithRows(products)
        });

    };


    onPress() {
        this.props.navigation.navigate('AddProductSpecial', { onSelect: this.onSelect });
    };
    goDetail() {
        this.props.navigation.navigate('AddSpecialToolRequestDetail', { dataProduct: this.state.check, dataSTR: this.state.dataSTR });
    }


    renderRow(rowData) {
        return (
            <TouchableHighlight underlayColor="#03A9F4">
                <View style={styles.listItem}>
                    <View style={styles.listItemIcon}>
                        <Icon name="rocket" color="#900" />
                    </View>
                    <View style={styles.listItemContent}>
                        <View style={styles.listItemContentRow}>
                            <Text style={styles.listItemContentCode}> {rowData.product_code} </Text>
                            <Text style={styles.listItemContentCodeRight}> {rowData.product_qty} </Text>
                        </View>
                        <View style={styles.listItemContentRow}>
                            <Text style={styles.listItemContentName}> {rowData.product_name} </Text>
                        </View>
                        {/* <View style={styles.listItemContentRow}>
                            <Text style={styles.listItemContentStock}>{rowData.stock_group_name} </Text>
                            <Text style={styles.listItemContentQty}> {rowData.stock_report_qty} </Text>
                        </View> */}
                    </View>
                </View>
            </TouchableHighlight>
        )
    }



    render() {
        console.warn(this.state.check)
        // console.warn(this.state.gencode, this.state.suppliers_id, this.state.users_id)
        ////---- this.props.navigation.pop(2) -----  ถอยไป 2 page ----- /////
        const { goBack } = this.props.navigation;
        var dataButton = []

        dataButton.push(
            <View>
                <View style={styles.ButtonItem}>
                    <Button
                        onPress={() => this.goDetail()}
                        title="ตกลง"
                        color="#8ed1fc"
                    />
                </View>
            </View>
        )
        return (
            <Container style={{ backgroundColor: 'white' }}>
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
                            เพิ่มสินค้า
                        </Title>
                    </Body>
                    <Right
                        style={{ flex: 0.2 }}
                    >
                        <TouchableOpacity
                            onPress={() => this.onPress()}
                            style={{ width: 32, height: 32 }}
                        >
                            <Icon
                                name='plus-circle'
                                style={styles.headerIcon} />

                        </TouchableOpacity>

                    </Right>
                </Header>
                <Content>
                    <View style={styles.ViewBody}>
                        <View style={this.state.check.length > 0 ? styles.BoxlistItem : {}}>
                            <ScrollView >
                                <ListView
                                    style={styles.listBody}
                                    dataSource={this.state.data_source}
                                    renderRow={this.renderRow.bind(this)} />
                            </ScrollView>
                        </View>
                        {
                            this.state.check.length > 0 ? dataButton :
                                <View
                                    style={{
                                        justifyContent: 'center',
                                        marginTop: 10
                                    }}>
                                    <Text style={{ textAlign: 'center' }}>กรุณาเพิ่มสินค้า</Text></View>
                        }
                    </View>
                </Content>
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
        flex: 1,
        padding: 10,
    },
    ImageAdd: {
        width: 60,
        height: 60,
    },
    AddButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
        borderRadius: 20,
        backgroundColor: "#efb",
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15

    },
    listItemContent: {
        flex: 1,
        alignItems: 'stretch',
        paddingRight: 4,
    },
    listItemContentRow: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'space-between'
    },
    listItemContentCode: {
        flex: 0.8,
        textAlign: 'left',
    },
    listItemContentCodeRight: {
        flex: 0.2,
        textAlign: 'right',
    },
    listItemContentName: {
        flex: 1,
        textAlign: 'left',
    },
    listItemContentStock: {
        flex: 1,
        color: "#aaa"
    },
    listItemContentQty: {
        flex: 1,
        textAlign: 'right',
    },
    ButtonItem: {
        marginTop: 10,
        height: 40
    },
    BoxlistItem: {
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
        padding: 10,
        marginTop: 10
    },

})