
import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    StyleSheet,
    Button,
    Platform,
    Alert,
    AsyncStorage
} from 'react-native';
import { Header, Left, Body, Title, Right, Content } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome'
import GLOBALS from '../GLOBALS';
import SignatureView from './SignatureView';

export default class EditSignature extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            getdata: null

        };

    }

    _showSignatureView() {
        this._signatureView.show(true);
    }

    _onSave(result) {
        const base64String = `data:image/png;base64,${result.encoded}`;
        this.setState({ data: base64String });
        this.seveSignature(base64String)
        this._signatureView.show(false);
    }

    getSignatrue() {
        if (this.props.navigation.state.params.data.toString() != "") {
            this.setState({ data: this.props.navigation.state.params.data.toString() })
        }
    }

    async seveSignature(item) {
        await AsyncStorage.getItem('Login_token')
            .then((token) => {
                this.setState({ userid: token });
                
                console.warn(item)
                fetch(GLOBALS.SERVICE_URL + '/updateUserSignature.php/', {

                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({

                        userid: token,
                        signature: item
                        
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

        this.getSignatrue()

    }


    render() {
        const { data } = this.state;
        const { goBack } = this.props.navigation;
        var strImage = []

        if (this.state.data != null) {
            strImage.push(
                <Image
                    resizeMode={'contain'}
                    style={{ width: 300, height: 300 }}
                    source={{ uri: data }}
                />
            )
        } else {
            strImage.push(

                <Image
                    resizeMode={'contain'}
                    style={{ width: 300, height: 300 }}
                    source={require('../../image/signatur/defaultSignature.png')}
                />
            )
        }


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
                                เเก้ไขลายเซ็น
                        </Title>
                        </Body>
                        <Right style={{ flex: 0.2 }}>

                        </Right>
                    </Header>

                    <View style={styles.body}>
                        <View style={styles.ImageSignature}>
                            {strImage}
                        </View>
                    </View>

                    <View style={styles.footer}>

                        <Button
                            onPress={this._showSignatureView.bind(this)}
                            title="เเก้ไขลายเซ็น"
                            color="#8ed1fc"
                            accessibilityLabel="Learn more about this purple button"
                        />

                        <SignatureView
                            ref={r => this._signatureView = r}
                            rotateClockwise={!!true}
                            onSave={this._onSave.bind(this)}
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
        color: '#000000',
    },
    title: {
        color: '#000000',
        textAlign: 'center',
    },
    body: {

        flex: 0.4,
        backgroundColor: "#ffffff",
        padding: 5,
        alignItems: 'center',

    },
    flexCenter: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    footer: {
        flex: 0.6,
        backgroundColor: "#ffffff",
        padding: 15,
    },
    ImageSignature: {
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
    }



})