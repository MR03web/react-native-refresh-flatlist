import React, { PureComponent } from 'react';
// 组件
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
// 其它

class Box extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  render() {
    const { info } = this.props;

    return (
      <View style={ps.box}>
        <Text>列表第{info.id}项</Text>
      </View>
    );
  }
}

// 样式和配置

const styleList = {
  box: {
    backgroundColor: '#ffffff',
    height: 100,
    paddingHorizontal: 20,
    justifyContent: 'center'
  },
};

// page style
const ps = StyleSheet.create(styleList);

export default Box;