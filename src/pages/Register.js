import React from 'react';
import { Form, Input, Button, Select, Layout, notification } from 'antd';
import './Register.css'; // CSS dosyasını import ediyoruz

const { Content } = Layout;
const { Option } = Select;

// const SHEETY_POST_URL = 'https://v1.nocodeapi.com/azad4721/google_sheets/NMiyRCxxVSwkcoWm?tabId=Sayfa1';

function Register() {
  // const onFinish = async (values) => {
  //   const { username, password, role } = values;
  
  //   // Veri doğrulaması
  //   if (!username || !password || !role) {
  //     notification.error({ message: 'Please fill in all fields!' });
  //     return;
  //   }
  
  //   // API isteği için gerekli ayarlar
  //   var myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");
  //   var requestOptions = {
  //     method: "POST",
  //     headers: myHeaders,
  //     redirect: "follow",
  //     body: JSON.stringify([[username, password, role]])
  //   };
  
  //   try {
  //     const response = await fetch(SHEETY_POST_URL, requestOptions);
  //     const result = await response.json();
  
  //     if (response.ok) {
  //       notification.success({ message: 'Registration successful!' });
  //       console.log(result);  // Debug: API yanıtını konsola yazdır
  //     } else {
  //       notification.error({ message: 'Registration failed!' });
  //       console.error('Registration failed:', result);  // Debug: Hata durumunda konsola yazdır
  //     }
  //   } catch (error) {
  //     console.error('Registration error:', error);
  //     notification.error({ message: `Registration failed: ${error.message}` });
  //   }
  // };
  

  return (
    <Layout className='back' style={{ minHeight: '100vh' }}>
      <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="body">
          <h1>Register</h1>
          <Form name="register" /*onFinish={onFinish}*/>
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
            <Form.Item
              name="role"
              className="form-item"
              rules={[{ required: true, message: 'Please select your role!' }]}
            >
              <Select placeholder="Select your role">
                <Option value="student">Student</Option>
                <Option value="teacher">Teacher</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button className="button-container" type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </Layout>
  );
}

export default Register;
