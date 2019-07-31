import Taro, { Component } from '@tarojs/taro';
import { Input ,View } from '@tarojs/components';
import './FixedHeader.module.scss';
import CustomImage from '../CustomImage/CustomImage';

import categoryIcon from '../../assets/index/category@2x.png';
import icon from '../../assets/index/icon.png';
import searchIcon from '../../assets/index/searchIcon.png';


class FixedHeader extends Component {      
    render() {
        const { fixedScroll = false,count} = this.props;

        return (
            <View className={['fixedHeader', fixedScroll ? 'fixedScrollHeader' : '']}>
                <CustomImage  width={40} height={32} src={categoryIcon} />
                <View className='searchBox'>
                    <CustomImage className='iconImg' width={50} height={30} src={icon} />
                    <View className='vLine' />
                    <CustomImage className='searchIcon' width={40} height={30} src={searchIcon} />
                    {
                        count>0 ?
                        <Input className='searchInput' placeholder={`每个类别的top1 ${count} sale`} />:
                        <Input className='searchInput' placeholder='每个类别的top1 sale' />
                    }
                    
                </View>
                <View className='loginBtn' onClick={()=>Taro.navigateTo({url:'/pages/token/login'})}>登陆</View>
            </View>
        );
    }
}

export default FixedHeader;