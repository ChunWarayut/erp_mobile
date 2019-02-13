import React from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text
} from 'react-native';
import {ListItem } from'native-base'
import Icon from 'react-native-vector-icons/FontAwesome'
import {About} from './About';
import {PurchaseRequestView} from '../PurchaseRequest/PurchaseRequestView';
import {HomeScreen} from './HomeScreen';
import {Profile} from '../Profile/Profile';
const window = Dimensions.get('window');




export default function Menu({ onItemSelected, OnToggle }) {
  return (
    <ScrollView scrollsToTop={false} style={styles.menu}>
          <View style={styles.header}>
              <View style={styles.headerContent}>
                  <Image style={styles.avatar}
                     source={require('../../image/imagedefault.png')}
                  />
                    <View style={{ padding: 5 , flex: 1 }}>
                      <Text style={styles.item}>John Doe </Text>
                      <Text style={styles.item}>jhonnydoe@mail.com </Text>
                      <Text style={styles.item}>Florida </Text>
                    </View>
              </View>
          </View>
      <View style={{ padding: 3 }}> 
              
             
        <ListItem style={styles.list} onPress={() => onItemSelected( <HomeScreen OnToggled = {OnToggle}/>)}>
            <View style = {{flex: 0.25}}>
                <Icon name='home' style={styles.icon} />
            </View>
                <View style = {{flex: 0.7}}>
                <Text
                  style={styles.item}
                >
                  หน้าเเรก
                </Text>
              </View>
          </ListItem>
              
              
          <ListItem style={styles.list} onPress={ () => onItemSelected(<About  OnToggled = {OnToggle}/>)}>
            <View style = {{flex: 0.25}}> 
             <Icon name='search' style={styles.icon} />
            </View>
            <View style = {{flex: 0.7}}> 
              <Text
                style={styles.item}
              >
                ค้นหาสินค้า
              </Text>
          </View>
          </ListItem>
          <ListItem style={styles.list}  onPress={() => onItemSelected(<PurchaseRequestView  OnToggled = {OnToggle}/> )}>
          <View style = {{flex: 0.25}}> 
            <Icon name='clipboard' style={styles.icon} />
          </View>
          <View style = {{flex: 0.7}}>
              <Text
                style={styles.item}
              >
                สั่งซื้อสินค้า
              </Text>
          </View>
          </ListItem>
          <ListItem style={styles.list} onPress={() => onItemSelected( <About  OnToggled = {OnToggle}/>)}>
            <View style = {{flex: 0.25}}>
              <Icon name='tachometer' style={styles.icon} />
            </View>
            <View style = {{flex: 0.7}}>
              <Text
                style={styles.item}
              >
                สั่งทดสอบสินค้า
              </Text>
              </View>
          </ListItem>
          <ListItem style={styles.list}  onPress={() => onItemSelected( <About  OnToggled = {OnToggle}/>)}>
              <View style = {{flex: 0.25}}>
                  <Icon name='id-badge' style={styles.icon} />
              </View>
              
              <View style = {{flex: 0.7}}>
                  <Text
                   
                    style={styles.item}
                  >
                    ลูกค้า
                  </Text>
              </View>
          </ListItem>
          <ListItem style={styles.list}  onPress={() => onItemSelected( <About   OnToggled = {OnToggle}/>)}>
            <View style = {{flex: 0.25}}>
              <Icon name='retweet' style={styles.icon} />
            </View>   
            <View style = {{flex: 0.7}}>
              <Text
               
                style={styles.item}
              >
                รีกายร์สินค้า
              </Text>
            </View>
          </ListItem>
          <ListItem style={styles.list}  onPress={() => onItemSelected( <Profile  OnToggled = {OnToggle}/> )}>
            <View style = {{flex: 0.25}}>
                <Icon name='address-card' style={styles.icon} />
            </View>
              <View style = {{flex: 0.7}}>
                <Text
                 
                  style={styles.item}
                >
                  โปรไฟล์
                </Text>
              </View>
          </ListItem>
        </View>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header:{
    height: window.height - (window.height*0.75) ,
    backgroundColor: "#03A9D1",
    padding: 5,
    
  },
    headerContent:{
    flex: 1,
    alignItems: 'center',
    marginTop:5 ,
  
  },
  menu: {
    flex: 1,
    width: window.width - (window.width*0.35) ,
    height: window.height,
    backgroundColor: '#00B7E3',
   // padding: 20,
  },
  
  avatar: {
    width: 75,
    height: 75,
    borderRadius: 35,
    //flex: 1,
    padding: 15,
  },
  name: {
    position: 'absolute',
    left: 70,
    top: 20,
  },
  item: {
    fontSize: 14,
    fontWeight: '300',
    paddingTop: 5,
    color: '#FFFFFF',
    textAlign:'left'
  },
  list:{
    flex: 1, 
    flexDirection: 'row'
  },
  icon:{
    fontSize: 35, 
    color: '#FFFFFF', 
    flex: 0.3
  },
});

Menu.propTypes = {
  onItemSelected: PropTypes.func.isRequired,
};

