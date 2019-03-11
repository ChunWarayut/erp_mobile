import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  LayoutAnimation,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View
} from 'react-native';

const width = Dimensions.get('window').width;

class Animated_Item extends Component {

  constructor() {

    super();

    this.animatedValue = new Animated.Value(0);

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.item.id !== this.props.item.id) {
      return true;
    }
    return false;
  }

  componentDidMount() {

    Animated.timing(
      this.animatedValue,
      {
        toValue: 0.5,
        duration: 510,
        useNativeDriver: true
      }
    ).start(() => {
      this.props.afterAnimationComplete();
    });

  }

  deleteItem = () => {
    Animated.timing(
      this.animatedValue,
      {
        toValue: 1,
        duration: 510,
        useNativeDriver: true
      }
    ).start(() => {
      this.props.deleteItem(this.props.item.id);
    });
  }

  render() {

    const translate_Animation_Object = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [-width, 0, width]
    });

    const opacity_Animation_Object = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 1, 0]
    });

    return (
      <Animated.View style={[
        styles.singleItemView, {
          transform: [{ translateX: translate_Animation_Object }],
          opacity: opacity_Animation_Object
        }]}>

        <Text style={styles.singleItemText}>
          Item {this.props.item.text}
        </Text>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={this.deleteItem}>
          <Text style={styles.removeIcon}>{'\u00D7'}</Text>
        </TouchableOpacity>

      </Animated.View>
    );
  }
}

export default class Test extends Component {

  constructor() {

    super();
    this.state = { valueArray: [], disabled: false }
    this.addNewElement = false;
    this.index = 0;
  }

  afterAnimationComplete = () => {
    this.index += 1;
    this.setState({ disabled: false });
  }

  add_New_View = () => {
    this.addNewElement = true;
    const newlyAddedValue = { id: "id_" + this.index, text: this.index + 1 };

    this.setState({
      disabled: true,
      valueArray: [...this.state.valueArray, newlyAddedValue]
    });
  }

  remove_Selected_Item(id) {
    this.addNewElement = false;
    const newArray = [...this.state.valueArray];
    newArray.splice(newArray.findIndex(ele => ele.id === id), 1);

    this.setState(() => {
      return {
        valueArray: newArray
      }
    }, () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    });
  }

  render() {
    console.warn(this.state.valueArray)
    return (
      <View style={styles.container}>
        <ScrollView
          ref={scrollView => this.scrollView = scrollView}
          onContentSizeChange={() => {
            this.addNewElement && this.scrollView.scrollToEnd();
          }}>

          <View style={{ flex: 1, padding: 4 }}>

            {this.state.valueArray.map(ele => {
              return (
                <Animated_Item
                  key={ele.id}
                  item={ele}
                  deleteItem={(id) => this.remove_Selected_Item(id)}
                  afterAnimationComplete={this.afterAnimationComplete}
                />
              )
            })}

          </View>

        </ScrollView>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.TouchableOpacityStyle}
          disabled={this.state.disabled}
          onPress={this.add_New_View}>

          <Image
            source={{ uri: 'https://reactnativecode.com/wp-content/uploads/2017/11/Floating_Button.png' }}
            style={styles.FloatingButtonStyle}
          />

        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    justifyContent: 'center',
    paddingTop: (Platform.OS == 'ios') ? 20 : 0
  },

  singleItemView: {
    backgroundColor: '#FF6F00',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingLeft: 16,
    margin: 5,
    borderRadius: 8,
    height: 50
  },

  singleItemText: {
    color: '#fff',
    fontSize: 23,
    paddingRight: 18
  },

  TouchableOpacityStyle: {

    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },

  FloatingButtonStyle: {

    resizeMode: 'contain',
    width: 50,
    height: 50,
  },

  deleteButton: {
    position: 'absolute',
    right: 10,
    width: 25,
    height: 25,
    borderRadius: 18,
    padding: 7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },

  removeIcon: {
    width: '100%',
    fontSize: 20
  }
});