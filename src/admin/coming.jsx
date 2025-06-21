// Coming.jsx - quản lý phim sắp chiếu (tương tự Movie.jsx)

import React, { useEffect, useState } from 'react';
import { Table, Tag, Tooltip, Image, Space, Drawer, Form, Input, InputNumber, Button, message } from 'antd';
import axios from 'axios';
import { useTheme } from './themecontext';

function Coming() {
  const { Column } = Table;
  const { currentTheme } = useTheme();
  const [data, setData] = useState([]);
  const [editingMovie, setEditingMovie] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    axios.get('http://localhost:5000/api/comingsoon')
      .then(res => {
        const list = res.data.map((item, index) => ({
          key: index + 1,
          _id: item._id,
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

  useEffect(() => {
    if (editingMovie) form.setFieldsValue(editingMovie);
  }, [editingMovie]);

  const handleEdit = (record) => {
    const transformed = {
      ...record,
      actor: record.infoMo.actor.join(', '),
      director: record.infoMo.director,
      pic: record.infoMo.somePic[0],
      content: record.infoMo.content
    };
    setEditingMovie(transformed);
  };

  const handleSave = () => {
    form.validateFields().then(values => {
      const payload = {
        nameMo: values.nameMo,
        cinemaMo: editingMovie.cinemaMo,
        agelimitMo: values.agelimitMo,
        ratingMo: values.ratingMo,
        newsMo: values.newsMo,
        infoMo: {
          director: values.director,
          actor: values.actor.split(',').map(a => a.trim()),
          somePic: [values.pic],
          content: values.content,
          comments: editingMovie.infoMo.comments || []
        }
      };

      axios.put(`http://localhost:5000/api/comingsoon/update/${editingMovie._id}`, payload)
        .then(() => {
          message.success('Cập nhật thành công');
          setEditingMovie(null);
        })
        .catch(err => {
          console.error(err);
          message.error('Cập nhật thất bại');
        });
    });
  };

  return (
    <div className="flex-grow w-5/6 float-right p-4">
      <Table dataSource={data} pagination={{ pageSize: 5 }} rowKey="_id">
        <Column title="Tên phim" dataIndex="nameMo" key="nameMo" />
        <Column title="Cụm rạp" dataIndex="cinemaMo" key="cinemaMo" render={(cinemas) => cinemas.map((c, i) => <Tag key={i}>{c}</Tag>)} />
        <Column title="Diễn viên" dataIndex={["infoMo", "actor"]} key="actor" render={(actors) => actors.join(', ')} />
        <Column title="Đạo diễn" dataIndex={["infoMo", "director"]} key="director" />
        <Column title="Giới hạn tuổi" dataIndex="agelimitMo" key="agelimitMo" render={(age) => <Tag color={age >= 18 ? 'red' : 'green'}>{age}+</Tag>} />
        <Column title="Đánh giá" dataIndex="ratingMo" key="ratingMo" />
        <Column title="Hình ảnh" dataIndex={["infoMo", "somePic"]} key="somePic" render={(pics) => <Image src={pics[0]} width={100} height={140} alt="poster" style={{ objectFit: 'cover' }} />} />
        <Column title="Tin tức" dataIndex="newsMo" key="newsMo" render={(text) => <Tooltip title={text}>{text.length > 50 ? text.slice(0, 50) + '...' : text}</Tooltip>} />
        <Column title="Hành động" key="action" render={(_, record) => (
          <Space size="middle">
            <a onClick={() => handleEdit(record)} className="text-blue-500 hover:text-blue-700">Sửa</a>
          </Space>
        )} />
      </Table>

      <Drawer
        title="Chỉnh sửa phim sắp chiếu"
        placement="right"
        width={400}
        onClose={() => setEditingMovie(null)}
        open={!!editingMovie}
        footer={<div style={{ textAlign: 'right' }}><Button onClick={() => setEditingMovie(null)} style={{ marginRight: 8 }}>Hủy</Button><Button type="primary" onClick={handleSave}>Lưu</Button></div>}
      >
        {editingMovie && (
          <Form form={form} layout="vertical">
            <Form.Item label="Tên phim" name="nameMo" rules={[{ required: true }]}><Input /></Form.Item>
            <Form.Item label="Đạo diễn" name="director"><Input /></Form.Item>
            <Form.Item label="Diễn viên" name="actor"><Input /></Form.Item>
            <Form.Item label="Giới hạn tuổi" name="agelimitMo"><InputNumber min={0} max={21} style={{ width: '100%' }} /></Form.Item>
            <Form.Item label="Đánh giá" name="ratingMo"><InputNumber min={0} max={10} step={0.1} style={{ width: '100%' }} /></Form.Item>
            <Form.Item label="Tin tức" name="newsMo"><Input /></Form.Item>
            <Form.Item label="Poster (URL)" name="pic"><Input /></Form.Item>
            <Form.Item label="Nội dung" name="content"><Input.TextArea rows={4} /></Form.Item>
          </Form>
        )}
      </Drawer>
    </div>
  );
}

export default Coming;