import Taro, { Component, Config } from '@tarojs/taro';
import { View } from '@tarojs/components';
import  './index.module.scss';

//components
import FixedHeader from '../../components/header/FixedHeader';

export default class Index extends Component {

  config: Config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='container'>
        <FixedHeader fixedScroll={false} />
      </View>
    )
  }
}
