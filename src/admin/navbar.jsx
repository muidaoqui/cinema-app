import React from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu, Switch } from 'antd';
import { useTheme } from './themecontext';
import { useNavigate } from 'react-router-dom';

function NavbarAdmin() {
  const { currentTheme, changeTheme } = useTheme();
  const [currentSelectedKey, setCurrentSelectedKey] = React.useState([]);
  const navigate = useNavigate();

  // Menu gọn gàng, mỗi item có path và label rõ ràng
  const items = [
    {
      key: 'account',
      icon: <MailOutlined />,
      label: 'Tài khoản',
      path: '/account',
    },
    {
      key: 'movie',
      icon: <AppstoreOutlined />,
      label: 'Phim',
      children: [
        {
          key: 'all-movie',
          label: 'Danh sách phim',
          path: '/movie',
        },
        {
          key: 'coming-soon',
          label: 'Phim sắp chiếu',
          path: '/coming',
        },
      ],
    },
    {
      key: 'cinema',
      icon: <AppstoreOutlined />,
      label: 'Rạp chiếu',
      children: [
        {
          key: 'cinema-list',
          label: 'Danh sách rạp',
          path: '/cinema',
        },
        {
          key: 'product',
          label: 'Sản phẩm',
          path: '/product',
        },
      ],
    },
    {
      key: 'news',
      icon: <SettingOutlined />,
      label: 'Tin tức',
      children: [
        {
          key: 'all-news',
          label: 'Danh sách tin',
          path: '/news',
        },
        {
          key: 'discount',
          label: 'Khuyến mãi',
          path: '/discount',
        },
      ],
    },
  ];

  // Tìm path theo key
  const findPathByKey = (items, key) => {
    for (const item of items) {
      if (item.key === key && item.path) return item.path;
      if (item.children) {
        const childPath = findPathByKey(item.children, key);
        if (childPath) return childPath;
      }
    }
    return null;
  };

  const onClick = (e) => {
    setCurrentSelectedKey([e.key]);
    const path = findPathByKey(items, e.key);
    if (path) navigate(path);
  };

  return (
    <div className="float-left w-1/6 h-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white transition-colors duration-300">
      <Menu
        theme={currentTheme}
        onClick={onClick}
        style={{ width: '100%' }}
        selectedKeys={currentSelectedKey}
        mode="inline"
        defaultOpenKeys={['movie', 'cinema', 'news']}
        items={items}
      />
      <div className="p-4 flex justify-center mt-4">
        <Switch
          checked={currentTheme === 'dark'}
          onChange={changeTheme}
          checkedChildren="Tối"
          unCheckedChildren="Sáng"
        />
        <span className="ml-2 text-black dark:text-white">Chế độ hiển thị</span>
      </div>
    </div>
  );
}

export default NavbarAdmin;
