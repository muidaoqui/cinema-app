
import React, { useState, useEffect } from 'react';
import {
    Space, Table, Tag, Drawer, Form, Input, InputNumber, Button, message
} from 'antd';
import axios from 'axios';
import { useTheme } from './themecontext';

function Movie() {
    const { Column } = Table;
    const { currentTheme } = useTheme();
    const [data, setData] = useState([]);
    const [originalData, setOriginalData] = useState([]);
    const [editingMovie, setEditingMovie] = useState(null);
    const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
    const [form] = Form.useForm();
    const [addForm] = Form.useForm();

    useEffect(() => {
        axios.get('http://localhost:5000/api/movies')
            .then((res) => {
                const processed = res.data.map((item, index) => ({
                    key: index + 1,
                    _id: item._id,
                    name: item.nameMo,
                    director: item.infoMo?.director,
                    actor: item.infoMo?.actor?.join(', '),
                    agelimit: item.agelimitMo,
                    rating: item.ratingMo,
                    news: item.newsMo,
                    content: item.infoMo?.content,
                    pic: item.infoMo?.somePic?.[0],
                    cinema: item.cinemaMo,
                    showtime: item.showtimeMo,
                    comments: item.infoMo?.comments
                }));
                setData(processed);
                setOriginalData(processed);
            })
            .catch((err) => console.error(err));
    }, []);

    useEffect(() => {
        if (editingMovie) {
            form.setFieldsValue(editingMovie);
        }
    }, [editingMovie]);

    const handleEdit = (record) => {
        setEditingMovie({ ...record });
    };

    const handleSave = () => {
        form.validateFields().then((values) => {
            const updatedPayload = {
                nameMo: values.name,
                cinemaMo: editingMovie.cinema,
                agelimitMo: values.agelimit,
                ratingMo: values.rating,
                newsMo: values.news,
                showtimeMo: editingMovie.showtime,
                infoMo: {
                    director: values.director,
                    actor: (values.actor || '').split(',').map(a => a.trim()).filter(Boolean),
                    comments: editingMovie.comments || [],
                    somePic: [values.pic],
                    content: values.content || ''
                }
            };

            axios.put(`http://localhost:5000/api/movies/update/${editingMovie._id}`, updatedPayload)
                .then(() => {
                    message.success('Cập nhật thành công');
                    setEditingMovie(null);
                    setData(prev => prev.map(m => m._id === editingMovie._id ? { ...m, ...values } : m));
                    setOriginalData(prev => prev.map(m => m._id === editingMovie._id ? { ...m, ...values } : m));
                })
                .catch((err) => {
                    console.error("Update failed:", err);
                    message.error('Cập nhật thất bại');
                });
        });
    };

    const handleDelete = (_id) => {
        message.loading({ content: 'Đang xóa...', key: 'delete' });
        axios.delete(`http://localhost:5000/api/movies/delete/${_id}`)
            .then(() => {
                setData(prev => prev.filter(movie => movie._id !== _id));
                setOriginalData(prev => prev.filter(movie => movie._id !== _id));
                message.success({ content: 'Xóa thành công', key: 'delete' });
            })
            .catch(err => {
                console.error('Xóa thất bại:', err);
                message.error({ content: 'Xóa phim thất bại', key: 'delete' });
            });
    };

    const handleAddMovie = () => {
        addForm.validateFields().then((values) => {
            const payload = {
                nameMo: values.name,
                cinemaMo: [],
                agelimitMo: values.agelimit,
                ratingMo: values.rating,
                newsMo: values.news,
                showtimeMo: [],
                infoMo: {
                    director: values.director,
                    actor: (values.actor || '').split(',').map(a => a.trim()).filter(Boolean),
                    somePic: [values.pic],
                    comments: [],
                    content: values.content || ''
                }
            };

            axios.post('http://localhost:5000/api/movies', payload)
                .then(res => {
                    message.success('Thêm phim thành công');
                    const newMovie = {
                        key: data.length + 1,
                        _id: res.data._id,
                        ...values,
                        cinema: [],
                        showtime: [],
                        comments: []
                    };
                    setData(prev => [...prev, newMovie]);
                    setOriginalData(prev => [...prev, newMovie]);
                    setIsAddDrawerOpen(false);
                    addForm.resetFields();
                })
                .catch((err) => {
                    console.error(err);
                    message.error('Thêm phim thất bại');
                });
        });
    };

    return (
        <div className="flex-grow w-5/6 float-right p-4">
            <Input.Search
                placeholder="Tìm tên phim"
                allowClear
                style={{ marginBottom: 16 }}
                onSearch={(value) => {
                    const filtered = originalData.filter(movie => movie.name.toLowerCase().includes(value.toLowerCase()));
                    setData(filtered);
                }}
            />

            <Button type="primary" onClick={() => setIsAddDrawerOpen(true)} style={{ marginBottom: 16 }}>
                Thêm phim mới
            </Button>

            <Table dataSource={data} pagination={{ pageSize: 5 }} rowKey="_id">
                <Column title="Tên Phim" dataIndex="name" key="name" />
                <Column title="Cụm rạp" dataIndex="cinema" key="cinema" render={(cinemas) => cinemas?.map((c, i) => <Tag key={i}>{c}</Tag>)} />
                <Column title="Đạo Diễn" dataIndex="director" key="director" />
                <Column title="Diễn Viên" dataIndex="actor" key="actor" />
                <Column title="Nội dung" dataIndex="content" key="content" />
                <Column title="Giới Hạn Tuổi" dataIndex="agelimit" key="agelimit" render={(age) => {
                    let color = age > 17 ? 'red' : age > 15 ? 'orange' : age > 11 ? 'gold' : 'green';
                    return <Tag color={color}>{age}+</Tag>;
                }} />
                <Column title="Đánh Giá" dataIndex="rating" key="rating" />
                <Column title="Tin Tức" dataIndex="news" key="news" />
                <Column title="Poster" dataIndex="pic" key="pic" render={(pic) => <img src={pic} alt="poster" style={{ width: 100, height: 150, objectFit: 'cover' }} />} />
                <Column title="Suất Chiếu" dataIndex="showtime" key="showtime" render={(times) => (
                    Array.isArray(times) && times.length > 0
                        ? times.map((time, index) => <div key={index}>{new Date(time).toLocaleString()}</div>)
                        : <Tag color="gray">Chưa có</Tag>
                )} />
                <Column title="Hành động" key="action" render={(_, record) => (
                    <Space size="middle">
                        <a onClick={() => handleEdit(record)}>Sửa</a>
                        <a onClick={() => handleDelete(record._id)}>Xóa</a>
                    </Space>
                )} />
            </Table>

            <Drawer
    title="Chỉnh sửa thông tin phim"
    placement="right"
    width={400}
    onClose={() => setEditingMovie(null)}
    open={!!editingMovie}
    footer={
        <div style={{ textAlign: 'right' }}>
            <Button onClick={() => setEditingMovie(null)} style={{ marginRight: 8 }}>Hủy</Button>
            <Button type="primary" onClick={handleSave}>Lưu</Button>
        </div>
    }
>
    {editingMovie && (
        <Form
            form={form}
            layout="vertical"
            key={editingMovie._id} // <-- Force reset form mỗi khi chọn mới
        >
            <Form.Item label="Tên phim" name="name" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item label="Đạo diễn" name="director">
                <Input />
            </Form.Item>
            <Form.Item label="Diễn viên" name="actor">
                <Input />
            </Form.Item>
            <Form.Item label="Giới hạn tuổi" name="agelimit">
                <InputNumber min={0} max={21} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item label="Đánh giá" name="rating">
                <InputNumber min={0} max={10} step={0.1} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item label="Tin tức" name="news">
                <Input />
            </Form.Item>
            <Form.Item label="Poster (URL)" name="pic">
                <Input />
            </Form.Item>
            <Form.Item label="Nội dung" name="content">
                <Input.TextArea rows={4} />
            </Form.Item>
        </Form>
    )}
</Drawer>


            <Drawer title="Thêm phim mới" placement="right" width={400} onClose={() => setIsAddDrawerOpen(false)} open={isAddDrawerOpen} footer={
                <div style={{ textAlign: 'right' }}>
                    <Button onClick={() => setIsAddDrawerOpen(false)} style={{ marginRight: 8 }}>Hủy</Button>
                    <Button type="primary" onClick={handleAddMovie}>Thêm</Button>
                </div>
            }>
                <Form form={addForm} layout="vertical">
                    <Form.Item label="Tên phim" name="name" rules={[{ required: true }]}> <Input /> </Form.Item>
                    <Form.Item label="Đạo diễn" name="director"> <Input /> </Form.Item>
                    <Form.Item label="Diễn viên" name="actor"> <Input /> </Form.Item>
                    <Form.Item label="Giới hạn tuổi" name="agelimit"> <InputNumber min={0} max={21} /> </Form.Item>
                    <Form.Item label="Đánh giá" name="rating"> <InputNumber min={0} max={10} step={0.1} /> </Form.Item>
                    <Form.Item label="Tin tức" name="news"> <Input /> </Form.Item>
                    <Form.Item label="Poster (URL)" name="pic"> <Input /> </Form.Item>
                    <Form.Item label="Nội dung" name="content"> <Input.TextArea rows={4} /> </Form.Item>
                </Form>
            </Drawer>
        </div>
    );
}

export default Movie;