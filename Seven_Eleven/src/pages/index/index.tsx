import Taro, { Component, Config } from '@tarojs/taro';
import { View, Text, Image, ScrollView } from '@tarojs/components'


//components
import FixedHeader from '../../components/header/FixedHeader';
import Banner from './banner'
import Recommend from './recommand'

import Policy from './policy'
import Pin from './pin'
import Operation from './operation'
import Manufactory from './manufactory'
import FlashSale from './flash-sale'
import Popular from './popular'
import Category from './category'


import { Loading } from '@components'

// utils
import { getWindowHeight } from '@utils/style'

import * as actions from '@actions/home'
import { dispatchCartNum } from '@actions/cart'
import { connect } from '@tarojs/redux'

import './index.module.scss'

const RECOMMEND_SIZE = 20

@connect(state => state.home, { ...actions, dispatchCartNum })
export default class Index extends Component {

  config: Config = {
    navigationBarTitleText: '首页'
  }

  state = {
    loaded: false,
    loading: false,
    lastItemId: 0,
    hasMore: true
  }




  componentWillMount () { }

  componentDidMount () { 
    // Taro.showToast({
    //   title: '注意，由于严选小程序首页界面、接口大幅变动，暂时去掉不相符的部分，后续再跟进改动',
    //   icon: 'none',
    //   duration: 6000
    // })

    this.props.dispatchHome().then(() => {
      this.setState({ loaded: true })
    })
    this.props.dispatchCartNum()
    this.props.dispatchSearchCount()
    this.props.dispatchPin({ orderType: 4, size: 12 })
    this.loadRecommend()
  }

  loadRecommend = () => {
    if (!this.state.hasMore || this.state.loading) {
      return
    }

    const payload = {
      lastItemId: this.state.lastItemId,
      size: RECOMMEND_SIZE
    }
    this.setState({ loading: true })
    this.props.dispatchRecommend(payload).then((res) => {
      const lastItem = res.rcmdItemList[res.rcmdItemList.length - 1]
      this.setState({
        loading: false,
        hasMore: res.hasMore,
        lastItemId: lastItem && lastItem.id
      })
    }).catch(() => {
      this.setState({ loading: false })
    })
  }

  handlePrevent = () => {
    // XXX 时间关系，首页只实现底部推荐商品的点击
    Taro.showToast({
      title: '目前只可点击底部推荐商品',
      icon: 'none'
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handlePrevent = () => {
    // XXX 时间关系，首页只实现底部推荐商品的点击
    Taro.showToast({
      title: '目前只可点击底部推荐商品',
      icon: 'none'
    })
  }

  render () {
    if (!this.state.loaded) {
      return <Loading />
    }
    const { homeInfo, searchCount, recommend, pin } = this.props
    console.log(this.props)
    return (
      <View className='container'>
        <FixedHeader data={searchCount} fixedScroll={false} />
        <ScrollView
          scrollY
          className='home__wrap'
          onScrollToLower={this.loadRecommend}
          style={{ height: getWindowHeight() }}
          >
            <View onClick={this.handlePrevent}>
              <Banner list={homeInfo.focus} />
            {/* <Policy list={homeInfo.policyDesc} /> */}


            <Pin
              banner={homeInfo.newUserExclusive}
              list={pin}
            />

          {/* 
            <Operation
              list={homeInfo.operationCfg}
              sale={homeInfo.saleCenter}
            /> */}


            {/* <Manufactory
              data={homeInfo.manufactureItems}
              boss={homeInfo.dingBossRcmd}
            /> */}

            {/* 限时购 */}
            <FlashSale data={homeInfo.timePurchaseItems} />

            {/* 人气推荐 */}
            {/* <Popular data={homeInfo.popularItems} /> */}

            {/* 类目热销榜 */}
            {/* <Category data={homeInfo.categoryItemsV4} /> */}

            </View>
            <Recommend list={recommend} />

            {this.state.loading &&
            <View className='home__loading'>
              <Text className='home__loading-txt'>正在加载中...</Text>
            </View>
          }
          {!this.state.hasMore &&
            <View className='home__loading home__loading--not-more'>
              <Text className='home__loading-txt'>更多内容，敬请期待</Text>
            </View>
          }
          
        </ScrollView>
        
      </View>
    )
  }
}
