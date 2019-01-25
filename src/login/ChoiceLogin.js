
import React, {Component} from 'react';
import {Platform, 
        StyleSheet, 
        Text, 
        View,
        Image,
        TouchableHighlight
        } from 'react-native';



export default class ChoiceLogin extends Component {

    constructor(props) {
        super(props)
        this.state = {
             count: 0 ,
             countp:0,
             countt:0,
            }
      }

      arno(){
          this.setState({count: this.state.count+1}); 
      }
      partner(){
        this.setState({countp: this.state.countp+1}); 
      }
      tool(){
        this.setState({countt: this.state.countt+1}); 
      }


	render() {
		return (
			
                <View style={styles.container}>

                    <View style={styles.viwe}> 
                        <View  style={styles.boxSelected}> 
                            <TouchableHighlight onPress = {()=> this.arno() }>
                                <Image 
                                    style={styles.image}
                                  source={require('../../image/arno.jpg')}
                                />
                            </TouchableHighlight >
                        </View>
                        <View style={styles.boxSelected}>
                            <TouchableHighlight onPress = {()=> this.partner()}>
                                <Image 
                                    style={styles.image}
                                    source={require('../../image/partner-chips.jpg')}
                                /> 
                            </TouchableHighlight>
                        </View>
                        <View style={styles.boxSelected}> 
                            <TouchableHighlight  onPress = {()=> this.tool()}>
                                <Image 
                                    style={styles.image}
                                    source={require('../../image/tool-management.jpg')}
                                />
                            </TouchableHighlight>
                        </View>
                    </View>
                    <Text> arno :{this.state.count }</Text>
                    <Text> partner :{this.state.countp }</Text>
                    <Text> tool :{this.state.countt }</Text>
			    </View>
			);
		}
    }
    const styles = StyleSheet.create ({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          //  backgroundColor: '#ecf0f1',
          },
      
        viwe:{
           
            flex: 0.7,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',

          },

          image: {
              width: 200, 
              height: 90 ,
              resizeMode: 'contain' ,
              borderRadius:2,
              
          },

          boxSelected: {
            flex: 1
          }
     })

