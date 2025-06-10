import React from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu, Switch } from 'antd';
import { useTheme } from './themecontext'; // Import hook useTheme

const items = [
  {
    key: 'sub1',
    label: 'Tài khoản',
    icon: <MailOutlined />,
    children: [
      { key: '1', label: 'Tùy chọn 1' },
      { key: '2', label: 'Tùy chọn 2' },
      { key: '3', label: 'Tùy chọn 3' },
      { key: '4', label: 'Tùy chọn 4' },
    ],
  },
  {
    key: 'sub2',
    label: 'Phim',
    icon: <AppstoreOutlined />,
    children: [
      { key: '5', label: 'Tùy chọn 5' },
      { key: '6', label: 'Tùy chọn 6' },
      {
        key: 'sub3',
        label: 'Menu con',
        children: [
          { key: '7', label: 'Tùy chọn 7' },
          { key: '8', label: 'Tùy chọn 8' },
        ],
      },
    ],
  },
  {
    key: 'sub4',
    label: 'Rạp chiếu',
    icon: <AppstoreOutlined />,
    children: [
      { key: '5', label: 'Tùy chọn 5' },
      { key: '6', label: 'Tùy chọn 6' },
      {
        key: 'sub3_cinema', // Key nên là duy nhất
        label: 'Menu con',
        children: [
          { key: '7_cinema', label: 'Tùy chọn 7' }, // Key nên là duy nhất
          { key: '8_cinema', label: 'Tùy chọn 8' }, // Key nên là duy nhất
        ],
      },
    ],
  },
  {
    key: 'sub5',
    label: 'Tin tức',
    icon: <SettingOutlined />,
    children: [
      { key: '9', label: 'Tùy chọn 9' },
      { key: '10', label: 'Tùy chọn 10' },
      { key: '11', label: 'Tùy chọn 11' },
      { key: '12', label: 'Tùy chọn 12' },
    ],
  },
];

function NavbarAdmin() {
  const { currentTheme, changeTheme } = useTheme(); // Lấy theme và hàm đổi theme từ Context
  const [currentSelectedKey, setCurrentSelectedKey] = React.useState('1'); // Đổi tên biến state để tránh nhầm lẫn

  const onClick = (e) => {
    console.log('click ', e);
    setCurrentSelectedKey(e.key);
  };

  return (
    <div className="float-left w-1/6 h-full float-left w-1/6 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white transition-colors duration-300">
      <div>

      </div>
      <Menu
        theme={currentTheme} // Sử dụng theme từ Context
        onClick={onClick}
        style={{ width: '100%' }} // Đảm bảo menu chiếm hết chiều rộng của div cha
        defaultOpenKeys={['sub1']}
        selectedKeys={[currentSelectedKey]}
        mode="inline"
        items={items}
      />
    </div>
  );
}

export default NavbarAdmin;