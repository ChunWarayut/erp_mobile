import React, { Component } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { Content } from "native-base";
import SideMenu from "react-native-side-menu";
import Menu from "./Menu";
import { HomeScreen } from "./HomeScreen";

import GLOBALS from "../GLOBALS";

import { LineChart, PieChart } from "react-native-chart-kit";

/* ----------------------------------------------------------------------------------------------------- */

const screenWidth = Dimensions.get("window").width;
const invoice_date = [];
const net_price = [];
var chart = [];
/* ----------------------------------------------------------------------------------------------------- */
export default class Home extends Component {
  constructor(props) {
    super(props);
    /* ----------------------------------------------------------------------------------------------------- */
    this.state = {
      dashboard: [],
      year: new Date().getFullYear(),
      result: false
    };
    /* ----------------------------------------------------------------------------------------------------- */

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      selectedItem: (
        <HomeScreen
          OnToggled={this.toggle}
          navigation={this.props.navigation}
        />
      )
    };
  }

  ///* --------------------------------------------------------------------------------------------------------- */

  componentWillMount() {
    this.fetchData();
  }
  fetchData() {
    fetch(GLOBALS.SERVICE_URL + "/getDashboard.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        year: 2019
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            dashboard: responseJson.dashboard,
            dashboardLength: responseJson.dashboard.length,
            invoice_date: [],
            net_price: [],
            result: responseJson.result
          },
          // function() {
          //   for (j = 0; j < this.state.dashboardLength; j++) {
          //     if (this.state.dashboard[j]["invoice_date"] != undefined) {
          //       invoice_date.push(
          //         new Date().getFullYear() +
          //           "-" +
          //           this.state.dashboard[j]["invoice_date"]
          //       );
          //       net_price.push(this.state.dashboard[j]["net_price"]);
          //     }
          //   }
          //   if (invoice_date.length > 0) {
          //     chart.push(
          //       <View>
          //         <Text style={styles.welcome}>รายงานยอดขาย</Text>
          //         <LineChart
          //           data={{
          //             labels: invoice_date,
          //             datasets: [
          //               {
          //                 data: net_price
          //               }
          //             ]
          //           }}
          //           width={screenWidth}
          //           height={220}
          //           chartConfig={chartConfig}
          //           bezier
          //         />
          //       </View>
          //     );
          //   }
          // },
          // function() {
          //   console.warn("net_price", net_price);
          //   console.warn("invoice_date", invoice_date);
          // }
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  ///* --------------------------------------------------------------------------------------------------------- */
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  updateMenuState(isOpen) {
    this.setState({
      isOpen: isOpen
    });
  }

  onMenuItemSelected = item => {
    this.setState({
      selectedItem: item,
      isOpen: false
    });
  };

  ///* --------------------------------------------------------------------------------------------------------- */
  ///* --------------------------------------------------------------------------------------------------------- */
  ///* --------------------------------------------------------------------------------------------------------- */
  ///* --------------------------------------------------------------------------------------------------------- */
  ///* --------------------------------------------------------------------------------------------------------- */
  ///* --------------------------------------------------------------------------------------------------------- */
  ///* --------------------------------------------------------------------------------------------------------- */
  ///* --------------------------------------------------------------------------------------------------------- */
  ///* --------------------------------------------------------------------------------------------------------- */
  ///* --------------------------------------------------------------------------------------------------------- */

  render() {
    // this.setState({invoice_date: ["06", "07", "08", "09", "10", "10","12"]})
    // console.warn("net_price", net_price);
    // console.warn("invoice_date", invoice_date);
    // console.warn(new Date().getFullYear());

    const menu = (
      <Menu
        onItemSelected={this.onMenuItemSelected}
        OnToggle={this.toggle}
        navigation={this.props.navigation}
      />
    );
    return (
      <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        onChange={isOpen => this.updateMenuState(isOpen)}
      >
        <Content style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
          <View style={styles.container}>{this.state.selectedItem}</View>

          <View>{chart}</View>





          <View>



            
          </View>
        </Content>
      </SideMenu>
    );
  }
}

///* --------------------------------------------------------------------------------------------------------- */
///* --------------------------------------------------------------------------------------------------------- */
///* --------------------------------------------------------------------------------------------------------- */
///* --------------------------------------------------------------------------------------------------------- */
///* --------------------------------------------------------------------------------------------------------- */
///* --------------------------------------------------------------------------------------------------------- */
///* --------------------------------------------------------------------------------------------------------- */
///* --------------------------------------------------------------------------------------------------------- */
///* --------------------------------------------------------------------------------------------------------- */
///* --------------------------------------------------------------------------------------------------------- */

const chartConfig = {
  backgroundGradientFrom: "#7fffd43",
  backgroundGradientTo: "#f0ffff",
  color: (opacity = 0.5) => `rgba(85, 107, 47, ${opacity})`,
  strokeWidth: 2 // optional, default 3
};



const data = [
  { name: 'Seoul', population: 21500000, color: 'rgba(131, 167, 234, 1)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  { name: 'Toronto', population: 2800000, color: '#F00', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  { name: 'Beijing', population: 527612, color: 'red', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  { name: 'New York', population: 8538000, color: '#ffffff', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  { name: 'Moscow', population: 11920000, color: 'rgb(0, 0, 255)', legendFontColor: '#7F7F7F', legendFontSize: 15 }
]



const styles = StyleSheet.create({
  button: {
    position: "absolute",
    top: 20,
    padding: 10
  },
  chart: {
    position: "absolute",
    top: 20,
    padding: 10
  },
  caption: {
    fontSize: 20,
    fontWeight: "bold",
    alignItems: "center"
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  icon: {
    fontSize: 30,
    color: "#FFFFFF",
    flex: 0.3
  }
});

// export function toggle() {

// }
//module.exports = Home;
