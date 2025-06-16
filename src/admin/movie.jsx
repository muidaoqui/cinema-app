import React, { useState, useEffect } from 'react';
import { Space, Table, Tag, Switch } from 'antd';
import { useTheme } from './themecontext';
import axios from 'axios'; 

function Movie() {
    const {Column} = Table;
    const { currentTheme, changeTheme } = useTheme();
    const [data, setData] = useState([]);
    const [currentSelectedRowKey, setCurrentSelectedRowKey] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/api/movies')
            .then(res => {
                const movies = res.data.map((movie, index) => ({
                    key: index + 1,
                    name: movie.nameMo,
                    cinema: movie.cinemaMo.join(', '),
                    director: movie.infoMo.director,
                    actor: movie.infoMo.actor.join(', '),
                    rating: movie.ratingMo,
                    agelimit: movie.agelimitMo,
                    news: movie.newsMo,
                    showtime: movie.showtimeMo,
                    pic: movie.infoMo.somePic[0],
                    comments: movie.infoMo.comments.join(', ')
                }));
                setData(movies);
            })
            .catch(err => console.error(err));
    }, []);

    const onRowClick = (record, index) => {
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
                <Column title="Tên Phim" dataIndex="name" key="name" />
                <Column title="Rạp Chiếu" dataIndex="cinema" key="cinema" />
                <Column title="Đạo Diễn" dataIndex="director" key="director" />
                <Column title="Diễn Viên" dataIndex="actor" key="actor" />
                <Column 
  title="Giới Hạn Tuổi" 
  dataIndex="agelimit" 
  key="agelimit" 
  render={(age) => {
    let color = 'green';
    if (age > 17) color = 'red';
    else if (age > 15) color = 'orange';
    else if (age > 11) color = 'gold';

    return (
      <Tag color={color} key={age}>
        {age}+ 
      </Tag>
    );
  }}
/>

                <Column title="Đánh Giá" dataIndex="rating" key="rating" />
                <Column title="Tin Tức" dataIndex="news" key="news" />
                <Column 
                title="Poster" 
                dataIndex="pic" 
                key="pic"
                render={(pic) => (
                    <img src={pic} alt="poster" style={{ width: '100px', height: '150px', objectFit: 'cover' }} />
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
    )
}

export default Movie;