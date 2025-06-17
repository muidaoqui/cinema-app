import React, { useEffect, useState } from 'react';
import { Table, Tag, Tooltip, Image, Space } from 'antd';
import axios from 'axios';
import { useTheme } from './themecontext';

function Coming() {
  const { Column } = Table;
  const { currentTheme } = useTheme();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/comingsoon') // API này cần trả về danh sách phim sắp chiếu
      .then(res => {
        const list = res.data.map((item, index) => ({
          key: index + 1,
          nameMo: item.nameMo,
          cinemaMo: item.cinemaMo,
          infoMo: item.infoMo,
          newsMo: item.newsMo,
          agelimitMo: item.agelimitMo,
          ratingMo: item.ratingMo
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
        pagination={{ pageSize: 5 }}
      >
        <Column title="Tên phim" dataIndex="nameMo" key="nameMo" />

        <Column 
          title="Cụm rạp" 
          dataIndex="cinemaMo" 
          key="cinemaMo"
          render={(cinemas) => (
            <>
              {cinemas.map((c, i) => (
                <Tag color="geekblue" key={i}>{c}</Tag>
              ))}
            </>
          )}
        />

        <Column 
          title="Diễn viên" 
          dataIndex={["infoMo", "actor"]} 
          key="actor"
          render={(actors) => actors.join(', ')} 
        />

        <Column 
          title="Đạo diễn" 
          dataIndex={["infoMo", "director"]} 
          key="director" 
        />

        <Column 
          title="Giới hạn tuổi" 
          dataIndex="agelimitMo" 
          key="agelimitMo" 
          render={(age) => <Tag color={age >= 18 ? 'red' : 'green'}>{age}+</Tag>}
        />

        <Column 
          title="Đánh giá" 
          dataIndex="ratingMo" 
          key="ratingMo" 
        />

        <Column 
          title="Hình ảnh" 
          dataIndex={["infoMo", "somePic"]} 
          key="somePic"
          render={(pics) => (
            <Image 
              src={pics[0]} 
              width={100} 
              height={140} 
              alt="poster" 
              style={{ objectFit: 'cover' }} 
            />
          )}
        />

        <Column 
          title="Tin tức" 
          dataIndex="newsMo" 
          key="newsMo"
          render={(text) => (
            <Tooltip title={text}>
              {text.length > 50 ? text.slice(0, 50) + '...' : text}
            </Tooltip>
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

export default Coming;
