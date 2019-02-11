import React from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
} from 'react-native';
import {ListItem } from'native-base'
import Icon from 'react-native-vector-icons/FontAwesome'
import {About} from './about';
import {Homescreen} from './homescreen';
const window = Dimensions.get('window');
const uri = 'https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png';



export default function Menu({ onItemSelected }) {
  return (
    <ScrollView scrollsToTop={false} style={styles.menu}>
          <View style={styles.header}>
              <View style={styles.headerContent}>
                  <Image style={styles.avatar}
                    source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
                    <View style={{ padding: 5 , flex: 1 }}>
                      <Text style={styles.item}>John Doe </Text>
                      <Text style={styles.item}>jhonnydoe@mail.com </Text>
                      <Text style={styles.item}>Florida </Text>
                    </View>
              </View>
          </View>
      <View style={{ padding: 3 }}> 
          <ListItem style={styles.list}>
              <Icon name='home' style={styles.icon} />
              <Text
                onPress={() => onItemSelected( <Homescreen/>)}
                style={styles.item}
              >
                หน้าเเรก
              </Text>
          </ListItem>
          <ListItem style={styles.list}>
          <Icon name='search' style={styles.icon} />
              <Text
                onPress={() => onItemSelected('Contacts')}
                style={styles.item}
              >
                ค้นหาสินค้า
              </Text>
          </ListItem>
          <ListItem style={styles.list}>
          <Icon name='clipboard' style={styles.icon} />
              <Text
                onPress={() => onItemSelected( <About/>)}
                style={styles.item}
              >
                สั่งซื้อสินค้า
              </Text>
          </ListItem>
          <ListItem style={styles.list}>
          <Icon name='list' style={styles.icon} />
              <Text
                onPress={() => onItemSelected( <About/>)}
                style={styles.item}
              >
                สั่งทดสอบสินค้า
              </Text>
          </ListItem>
          <ListItem style={styles.list}>
          <Icon name='id-badge' style={styles.icon} />
              <Text
                onPress={() => onItemSelected( <About/>)}
                style={styles.item}
              >
                ลูกค้า
              </Text>
          </ListItem>
          <ListItem style={styles.list}>
          <Icon name='search' style={styles.icon} />
              <Text
                onPress={() => onItemSelected( <About/>)}
                style={styles.item}
              >
                รีกายร์สินค้า
              </Text>
          </ListItem>
          <ListItem style={styles.list}>
          <Icon name='address-card' style={styles.icon} />
              <Text
                onPress={() => onItemSelected( <About/>)}
                style={styles.item}
              >
                โปรไฟล์
              </Text>
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
    color: '#FFFFFF'
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

