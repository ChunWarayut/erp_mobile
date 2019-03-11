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

product_list_detail = [];
var sum_qty = 0;
export default class ProductList extends Component {

   constructor(props) {
      super(props);
      const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
      this.state = {
         data_source: ds.cloneWithRows(product_list_detail),
         product_id: '',
         product_detail: [],
         product_list_detail: [],
         sum_product_qty: 0,
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
               product_detail: responseJson.product_detail,
               sum_product_qty: responseJson.sum_qty,
               data_source: this.state.data_source.cloneWithRows(responseJson.product_list_detail),

            })
            console.warn(responseJson);
         })
         .catch((error) => {
            console.error(error);
         });

   }

   renderRow(rowData, sectionID, rowID, higlightRow) {

     

      return (
         <View style={styles.listItem}>
            <View style={{ flex: 1, width: 32 }}>
               <Text style={{ flex: 1, textAlign: 'center' }}> {parseInt(rowID) + 1}. </Text>
            </View>

            <View style={{ flex: 8, }}>
               <View style={styles.listItemContentRow}>
                  <Text style={styles.listItemContentTitle}> {rowData.stock_group_name} </Text>
               </View>
            </View>

            <View style={{ flex: 1, width: 64 }} >
               <Text style={{ flex: 1, textAlign: 'right', paddingRight: 8, }}> {rowData.stock_report_qty} </Text>
            </View>

         </View>

      )
   }


   render() {
      const { goBack } = this.props.navigation;

      console.warn(sum_qty)
      return (
         <Container >
            <Header style={{ backgroundColor: '#FFFFFF' }}>
               <Left style={{ flex: 1 }}>
                  <TouchableOpacity
                     onPress={() => goBack()}
                     style={{ width: 32, height: 32 }}
                  >
                     <Icon name='angle-left' style={styles.headerIcon} />

                  </TouchableOpacity>
               </Left>

               <Body>
                  <Title style={styles.title}>รายละเอียดสินค้า</Title>
               </Body>
               <Right>

               </Right>
            </Header>


            <View style={{ height: 240, padding: 15 }}>

               <View style={styles.ContentRow}>
                  <View style={{ flex: 1 }}>
                     <View style={styles.ContentRow}>
                        <Text style={styles.ContentItemTitle}> รหัสสินค้า </Text>
                     </View>
                     <View style={styles.ContentRow}>
                        <Text style={styles.ContentItemDetail}>
                           {this.state.product_detail.product_code}
                        </Text>
                     </View>
                  </View>
               </View>

               <View style={styles.ContentRow}>
                  <View style={{ flex: 1 }}>
                     <View style={styles.ContentRow}>
                        <Text style={styles.ContentItemTitle}> ชื่อสินค้า </Text>
                     </View>
                     <View style={styles.ContentRow}>
                        <Text style={styles.ContentItemDetail}>
                           {this.state.product_detail.product_name}
                        </Text>
                     </View>
                  </View>
               </View>



               <View style={styles.ContentRow}>
                  <View style={{ flex: 1 }}>
                     <View style={styles.ContentRow}>
                        <Text style={styles.ContentItemTitle}> ลักษณะ </Text>
                     </View>
                     <View style={styles.ContentRow}>
                        <Text style={styles.ContentItemDetail}>
                           {this.state.product_detail.product_category_name}
                        </Text>
                     </View>
                  </View>

                  <View style={{ flex: 1 }}>
                     <View style={styles.ContentRow}>
                        <Text style={styles.ContentItemTitle}> กลุ่มสินค้า </Text>
                     </View>
                     <View style={styles.ContentRow}>
                        <Text style={styles.ContentItemDetail}>
                           {this.state.product_detail.product_group}
                        </Text>
                     </View>
                  </View>
               </View>


               <View style={styles.ContentRow}>
                  <View style={{ flex: 1 }}>
                     <View style={styles.ContentRow}>
                        <Text style={styles.ContentItemTitle}> ประเภท </Text>
                     </View>
                     <View style={styles.ContentRow}>
                        <Text style={styles.ContentItemDetail}>
                           {this.state.product_detail.product_type}
                        </Text>
                     </View>
                  </View>

                  <View style={{ flex: 1 }}>
                     <View style={styles.ContentRow}>
                        <Text style={styles.ContentItemTitle}> หน่วยสินค้า </Text>
                     </View>
                     <View style={styles.ContentRow}>
                        <Text style={styles.ContentItemDetail}>
                           {this.state.product_detail.product_unit}
                        </Text>
                     </View>
                  </View>
               </View>


               <View style={styles.ContentRow}>
                  <View style={{ flex: 1 }}>
                     <View style={styles.ContentRow}>
                        <Text style={styles.ContentItemTitle}> รายละเอียดสินค้า </Text>
                     </View>
                     <View style={styles.ContentRow}>
                        <Text style={styles.ContentItemDetail}>
                           {this.state.product_detail.product_description}
                        </Text>
                     </View>
                  </View>
               </View>


               <View style={styles.listItemStock}>
                  <View style={{ flex: 0.6, }}>
                     <View style={styles.listItemContentRow}>
                        <Text style={styles.listItemContentTitle}> คลังสินค้า</Text>
                     </View>
                  </View>

                  <View style={{ flex: 1, width: 40 }} >
                     <Text style={{ flex: 1, textAlign: 'right', paddingRight: 8, }}> จำนวนทั้งหมด {this.state.sum_product_qty}</Text>
                  </View>

                  {/* <View style={{ flex: 1, width: 32 }}>
                     <Text style={{ flex: 1, textAlign: 'center' }}> {parseInt(rowID) + 1} </Text>
                  </View> */}

               </View>
            </View>


            <View style={{ paddingTop: 0 }}>
               <ScrollView>
                  <ListView
                     style={styles.listBody}
                     dataSource={this.state.data_source}
                     renderRow={this.renderRow.bind(this)} />
               </ScrollView>
            </View>

            <View style={styles.viewImage}>

               <Image style={styles.image} source={require('../../image/default.png')} />
            </View>

         </Container >
      );
   }
}
export { ProductList };

const styles = StyleSheet.create({
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
   listItemStock: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'stretch',
      paddingTop: 20,
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
   image: {
      width: 250,
      height: 250,
      borderWidth: 1,
      borderColor: 'black'
   },
   viewImage: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 10
   }

})