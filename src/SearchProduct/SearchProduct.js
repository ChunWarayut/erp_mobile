import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    AppRegistry, 
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    TouchableHighlight,
    Alert,
    Text, 
    TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';

import {ListItem } from'native-base'
import { Input, Header } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';


// const window = Dimensions.get('window');



export default class SearchProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            stock_group: [],
            isLoading: false,
            Num: 0
        }
    }

    clickMe() {
        this.props.navigation.replace('ProductList')
    }

    componentDidMount() {

        return fetch('http://192.168.0.165/RevelSoft/web_service/controller/getStockGroup.php')
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



    render() {
        var colNum = this.state.Num

        let data = [];

       for( i = 0 ; i < colNum ; i++){
        data[i]  = {
            value: this.state.stock_group[i].stock_group_name
           }
       }

       
        return (
            <View>

                <Header
                    leftComponent={{ icon: 'menu', color: '#fff' }}
                    centerComponent={{ text: 'Search Product', style: { color: '#fff' } }}
                    rightComponent={{ icon: 'home', color: '#fff' }}
                />

                <Dropdown
                    label='คลังสินค้า/Stock'
                    data={data}
                    errorMessage='Example: -.'
                />

                <Input

                    placeholder='คำค้น'
                    shake={true}
                    errorStyle={{ color: 'back' }}
                    errorMessage='Example: T001.'
                />

               
                <Button
                    onPress={onPressLearnMore}
                    title="ค้นหา"
                    color="#841584"
                />
                            

            </View>
        )
    }


}



export { SearchProduct };