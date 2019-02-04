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
	ChekBox, AsyncStorage,Image
} from 'react-native';
import { TabNavigator } from "react-navigation";


export default class SplashScreen  extends Component {
	/*
	navigationOptions = {
		title: `A`,
		headerBackTitle: null
	  }
*/

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
					this.props.navigation.replace('Login');
				});
			}, 2500
			)
	}
	
	render() {
		return (
			<View style={styles.container}>
  				<Image 
					style={styles.image}
					source={require('../image/arno.jpg')}
                 />
			</View>
			);

		}
	}

	const styles = StyleSheet.create ({
		image: {
			width: 200, 
			height: 90 ,
			resizeMode: 'contain' ,
			borderRadius:2,
			
		},
		container: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
			
		  },
	})