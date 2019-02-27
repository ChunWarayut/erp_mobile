
import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    StyleSheet,
    Button,
    Platform,
    AsyncStorage,
    Alert
} from 'react-native';
import { Header, Left, Body, Title, Right, Content } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome'
import GLOBALS from '../GLOBALS';
import { TextInput } from 'react-native-gesture-handler';

export default class EditEmail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            getdata: null,
            selected: 1

        };


    }

    

    getEmail() {
        if (this.props.navigation.state.params.data.toString() != "") {
            this.setState({ data: this.props.navigation.state.params.data.toString() })
        }
    }

    Back() {
        const { navigation } = this.props;
        navigation.goBack();
        //navigation.state.params.onCheck();
      }



    async saveEmail(item) {

        await AsyncStorage.getItem('Login_token')
            .then((token) => {
                console.warn(token)
                fetch(GLOBALS.SERVICE_URL + '/updateUserEmail.php/', {

                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({

                        userid: token,
                        email: item

                    })

                })
                    .then((response) => response.json())
                    .then((responseJson) => {
                        console.warn(responseJson);
                        if (responseJson.result == true) {

                            Alert.alert("เเก้ไขข้อมูลสำเร็จ")

                        } else {
                            Alert.alert("เเก้ไขข้อมูลไม่สำเร็จ")
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            });
    }
    componentDidMount() {

        this.getEmail()

    }


    render() {
        console.warn(this.state.data)
        console.warn(this.props.navigation.state.params)
        return (
            <Content style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
                <View>
                    <Header style={{ backgroundColor: '#FFFFFF' }}>
                        <Left style={{ flex: 0.2 }}>
                            <TouchableOpacity
                                onPress={() => this.Back()}
                                style={{ width: 32, height: 32 }}
                            >
                                {/* <Image
                                source={GLOBALS.IconBack}
                                style={styles.icon}
                            /> */}
                                <Icon name='angle-left' style={styles.icon} />

                            </TouchableOpacity>
                        </Left>

                        <Body style={{ alignItems: 'center', flex: 0.8 }}>
                            <Title
                                style={styles.title}
                            >
                                เเก้ไขอีเมล
                        </Title>
                        </Body>
                        <Right style={{ flex: 0.2 }}>

                        </Right>

                    </Header>
                    <View style={styles.body}>
                        <TextInput

                            style={styles.textinput}
                            value={this.state.data}
                            onChangeText={data => this.setState({ data })}
                        />


                    </View>
                    <View style={{ padding: 15 }}>
                        <Button
                            title="บันทึก"
                            color="#8ed1fc"
                            accessibilityLabel="Learn more about this purple button"
                            style={styles.button}
                            onPress={() => this.saveEmail(this.state.data)}
                        />
                    </View>
                </View>
            </Content>
        )
    }


}

const styles = StyleSheet.create({
    icon: {
        fontSize: 35,
    },
    title: {
        color: '#000000',
        textAlign: 'center',
    },
    body: {

        flex: 1,
        backgroundColor: "#ffffff",
        padding: 15,
        //alignItems: 'center',

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
    button: {
        padding: 15,
    }



})