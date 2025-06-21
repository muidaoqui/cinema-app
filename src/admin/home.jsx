import React, { useState, useEffect } from 'react';
import {
  Space, Table, Tag, Drawer, Form, Input, InputNumber, Button, message
} from 'antd';
import { useTheme } from './themecontext';
import axios from 'axios';

function Account() {
  const { Column } = Table;
  const { currentTheme } = useTheme();
  const [data, setData] = useState([]);
  const [currentSelectedRowKey, setCurrentSelectedRowKey] = useState('');
  const [editingAccount, setEditingAccount] = useState(null);
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
  const [form] = Form.useForm();
  const [addForm] = Form.useForm();

  useEffect(() => {
    axios.get('http://localhost:5000/api/users')
      .then(res => {
        const users = res.data.map((user, index) => ({
          key: index + 1,
          _id: user._id,
          email: user.email,
          fullname: user.fullname,
          age: user.age,
          password: user.password,
          role: user.role || []
        }));
        setData(users);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (editingAccount) {
      form.setFieldsValue(editingAccount);
    }
  }, [editingAccount, form]);

  const handleEdit = (record) => {
    setEditingAccount({
      _id: record._id,
      mail: record.email,
      name: record.fullname,
      age: record.age,
      password: record.password,
      role: record.role || ''
    });
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      const updatedPayload = {
        mail: values.mail,
        name: values.name,
        age: values.age,
        pass: values.password,
        role: values.role
      };
      axios.put(`http://localhost:5000/api/users/${editingAccount._id}`, updatedPayload)
        .then(res => {
          message.success('Cập nhật thành công');
          setEditingAccount(null);
          setData(prevData =>
            prevData.map(item =>
              item._id === editingAccount._id ? { ...item, ...updatedPayload, email: values.mail, fullname: values.name } : item
            )
          );
        })
        .catch(err => {
          console.error(err);
          message.error('Cập nhật thất bại');
        });
    });
  };

  const handleAdd = () => {
    addForm.validateFields().then((values) => {
      const newUser = {
        email: values.email,
        fullname: values.fullname,
        age: values.age,
        password: values.password,
        role: values.role
      };
      axios.post('http://localhost:5000/api/users', newUser)
        .then(res => {
          const addedUser = res.data;
          message.success('Thêm người dùng thành công');
          setData(prevData => [...prevData, {
            ...addedUser,
            key: prevData.length + 1
          }]);
          setIsAddDrawerOpen(false);
          addForm.resetFields();
        })
        .catch(err => {
          console.error(err);
          message.error('Thêm người dùng thất bại');
        });
    });
  };

  const onRowClick = (record, index) => {
    setCurrentSelectedRowKey(record.key);
  };

  return (
    <div className="flex-grow w-5/6 float-right">
      <Table
        dataSource={data}
        onRow={(record, rowIndex) => ({
          onClick: () => onRowClick(record, rowIndex)
        })}
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
              {(Array.isArray(roles) ? roles : [roles]).map((role) => {
                let color = role === 'VIP' ? 'gold' : 'blue';
                return (
                  <Tag color={color} key={role}>
                    {role?.toUpperCase()}
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
              <a className="text-blue-500 hover:text-blue-700" onClick={() => handleEdit(record)}>Sửa {record.fullname}</a>
              <a className="text-red-500 hover:text-red-700">Xóa</a>
            </Space>
          )}
        />
      </Table>

      {/* Drawer thêm */}
      <Drawer
        title="Thêm tài khoản"
        placement="right"
        width={400}
        onClose={() => setIsAddDrawerOpen(false)}
        open={isAddDrawerOpen}
        footer={
          <div style={{ textAlign: 'right' }}>
            <Button onClick={() => setIsAddDrawerOpen(false)} style={{ marginRight: 8 }}>Hủy</Button>
            <Button type="primary" onClick={handleAdd}>Thêm</Button>
          </div>
        }
      >
        <Form form={addForm} layout="vertical" name="add_account_form">
          <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Vui lòng nhập email!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="fullname" label="Họ Tên" rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="age" label="Tuổi" rules={[{ required: true, message: 'Vui lòng nhập tuổi!' }]}>
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item name="password" label="Mật khẩu" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item name="role" label="Vai trò">
            <Input />
          </Form.Item>
        </Form>
      </Drawer>

      {/* Drawer chỉnh sửa */}
      <Drawer
        title="Chỉnh sửa tài khoản"
        width={720}
        onClose={() => setEditingAccount(null)}
        open={!!editingAccount}
        footer={
          <div style={{ textAlign: 'right' }}>
            <Button onClick={() => setEditingAccount(null)} style={{ marginRight: 8 }}>Hủy</Button>
            <Button type="primary" onClick={handleSave}>Lưu</Button>
          </div>
        }
      >
        {editingAccount && (
          <Form form={form} layout="vertical" name="edit_account_form">
            <Form.Item name="mail" label="Email" rules={[{ required: true, message: 'Vui lòng nhập email!' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="name" label="Họ Tên" rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="age" label="Tuổi" rules={[{ required: true, message: 'Vui lòng nhập tuổi!' }]}>
              <InputNumber min={1} />
            </Form.Item>
            <Form.Item name="password" label="Mật khẩu" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}>
              <Input.Password />
            </Form.Item>
            <Form.Item name="role" label="Vai trò">
              <Input />
            </Form.Item>
          </Form>
        )}
      </Drawer>
    </div>
  );
}

export default Account;
