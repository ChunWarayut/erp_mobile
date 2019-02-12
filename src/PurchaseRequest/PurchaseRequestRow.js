import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Button } from 'native-base';


const PurchaseRequestRow = (props) => (
    <View style={styles.rowMain}>
        <Image source={{ uri: props.img_status }} style={styles.rowImage} />
        <View style={styles.rowBody}>
            <Text style={styles.textCode}>
                {props.purchase_request_code}
            </Text>
            <Text style={styles.textDate}>
                {props.purchase_request_date}
            </Text>
        </View>
        <Button>View</Button>
        <Button>Edit</Button>
        <Button>Del</Button>


    </View>
);

export default PurchaseRequestRow;


const styles = StyleSheet.create({
    rowMain: {
        flex: 1,
        paddingTop: 12,
        paddingBottom: 12,
        flexDirection: 'row',
        alignItems: 'stretch',
    },
    rowImage: {
        height: 40,
        width: 40,
        borderRadius: 20,
    },
    rowBody: {
        backgroundColor: '#F00',
    },
    textCode: {
        fontSize: 16,
    },
    textDate: {
        fontSize: 12,
    },

});