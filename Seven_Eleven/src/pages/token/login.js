import Taro, { Component } from '@tarojs/taro';
import { Button, Input, View } from '@tarojs/components';
import './index.scss';

import CustomImage from '../../components/CustomImage/CustomImage';
import forgetPasswordLeftImg from '../../assets/token/login/forgetPasswordLeft.png';
import qqImg from '../../assets/token/login/qq.png';
import weixinImg from '../../assets/token/login/weixin.png';


class Login extends Component {

  state = {
    fixedHeaderStyle: false,
  };

  config = {
    navigationBarTitleText: '登陆',
  };

  onInputParam = (key, e) => {
    this.setState({ [key]: e.detail.value });
  };

  onClickLogin = () => {
    let { identifier, credential } = this.state;
    const { dispatch } = this.props;
    dispatch(action('user/loginByPhoneSms', { phone: identifier, sms: credential }));
  };

  render() {
    return (
      <View className='container1' >
        <Input onInput={this.onInputParam.bind(this, 'identifier')} className='account' placeholder='用户名/邮箱/已验证手机' />
        <View className='passwordBox' >
          <Input password onInput={this.onInputParam.bind(this, 'credential')} className='password' placeholder='请输入密码' />
          <View className='forgetPasswordBox' >
            <CustomImage width={32} height={9} src={forgetPasswordLeftImg} />
            <View className='forgetPassword' >忘记密码</View >
          </View >
        </View >
        <Button className='loginButton' onClick={this.onClickLogin} >登陆</Button >
        <Button className='oneKeyLogin' >一键登录</Button >
        <View className='otherButton' >
          <View >短信验证码登陆</View >
          <View >手机快速注册</View >
        </View >
        <View className='otherLoginMethod' >其他登陆方式</View >
        <View className='qqOrWeixinBox' >
          <View className='qqBox' >
            <CustomImage width={96} height={96} src={qqImg} />
            <View className='qqWeixinText' >QQ</View >
          </View >
          <View className='weixinBox' >
            <CustomImage width={96} height={96} src={weixinImg} />
            <View className='qqWeixinText' >微信</View >
          </View >
        </View >
        <View className='protocolBox' >
          <View >登陆即代表您已同意</View >
          <View className='protocol' >京东隐私政策</View >
        </View >
      </View >
    );
  }
}

export default Login;
