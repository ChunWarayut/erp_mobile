import React, { Component } from 'react';
import {
	Platform,
	StyleSheet,
	Text,
	View,
	TextInput,
	Button,
	TouchableOpacity,
	ActivityIndicator,
	Dimensions,
	Modal,
	ChekBox, AsyncStorage
} from 'react-native';
import { TabNavigator } from "react-navigation";


export default class Splash extends Component {
	/*
	navigationOptions = {
		title: `A`,
		headerBackTitle: null
	  }
*/
	static NavigationOptions = {
			title: 'HOME',
			headerBackTitle: null
    };
    
/*
	componentWillMount() {
		setTimeout(
			() => {
				AsyncStorage.getItem('Login_token')
				.then((token) => {
					this.setState({ user_id: token });
					if (token == null) {
					//	this.props.navigation.replace('Login');
					}else{
					//	this.props.navigation.replace('Profile');
					}
				});
			}, 2500
			)
	}
*/	
	render() {
		return (
			<View >

				
			</View>
			);

		}
	}

