import React, {Component} from 'react';
import {Platform, 
        StyleSheet, 
        Text, 
        View,
        Image,
        TouchableHighlight,
        Alert,
        AsyncStorage
        } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import GLOBALS from '../GLOBALS';


export default class LoginArno extends Component {
  
    constructor(props) {
      super(props);
      this.state = { 
        userid: '' ,
        pass: '',
        testJson:'',  
      };
    }

    ///-------------------------------------------------------------------Web Service -----------------------------------------------------///////////////////////////
    clickMe(){
      
      const  UserEmail  = this.state.userid;
      const  UserPassword  = this.state.pass;
       

      if(UserEmail != '' && UserPassword != ''){ 
        
          fetch(GLOBALS.SERVICE_URL +'/getLogin.php/', {

              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                
                username: UserEmail,
                password: UserPassword,
        
              })
        
          })
          .then((response) => response.json())
          .then((responseJson) => {
            console.warn(responseJson);
            if(responseJson.result==true){
           // AsyncStorage.setItem('Login_token', this.state.userid);
            AsyncStorage.setItem('Login_token', responseJson.user.user_id);

            this.props.navigation.replace('HomeArno')
             //console.warn(responseJson);
            }else{
              Alert.alert('ไม่มีบัญชีผู้ใช้อยู่ในระบบ');
            }
          })
          .catch((error) => {
            console.error(error);
          });



    }else{         
           Alert.alert('กรุณาใส่  Username เเละ Password');
         }    
    }
    ///-------------------------------------------------------------------------------------------------------------------------------------------------------///

        
	render() {
        return (
            <View  style={styles.container}>

                <View style={{padding: 15}} >
                    <Image 
                      style={styles.image}
                      source={require('../../image/arno.jpg')}
                    />
                </View>
               
                <View style={{padding: 10}} >
                  <TextInput
                    style={styles.textinput}
                    placeholder="Username"
                    onChangeText={(userid) => this.setState({userid})}         
                    value={this.state.text}
                  />
                </View>
                <View style={{padding: 10}}> 
                  <TextInput
                    style={styles.textinput}
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={(pass) => this.setState({pass})}
                    value={this.state.text}
                    
                  />
               </View>
               <View style={{padding: 10}} >
                  <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={ ()=>this.clickMe ()} >
                      <Text style={styles.loginText}>Sign in</Text>
                  </TouchableHighlight>
                </View>
                  <View>
                  <TouchableHighlight style={[ styles.goButton]} >
                      <Text style={styles.goText} >Already have an account?  Sign up</Text>
                  </TouchableHighlight>
                </View>
                
            </View>
        )
    }
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
  
    viwe:{
        flex: 0.7,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      },

      image: {
          width: 280, 
          height: 120 ,
          resizeMode: 'stretch' ,
          borderRadius:2,
          padding: 40,
          
      },

      buttonContainer: {
        height:50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:250,
        borderRadius:18,
        padding:10
      },
      loginText: {
        color: 'white',
      },
      goText: {
        color: '#333',
      },

      loginButton: {
        backgroundColor: "#ff0000",
      },
      goButton: {
        backgroundColor: "#fff",
        
      },

      boxSelected: {
        flex: 1
      },
      textinput:{
       
        height:50,
        width:250,
        backgroundColor:'#fff',
        borderColor: '#b3b3b3',
        paddingHorizontal: 10,
        borderRadius: 18,
        borderWidth: 1,
      }
 })