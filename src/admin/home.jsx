import React, { useState, useEffect } from 'react';
import { Space, Table, Tag, Switch } from 'antd';
import { useTheme } from './themecontext';
import axios from 'axios';  // thêm axios để gọi API

function Account() {
  const { Column } = Table;
  const { currentTheme, changeTheme } = useTheme();
  const [data, setData] = useState([]);
  const [currentSelectedRowKey, setCurrentSelectedRowKey] = useState('');

  useEffect(() => {
    // Giả sử API endpoint là /api/users
    axios.get('http://localhost:5000/api/users')  // đổi endpoint theo server của bạn
      .then(res => {
        const users = res.data.map((user, index) => ({
          key: index + 1,
          email: user.email,
          fullname: user.fullname,
          age: user.age,
          role: user.role
        }));
        setData(users);
      })
      .catch(err => console.error(err));
  }, []);

  const onRowClick = (record, index) => {
    console.log('Hàng được nhấp:', record);
    setCurrentSelectedRowKey(record.key);
  };

  return (
    <div className="flex-grow w-5/6 float-right">
      <Table
        dataSource={data}
        onRow={(record, rowIndex) => {
          return {
            onClick: () => onRowClick(record, rowIndex),
          };
        }}
        className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden"
      >
        <Column title="Email" dataIndex="email" key="email" />
        <Column title="Họ Tên" dataIndex="fullname" key="fullname" />
        <Column title="Tuổi" dataIndex="age" key="age" />
        <Column
          title="Thẻ"
          dataIndex="role"
          key="role"
          render={(roles) => (
            <>
              {roles.map((role) => {
                let color = role === 'VIP' ? 'gold' : 'blue';
                return (
                  <Tag color={color} key={role}>
                    {role.toUpperCase()}
                  </Tag>
                );
              })}
            </>
          )}
        />
        <Column
          title="Hành động"
          key="action"
          render={(_, record) => (
            <Space size="middle">
              <a className="text-blue-500 hover:text-blue-700">Sửa {record.fullname}</a>
              <a className="text-red-500 hover:text-red-700">Xóa</a>
            </Space>
          )}
        />
      </Table>

      
    </div>
  );
}

export default Account;
