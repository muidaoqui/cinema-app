import React from 'react';
import {
  AudioOutlined,
  DownOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { Input, Dropdown, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';

function ToolBar() {
  const { Search } = Input;
  const navigate = useNavigate();

  const suffix = (
    <AudioOutlined style={{ fontSize: 16, color: '#1677ff' }} />
  );

  const onSearch = (value, _e, info) => {
    console.log(info?.source, value);
  };

  const handleMenuClick = (e) => {
    switch (e.key) {
      case 'profile':
        message.info('Chuyển đến trang cá nhân');
        navigate('/login');
        break;
      case 'settings':
        message.info('Chuyển đến cài đặt hệ thống');
        navigate('/login');
        break;
      case 'logout':
        message.success('Đã đăng xuất');
        localStorage.clear(); // Hoặc remove token cụ thể nếu có
        navigate('/login');
        break;
      default:
        break;
    }
  };

  const items = [
    {
      label: 'Trang cá nhân',
      key: 'profile',
      icon: <UserOutlined />
    },
    {
      label: 'Cài đặt hệ thống',
      key: 'settings',
      icon: <SettingOutlined />
    },
    {
      type: 'divider'
    },
    {
      label: 'Đăng xuất',
      key: 'logout',
      icon: <LogoutOutlined />,
      danger: true
    }
  ];

  return (
    <div className="flex justify-between items-center px-10 py-4 bg-white shadow">
      <div>
        <img
          src="https://www.galaxycine.vn/_next/static/media/galaxy-logo-mobile.074abeac.png"
          alt="logo"
          className="w-40"
        />
      </div>

      <div className="w-1/2 flex justify-center items-center">
        <h1 className="text-3xl font-bold">Danh Sách Quản Lý</h1>
      </div>

      <div className="flex items-center gap-4">
        <Search
          className="h-12"
          placeholder="Tìm kiếm..."
          enterButton="Tìm"
          size="large"
          suffix={suffix}
          onSearch={onSearch}
        />
        <Dropdown menu={{ items, onClick: handleMenuClick }}>
          <Button icon={<UserOutlined />}>
            Cài Đặt <DownOutlined />
          </Button>
        </Dropdown>
      </div>
    </div>
  );
}

export default ToolBar;
