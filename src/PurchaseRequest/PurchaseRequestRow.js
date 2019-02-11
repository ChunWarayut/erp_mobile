import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
});

const PurchaseRequestRow = (props) => (
  <View style={styles.container}>
    <Image source={{ uri: props.img_status}} style={styles.photo} />
    <Text style={styles.text}>
      {'${props.purchase_request_code} '}
    </Text>
    <Text style={styles.text}>
      {'${props.purchase_request_date} '}
    </Text>
  </View>
);

export default PurchaseRequestRow;