import React from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu, Switch } from 'antd';
import { useTheme } from './themecontext';
import { useNavigate } from 'react-router-dom';

function NavbarAdmin() {
  const { currentTheme, changeTheme } = useTheme();
  const [currentSelectedKey, setCurrentSelectedKey] = React.useState([]);
  const navigate = useNavigate();

  // Khai báo items bên trong function để dùng navigate
  const items = [
    {
      key: 'sub1',
      label: <div onClick={() => navigate('/account')}>Tài khoản</div>,
      icon: <MailOutlined />,
      children: [
        { key: '1', label: 'Tùy chọn 1', path: '/option1' },
        { key: '2', label: 'Tùy chọn 2', path: '/option2' },
        { key: '3', label: 'Tùy chọn 3', path: '/option3' },
        { key: '4', label: 'Tùy chọn 4', path: '/option4' },
      ],
    },
    {
      key: 'sub2',
      label: <div onClick={() => navigate('/movie')}>Phim</div>,
      icon: <AppstoreOutlined />,
      children: [
        { key: '5', label: 'Tùy chọn 5', path: '/option5' },
        { key: '6', label: 'Tùy chọn 6', path: '/option6' },
        {
          key: 'sub3',
          label: 'Menu con',
          children: [
            { key: '7', label: 'Tùy chọn 7', path: '/option7' },
            { key: '8', label: 'Tùy chọn 8', path: '/option8' },
          ],
        },
      ],
    },
    {
      key: 'sub4',
      label: <div onClick={() => navigate('/cinema')}>Rạp chiếu</div>,
      icon: <AppstoreOutlined />,
      children: [
        { key: '9', label: 'Tùy chọn 9', path: '/option9' },
        { key: '10', label: 'Tùy chọn 10', path: '/option10' },
        {
          key: 'sub3_cinema',
          label: 'Menu con',
          children: [
            { key: '11', label: 'Tùy chọn 11', path: '/option11' },
            { key: '12', label: 'Tùy chọn 12', path: '/option12' },
          ],
        },
      ],
    },
    {
      key: 'sub5',
      label: <div onClick={() => navigate('/news')}>Tin tức</div>,
      icon: <SettingOutlined />,
      children: [
        { key: '13', label: 'Tùy chọn 13', path: '/option13' },
        { key: '14', label: 'Tùy chọn 14', path: '/option14' },
      ],
    },
  ];

  // Đệ quy tìm path theo key
  const findPathByKey = (items, key) => {
    for (const item of items) {
      if (item.key === key && item.path) {
        return item.path;
      }
      if (item.children) {
        const childPath = findPathByKey(item.children, key);
        if (childPath) return childPath;
      }
    }
    return null;
  };

  const onClick = (e) => {
    console.log('click ', e);
    setCurrentSelectedKey([e.key]);
    const path = findPathByKey(items, e.key);
    if (path) {
      navigate(path);
    }
  };

  return (
    <div className="float-left w-1/6 h-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white transition-colors duration-300">
      <Menu
        theme={currentTheme}
        onClick={onClick}
        style={{ width: '100%' }}
        defaultOpenKeys={['sub1']}
        selectedKeys={currentSelectedKey}
        mode="inline"
        items={items}
      />
      <div className="p-4 flex justify-center mt-4">
        <Switch
          checked={currentTheme === 'dark'}
          onChange={changeTheme}
          checkedChildren="Tối"
          unCheckedChildren="Sáng"
        />
        <span className="ml-2 text-black dark:text-white">Chế độ hiển thị từ Home</span>
      </div>
    </div>
  );
}

export default NavbarAdmin;
