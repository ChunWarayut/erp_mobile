import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, AppRegistry } from 'react-native'
import { Header } from 'react-native-elements'
   
class ProductList extends Component {
   state = {
      names: [
         {
            id: 0,
            name: 'Ben',
         },
         {
            id: 1,
            name: 'Susan',
         },
         {
            id: 2,
            name: 'Robert',
         },
         {
            id: 3,
            name: 'Mary',
         }
      ]
   }
   alertItemName = (item) => {
      alert(item.name)
   }
   render() {

    
      return (
         <View>

                <Header
                leftComponent={{ icon: 'menu', color: '#fff' }}
                centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
                rightComponent={{ icon: 'home', color: '#fff' }}
                />
            {
               this.state.names.map((item, index) => (
                  <TouchableOpacity
                     key = {item.id}

                     style = {styles.container}
                     onPress = {() => this.alertItemName(item)}>


                     <Text style = {styles.text}>
                        {item.name}
                     </Text>
                  </TouchableOpacity>
               ))

               
              
            

            }
         </View>
         
      )
   }
}export default ProductList

const styles = StyleSheet.create ({
    container: {
       padding: 40,
       marginTop:5,
       backgroundColor: '#d9f9b1',
       alignItems: 'center',
    },
    text: {
       color: '#4f603c'
    }
 })