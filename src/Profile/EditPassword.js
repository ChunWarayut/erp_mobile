
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

export default class EditPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            newpass: null,
            oldpass: null,
            conpass: null,
        };

    }
    getPassword() {
        if (this.props.navigation.state.params.data.toString() != "") {
            this.setState({ data: this.props.navigation.state.params.data.toString() })
        }
    }

    checkPassword() {
        const password = this.state.data
        const oldpassword = this.state.oldpass
        const newpassword = this.state.newpass
        const conpassword = this.state.conpass
        if (oldpassword != password) {
            Alert.alert("รหัสเดิมผ่านไม่ถูกต้อง")
        } else if (newpassword != conpassword) {
            Alert.alert("ยืนยันรหัสผ่านไม่ถูกต้อง")
        } else {
            this.savePassword(newpassword)
        }
    }

    async savePassword(item) {

        await AsyncStorage.getItem('Login_token')
            .then((token) => {
                console.warn(token)
                fetch(GLOBALS.SERVICE_URL + '/updateUserPassword.php/', {

                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({

                        userid: token,
                        password: item

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

        this.getPassword()

    }


    render() {
        console.warn(this.state.data)
        const { goBack } = this.props.navigation;
        return (
            <Content style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
                <View>
                    <Header style={{ backgroundColor: '#FFFFFF' }}>
                        <Left style={{ flex: 0.2 }}>
                            <TouchableOpacity
                                onPress={() => goBack()}
                                style={{ width: 32, height: 32 }}
                            >
                                <Icon name='angle-left' style={styles.icon} />

                            </TouchableOpacity>
                        </Left>

                        <Body style={{ alignItems: 'center', flex: 0.8 }}>
                            <Title
                                style={styles.title}
                            >
                                เเก้ไขรหัสผ่าน
                        </Title>
                        </Body>
                        <Right style={{ flex: 0.2 }}>

                        </Right>

                    </Header>
                    <View style={styles.body}>

                        <View style={styles.ViewPass}>
                            <Text>
                                รหัสผ่านเดิม
                            </Text>
                            <TextInput
                                secureTextEntry={true}
                                style={styles.textinput}

                                onChangeText={oldpass => this.setState({ oldpass })}
                            />
                        </View>
                        <View style={styles.ViewPass}>
                            <Text>
                                รหัสผ่านใหม่
                            </Text>
                            <TextInput
                                secureTextEntry={true}
                                style={styles.textinput}

                                onChangeText={newpass => this.setState({ newpass })}
                            />
                        </View>
                        <View style={styles.ViewPass}>
                            <Text>
                                ยืนยันรหัสผ่าน
                            </Text>
                            <TextInput
                                secureTextEntry={true}
                                style={styles.textinput}

                                onChangeText={conpass => this.setState({ conpass })}
                            />
                        </View>

                    </View>
                    <View style={{ padding: 15 }}>
                        <Button
                            title="บันทึก"
                            color="#8ed1fc"
                            accessibilityLabel="Learn more about this purple button"
                            style={styles.button}
                            onPress={() => this.checkPassword()}
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
        marginTop: 10,
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
    },
    ViewPass: {
        marginTop: 5,
        padding: 5,
    },




})