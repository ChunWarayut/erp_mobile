import React, { Component } from 'react';

import {
    View,
    Button,
    StyleSheet,
    Alert,
    TouchableOpacity,
    Text,
    Image,
    TouchableHighlight,
    ListView,
    ScrollView,
    Platform,
    CheckBox,



} from 'react-native';
import { Container, Content, Picker, Form, Header, Left, Body, Title, Right } from 'native-base';
import { ButtonGroup } from 'react-native-elements';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import GLOBALS from '../GLOBALS';

notifications = [];
export default class Notification extends Component {

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

        this.state = {
            data_source: ds.cloneWithRows(notifications),
            user_id: '25',
            seen: "",
            type: '',
            str: '',
            check: false,
            selected: undefined,
            selectedIndex: 0,
            result_text: '',
            pressStatusseen: false,
            pressStatusunseen: false,
            pressStatusall: false

        };
        this.updateIndex = this.updateIndex.bind(this)
    }


    setactive1 = () => {
        this.setState({
            pressStatusseen: !this.state.pressStatusseen,
            pressStatusunseen: false,
            pressStatusall: false
        });

        console.warn(this.state.pressStatus);
    }

    setactive2 = () => {
        this.setState({
            pressStatusunseen: !this.state.pressStatusunseen,
            pressStatusseen: false,
            pressStatusall: false
        });

        console.warn(this.state.pressStatusunseen);
    }

    setactive3 = () => {
        this.setState({
            pressStatusall: !this.state.pressStatusall,
            pressStatusseen: false,
            pressStatusunseen: false,
        });

        console.warn(this.state.pressStatusall);
    }





    updateIndex(selectedIndex) {
        this.setState({ selectedIndex })
    }


    componentWillMount() {

        this.all(this.state.seen, this.state.type)

    }

    onValueChange() {
        this.setState({
            selected: value
        });
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    sortseen(seen, type) {
        this.setState({ seen: seen });
        this.all(seen, type);
        if (seen == 'seen') {
            this.setactive1();
        } else if (seen == 'unseen') {
            this.setactive2();
        } else {
            this.setactive3();
        }

    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    sorttype(type) {
        console.warn(type)
        this.setState({ type: type });
        this.sortseen(this.state.seen, type);

    }



    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    all(seen, type) {

        fetch(GLOBALS.SERVICE_URL + '/getNotification.php', {

            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: this.state.user_id,
                seen_type: type,
                seen_state: seen
            })

        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.result == true) {
                    this.setState({
                        data_source: this.state.data_source.cloneWithRows(responseJson.notifications),
                        result_text: ''

                    })
                } else {
                    this.setState({
                        data_source: this.state.data_source.cloneWithRows([]),
                        result_text: 'ไม่มีข้อมูล!'
                    })
                }
                console.warn('after user_id', responseJson.user_id);
                console.warn('after seen_type', responseJson.seen_type);
                console.warn('after seen_state', responseJson.seen_state);
                console.warn('after result_text', responseJson.result_text);
            })
            .catch((error) => {
                console.error(error);
            });

    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    checkBox_Test = (id) => {
        this.setState((prevState) => ({ check: !prevState.check }));
    }



    renderRow(rowData, sectionID, rowID, higlightRow) {

        return (

            <View style={rowData.notification_seen === '1' ? styles.listItem : styles.listItem2}>

                <View style={styles.checkbox}>
                    <CheckBox
                        checked={this.state.check}
                        onChange={this.checkBox_Test}
                    />
                </View>

                {/* <TouchableHighlight onPress={() => this.props.navigation.navigate('ProductList', { data: rowData.product_id })} underlayColor="#03A9F4"> */}
                <View style={{
                    flex: 1,
                    width: 32
                }}>
                    <Text style={{
                        flex: 1,
                        textAlign: 'center'
                    }}> {parseInt(rowID) + 1}. </Text>
                </View>

                <View style={{
                    flex: 8,
                }}>
                    <View style={styles.listItemContentRow}>

                        <Text style={styles.listItemContentTitle}> {rowData.notification_detail} </Text>

                    </View>
                </View>

                <View style={{
                    flex: 1,
                    width: 64
                }}
                >
                    <Text style={{
                        flex: 1,
                        textAlign: 'right',
                        paddingRight: 8,

                    }}> {rowData.notification_seen} </Text>
                </View>
                {/* </TouchableHighlight> */}
            </View>



        )
    }




    render() {
        // const { goBack } = this.props.navigation;
        // console.warn(this.props.navigation.state.params.data.toString());
        // const component1 = () => <View style={styles.component1}><Icon style={styles.icon} name='comments' /></View>
        // const component2 = () => <View style={styles.component2}><Icon style={styles.icon} name='tasks' /></View>
        // const component3 = () => <View style={styles.component3}><Icon style={styles.icon} name='cart-plus' /></View>
        // const component4 = () => <View style={styles.component4}><Icon style={styles.icon} name='life-ring' /></View>
        // const component5 = () => <View style={styles.component5}><Icon style={styles.icon} name='undo' /></View>

        // const component6 = () => <View style={styles.component6}><Icon style={styles.iconAction} name='envelope-open' /></View>
        // const component7 = () => <View style={styles.component7}><Icon style={styles.iconAction} name='envelope' /></View>
        // const component8 = () => <View style={styles.component8}><Icon style={styles.iconAction} name='trash' /></View>

        // const buttons = [{ element: component1 }, { element: component2 }, { element: component3 }, { element: component4 }, { element: component5 }]
        // const { selectedIndex } = this.state

        // const buttonaction = [{ element: component6 }, { element: component7 }, { element: component8 }]
        // const { selectedIndex1 } = this.state


        return (
            <Container >
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

                    <Body>
                        <Title style={styles.title}>การแจ้งแตือน</Title>
                    </Body>
                    <Right>

                    </Right>
                </Header>
                <Content>
                    <View style={{ flex: 1, height: 50, flexDirection: 'row', paddingLeft: 5, paddingRight: 5, paddingTop: 5 }}>
                        <TouchableOpacity style={{ flex: 1 }} onPress={() => this.sorttype('Purchase Request')}><View style={styles.component1}><Icon style={styles.icon} name='comments' /></View></TouchableOpacity>
                        <TouchableOpacity style={{ flex: 1 }} onPress={() => this.sorttype('Purchase Order')}><View style={styles.component2}><Icon style={styles.icon} name='tasks' /></View></TouchableOpacity>
                        <TouchableOpacity style={{ flex: 1 }} onPress={() => this.sorttype('Customer Order')}><View style={styles.component3}><Icon style={styles.icon} name='cart-plus' /></View></TouchableOpacity>
                        <TouchableOpacity style={{ flex: 1 }} onPress={() => this.sorttype('Supplier Approve')}><View style={styles.component4}><Icon style={styles.icon} name='life-ring' /></View></TouchableOpacity>
                        <TouchableOpacity style={{ flex: 1 }} onPress={() => this.sorttype('')}><View style={styles.component5}><Icon style={styles.icon} name='undo' /></View></TouchableOpacity>
                    </View>


                    <View style={{ padding: 5, flexDirection: 'row' }}>
                        <View style={styles.border}>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                placeholder="All"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                style={{ width: '100%' }}
                                selectedValue={this.state.selected}
                                onValueChange={this.onValueChange.bind(this)}
                            >
                                <Picker.Item label="All" value="key0" />
                                <Picker.Item label="Seen" value="key1" />
                                <Picker.Item label="Unseen" value="key2" />
                                <Picker.Item label="NoSelect" value="key3" />
                            </Picker>
                        </View>

                        <View style={{ flex: 1, width: 64, flexDirection: 'row', paddingLeft: 30 }}>
                            <TouchableOpacity style={this.state.pressStatusseen ? styles.active : styles.nonactive} onPress={() => this.sortseen('seen', this.state.type)}><Text style={styles.textTouchableOpacity}>Seen</Text></TouchableOpacity>
                            <TouchableOpacity style={this.state.pressStatusunseen ? styles.active : styles.nonactive} onPress={() => this.sortseen('unseen', this.state.type)}><Text style={styles.textTouchableOpacity}>Unseen</Text></TouchableOpacity>
                            <TouchableOpacity style={this.state.pressStatusall ? styles.active : styles.nonactive} onPress={() => this.sortseen('', this.state.type)}><Text style={styles.textTouchableOpacity}>All</Text></TouchableOpacity>
                        </View>
                    </View>


                    <View style={{ flex: 1, height: 30, flexDirection: 'row', paddingLeft: 5, paddingRight: 5, paddingTop: 5 }} >
                        <TouchableOpacity style={{ flex: 1 }} onPress={() => this.sorttype('Purchase Request')}><View style={styles.component6}><Icon style={styles.iconAction} name='envelope-open' /></View></TouchableOpacity>
                        <TouchableOpacity style={{ flex: 1 }} onPress={() => this.sorttype('Purchase Order')}><View style={styles.component7}><Icon style={styles.iconAction} name='envelope' /></View></TouchableOpacity>
                        <TouchableOpacity style={{ flex: 1 }} onPress={() => this.sorttype('Customer Order')}><View style={styles.component8}><Icon style={styles.iconAction} name='trash' /></View></TouchableOpacity>
                    </View>



                    <View style={{ padding: 10 }}>
                        <ScrollView>
                            <ListView
                                style={styles.listBody}
                                dataSource={this.state.data_source}
                                renderRow={this.renderRow.bind(this)} />
                            <View>
                                <Text style={{ textAlign: 'center' }}>
                                    {this.state.result_text}
                                </Text>
                            </View>
                        </ScrollView>
                    </View>
                </Content>
            </Container >
        );
    }
}
export { Notification };

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#DDDDDD',
        width: 180,
        height: 40,
    },
    border: {
        borderRadius: 4,
        borderWidth: 0.8,
        width: '30%',
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
    textTouchableOpacity: {
        flex: 1,
        textAlign: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 15,
        color: 'blue'
    },
    icon: {
        flex: 1,
        color: 'white',
        fontSize: 32,
        alignItems: 'center',
        paddingTop: 8
    },
    iconAction: {
        flex: 1,
        color: 'white',
        fontSize: 20,
        alignItems: 'center',
        paddingTop: 3
    },
    component1: {
        flex: 1,
        backgroundColor: '#337ab7',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50
    },
    component2: {
        flex: 1,
        color: 'white',
        backgroundColor: '#5cb85c',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50
    },
    component3: {
        flex: 1,
        color: 'white',
        backgroundColor: '#f0ad4e',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50
    },
    component4: {
        flex: 1,
        color: 'white',
        backgroundColor: '#d9534f',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50
    },
    component5: {
        flex: 1,
        color: 'white',
        backgroundColor: '#87eab8',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50
    },
    component6: {
        flex: 1,
        backgroundColor: '#37d67a',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    component7: {
        flex: 1,
        backgroundColor: '#ffeb3b',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    component8: {
        flex: 1,
        backgroundColor: '#d9534f',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    checkbox: {

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
    listItemIcon: {
        margin: 4,
        width: 32,
        height: 32,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center'

    },
    listItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'stretch',
        paddingTop: 8,
        paddingBottom: 8
    },
    listItem2: {
        flex: 1,
        backgroundColor: '#a1cbed',
        flexDirection: 'row',
        alignItems: 'stretch',
        paddingTop: 8,
        paddingBottom: 8
    },
    listItemContentRow: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'stretch'
    },

    listItemContent: {
        flex: 1,
        alignItems: 'stretch',
        paddingRight: 4,
    },
    ContentRow: {
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
    },
    MainContainer: {
        flex: 1,
        backgroundColor: '#FFF8E1',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: (Platform.OS) === 'ios' ? 20 : 0,

    },
    selectedItemView: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        padding: 14,
        backgroundColor: '#263238',
        justifyContent: 'center',
        alignItems: 'center'
    },
    selectedText: {
        fontSize: 17,
        color: '#fff'
    },
    active: {
        backgroundColor: '#D9E3F0',

    },
    nonactive: {

    }

})