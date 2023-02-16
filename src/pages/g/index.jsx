import { useState, useRef } from 'react';
import { LoginFormPage } from '@ant-design/pro-components';
import { Alert, message, Tabs } from 'antd';
import { useNavigate } from 'react-router-dom';
import Login from './login';
import Register from './register';
import { uploadImg } from '../../services/upload';
import { userLogin, userRegister } from '../../services/user';
import { setLocalStorage } from '../../utils/localStorage';

const Index = () => {
  const [loginType, setLoginType] = useState('login');
  const [errorText, setErrorText] = useState('');
  const navigate = useNavigate();
  const formRef = useRef({});

  const login = async (values) => {
    setErrorText('');
    const { data: { code, token, userInfo, message: info } = {} } = await userLogin(values.login);
    if (code === 200) {
      if (userInfo.role !== 1) {
        setErrorText(info);
        return false;
      }
      message.success(info);
      setLocalStorage('token', token);
      setLocalStorage('userInfo', userInfo);
      navigate('/home', { replace: true });
      return true;
    }
    message.error(info);
    setErrorText(info);
    return false;
  };

  const register = async (values) => {
    setErrorText('');
    const { data: { code, data } = {} } = await uploadImg({
      file: values.regist.headImgUrl[0].file
    });
    if (code === 200) {
      const { data: registerInfo } = await userRegister({
        ...values.regist,
        headImgUrl: data,
        role: 2
      });
      if (registerInfo.code === 200) {
        formRef.current.resetFields();
        message.success(registerInfo.message);
        setLoginType('login');
        return true;
      }
      message.error(registerInfo.message);
      return false;
    }
    return false;
  };

  return (
    <LoginFormPage
      backgroundImageUrl="https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png"
      logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
      title="博客后台管理"
      subTitle="---chihaicheng"
      actions={false}
      message={errorText && <Alert type="warning" showIcon message={errorText} />}
      layout="horizontal"
      labelAlign="right"
      labelCol={{ span: 5 }}
      wrapperCol={{ flex: 1 }}
      formRef={formRef}
      submitter={{ searchConfig: { submitText: loginType === 'login' ? '登录' : '注册' } }}
      onFinish={async (values) => (values.regist ? register(values) : login(values))}
    >
      <Tabs
        centered
        activeKey={loginType}
        onChange={(activeKey) => {
          setErrorText('');
          setLoginType(activeKey);
        }}
        destroyInactiveTabPane
        items={[
          {
            key: 'login',
            label: '登录',
            children: <Login />
          },
          {
            key: 'register',
            label: '注册',
            children: <Register />
          }
        ]}
      />
    </LoginFormPage>
  );
};

export default Index;
