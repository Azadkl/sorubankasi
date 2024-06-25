import React, { useState, useEffect } from "react";
import { Form, Input, Button, Layout, notification } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css"; 

const { Content } = Layout;

const SHEETY_GET_URL =
  "https://v1.nocodeapi.com/azad321/google_sheets/TPiGGQOkKnlSrxnT?tabId=Sayfa1";

function Login({ onLogin , setCurrentUser}) {
  const [users, setUsers] = useState([]);
  
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(SHEETY_GET_URL, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setUsers(response.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      notification.error({ message: "Error fetching users" });
    }
  };

  const onFinish = (values) => {
    const user = users.find(
      (user) =>
        user.username === values.username && user.password === values.password
    );

    if (user) {
      notification.success({ message: "Giriş Yapıldı" });
      onLogin(user.username, user.password);
      if (user.role === "teacher") {
        navigate("/TeacherDashboard");
      } else {
        navigate("/StudentDashboard");
      }
    } else {
      notification.error({ message: "Kullanıcı adı veya parola yanlış" });
    }

    setCurrentUser(user);
  };

  return (
    <Layout className="Layout-back" style={{ minHeight: "100vh" }}>
      <Content
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="body">
          <h1>Giriş Yap</h1>
          <Form name="login" onFinish={onFinish}>
            <Form.Item
              name="username"
              className="form-item"
              rules={[
                {
                  required: true,
                  message: "Lütfen kullanıcı adınızı giriniz!",
                },
              ]}
            >
              <Input placeholder="Kullanıcı adı" />
            </Form.Item>
            <Form.Item
              name="password"
              className="form-item"
              rules={[{ required: true, message: "Lütfen şifrenizi giriniz!" }]}
            >
              <Input.Password placeholder="Şifre" />
            </Form.Item>
            <Form.Item>
              <Button
                className="button-container"
                type="primary"
                htmlType="submit"
              >
                Giriş yap
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </Layout>
  );
}

export default Login;
