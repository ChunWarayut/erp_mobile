
import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ListView,
    TextInput,
    Picker,
    TouchableHighlight,
    Alert,
} from 'react-native';
import { Header, Left, Body, Title, Right, Container } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome';
import GLOBALS from '../GLOBALS';

customers = [];
export default class PurchaseRequestSubject extends Component {


    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        const itemId = this.props.navigation.getParam('employee_id', '0')
        console.warn(itemId);
        this.state = {
            employee_id: itemId,
            purchase_request_code: '',
            purchase_request_date: '',
            purchase_request_type: 'Sale',
            purchase_request_remark: '',
            data_source: ds.cloneWithRows(customers), 
            customers: []
        };

        this.fetchCustomerData(itemId)
    }


    componentWillMount() {
        this.fetchCustomerData('')
    }


    async fetchCustomerData(employee_id) {

        fetch(GLOBALS.SERVICE_URL + '/getCustomerBySaleID.php', {

            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                employee_id: employee_id,
            })

        })
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    customers: responseJson.customers,
                })
                console.warn(responseJson);
            })
            .catch((error) => {
                console.error(error);
            });

    }

    addList() {
        if(this.state.purchase_request_code == ''){
            Alert.alert(
                'Purchase request.',
                'Please input purchase order code.',
                [
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false},
              );
        }else if (this.state.purchase_request_date == ''){
            Alert.alert(
                'Purchase request.',
                'Please input purchase order date.',
                [
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false},
              );
        }else if (this.state.purchase_request_type == ''){
            Alert.alert(
                'Purchase request.',
                'Please input purchase order type.',
                [
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false},
              );
        }else{
            this.props.navigation.navigate('PurchaseRequestList', {
                employee_id: this.state.employee_id,
                purchase_request_code: this.state.purchase_request_code,
                purchase_request_date: this.state.purchase_request_date,
                purchase_request_type: this.state.purchase_request_type,
                purchase_request_remark: this.state.purchase_request_remark,
            
            });
        }
        
    }

    render() {

        const { goBack } = this.props.navigation;

        var dataPicker = []

        for (i = 0; i < this.state.customers.length; i++) {
            // data[i]  = {
            dataPicker.push(

                <Picker.Item label={this.state.customers[i].customer_name_en} value={this.state.customers[i].customer_id} />

            )
        }

        return (

            <Container>
                <Header style={{ backgroundColor: '#FFFFFF' }}>
                    <Left style={{ flex: 1 }}>
                        <TouchableOpacity
                            onPress={() => goBack()}
                            style={{ width: 32, height: 32 }}
                        >
                            <Icon name='angle-left' style={styles.headerIcon} />

                        </TouchableOpacity>
                    </Left>

                    <Body style={{ flex: 3 }}>
                        <Title>
                            <Icon name='plus-circle' /> Purchase request.
                        </Title>
                    </Body>
                    <Right style={{ flex: 1 }}>

                    </Right>

                </Header>

                <View style={{ height: 320, }}>
                    <View style={styles.ContentRow}>
                        <View style={{ flex: 1 }}>
                            <View style={styles.ContentRow}>
                                <Text style={styles.ContentItemTitle}> หมายเลขสั่งซื้อสินค้า </Text>
                            </View>
                            <View style={styles.ContentRow}>
                                <TextInput
                                    style={styles.itemInput}
                                    onChangeText={(text) => this.setState({ purchase_request_code: text })}
                                    value={this.state.text}
                                />
                            </View>
                        </View>

                        <View style={{ flex: 1 }}>
                            <View style={styles.ContentRow}>
                                <Text style={styles.ContentItemTitle}> วันที่สั่งซื้อสินค้า </Text>
                            </View>
                            <View style={styles.ContentRow}>
                                <TextInput
                                    style={styles.itemInput}
                                    onChangeText={(text) => this.setState({ purchase_request_date: text })}
                                    value={this.state.text}
                                />
                            </View>
                        </View>

                    </View>

                    <View style={styles.ContentRow}>
                        <View style={{ flex: 1 }}>
                            <View style={styles.ContentRow}>
                                <Text style={styles.ContentItemTitle}> ประเภทใบร้องขอสั่งซื้อสินค้า </Text>
                            </View>
                            <View style={styles.ContentRow}>
                                <View>
                                <Picker   
                                    mode="dropdown"
                                    style={{width: 100}}
                                    selectedValue={this.state.purchase_request_type}
                                    onValueChange={(text) => this.setState({ purchase_request_type: text })}
                                    itemStyle={styles.itemStyle} >
                                    <Picker.Item label="Sale" value="Sale" />
                                    <Picker.Item label="Use" value="Use" />
                                </Picker>
                                </View>
                                
                            </View>
                        </View>
                    </View>


                    <View style={styles.ContentRow}>
                        <View style={{ flex: 1 }}>
                            <View style={styles.ContentRow}>
                                <Text style={styles.ContentItemTitle}> ชื่อลูกค้า </Text>
                            </View>
                            <View style={styles.ContentRow}>
                                <Picker 
                                    mode="dropdown"
                                    selectedValue={this.state.customer_id}
                                    onValueChange={(text) => this.setState({ customer_id: text })} 
                                > 
                                    <Picker.Item label='ทั้งหมด' value=" " />
                                    {dataPicker}
                                </Picker>
                            </View>
                        </View>
                    </View>

                    <View style={styles.ContentRow}>
                        <View style={{ flex: 1 }}>
                            <View style={styles.ContentRow}>
                                <Text style={styles.ContentItemTitle}> หมายเหตุ </Text>
                            </View>
                            <View style={styles.ContentRow}>
                                <TextInput
                                    style={styles.itemInput}
                                    onChangeText={(text) => this.setState({ purchase_request_remark: text })}
                                    value={this.state.text}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.ContentRow}>
                    <View style={{ flex: 1 }}>
                    <TouchableHighlight
                                underlayColor={'#4fc3f7'}
                                style={{backgroundColor:'#E8910D',borderRadius:8,margin:8, padding:8, justifyContent: 'center', alignItems: 'center',color:'#FFF'}}
                                onPress={() => goBack()}
                                

                            >
                                <Text> Back </Text>
                            </TouchableHighlight>
                    </View>

                    <View style={{ flex: 1 }}>
                    <TouchableHighlight
                                underlayColor={'#4fc3f7'}
                                style={{backgroundColor:'#1F98D1',borderRadius:8,margin:8, padding:8, justifyContent: 'center', alignItems: 'center',color:'#FFF'}}
                                onPress={() => this.addList()}

                            >
                                <Text> Save and Add product </Text>
                            </TouchableHighlight>
                    </View>
                    
                            </View>
                </View>



            </Container>
        )
    }



}

const styles = StyleSheet.create({
    headerIcon: {

        width: 32,
        height: 32,
        fontSize: 32,
        justifyContent: 'center',
        alignItems: 'center'

    },
    itemStyle: {
        fontSize: 15,
        height: 75,
        color: 'black',
        textAlign: 'center',
        fontWeight: 'bold'
      },
    itemButton:{
        flex:1,
        height:40,
    },
    itemInput : { 
        flex:1,  
        borderColor: 'gray', 
        borderWidth: 1 ,
        marginLeft:8,
        marginRight:8,
    }, 
    ContentRow: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'stretch'
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
});