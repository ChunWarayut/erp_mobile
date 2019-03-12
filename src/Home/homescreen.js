import RNPickerSelect from "react-native-picker-select";
import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
  AsyncStorage,
  StyleSheet
} from "react-native";
import { Header, Left, Body, Title, Right } from "native-base";
import GLOBALS from "../GLOBALS";
import { SmoothLine } from "react-native-pathjs-charts";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    marginTop: 20
  },
  margin:{
    marginLeft : 15
  }
  ,
  button: {
    marginLeft : 20,
    justifyContent: "center",
    backgroundColor: "#DDDDDD",
    width: 180,
    height: 40
  },
  padding: {
    paddingTop: 10
  }
});
var k = 0;

const year = [
  {
    label: "2018",
    value: "2018"
  },
  {
    label: "2019",
    value: "2019"
  },
  {
    label: "2020",
    value: "2020"
  }
];

class HomeScreen extends Component {
  constructor(props) {
    super(props);

    // this.state = { }

    this.inputRefs = {
      firstTextInput: null,
      favSport0: null,
      favSport1: null,
      lastTextInput: null
    };

    this.state = {
      dashboard: [],
      year: 2018,
      result: false
    };
  }

  Logout() {
    AsyncStorage.setItem("Login_token", "");
    this.props.navigation.replace("Login");
  }
  componentWillMount() {
    this.fetchData();
  }
  async fetchData() {
    console.warn(this.state.year);
     fetch(GLOBALS.SERVICE_URL + "/getDashboard.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        year: this.state.year
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          dashboard: responseJson.dashboard,
          result: responseJson.result
        });
        k = 0;
        //console.warn(responseJson);
      })
      .catch(error => {
        //console.error(error);
      });
  }

  render() {
    //  if(  this.state.result == true){

    const placeholder = {
      label: "Select a year",
      justifyContent: "center",
      color: "#9EA0A4"
    };
    console.warn("render", this.state.dashboard);
    k = 0;
    let data_dashboard = [];
    let data_dashboard2 = [];
    price = 0;
    for (j = 0; j < this.state.dashboard.length; j++) {
      if (price < this.state.dashboard[j].net_price) {
        price = this.state.dashboard[j].net_price;
      }
    }
    if (price > 1000) {
      sum = price / 1000;
      solution = 1000;
    }
    if (price > 1000000) {
      sum = price / 1000000;
      solution = 1000000;
    }

    console.warn("dssa", this.state.dashboard.invoice_date);

    if (this.state.dashboard.length === 0 ) {
      data_dashboard2.push([{ x: 0, y: 0 }]);
    } else if(this.state.dashboard.length > 0) {
      for (i = 0; i < 13; i++) {
        var z;
        if(this.state.dashboard[k] !== undefined){
        z = Number(this.state.dashboard[k].invoice_date);
        }
        if (i == z) {
          data_dashboard.push({
            x: Number(i),
            y: Number(this.state.dashboard[k].net_price) / solution
          });
          k++;
        } else {
          data_dashboard.push({
            x: Number(i),
            y: Number(0)
          });
        }
      }

      data_dashboard2.push(data_dashboard);
    }

    // console.warn("data", data_dashboard2);

    let options = {
      width: 350,
      height: 280,
      color: "#2980B9",
      margin: {
        top: 20,
        left: 15,
        bottom: 25,
        right: 40
      },
      animate: {
        type: "delayed",
        duration: 200
      },
      axisX: {
        showAxis: true,
        showLines: true,
        showLabels: true,
        showTicks: true,
        zeroAxis: false,
        orient: "bottom",
        label: {
          fontFamily: "Arial",
          fontSize: 14,
          fontWeight: true,
          fill: "#34495E"
        }
      },
      axisY: {
        showAxis: true,
        showLines: true,
        showLabels: true,
        showTicks: true,
        zeroAxis: false,
        orient: "left",
        label: {
          fontFamily: "Arial",
          fontSize: 14,
          fontWeight: true,
          fill: "#34495E"
        }
      }
      // }
    };
    k = 0;
    return (
      <View>
        <View>
          <Header style={{ backgroundColor: "#FFFFFF" }}>
            <Left>
              <TouchableOpacity
                onPress={this.props.OnToggled}
                style={{ width: 32, height: 32 }}
              >
                <Image
                  source={GLOBALS.image}
                  style={{ width: 32, height: 32 }}
                />
              </TouchableOpacity>
            </Left>

            <Body>
              <Title>หน้าหลัก</Title>
            </Body>
            <Right />
          </Header>
        </View>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style = {styles.margin}> 
            <Text>1:1M</Text>
          </View>
          <View style={styles.container}>
            <SmoothLine
              data={data_dashboard2}
              options={options}
              xKey="x"
              yKey="y"
            />
          </View>
        </View>
        <View style={{ padding: 10, alignItems: "center", }}>
          <Text>Select Year</Text>
          
          <View style={{ padding: 10, alignItems: "center", flexDirection: 'row'}}>
          <RNPickerSelect
            placeholder={placeholder}
            items={year}
            onValueChange={value => {
              this.setState({
                year: value
              });
            }}
            style={pickerSelectStyles}
            value={this.state.year}
            useNativeAndroidPickerStyle={false}
            ref={el => {
              this.inputRefs.year = el;
            }}
            
          />
                <View style={styles.margin}>
                 <Button
            style={styles.button}
            onPress={() => this.fetchData()}
            // onPress={ () => this.props.navigation.navigate('ProductList' , { data: this.state.year , pass: this.state.keyword})}
            title="ยืนยัน"
            color="#0693E3"
          />
          </View> 
          </View>
        </View>

    
      </View>
    );
  }
}
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 4,
    color: "black",
    paddingRight: 30 // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "#000",
    borderRadius: 8,
    color: "black",
    paddingRight: 30 // to ensure the text is never behind the icon
  }
});
export { HomeScreen };
