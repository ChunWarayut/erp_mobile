
import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    StyleSheet,
    Platform,
    TextInput,
    Button,
    ScrollView,
    Picker,
    Alert
} from 'react-native';
import { Header, Left, Body, Title, Right, Container, Content } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome';
import GLOBALS from '../GLOBALS';
import Autocomplete from 'react-native-autocomplete-input';
import DatePicker from 'react-native-datepicker'
const var2 = 0;

const API = 'https://swapi.co/api';
const ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];
const today = new Date();
export default class AddProduct extends Component {



    constructor(props) {
        super(props);

        this.state = {
            user_id: "",
            films: [],
            query: '',
            customer: [],
            products: [],
            product_id: "",
            product_code: "",
            product_name: "",
            product_qty: "1",
            textRemark: "",
            delivery: today.getDay() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear(),
            customer_id: "",
            date: today.getDay() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear(),
        };

    }
    goSaveProduct() {
        const { goBack } = this.props.navigation;

        const var1 = {
            id: "id_",
            text: var2 + 1,
            product_id: this.state.product_id,
            product_code: this.state.product_code,
            product_name: this.state.product_name,
            product_qty: this.state.product_qty,
            textProductRemark: this.state.textRemark,
        }

        if (this.state.product_id != "") {
            this.props.navigation.state.params.onSelect(var1);
            goBack();
        } else {
            Alert.alert("กรุณาใส่รหัสสินค้า")
        }
    }


    confirmProduct() {

        console.warn(this.state.product_id, this.state.product_code, this.state.product_name, this.state.product_qty, this.state.delivery, this.state.customer_id)

    }

    ///------------------------------------------------------------- Service Autocomplete -----------------------------------------------------/////////////////

    componentDidMount() {

        fetch(GLOBALS.SERVICE_URL + '/getProductAutocomplete.php')
            .then(res => res.json())
            .then((json) => {
                // console.warn(json)
                const { results: films } = json;
                this.setState({ films });
                this.setState({ customer: json.customer })
            });


    }
    findFilm(query) {
        if (query === '') {
            return [];
        }
        const { films } = this.state;
        const regex = new RegExp(`${query.trim()}`, 'i');
        return films.filter(film => film.product_code.search(regex) >= 0);

    }


    ///-----------------------------------------------------------------------------------------------------------------------------------///////////



    render() {
        const { goBack } = this.props.navigation;
        //console.warn(this.state.date)
        const { query } = this.state;
        const films = this.findFilm(query);
        const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

        var dataPickerCustomer = []


        if (this.state.customer != null) {
            for (i = 0; i < this.state.customer.length; i++) {
                dataPickerCustomer.push(
                    <Picker.Item label={this.state.customer[i].customer_name_en} value={this.state.customer[i].customer_id} />
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
                            เลือกสินค้ารีกรายน์
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
                                    รหัสสินค้า / Product Code
                                </Text>
                                <Text style={{ color: 'red', padding: 8 }}>  * </Text>
                            </View>
                            <Autocomplete
                                autoCapitalize="none"
                                autoCorrect={false}
                                containerStyle={styles.TextInput}
                                data={films.length === 1 && comp(query, films[0].product_code) ? [] : films}
                                defaultValue={query}
                                onChangeText={text => this.setState({ query: text })}
                                // placeholder="Enter Star Wars film title"
                                listStyle={{ height: 200 }}
                                renderItem={({ product_code, product_name, product_id }) => (

                                    <TouchableOpacity
                                        onPress={
                                            () => this.setState({
                                                query: product_code,
                                                product_name: product_name,
                                                product_code: product_code,
                                                product_id: product_id
                                            })
                                        }>

                                        <Text style={styles.itemText}>
                                            {product_code}
                                        </Text>
                                    </TouchableOpacity>

                                )}
                            />
                        </View>
                        <View style={styles.BoxlistItem}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <Text
                                    style={styles.ContentItemTitle}
                                >
                                    ชื่อสินค้า / Product Name
                                </Text>
                                <Text style={{ color: 'red', padding: 8 }}>  * </Text>
                            </View>
                            <TextInput
                                editable={false}
                                value={this.state.product_name}
                                style={{ color: '#000000', padding: 8 }}
                            >
                            </TextInput>
                        </View>

                        <View style={styles.BoxlistItem}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <Text
                                    style={styles.ContentItemTitle}
                                >
                                    จำนวน / Qty
                                </Text>
                                <Text style={{ color: 'red', padding: 8 }}>  * </Text>
                            </View>
                            <TextInput
                                //editable={false}
                                keyboardType='numeric'
                                onChangeText={(pass) => this.setState({ product_qty: pass })}
                                value={this.state.query == '' ? '' : this.state.product_qty}
                                style={styles.TextInput}
                            >
                            </TextInput>
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
                                onPress={() => this.goSaveProduct()}
                                title="ตกลง"
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
        flex: 1,
        padding: 10,
    },
    ImageAdd: {
        width: 70,
        height: 70,
    },
    AddButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
    ButtonItem: {

        marginTop: 15
    },
    TextInput: {
        fontWeight: 'bold',
        borderBottomColor: '#000000',
        borderBottomWidth: 0.5,
        padding: 5
    },
    titleText: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 10,
        marginTop: 10,
        textAlign: 'center'
    },
    autocompleteContainer: {
        marginLeft: 10,
        marginRight: 10
    },
    itemText: {
        fontSize: 15,
        margin: 2
    },
    itemPicker: {
    },

})