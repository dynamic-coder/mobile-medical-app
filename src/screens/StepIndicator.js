/** @format */

import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  Platform,
  TouchableOpacity,
  Dimensions,
  Animated,
  StyleSheet
} from 'react-native';

import { theme, mocks } from '../constants';

const widthScreen = Dimensions.get('window').width;
export default class StepIndicator extends Component {
  constructor(props) {
    super(props);
    const defaultStyles = {
      stepIndicatorSize: 30,
      borderPadding: 6,
      color: theme.colors.primary
    };

    this.customStyles = Object.assign(defaultStyles, props.customStyles);
    this.stepStrokeWidth = 50;
    this.imageMargin = this.customStyles.stepIndicatorSize / 2;

    const allIndicatorWidth =
      props.steps.length * this.customStyles.stepIndicatorSize +
      2 * props.steps.length * this.customStyles.borderPadding;
    this.marginContent =
      widthScreen -
      allIndicatorWidth -
      (props.steps.length - 1) * this.stepStrokeWidth;

    this.containerWidth = widthScreen;
    if (this.marginContent >= 50) {
      this.containerWidth = widthScreen - this.marginContent + 50;
      this.marginContent = 25;
    } else if (this.marginContent < 20) {
      (this.marginContent = 10),
        (this.stepStrokeWidth =
          (widthScreen - allIndicatorWidth - this.marginContent * 2) /
          (props.steps.length - 1));
    }

    if (Platform.OS == 'ios') {
      this.labelWidth =
        this.marginContent * 2 +
        this.customStyles.stepIndicatorSize +
        2 * this.customStyles.borderPadding;
    } else {
      this.labelWidth = this.marginContent * 2;
    }
  }

  render() {
    const content = [];
    const label = [];
    let title = '';

    for (let i = 0; i < this.props.steps.length; i++) {
      const item = this.props.steps[i];
      content.push(this.renderStepIndicator(i, item.icon));

      if (this.props.currentIndex == i) {
        title = item.label;
      }

      label.push(
        <Text
          key={i}
          style={[
            styles.label,
            { width: this.labelWidth },
            i <= this.props.currentIndex && { color: '#333333' }
          ]}
        >
          {item.label}
        </Text>
      );
      if (i != this.props.steps.length - 1) {
        content.push(this.renderProgressBar(i));
      }
    }

    return (
      <View style={[styles.container, { width: this.containerWidth }]}>
        <Animated.Text style={styles.largeTitle}>{title}</Animated.Text>
        <View style={styles.indicatorContainer}>{content}</View>
        <View style={styles.labelContainer}>{label}</View>
      </View>
    );
  }

  renderStepIndicator = (index, icon) => {
    const isCurrent = index == this.props.currentIndex;

    const indicatorContainer = {
      width:
        this.customStyles.stepIndicatorSize +
        this.customStyles.borderPadding * 2,
      height:
        this.customStyles.stepIndicatorSize +
        this.customStyles.borderPadding * 2,
      borderWidth: 0.5,
      borderColor: '#CED7DD',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius:
        (this.customStyles.stepIndicatorSize +
          this.customStyles.borderPadding * 2) /
        2
    };

    const indicatorStyle = {
      backgroundColor:
        index < this.props.currentIndex ? this.customStyles.color : '#CED7DD',
      width: this.customStyles.stepIndicatorSize,
      height: this.customStyles.stepIndicatorSize,
      borderRadius: this.customStyles.stepIndicatorSize / 1
    };

    const indicatorCurrent = {
      backgroundColor: 'white',
      borderWidth: 1.5,
      borderColor: this.customStyles.color
    };

    const imageSize =
      isCurrent == false
        ? this.customStyles.stepIndicatorSize - this.imageMargin
        : this.customStyles.stepIndicatorSize - this.imageMargin - 3;
    const imageStyle = {
      width: imageSize,
      height: imageSize,
      position: 'absolute',
      top: this.imageMargin / 2,
      left: this.imageMargin / 2,
      tintColor: isCurrent == false ? 'white' : this.customStyles.color
    };

    return (
      <TouchableOpacity
        onPress={() =>
          index < this.props.currentIndex && this.props.onChangeTab(index)
        }
        style={indicatorContainer}
        key={`indicator-${index}`}
      >
        <View style={[indicatorStyle, isCurrent && indicatorCurrent]}>
          <Image resizeMode='contain' source={icon} style={imageStyle} />
        </View>
      </TouchableOpacity>
    );
  };

  renderProgressBar(index) {
    const progressBarContainer = {
      height: this.customStyles.borderPadding * 2 + 2,
      width: this.stepStrokeWidth,
      justifyContent: 'center',
      zIndex: 3
    };

    const progressBarBorder = {
      height: this.customStyles.borderPadding * 2 + 2,
      width: this.stepStrokeWidth + 4,
      position: 'absolute',
      top: 0,
      left: -2,
      right: -2,
      backgroundColor: 'white',
      borderTopWidth: 0.5,
      borderBottomWidth: 0.5,
      borderColor: '#CED7DD'
    };

    const progressBar = {
      width: this.stepStrokeWidth + this.customStyles.borderPadding * 2 + 3,
      height: 2,
      backgroundColor: this.customStyles.color,
      position: 'absolute',
      top: this.customStyles.borderPadding,
      left: -this.customStyles.borderPadding
    };
    return (
      <View style={progressBarContainer} key={`progress-${index}`}>
        <View style={progressBarBorder}>
          {index < this.props.currentIndex && <View style={progressBar} />}
        </View>
      </View>
    );
  }
}

StepIndicator.defaultProps = {
  steps: [],
  currentIndex: 0
};
const styles = StyleSheet.create({
  container: {
    paddingBottom: 0,
    paddingTop: 30
  },
  labelContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 4,
    justifyContent: 'space-between'
  },
  label: {
    color: 'rgba(0,0,0,0.3)',
    fontSize: 12,
    textAlign: 'center'
  },
  labelActive: {
    color: '#333333'
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 8
  },
  largeTitle: {
    fontSize: 20,
    marginLeft: 20,
    marginBottom: 10,
    fontWeight: 'bold'
  }
});
