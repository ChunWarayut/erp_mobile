/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  createStackNavigator,
  createAppContainer,
}
  from 'react-navigation';

import ChoiceLogin from './src/Login/ChoiceLogin';
import SplashScreen from './src/SplashScreen';
import LoginArno from './src/Login/LoginArno';
import Home from './src/Home/Home';
import SearchProduct from './src/SearchProduct/SearchProduct';
import ProductList from './src/SearchProduct/ProductList'
import EditPhon from './src/Profile/EditProfilePhon'
import PurchaseRequestDetail from './src/PurchaseRequest/PurchaseRequestDetail';
import EditEmail from './src/Profile/EditEmail'
import EditPassword from './src/Profile/EditPassword'
import EditSignature from './src/Profile/EditSignature'
import CustomerMenu from './src/Customer/CustomerMenu'
import CustomerPurchaseOrderList from './src/CustomerPurchaseOrder/CustomerPurchaseOrderListView'
import CustomerPurchaseOrderDetail from './src/CustomerPurchaseOrder/CustomerPurchaseOrderDetail'
import CustomerInvoiceList from './src/CustomerInvoice/CustomerInvoiceListView'
import CustomerInvoiceDetail from './src/CustomerInvoice/CustomerInvoiceDetail'
import NotificationDetail from './src/Notifications/NotificationDetail'
import AddStandardToolRequest from './src/TestRequest/AddStandardToolRequest'
import StandardToolRequestView from './src/TestRequest/StandardToolRequestView'
import AddProductStandardRequest from './src/TestRequest/AddProductStandardRequest'
import AddProduct from './src/TestRequest/AddProduct'
import AddStandardToolRequestDetail from './src/TestRequest/AddStandardToolRequestDetail'
import StandardToolRequestDetail from './src/TestRequest/StandardToolRequestDetail'
import SpecialToolRequestView from './src/TestRequestSpecial/SpecialToolRequestView'
import AddSpecialToolRequest from './src/TestRequestSpecial/AddSpecialToolRequest'
import AddProductSpecialRequest from './src/TestRequestSpecial/AddProductSpecialRequest'
import AddProductSpecial from './src/TestRequestSpecial/AddProductSpecial'
import AddSpecialToolRequestDetail from './src/TestRequestSpecial/AddSpecialToolRequestDetail'
import RegrindSendListView from './src/Regrind/RegrindSendListView'
import RegrindReceiveListView from './src/Regrind/RegrindReceiveListView'
import AddRegrindReceive from './src/Regrind/AddRegrindReceive'
import AddRegrindSend from './src/Regrind/AddRegrindSend'
import RegrindSupplierList from './src/Regrind/RegrindSupplierList'

const AppNavigation = createStackNavigator(
  {
    Splash: {
      screen: SplashScreen,
      navigationOptions: {
        header: null,
        tabBarLabel: 'Splash'
      }
    },
    Login: {
      screen: ChoiceLogin,
      navigationOptions: {
        header: null,
        tabBarLabel: 'Login'
      },
    },
    LoginArno: {
      screen: LoginArno,
      navigationOptions: {
        header: null,
        tabBarLabel: 'Arno'
      }
    },
    HomeArno: {
      screen: Home,
      navigationOptions: {
        header: null,
      }
    },
    EditProfilePhon: {
      screen: EditPhon,
      navigationOptions: {
        header: null,
      }
    },
    PurchaseRequestDetail: {
      screen: PurchaseRequestDetail,
      navigationOptions: {
        header: null,
      }
    },
    ProductList: {
      screen: ProductList,
      navigationOptions: {
        header: null,
      }
    },
    EditEmail: {
      screen: EditEmail,
      navigationOptions: {
        header: null,
      }
    },
    EditPassword: {
      screen: EditPassword,
      navigationOptions: {
        header: null,
      }
    },
    EditSignature: {
      screen: EditSignature,
      navigationOptions: {
        header: null,
      }
    },
    CustomerMenu: {
      screen: CustomerMenu,
      navigationOptions: {
        header: null,
      }
    },
    CustomerPurchaseOrderList: {
      screen: CustomerPurchaseOrderList,
      navigationOptions: {
        header: null,
      }
    },
    CustomerPurchaseOrderDetail: {
      screen: CustomerPurchaseOrderDetail,
      navigationOptions: {
        header: null,
      }
    },
    CustomerInvoiceList: {
      screen: CustomerInvoiceList,
      navigationOptions: {
        header: null,
      }
    },
    CustomerInvoiceDetail: {
      screen: CustomerInvoiceDetail,
      navigationOptions: {
        header: null,
      }
    },
    NotificationDetail: {
      screen: NotificationDetail,
      navigationOptions: {
        header: null,
      }
    },
    AddStandardToolRequest: {
      screen: AddStandardToolRequest,
      navigationOptions: {
        header: null,
      }
    },
    StandardToolRequestView: {
      screen: StandardToolRequestView,
      navigationOptions: {
        header: null,
      }
    },
    AddProductStandardRequest: {
      screen: AddProductStandardRequest,
      navigationOptions: {
        header: null,
      }
    },
    AddProduct: {
      screen: AddProduct,
      navigationOptions: {
        header: null,
      }
    },
    AddStandardToolRequestDetail: {
      screen: AddStandardToolRequestDetail,
      navigationOptions: {
        header: null,
      }
    },
    StandardToolRequestDetail: {
      screen: StandardToolRequestDetail,
      navigationOptions: {
        header: null,
      }
    },
    SpecialToolRequestView: {
      screen: SpecialToolRequestView,
      navigationOptions: {
        header: null,
      }
    },
    AddSpecialToolRequest: {
      screen: AddSpecialToolRequest,
      navigationOptions: {
        header: null,
      }
    },
    AddProductSpecialRequest: {
      screen: AddProductSpecialRequest,
      navigationOptions: {
        header: null,
      }
    },
    AddProductSpecial: {
      screen: AddProductSpecial,
      navigationOptions: {
        header: null,
      }
    },
    AddSpecialToolRequestDetail: {
      screen: AddSpecialToolRequestDetail,
      navigationOptions: {
        header: null,
      }
    },
    RegrindSendListView: {
      screen: RegrindSendListView,
      navigationOptions: {
        header: null,
      }
    },
    RegrindReceiveListView: {
      screen: RegrindReceiveListView,
      navigationOptions: {
        header: null,
      }
    },
    AddRegrindReceive: {
      screen: AddRegrindReceive,
      navigationOptions: {
        header: null,
      }
    },
    AddRegrindSend: {
      screen: AddRegrindSend,
      navigationOptions: {
        header: null,
      }
    },
    RegrindSupplierList: {
      screen: RegrindSupplierList,
      navigationOptions: {
        header: null,
      }
    },
  },
  {
    initialRouteName: 'HomeArno'
  }
);

const AppContainer = createAppContainer(AppNavigation);

export default class App extends Component {
  render() {
    return < AppContainer />;
  }
}

