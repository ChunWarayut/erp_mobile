import React, { Component } from 'react';

import {
   View,
   StyleSheet,
   Alert,
   TouchableOpacity,
   Text,
   Image,
   TouchableHighlight,
   ListView,
   ScrollView,
   Button,
   Platform,






} from 'react-native';
import { Container, Content, Picker, Form, Header, Left, Body, Title, Right, Spinner } from 'native-base';

// import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';


import GLOBALS from '../GLOBALS';
export default class ProductList extends Component {

   constructor(props) {
      super(props);
      const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
      this.state = {
         product_id: '',
      };

   }

   componentWillMount() {

      this.fetchData()

   }

   async fetchData() {

      fetch(GLOBALS.SERVICE_URL + '/getProductDetail.php', {

         method: 'POST',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            product_id: this.props.navigation.state.params.data.toString(),
         })

      })
         .then((response) => response.json())
         .then((responseJson) => {

            this.setState({
               data_source: this.state.data_source,
               product_detail: responseJson,
            })
            console.warn(responseJson);
         })
         .catch((error) => {
            console.error(error);
         });

   }

   render() {
      const { goBack } = this.props.navigation;
      console.warn(this.props.navigation.state.params.data.toString());
      return (
         <Container >
            <View>
               <Header style={{ backgroundColor: '#FFFFFF' }}>
                  <Left style={{ flex: 0.2 }}>
                     <TouchableOpacity
                        onPress={() => goBack()}
                        style={{ width: 32, height: 32 }}
                     >
                        {/* <Image
                          source={GLOBALS.IconBack}
                          style={styles.icon}
                      /> */}
                        <Icon name='angle-left' style={styles.icon} />

                     </TouchableOpacity>
                  </Left>

                  <Body>
                     <Title style={styles.title}>รายละเอียดสินค้า</Title>
                  </Body>
                  <Right>

                  </Right>
               </Header>
               <Text>
                  รายละเอียดสินค้า
               </Text>
            </View>



         </Container>
      );
   }
}
export { ProductList };

const styles = StyleSheet.create({
   icon: {
      width: 32,
      height: 32,
   },
   title: {
      color: '#000000',
      textAlign: 'center',
   }
})