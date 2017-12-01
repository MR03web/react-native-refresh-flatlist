/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import RefreshFlatList, {REFRESH_STATE} from 'react-native-refresh-flatlist';
import Box from './Box';

export default class App extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      refreshState: REFRESH_STATE.Ready,
    };
  }
  componentDidMount() {
    this.$onHeaderRefresh();
  }

  $keyExtractor(item, index) {
    return item.id;
  }

  $renderCell(data) {
    const item = data.item;
    return (
      <Box info={item}></Box>
    )
  }

  $onHeaderRefresh = () => {
    this.setState({refreshState: REFRESH_STATE.HeaderRefreshing});
    // 模拟网络请求
    setTimeout(() => {
      // 模拟网络加载失败的情况
      if (Math.random() < 0.2) {
        this.setState({refreshState: REFRESH_STATE.Failure})
        return false;
      }

      //获取测试数据
      let dataList = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}, {id: 7}];
      this.setState({
        list: dataList,
        refreshState: REFRESH_STATE.Idle,
      })
    }, 2000);
  }
  $onFooterRefresh = () => {
    this.setState({refreshState: REFRESH_STATE.FooterRefreshing})

    // 模拟网络请求
    setTimeout(() => {
      // 模拟网络加载失败的情况
      if (Math.random() < 0.2) {
        this.setState({refreshState: REFRESH_STATE.Failure})
        return false;
      }

      //获取测试数据
      let dataList = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}, {id: 7}, {id: 8}, {id: 9}, {id: 10}, {id: 11}];

      this.setState({
        list: dataList,
        refreshState: dataList.length >= 11 ? REFRESH_STATE.NoMoreData : REFRESH_STATE.Idle,
      })
    }, 2000)
  }

  render() {
    const {list} = this.state;

    return (
      <View style={styles.view}>
        <RefreshFlatList
          data={list}
          keyExtractor={this.$keyExtractor}
          renderItem={this.$renderCell}
          themeColor="#e51c23"
          refreshState={this.state.refreshState}
          footerRefreshingText="正在加载"
          footerFailureText="加载失败"
          footerNoMoreDataText="没有更多数据"
          onHeaderRefresh={this.$onHeaderRefresh}
          onFooterRefresh={this.$onFooterRefresh}
          ItemSeparatorComponent={() => <View style={{height: 10}} />}
          ListHeaderComponent={() => <View style={{height: 10 }} />}
        ></RefreshFlatList>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});
