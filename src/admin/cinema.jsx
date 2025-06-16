import React, { useState, useEffect } from 'react';
import { Space, Table, Tag, Switch } from 'antd';
import { useTheme } from './themecontext';
import axios from 'axios';

function Cinema() {
  const { Column } = Table;
  const { currentTheme, changeTheme } = useTheme();
  const [data, setData] = useState([]);
  const [currentSelectedRowKey, setCurrentSelectedRowKey] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/cinemas')
      .then(res => {
        const cinemas = res.data.map((cinema, index) => ({
          key: index + 1,
          name: cinema.nameCine,
          address: cinema.addressCine,
          hotline: cinema.hotline,
          image: cinema.image
        }));
        setData(cinemas);
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
        <Column title="Cine" dataIndex="name" key="name" />
        <Column title="Địa chỉ" dataIndex="address" key="address" />
        <Column 
          title="Hotline" 
          dataIndex="hotline" 
          key="hotline"
          render={(hotline) => (
            <Tag color="red" key={hotline}>
              {hotline}
            </Tag>
          )}
        />
        <Column 
          title="Image" 
          dataIndex="image" 
          key="image"
          render={(image) => (
            <img src={image} alt="image" style={{ width: '100px', height: '150px', objectFit: 'cover' }} />
          )}
        />
        <Column
          title="Hành động"
          key="action"
          render={(_, record) => (
            <Space size="middle">
              <a className="text-blue-500 hover:text-blue-700">Sửa {record.name}</a>
              <a className="text-red-500 hover:text-red-700">Xóa</a>
            </Space>
          )}
        />
      </Table>
    </div>
  );
}

export default Cinema;
