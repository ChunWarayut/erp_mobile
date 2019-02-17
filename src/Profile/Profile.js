
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
    Dimensions,
    StyleSheet, 
    View,
    Image,
    Text,
    TextInput,
    AsyncStorage,
    TouchableOpacity
} from 'react-native';
import { ListItem } from 'native-base'
import { Header, Left, Body, Title, Right } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome'
import GLOBALS from '../GLOBALS'; 
const window = Dimensions.get('window'); 



class Profile extends Component {

    constructor(props) {
        super(props); 
        this.state = {
            len: false,
            userid: "",
            datauser: [],
            user_prefix: '',
            user_name: '',
            user_lastname: '',
            user_email: '',
            user_mobile: '',
            isOpen: false,
        }
    }


    async fetchData() {

        await AsyncStorage.getItem('Login_token')
            .then((token) => {
                this.setState({ userid: token });
                console.warn(token);

                fetch(GLOBALS.URL + 'controllers/getUserProfile.php/', {

                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({

                        username: token,

                    })

                })
                    .then((response) => response.json())
                    .then((responseJson) => {

                        if (responseJson.result == true) {

                            this.setState({ datauser: responseJson.user })
                            this.setState({ len: responseJson.result })
                        } else {
                            //this.props.navigation.navigate('Login');
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    });

            });

    }

    componentWillMount() {

        this.fetchData()

    }

    render() {
        console.warn(this.props);
        var dataUserCode = []
        var dataUserPrefix = []
        var dataName = []
        var dataLastname = []
        var dataUserMobile = []
        var dataEmail = []
        var dataUserName = []
        var dataPassWord = []
        if (this.state.len) {
            

            dataUserCode.push(
                <Text style={styles.text}>
                    {this.state.datauser.user_code}
                </Text>
            )
            dataUserPrefix.push(
                <Text style={styles.text}>
                    {this.state.datauser.user_prefix}
                </Text>
            )
            dataName.push(
                <Text style={styles.text}>
                    {this.state.datauser.user_name}
                </Text>
            )
            dataLastname.push(
                <Text style={styles.text}>
                    {this.state.datauser.user_lastname}
                </Text>
            )
            dataUserMobile.push(
                <Text style={styles.text}>
                    {this.state.datauser.user_mobile}
                </Text>
            )
            dataEmail.push(
                <Text style={styles.text}>
                    {this.state.datauser.user_email}
                </Text>
            )
            dataUserName.push(
                <Text style={styles.text}>
                    {this.state.datauser.user_username}
                </Text>
            )
            dataPassWord.push(
                <TextInput secureTextEntry={true} editable={false} style={styles.text}>
                    {this.state.datauser.user_password}
                </TextInput>
            )
        }

        return (

            <View>

                <Header style={{ backgroundColor: '#FFFFFF' }}>
                    <Left>
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

                    <Body>
                        <Title>ประวัติส่วนตัว</Title>
                    </Body>
                    <Right>

                    </Right>

                </Header>

                <View style={styles.header}>

                    <Image
                        style={styles.image}
                        source={require('../../image/imagedefault.png')}
                    />

                </View>

                <View style={styles.body} >

                    <View>
                        <ListItem>

                            <View style={styles.list}>
                                <View style={styles.viewCol}>

                                    <Text style={styles.texthead}>
                                        รหัสพนักงาน / User Code
                                            </Text>
                                    {dataUserCode}
                                </View>
                            </View>
                        </ListItem>
                        <ListItem  >
                            <View style={styles.list}>
                                <View style={styles.viewCol}>
                                    <Text style={{ fontSize: 14 }}>
                                        คำนำหน้าชื่อ / Prename
                                            </Text>
                                    {dataUserPrefix}
                                </View>

                            </View>
                        </ListItem>
                        <ListItem>
                            <View style={styles.list}>
                                <View style={styles.viewCol}>
                                    <Text style={{ fontSize: 14 }}>
                                        ชื่อ / Name
                                            </Text>
                                    {dataName}
                                </View>

                            </View>
                        </ListItem>
                        <ListItem>
                            <View style={styles.list}>
                                <View style={styles.viewCol}>
                                    <Text style={{ fontSize: 14 }}>
                                        นามสกุล / Lastname
                                            </Text>
                                    {dataLastname}
                                </View>

                            </View>
                        </ListItem>
                        <ListItem
                        onPress={ () => this.props.navigation.navigate('EditProfilePhon') } 
                        >
                            <View style={styles.list}>
                                <View style={styles.viewCol}>
                                    <Text style={{ fontSize: 14 }}>
                                        โทรศัพท์ / Mobile
                                            </Text>
                                    {dataUserMobile}
                                </View>
                                <View style={{ padding: 10 }} >
                                    <Icon name='angle-right' style={styles.icon} />
                                </View>
                            </View>
                        </ListItem>
                        <ListItem>
                            <View style={styles.list}>
                                <View style={styles.viewCol}>
                                    <Text style={{ fontSize: 14 }}>
                                        อีเมล์ / Email
                                            </Text>
                                    {dataEmail}
                                </View>
                                <View style={{ padding: 10 }} >
                                    <Icon name='angle-right' style={styles.icon} />
                                </View>
                            </View>
                        </ListItem>
                        <ListItem>
                            <View style={styles.list}>
                                <View style={styles.viewCol}>
                                    <Text style={{ fontSize: 14 }}>
                                        ชื่อผู้ใช้ / Username
                                            </Text>

                                    {dataUserName}
                                </View>
                                <View style={{ padding: 10 }} >
                                    <Icon name='angle-right' style={styles.icon} />
                                </View>
                            </View>

                        </ListItem>
                        <ListItem>

                            <View style={styles.list}>
                                <View style={styles.viewCol}>
                                    <Text style={{ fontSize: 14 }}>
                                        รหัสผ่าน / Password
                                            </Text>

                                    {dataPassWord}
                                </View>
                                <View style={{ padding: 10 }} >
                                    <Icon name='angle-right' style={styles.icon} />
                                </View>
                            </View>
                        </ListItem>

                    </View>

                </View>
            </View>
        )
    }


}

const styles = StyleSheet.create({
    header: {
        paddingTop:24,
        flex: 0.25,
        backgroundColor: "#ffffff",
        alignItems: 'center',

    },
    body: {

        flex: 0.75,
        backgroundColor: "#ffffff",
        padding: 5,
        // alignItems: 'center',

    },
    image: {
        width: 85,
        height: 85,
        borderRadius: 35,
        padding: 15,
    },
    listItem: {
        flex: 1,
    },
    item: {
        flex: 1,
        //flexDirection: 'row'
    },
    icon: {
        fontSize: 34,
        color: '#000000',
        flex: 0.3
    },
    list: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between'
    },
    viewCol: {
        flexDirection: 'column'
    },
    textHead: {
        fontSize: 14
    },
    text: {
        fontSize: 20,
        padding: 5
    }
})
export { Profile };