import React from 'react';

import { StyleSheet, Image, View, Text } from 'react-native';
class Item extends React.Component {
  render() {
    const { headerText, infoTextCount, infoText1, infoText2 } = this.props;

    let infoTextArr = [];
    if (infoTextCount == 1) {
      infoTextArr = (
        <Text
          style={{
            fontSize: 15,
            lineHeight: 23,
            color: 'rgb(150,150,150)'
          }}
        >
          {infoText1}
        </Text>
      );
    } else {
      infoTextArr = (
        <View>
          <Text
            style={{
              fontSize: 15,
              lineHeight: 23,
              color: 'rgb(150,150,150)',
              marginBottom: 7
            }}
          >
            {infoText1}
          </Text>
          <Text
            style={{ fontSize: 15, lineHeight: 23, color: 'rgb(150,150,150)' }}
          >
            {infoText2}
          </Text>
        </View>
      );
    }

    return (
      <View
        style={{
          //   marginTop: 10,
          marginBottom: 10,
          marginLeft: 3,
          marginRight: 3,
          borderRadius: 8,
          backgroundColor: '#FFFFFF',
          elevation: 6,
          paddingLeft: 20,
          paddingRight: 20,
          //   paddingTop: 16,
          paddingBottom: 16
        }}
      >
        <Text
          style={{
            fontSize: 17,
            lineHeight: 29,
            color: 'rgb(19,19,19)',

            marginBottom: 6
          }}
        >
          {headerText}
        </Text>
        {infoTextArr}
      </View>
    );
  }
}
export default Item;
