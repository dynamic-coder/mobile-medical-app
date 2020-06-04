import React, {Component} from 'react';
import {
  Text,
  View,
  Alert,
  StyleSheet,
  Image,
  Platform,
  TouchableHighlight,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';

// import CommonStyles from '../styles/CommonStyles';

export default class ListItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    // let swipeBtns = [
    //   {
    //     text: 'Call',
    //     backgroundColor: 'red',
    //     underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
    //     onPress: () => {
    //       this._alertCallItem();
    //     }
    //   }
    // ];

    return (
      // <Swipeout right={swipeBtns} backgroundColor='transparent'>
      <View style={styles.itemWhiteBox}>
        <TouchableHighlight
          underlayColor="transparent"
          style={styles.highlightBox}
          onPress={this.props.onPressButton}>
          <View style={styles.listItemBox}>
            <View style={styles.leftCol}>
              <View style={styles.avatar}>
                <Image
                  source={this.props.imageUrl}
                  style={{
                    width: this.props.imageWidth,
                    height: this.props.imageHeight,
                    borderRadius: 100,
                  }}
                />
                {(() => {
                  if (this.props.isSpecial) {
                    return (
                      <LinearGradient
                        start={{x: 0.4, y: 0.5}}
                        end={{x: 1.0, y: 1.0}}
                        colors={['rgb(255,111,111)', 'rgb(255,35,35)']}
                        style={styles.specialCircle}
                      />
                    );
                  }
                })()}
              </View>
              <View style={styles.info}>
                <Text
                  style={{
                    fontSize: 17,
                    lineHeight: 29,
                    marginTop: -6,
                    color: 'black',
                    // fontFamily: 'Poppins-Medium'
                  }}>
                  {this.props.itemTitle}
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    lineHeight: 23,
                    color: 'rgb(150,150,150)',
                    // fontFamily: 'Poppins-Regular'
                  }}>
                  {this.props.specialite}
                </Text>
                {this.props.tel ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'flex-end',
                      justifyContent: 'center',
                      height: 23,
                    }}>
                    <Image
                      source={require('../../assets/icons/phone.png')}
                      style={{width: 13, height: 15.5}}
                    />
                    <Text
                      style={{
                        fontSize: 14,
                        paddingLeft: 6,
                        color: 'rgb(105,105,105)',
                        // fontFamily: 'Poppins-Regular'
                      }}>
                      {this.props.tel}
                    </Text>
                  </View>
                ) : null}
              </View>
            </View>
            <View style={styles.rightCol}>
              {/* <View style={styles.ranking}>
                <Image
                  source={require('../../assets/doc/bookmark.png')}
                  style={{ width: 20, height: 30 }}
                />
                <Text
                  style={{
                    marginTop: -6,
                    marginLeft: 2,
                    fontSize: 18,
                    lineHeight: 30,
                    color: 'rgb(63,103,230)',
                    // fontFamily: 'Poppins-Regular'
                  }}
                ></Text>
              </View> */}
              <Image
                source={require('../../assets/doc/more.png')}
                style={{width: 7, height: 27}}
              />
            </View>
          </View>
        </TouchableHighlight>
      </View>
      // </Swipeout>
    );
  }

  _alertCallItem() {
    Alert.alert(
      'Alert Title',
      'My Alert Msg',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: {
            color: '#000',
          },
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );
  }
}

const styles = StyleSheet.create({
  highlightBox: {
    borderRadius: 12,
  },
  listItemBox: {
    flexDirection: 'row',
    padding: 15,
  },
  rightCol: {
    width: 52,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  ranking: {
    flexDirection: 'row',
  },
  leftCol: {
    flex: 1,
    flexDirection: 'row',
  },
  avatar: {
    position: 'relative',
    width: 70,
    height: 70,
  },
  info: {
    paddingLeft: 15,
  },
  specialCircle: {
    position: 'absolute',
    top: 5,
    right: 0,
    width: 15,
    height: 15,
    borderRadius: 200,
  },
  itemWhiteBox: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    elevation: 6,
  },
});

// const PropTypes = React.PropTypes;

ListItem.propTypes = {
  imageUrl: PropTypes.string,
  itemTitle: PropTypes.string,
  specialite: PropTypes.string,
  tel: PropTypes.string,
  imageWidth: PropTypes.number,
  imageHeight: PropTypes.number,
  onPressButton: PropTypes.func,
  isSpecial: PropTypes.bool,
};
