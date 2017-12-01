# react-native-refresh-list-view

基于flatlist的列表下拉、上拉刷新控件，可以设置下拉刷新Indicator的颜色，参考react-native-refresh-list-view，感谢!
如果有bug或建议，欢迎提issue。

## 截图

<img src="https://github.com/MR03web/react-native-refresh-flatlist/blob/master/screen_shot/1.png" alt="1" title="1">

## 安装(推荐使用yarn)

### NPM
```
npm install --save react-native-refresh-flatlist
```

### yarn
```
yarn add react-native-refresh-flatlist
```

## refreshState
| Name  | Number  | Description |
| :---: | :---:   | :---------: |
| Ready         | 0 | 准备状态     | 
| Idle         | 1 | 普通状态       |
| HeaderRefreshing         | 2 | 头部刷新中       | 
| FooterRefreshing         | 3 | 底部刷新中       | 
| NoMoreData        | 4 | 已加载全部数据       | 
| Failure        | 5 | 加载失败      | 

## Props

| Prop  | Type  | Description | Default |
| :---: | :---: | :---------: | :------ |
| data         | Array | 数据       | []          |
| keyExtractor | Func  | 同FlatList | 默认key为id |
| renderItem   | Func  | 同FlatList | None        |
| themeColor   | String  | 刷新Indicator的颜色 | #000000 |
| footerRefreshingText | String | 自定义底部刷新中文字 | 正在加载中 |
| footerFailureText | String | 自定义底部失败文字 | 加载数据失败 |
| footerNoMoreDataText | String | 自定义底部已加载全部数据文字 | 已经没有更多数据 |
| footerContainerStyle | Object | 自定义底部容器样式 | None |
| footerTextStyle |	Object | 自定义底部文字样式| None |
| ItemSeparatorComponent | Func | 同FlatList | () => <View style={{height: 10}}/> |
| ListHeaderComponent |	Func | 同FlatList | () => <View style={{height: 10}}/> |
| onHeaderRefresh |	Func | 下拉刷新回调方法 | None |
| onFooterRefresh |	Func | 上拉翻页回调方法 | None |
| EmptyComponent |	ReactClass | 无数据时页面 | None |
| FailureComponent |	ReactClass | 获得数据失败时页面 | None |

## 最后

参考[react-native-refresh-list-view](https://github.com/huanxsd/react-native-refresh-list-view)，非常感谢!

## LICENSE

MIT