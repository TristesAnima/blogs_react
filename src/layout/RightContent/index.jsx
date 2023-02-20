import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Dropdown, message, Space, Tooltip } from 'antd';
import { LogoutOutlined, GithubOutlined, ShareAltOutlined } from '@ant-design/icons';
import { getLocalStorage, removeLocalStorage } from '../../utils/localStorage';

function Index() {
  const navigate = useNavigate();
  const { headImgUrl, nickname } = getLocalStorage('userInfo') || {};

  const items = [
    {
      key: 'logout',
      label: '退出登录',
      icon: <LogoutOutlined />
    }
  ];

  return (
    <Space align="center" size="middle">
      <Tooltip title={`V${1}.0`}>
        <ShareAltOutlined style={{ fontSize: 20 }} />
      </Tooltip>

      <Tooltip title="github">
        <GithubOutlined
          style={{ fontSize: 20 }}
          onClick={() => window.open('https://github.com/TristesAnima')}
        />
      </Tooltip>

      <Dropdown
        placement="bottomRight"
        menu={{
          items,
          onClick: ({ key }) => {
            switch (key) {
              case 'logout':
                removeLocalStorage('token');
                removeLocalStorage('userInfo');
                message.success('退出登录成功');
                navigate('/g', { replace: true });
                break;
              default:
                break;
            }
          }
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
          <Avatar
            src={headImgUrl}
            style={
              !headImgUrl && {
                backgroundColor: '#fde3cf',
                color: '#f56a00'
              }
            }
          >
            u
          </Avatar>
          <span>{nickname}</span>
        </div>
      </Dropdown>
    </Space>
  );
}

export default Index;