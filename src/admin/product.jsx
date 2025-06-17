import React, { useState, useEffect } from 'react';
import { Space, Table, Tooltip, Image } from 'antd';
import { useTheme } from './themecontext';
import axios from 'axios';

function Product() {
  const { Column } = Table;
  const { currentTheme, changeTheme } = useTheme();
  const [data, setData] = useState([]);
  const [currentSelectedRowKey, setCurrentSelectedRowKey] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/products') // Cập nhật đúng API backend của bạn
      .then(res => {
        const productList = res.data.map((product, index) => ({
          key: index + 1,
          name: product.namePro,
          price: product.pricePro,
          description: product.describePro,
          image: product.image,
        }));
        setData(productList);
      })
      .catch(err => console.error(err));
  }, []);

  const formatCurrency = (number) =>
    number.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

  const onRowClick = (record, index) => {
    setCurrentSelectedRowKey(record.key);
  };

  return (
    <div className="flex-grow w-5/6 float-right">
      <Table
        dataSource={data}
        onRow={(record, rowIndex) => ({
          onClick: () => onRowClick(record, rowIndex),
        })}
        className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden"
      >
        <Column title="Tên Sản Phẩm" dataIndex="name" key="name" />

        <Column 
          title="Giá" 
          dataIndex="price" 
          key="price"
          render={(price) => <span>{formatCurrency(price)}</span>}
        />

        <Column 
          title="Mô tả" 
          dataIndex="description" 
          key="description"
          render={(desc) => (
            <Tooltip title={desc}>
              {desc.length > 100 ? desc.slice(0, 100) + '...' : desc}
            </Tooltip>
          )}
        />

        <Column 
          title="Hình ảnh" 
          dataIndex="image" 
          key="image"
          render={(images) => (
            <Image
              width={100}
              height={150}
              src={images[0]} // Hiển thị hình đầu tiên
              alt="product"
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

export default Product;
