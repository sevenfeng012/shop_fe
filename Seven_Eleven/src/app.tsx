import '@tarojs/async-await'
import Taro, { Component, Config } from '@tarojs/taro'
import Index from './pages/index'

import { Provider } from '@tarojs/redux'

import './app.scss'

import configStore from './store'

import home from './assets/tab-bar/home-active.png';
import homeUn from './assets/tab-bar/home.png';
import cate from './assets/tab-bar/cate-active.png';
import cateUn from './assets/tab-bar/cate.png';
import cart from './assets/tab-bar/cart-active.png';
import cartUn from './assets/tab-bar/cart.png';
import mine from './assets/tab-bar/user-active.png';
import mineUn from './assets/tab-bar/user.png';

const store = configStore()

class App extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/index/index',
      'pages/category/index',
      'pages/mine/index',
      'pages/shopcart/index',
      'pages/token/login',
      'pages/item/item',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      list:[
        {
          pagePath: 'pages/index/index',
          text: '首页',
          iconPath: homeUn,
          selectedIconPath: home,
        },
        {
          pagePath: 'pages/category/index',
          text: '分类',
          iconPath: cateUn,
          selectedIconPath: cate,
        },
        {
          pagePath: 'pages/shopcart/index',
          text: '购物车',
          iconPath: cartUn,
          selectedIconPath: cart,
        },
        {
          pagePath: 'pages/mine/index',
          text: '我的',
          iconPath: mineUn,
          selectedIconPath: mine,
        }
      ],
      position:'bottom',
      borderStyle:"black",
      color: "#666",
      selectedColor: "#b4282d",
      backgroundColor: "#fafafa",

    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
