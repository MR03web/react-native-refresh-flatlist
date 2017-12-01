import propTypes from 'prop-types';
import _ from 'lodash';
import React, {PureComponent} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
}
  from 'react-native';

// 状态常量
export const REFRESH_STATE = {
  Ready: 0, // 准备状态 
  Idle: 1,   // 普通状态
  HeaderRefreshing: 2,   // 头部刷新中
  FooterRefreshing: 3,   // 底部刷新中
  NoMoreData: 4,   // 已加载全部数据
  Failure: 5,  // 加载失败
}

class RefreshFlatList extends PureComponent {
  static defaultProps = {
    data: [],
    keyExtractor: (item, index) => item.id,
    themeColor: '#000000',
    footerRefreshingText: '正在加载中',
    footerFailureText: '加载数据失败',
    footerNoMoreDataText: '已经没有更多数据',
    footerContainerStyle: {},
    footerTextStyle: {},
    ItemSeparatorComponent: () => <View style={{height: 10}}/>,
    ListHeaderComponent: () => <View style={{height: 10}}/>,
  }
  static propTypes = {
    data: propTypes.array,
    keyExtractor: propTypes.func,
    renderItem: propTypes.func,
    themeColor: propTypes.string,
    footerRefreshingText: propTypes.string,
    footerFailureText: propTypes.string,
    footerNoMoreDataText: propTypes.string,
    onHeaderRefresh: propTypes.func,
    onFooterRefresh: propTypes.func,
    footerContainerStyle: propTypes.object,
    footerTextStyle: propTypes.object,
    EmptyComponent: propTypes.object,
    FailureComponent: propTypes.object,
    ItemSeparatorComponent: propTypes.func,
    ListHeaderComponent: propTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      dataList: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(nextProps.data, this.state.dataList)) {
      this.setState({
        dataList: nextProps.data,
      })
    }
  }

  _shouldStartHeaderRefreshing = () => {
    // console.log('_shouldStartHeaderRefreshing');

    if (this.props.refreshState === REFRESH_STATE.HeaderRefreshing ||
      this.props.refreshState === REFRESH_STATE.FooterRefreshing) {
      return false;
    }
    return true;
  }
  _shouldStartFooterRefreshing = () => {
    // console.log('_shouldStartFooterRefreshing');
    if (_.size(this.state.dataList) === 0) {
      return false;
    }
    const {refreshState} = this.props;
    return (refreshState == REFRESH_STATE.Idle)
  }
  $onHeaderRefresh = () => {
    // console.log('$onHeaderRefresh');
    if (this._shouldStartHeaderRefreshing()) {
      this.props.onHeaderRefresh && this.props.onHeaderRefresh();
    }
  }
  $onEndReached = () => {
    // console.log('$onEndReached');
    if (this._shouldStartFooterRefreshing()) {
      this.props.onFooterRefresh && this.props.onFooterRefresh();
    }
  }

  render() {
    const {keyExtractor, renderItem, refreshState, ItemSeparatorComponent, ListHeaderComponent, themeColor} = this.props;
    const {dataList} = this.state;

    return (
      <FlatList
        ref={this.props.listRef}
        data={dataList}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListEmptyComponent={this.$renderBlank}
        onEndReachedThreshold={0.1}
        ItemSeparatorComponent={ItemSeparatorComponent}
        ListHeaderComponent={ListHeaderComponent}
        refreshControl={
          <RefreshControl
            colors={[themeColor]}
            progressBackgroundColor='#ffffff'
            refreshing={refreshState === REFRESH_STATE.HeaderRefreshing}
            onRefresh={this.$onHeaderRefresh}/>}
        ListFooterComponent={this.$renderFooter}
        onEndReached={this.$onEndReached}
      ></FlatList>
    );
  }

  $renderBlank = () => {
    let blank = null;
    switch (this.props.refreshState) {
      case REFRESH_STATE.Ready: {
        blank = (<View></View>);
        break;
      }
      case REFRESH_STATE.Idle: {
        if (_.isUndefined(this.props.EmptyComponent)) {
          blank = (
            <TouchableOpacity
              style={ps.blankContainerStyle}
              onPress={() => {
                this.props.onHeaderRefresh && this.props.onHeaderRefresh();
              }}
            >
              <Text style={ps.blankText}>没有数据</Text>
            </TouchableOpacity>
          );
        } else {
          blank = (
            <TouchableOpacity
              style={ps.blankContainerStyle}
              onPress={() => {
                this.props.onHeaderRefresh && this.props.onHeaderRefresh();
              }}
            >
              {this.props.EmptyComponent}
            </TouchableOpacity>
          );
        }
        break;
      }
      case REFRESH_STATE.HeaderRefreshing: {
        blank = (<View></View>);
        break;
      }
      case REFRESH_STATE.Failure: {
        if (_.isUndefined(this.props.FailureComponent)) {
          blank = (
            <TouchableOpacity
              style={ps.blankContainerStyle}
              onPress={() => {
                this.props.onHeaderRefresh && this.props.onHeaderRefresh();
              }}
            >
              <Text style={ps.blankText}>网络故障,点击重新加载</Text>
            </TouchableOpacity>
          );
        } else {
          blank = (
            <TouchableOpacity
              style={ps.blankContainerStyle}
              onPress={() => {
                this.props.onHeaderRefresh && this.props.onHeaderRefresh();
              }}
            >
              {this.props.FailureComponent}
            </TouchableOpacity>
          );
        }
        break;
      }
    }

    return blank;
  }
  $renderFooter = () => {
    let footer = null;

    let footerContainerStyle = [ps.footerContainer, this.props.footerContainerStyle];
    let footerTextStyle = [ps.footerText, this.props.footerTextStyle];
    const {themeColor, footerRefreshingText, footerFailureText, footerNoMoreDataText} = this.props;

    switch (this.props.refreshState) {
      case REFRESH_STATE.Ready: {
        footer = (<View></View>)
        break;
      }
      case REFRESH_STATE.Idle: {
        footer = (<View style={footerContainerStyle}></View>)
        break;
      }
      case REFRESH_STATE.Failure: {
        if (_.isEmpty(this.state.dataList)) {
          footer = (<View style={footerContainerStyle}></View>)
        } else {
          footer = (
            <TouchableOpacity
              style={footerContainerStyle}
              onPress={() => {
                this.props.onFooterRefresh && this.props.onFooterRefresh();
              }}
            >
              <Text style={footerTextStyle}>{footerFailureText}</Text>
            </TouchableOpacity>
          )
        }
        break;
      }
      case REFRESH_STATE.FooterRefreshing: {
        footer = (
          <View style={footerContainerStyle}>
            <ActivityIndicator size="small" color={themeColor}></ActivityIndicator>
            <Text style={[footerTextStyle, {marginLeft: 10}]}>{footerRefreshingText}</Text>
          </View>
        )
        break
      }
      case REFRESH_STATE.NoMoreData: {
        footer = (
          <View style={footerContainerStyle}>
            <Text style={footerTextStyle}>{footerNoMoreDataText}</Text>
          </View>
        )
        break
      }
    }

    return footer;
  }
}

// 样式和配置
const styleList = {
  blankContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blankText: {
    fontSize: 16,
    color: '#333333'
  },
  footerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    height: 44,
  },
  footerText: {
    fontSize: 14,
    color: '#555555'
  },
};

// page style
const ps = StyleSheet.create(styleList);

export default RefreshFlatList;
