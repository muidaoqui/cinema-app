import React from 'react';
import { AudioOutlined, DownOutlined, UserOutlined } from '@ant-design/icons';
import { Input, Space, Dropdown, Button, message } from 'antd';

function ToolBar() {
    const { Search } = Input;
    const suffix = (
        <AudioOutlined style={{ fontSize: 16, color: '#1677ff' }} />
    );

    const onSearch = (value, _e, info) =>
        console.log(info?.source, value);

    const handleMenuClick = e => {
        message.info('Click on menu item.');
        console.log('click', e);
    };

    const items = [
        { label: '1st menu item', key: '1', icon: <UserOutlined /> },
        { label: '2nd menu item', key: '2', icon: <UserOutlined /> },
        { label: '3rd menu item', key: '3', icon: <UserOutlined />, danger: true },
        { label: '4th menu item', key: '4', icon: <UserOutlined />, danger: true, disabled: true },
    ];

    return (
        <div className="flex justify-between">
            <div>
                <img
                    src="https://www.galaxycine.vn/_next/static/media/galaxy-logo-mobile.074abeac.png"
                    alt="logo"
                    className="w-40 m-10 ml-20"
                />
            </div>
            <div className="w-1/2 flex justify-center items-center">
                <h1 className="text-3xl font-bold">Danh Sách Quản Lý</h1>
            </div>
            <div className="flex justify-center items-center">
                <Search
                    className="h-12"
                    placeholder="input search text"
                    enterButton="Search"
                    size="large"
                    suffix={suffix}
                    onSearch={onSearch}
                />
            </div>
            <div className="flex m-20 mr-20">
                <Dropdown menu={{ items, onClick: handleMenuClick }} className="h-10">
                    <Button>
                        Cài Đặt <UserOutlined />
                    </Button>
                </Dropdown>
            </div>
        </div>
    );
}

export default ToolBar;
