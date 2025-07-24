import React, { useState, useEffect } from 'react';
import { Space, Table, Tag, Image, Tooltip } from 'antd';
import { useTheme } from './themecontext';
import axios from 'axios';

function News() {
  const { Column } = Table;
  const { currentTheme, changeTheme } = useTheme();
  const [data, setData] = useState([]);
  const [currentSelectedRowKey, setCurrentSelectedRowKey] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/news')  // Đổi đúng endpoint API của bạn
      .then(res => {
        const newsList = res.data.map((news, index) => ({
          key: index + 1,
          name: news.nameNews,
          content: news.contentNews,
          images: news.imagesNews
        }));
        setData(newsList);
      })
      .catch(err => console.error(err));
  }, []);

  const onRowClick = (record, index) => {
    console.log('Hàng được nhấp:', record);
    setCurrentSelectedRowKey(record.key);
  };

  return (
    <div className="flex-grow p-4">
      <Table
        dataSource={data}
        onRow={(record, rowIndex) => {
          return {
            onClick: () => onRowClick(record, rowIndex),
          };
        }}
        className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden"
      >
        <Column title="Tiêu đề" dataIndex="name" key="name" />
        
        <Column 
          title="Nội dung" 
          dataIndex="content" 
          key="content"
          render={(content) => (
            <Tooltip title={content}>
              {content.length > 100 ? content.substring(0, 100) + '...' : content}
            </Tooltip>
          )}
        />

        <Column 
          title="Hình ảnh" 
          dataIndex="images" 
          key="images"
          render={(images) => (
            <Space>
              {images.map((img, index) => (
                <Image
                  key={index}
                  width={80}
                  height={120}
                  src={img}
                  alt={`news-img-${index}`}
                />
              ))}
            </Space>
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

export default News;
