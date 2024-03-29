import React, { Component } from 'react';

import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    Image,
    TouchableHighlight,
    ListView,
    ScrollView,
    Button,
    Platform,
    Alert
} from 'react-native';

import { TextInput } from 'react-native-gesture-handler';
import { Container, Content, Picker, Form, Header, Left, Body, Title, Right, Spinner } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import GLOBALS from '../GLOBALS';

// const window = Dimensions.get('window');


var products = [];
export default class SearchProduct extends Component {

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            data_source: ds.cloneWithRows(products),
            products: [],
            stock_group: [],
            stock_group_id: "",
            keyword: '',
            isLoading: false,
            Num: 0

        };
    }
    onValueChange(value) {
        this.setState({
            stock_group_id: value
        });


        // constructor(props) {
        //     super(props);
        //     this.state = {
        //         stock_group: [],
        //         isLoading: false,
        //         Num: 0
        //     }
    }

    clickMe() {
        this.props.navigation.replace('ProductList')
    }

    componentDidMount() {

        return fetch(GLOBALS.SERVICE_URL + '/getStockGroup.php')
            .then((response) => response.json())
            .then((responseJson) => {

                //            console.warn(responseJson.countNum)

                this.setState({


                    isLoading: responseJson.result,
                    stock_group: responseJson.user,
                    Num: responseJson.countNum
                }, function () {

                });

            })
            .catch((error) => {
                console.error(error);
            });




    }


    //-----------------------------------------------------------------------------------
    async search() {

        const Stock_group_id = this.state.stock_group_id;
        const Keyword = this.state.keyword;
        // console.warn("stock_group_id : ", Stock_group_id);
        // console.warn("keyword : ", Keyword);

        if (Keyword == "" && Stock_group_id == "ALL") {

            Alert.alert("กรุณาเลือกคลังสินค้า")

        } else {

            fetch(GLOBALS.SERVICE_URL + '/getStockReport.php', {

                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({

                    stock_group_id: Stock_group_id,
                    keyword: Keyword,

                })

            })
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        data_source: this.state.data_source.cloneWithRows(responseJson.products),
                        products: responseJson.products,
                    })
                    console.warn(responseJson.products);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    //--------------------------------------------------------------------------------------------


    renderRow(rowData) {
        return (
            <TouchableHighlight onPress={() => this.props.navigation.navigate('ProductList', { data: rowData.product_id })} underlayColor="#03A9F4">
                <View style={styles.listItem}>
                    <View style={styles.listItemIcon}>
                        <Icon name="rocket" color="#900" />
                    </View>

                    <View style={styles.listItemContent}>
                        <View style={styles.listItemContentRow}>
                            <Text style={styles.listItemContentCode}> {rowData.product_code} </Text>

                        </View>
                        <View style={styles.listItemContentRow}>
                            <Text style={styles.listItemContentName}> {rowData.product_name} </Text>
                        </View>
                        <View style={styles.listItemContentRow}>
                            <Text style={styles.listItemContentStock}>{rowData.stock_group_name} </Text>
                            <Text style={styles.listItemContentQty}> {rowData.stock_report_qty} </Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>


        )
    }



    render() {
        //  const {navigate} = this.props.navigation;



        var colNum = this.state.Num
        var dataPicker = []
        let data = [];

        for (i = 0; i < colNum; i++) {
            // data[i]  = {
            dataPicker.push(

                <Picker.Item label={this.state.stock_group[i].stock_group_name} value={this.state.stock_group[i].stock_group_id} />

            )
        }





        return (

            <View>
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
                    <Body tyle={styles.headerbody}>
                        <Title style={styles.title}>ค้นหาคลังสินค้า</Title>
                    </Body>
                    <Right style={styles.headerright}>
                    </Right>
                </Header>
                <View style={styles.viewIcon} >
                    <Icon style={styles.icon} name='search' />
                </View>
                <Text style={{ fontSize: 15, color: '#000000', padding: 10 }}>คลังสินค้า/Stock</Text>
                <View style={{ padding: 5 }}>
                    <View style={styles.border}>
                        <Picker
                            mode="dropdown"
                            // iosIcon={{Icon name="arrow-down" />}
                            headerStyle={{ backgroundColor: "#999999" }}
                            headerBackButtonTextStyle={{ color: "#fff" }}
                            headerTitleStyle={{ color: "#fff" }}
                            selectedValue={this.state.stock_group_id}
                            onValueChange={this.onValueChange.bind(this)}
                        >
                            <Picker.Item label='ทั้งหมด' value="ALL" />
                            {dataPicker}
                        </Picker>
                    </View>
                </View>
                <Text style={{ fontSize: 15, color: '#000000', padding: 10 }}>คำค้น</Text>
                <View style={{ padding: 5, }}>
                    <TextInput style={styles.textinput}
                        placeholder='คำค้น'
                        shake={true}
                        errorStyle={{ color: 'back' }}
                        errorMessage='Example: T001.'
                        // secureTextEntry={true}
                        onChangeText={(pass) => this.setState({ keyword: pass })}
                        value={this.state.keyword}
                    />
                </View>
                <View style={{ padding: 10, alignItems: 'center' }}>
                    <Button
                        style={styles.button}
                        onPress={() => this.search()}
                        // onPress={ () => this.props.navigation.navigate('ProductList' , { data: this.state.stock_group_id , pass: this.state.keyword})} 
                        title="ค้นหาสินค้า"
                        color="#0693E3"
                    />
                </View>

                <View style={{ padding: 10 }}>
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
export { SearchProduct };

const styles = StyleSheet.create({
    headerbody: {
        alignItems: 'center',
        flex: 0.8
    },
    headerright: {
        alignItems: 'center',
        flex: 0.2
    },
    btncontainer: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        flexGrow: 0.2
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#DDDDDD',
        width: 180,
        height: 40,

    },
    textinput: {
        padding: 10,
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
    },
    border: {
        borderRadius: 4,
        borderWidth: 0.8,
        borderColor: '#d6d7da',
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
    },
    title: {
        color: '#000000',
        textAlign: 'center',
    },
    container: {
        flex: 0.2,
        alignItems: 'stretch',
        justifyContent: 'center',
        flexGrow: 0.2
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
    listItemContentCode: {
        flex: 1,
        textAlign: 'left',
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
    icon: {
        flex: 1,
        color: '#337ab7',
        fontSize: 50,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    viewIcon: {
        paddingTop: 15,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        textAlign: 'center',
    },


});