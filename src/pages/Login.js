import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Layout, notification } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // CSS dosyasını import ediyoruz

const { Content } = Layout;

const SHEETY_GET_URL = 'https://v1.nocodeapi.com/azad47/google_sheets/BghSKzulzfPRVdhP?tabId=Sayfa1';

function Login({ onLogin }) {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(SHEETY_GET_URL, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setUsers(response.data.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      notification.error({ message: 'Error fetching users' });
    }
  };

  const onFinish = (values) => {
    const user = users.find(user => user.username === values.username && user.password === values.password);

    if (user) {
      notification.success({ message: 'Login successful!' });
      onLogin(user.username, user.password);
      if (user.role === 'teacher') {
        navigate('/TeacherDashboard');
      } else {
        navigate('/StudentDashboard');
      }
    } else {
      notification.error({ message: 'Invalid username or password' });
    }
  };

  return (
    <Layout className='back' style={{ minHeight: '100vh' }}>
      <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="body">
          <h1>Login</h1>
          <Form name="login" onFinish={onFinish}>
            <Form.Item
              name="username"
              className="form-item"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              className="form-item"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item >
              <Button className="button-container" type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </Layout>
  );
}

export default Login;
