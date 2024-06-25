import React from 'react';
import { Form, Input, Button, Select, Layout, notification } from 'antd';
import './Register.css'; 

const { Content } = Layout;
const { Option } = Select;

const SHEETY_POST_URL = 'https://v1.nocodeapi.com/azad321/google_sheets/TPiGGQOkKnlSrxnT?tabId=Sayfa1';

function Register() {
  const onFinish = async (values) => {
    const { username, password, role } = values;
  
    
    if (!username || !password || !role) {
      notification.error({ message: 'Lütfen boş yerleri doldurunuz!' });
      return;
    }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
      body: JSON.stringify([[username, password, role]])
    };
  
    try {
      const response = await fetch(SHEETY_POST_URL, requestOptions);
      const result = await response.json();
  
      if (response.ok) {
        notification.success({ message: 'Kayıt Başarılı!' });
        console.log(result);  
      } else {
        notification.error({ message: 'Kayıt Başarısız!' });
        console.error('Registration failed:', result);  
      }
    } catch (error) {
      console.error('Registration error:', error);
      notification.error({ message: `Registration failed: ${error.message}` });
    }
  };
  

  return (
    <Layout className='Layout-register' style={{ minHeight: '100vh' }}>
      <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="body">
          <h1>Kayıt ol</h1>
          <Form name="register" onFinish={onFinish}>
            <Form.Item
              name="username"
              className="form-item"
              rules={[{ required: true, message: 'Lütfen kullanıcı adını giriniz!' }]}
            >
              <Input placeholder="Kullanıcı adı" />
            </Form.Item>
            <Form.Item
              name="password"
              className="form-item"
              rules={[{ required: true, message: 'Lütfen şifreyi giriniz!' }]}
            >
              <Input.Password placeholder="Şifre" />
            </Form.Item>
            <Form.Item
              name="role"
              className="form-item"
              rules={[{ required: true, message: 'Kullanıcı türünü seçiniz!' }]}
            >
              <Select placeholder="Kullanıcı seçiniz">
                <Option value="student">Öğrenci</Option>
                <Option value="teacher">Öğretmen</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button className="button-container" type="primary" htmlType="submit">
                Kayıt ol
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </Layout>
  );
}

export default Register;
