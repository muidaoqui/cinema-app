import React, { useState } from 'react';
import { Space, Table, Tag, Switch } from 'antd'; // Giữ lại Switch vì bạn có thể muốn điều khiển theme từ đây
import { useTheme } from './themecontext'; // Import hook useTheme

function HomeAdmin() {
  const { Column, ColumnGroup } = Table;
  const { currentTheme, changeTheme } = useTheme(); // Lấy theme và hàm đổi theme từ Context

  const data = [
    {
      key: '1',
      firstName: 'John',
      lastName: 'Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      firstName: 'Jim',
      lastName: 'Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      firstName: 'Joe',
      lastName: 'Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];

  // current state cho việc chọn hàng trong bảng, không liên quan đến theme
  const [currentSelectedRowKey, setCurrentSelectedRowKey] = useState('');

  const onRowClick = (record, index) => {
    console.log('Hàng được nhấp:', record);
    setCurrentSelectedRowKey(record.key);
  };

  return (
    <div className="flex-grow w-5/6  float-right"> {/* Sử dụng flex-grow để chiếm hết không gian còn lại */}
      
      <Table
        dataSource={data}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              onRowClick(record, rowIndex);
            },
          };
        }}
        // Không truyền 'theme' vào Table trực tiếp, nó được quản lý bởi ConfigProvider
        // Bạn có thể thêm class Tailwind để điều chỉnh màu nền của bảng nếu cần
        className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden"
      >
        <ColumnGroup title="Tên">
          <Column title="Tên đầu" dataIndex="firstName" key="firstName" />
          <Column title="Tên cuối" dataIndex="lastName" key="lastName" />
        </ColumnGroup>
        <Column title="Tuổi" dataIndex="age" key="age" />
        <Column title="Địa chỉ" dataIndex="address" key="address" />
        <Column
          title="Thẻ"
          dataIndex="tags"
          key="tags"
          render={(tags) => (
            <>
              {tags.map((tag) => {
                let color = tag.length > 5 ? 'geekblue' : 'green';
                if (tag === 'loser') {
                  color = 'volcano';
                }
                return (
                  <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
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
              <a className="text-blue-500 hover:text-blue-700">Mời {record.lastName}</a>
              <a className="text-red-500 hover:text-red-700">Xóa</a>
            </Space>
          )}
        />
      </Table>
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

export default HomeAdmin;