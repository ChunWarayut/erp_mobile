
import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    ListView,
    ScrollView,
    AsyncStorage,
    TouchableHighlight,
    StyleSheet,
    Platform,
    Picker,
    Button,
    Alert
} from 'react-native';
import { Header, Left, Body, Title, Right, Content, Container } from 'native-base'
import GLOBALS from '../GLOBALS';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TextInput } from 'react-native-gesture-handler';
export default class AddStandardToolRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gencode: "",
            users: [],
            suppliers: [],
            suppliers_id: "",
            suppliers_name: "",
            users_id: "",
            textRemark: "",
        };
    }
    componentWillMount() {
        this.fetchData()
    }

    async fetchData() {
        await AsyncStorage.getItem('Login_token')
            .then((token) => {
                fetch(GLOBALS.SERVICE_URL + '/getDetailHeaderAddStandardRequest.php', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        user_id: token,

                    })
                })
                    .then((response) => response.json())
                    .then((responseJson) => {

                        if (responseJson.result == true) {
                            this.setState({
                                gencode: responseJson.last_code,
                                users: responseJson.users,
                                suppliers: responseJson.suppliers
                            })
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            });
    }

    check() {
        if (this.state.gencode == "" || this.state.users_id == "0") {
            Alert.alert("กรุณาเลือกผู้ร้องขอ")
        } else {
            const data = {
                gencode: this.state.gencode,
                users: this.state.users_id,
                suppliers: this.state.suppliers_id,
                textRemark: this.state.textRemark
            }
            this.props.navigation.navigate(
                'AddProductStandardRequest', {
                    dataSTR: data
                }
            )
        }

    }

    render() {
        const { goBack } = this.props.navigation;
        var dataPickerSuppliers = []
        var dataPickerUsers = []

        if (this.state.suppliers != null) {
            for (i = 0; i < this.state.suppliers.length; i++) {
                dataPickerSuppliers.push(
                    <Picker.Item label={this.state.suppliers[i].supplier_name_en} value={this.state.suppliers[i].supplier_id} />
                )
            }
        }
        if (this.state.users != null) {
            for (i = 0; i < this.state.users.length; i++) {
                dataPickerUsers.push(
                    <Picker.Item label={this.state.users[i].name + " (" + this.state.users[i].user_position_name + ")"} value={this.state.users[i].user_id} />
                )
            }
        }


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
                            เพิ่มใบร้องขอสั่งซื้อสินค้าทดลอง
                        </Title>
                    </Body>
                    <Right
                        style={{ flex: 0.2 }}
                    >
                    </Right>
                </Header>
                <Content>
                    <View style={styles.ViewBody}>

                        <View style={styles.BoxlistItem}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <Text
                                    style={styles.ContentItemTitle}
                                >
                                    ประเภทใบร้องขอสั่งซื้อสินค้าทดลอง / STR Code
                                </Text>
                                <Text style={{ color: 'red', padding: 8 }}>  * </Text>
                            </View>
                            <TextInput
                                editable={false}
                                value={this.state.gencode}
                                style={{ color: '#000000', padding: 8 }}
                            >
                            </TextInput>
                            <Text style={{ padding: 8 }} >Example : STR1801001.</Text>
                        </View>

                        <View style={styles.BoxlistItem}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <Text
                                    style={styles.ContentItemTitle}
                                >
                                    ผู้ร้องขอ / Request by
                                </Text>
                                <Text style={{ color: 'red', padding: 8 }}>  * </Text>
                            </View>
                            <View style={styles.itemPicker}>
                                <Picker
                                    mode="dropdown"
                                    style={{ height: 50 }}
                                    selectedValue={this.state.users_id}
                                    onValueChange={(users_id) =>
                                        this.setState({ users_id: users_id })
                                    }>
                                    <Picker.Item label="Select" value="0" />
                                    {dataPickerUsers}
                                </Picker>
                            </View>
                            <Text
                                style={{ padding: 8 }}
                            >
                                Example : Thana Tepchuleepornsil.
                            </Text>
                        </View>

                        <View style={styles.BoxlistItem}>
                            <Text
                                style={styles.ContentItemTitle}
                            >
                                ผู้ขาย / Supplier
                        </Text>
                            <View style={styles.itemPicker}>
                                <Picker
                                    mode="dropdown"
                                    style={{ height: 50 }}
                                    selectedValue={this.state.suppliers_id}
                                    onValueChange={(suppliers_id) =>
                                        this.setState({ suppliers_id: suppliers_id })
                                    }>
                                    <Picker.Item label="Select" value="0" />
                                    {dataPickerSuppliers}
                                </Picker>
                            </View>
                            <Text
                                style={{ padding: 8 }}
                            >
                                Example : บริษัท เรเวลซอฟต์ จำกัด (Revel Soft co,ltd).
                            </Text>
                        </View>

                        <View style={styles.BoxlistItem}>
                            <Text
                                style={styles.ContentItemTitle}
                            >
                                หมายเหตุ / Remark
                        </Text>
                            <TextInput
                                style={{
                                    borderBottomColor: '#000000',
                                    borderBottomWidth: 0.5,
                                    padding: 8
                                }}
                                onChangeText={(pass) => this.setState({ textRemark: pass })}
                                value={this.state.textRemark}
                            >
                            </TextInput>
                        </View>
                        <View style={styles.ButtonItem}>
                            <Button
                                onPress={() => this.check()}
                                title="ถัดไป"
                                color="#8ed1fc"
                            />
                        </View>
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

        padding: 10,

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

    ContentItemTitle: {
        color: '#000000',
        fontWeight: 'bold',
        padding: 8,
    },
    itemPicker: {
    },
    ButtonItem: {

        marginTop: 15
    }

})
