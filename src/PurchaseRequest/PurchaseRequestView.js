
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { 
    StyleSheet, 
    View,
    ListView, 
} from 'react-native';
import PurchaseRequestRow from './PurchaseRequestRow';

const data = [{
    purchase_request_id:'1',
    purchase_request_code:"PR1901001-TH",
    purchase_request_date:"2019-02-07",
    img_status:"https://banner2.kisspng.com/20180421/uew/kisspng-computer-icons-check-mark-royalty-free-true-or-false-5adb4ad84b3f16.6675153715243209843082.jpg",
},{
    purchase_request_id:'2',
    purchase_request_code:"PR1901002-TH",
    purchase_request_date:"2019-02-09",
    img_status:"https://banner2.kisspng.com/20180421/uew/kisspng-computer-icons-check-mark-royalty-free-true-or-false-5adb4ad84b3f16.6675153715243209843082.jpg",
},{
    purchase_request_id:'3',
    purchase_request_code:"PR1901003-TH",
    purchase_request_date:"2019-02-11", 
    img_status:"https://banner2.kisspng.com/20180421/uew/kisspng-computer-icons-check-mark-royalty-free-true-or-false-5adb4ad84b3f16.6675153715243209843082.jpg",
            
}];

class PurchaseRequestView extends Component {


    constructor(props) {
        super(props);
        
        var ds = new ListView.DataSource({rowHasChanged: this._rowHasChanged});

        this.state = {
            dataSource: ds.cloneWithRows(this.data,'purchase_request_id')
        };
    }

    _rowHasChanged (){

    }




    render() {
        
        return (
        <View style={styles.container}>
            <ListView
                style={styles.container}
                dataSource={this.state.dataSource}
                renderRow={(data) => <PurchaseRequestRow {...data} />}
            />
        </View>
        )
    }


} export { PurchaseRequestView };

const styles=StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
       },
})