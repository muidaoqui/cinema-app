import React, { useState, useEffect } from 'react';
import { Space, Table, Tooltip, Image } from 'antd';
import { useTheme } from './themecontext';
import axios from 'axios';

function Discount() {
  const { Column } = Table;
  const { currentTheme, changeTheme } = useTheme();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/discount') 
      .then(res => {
        const list = res.data.map((item, index) => ({
          key: index + 1,
          title: item.title,
          content: item.content,
          image: item.image,
        }));
        setData(list);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="flex-grow w-5/6 float-right">
      <Table
        dataSource={data}
        className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden"
      >
        <Column title="Tiêu đề" dataIndex="title" key="title" />

        <Column 
          title="Nội dung" 
          dataIndex="content" 
          key="content"
          render={(content) => (
            <Tooltip title={content}>
              {content.length > 100 ? content.slice(0, 100) + '...' : content}
            </Tooltip>
          )}
        />

        <Column 
          title="Hình ảnh" 
          dataIndex="image" 
          key="image"
          render={(img) => (
            <Image
              width={120}
              height={80}
              src={img}
              alt="promotion"
              style={{ objectFit: 'cover' }}
            />
          )}
        />

        <Column
          title="Hành động"
          key="action"
          render={(_, record) => (
            <Space size="middle">
              <a className="text-blue-500 hover:text-blue-700">Sửa</a>
              <a className="text-red-500 hover:text-red-700">Xóa</a>
            </Space>
          )}
        />
      </Table>
    </div>
  );
}

export default Discount;
