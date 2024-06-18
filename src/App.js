import React, { useState } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';

const { Header, Content } = Layout;

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');

  const handleLogin = (username, password) => {
    setIsAuthenticated(true);
    const user = {
      role: username === 'teacher' ? 'teacher' : 'student',
    };
    setUserRole(user.role);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole('');
  };

  const handleRegister = (username, password, role) => {
    console.log('User registered with username:', username, 'and password:', password);
    setIsAuthenticated(true);
    setUserRole(role);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
          {!isAuthenticated && <Menu.Item key="2"><Link to="/login">Login</Link></Menu.Item>}
          {!isAuthenticated && <Menu.Item key="3"><Link to="/register">Register</Link></Menu.Item>}
          {isAuthenticated && <Menu.Item key="4" onClick={handleLogout}>Logout</Menu.Item>}
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register onRegister={handleRegister} />} />
          {isAuthenticated ? (
            <>
              <Route path="/StudentDashboard" element={<StudentDashboard />} />
              <Route path="/TeacherDashboard" element={<TeacherDashboard />} />
              <Route path="*" element={<Navigate to={userRole === 'teacher' ? "/TeacherDashboard" : "/StudentDashboard"} />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </Content>
    </Layout>
  );
}

export default App;
