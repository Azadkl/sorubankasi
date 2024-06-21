import React, { useState } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';

const { Header, Content } = Layout;

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [userRole, setUserRole] = useState('');

//   const handleLogin = (username, password) => {
//     setIsAuthenticated(true);
//     const user = {
//       role: username === 'teacher' ? 'teacher' : 'student',
//     };
//     setUserRole(user.role);
//   };

//   const handleLogout = () => {
//     setIsAuthenticated(false);
//     setUserRole('');
//   };

//   const handleRegister = (username, password, role) => {
//     console.log('User registered with username:', username, 'and password:', password);
//     setIsAuthenticated(true);
//     setUserRole(role);
//   };

//   return (
//     <Layout style={{ minHeight: '100vh' }}>
//       <Header>
//         <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
//           <Menu.Item key="1"><Link to="/">Anasayfa</Link></Menu.Item>
//           {!isAuthenticated && <Menu.Item key="2"><Link to="/GirisSayfasi">Giriş yap</Link></Menu.Item>}
//           {!isAuthenticated && <Menu.Item key="3"><Link to="/KayitSayfasi">Kayıt ol</Link></Menu.Item>}
//           {isAuthenticated && <Menu.Item key="4" onClick={handleLogout}>Çıkış yap</Menu.Item>}
//         </Menu>
//       </Header>
//       <Content style={{ padding: '0 50px' }}>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/GirisSayfasi" element={<Login onLogin={handleLogin} />} />
//           <Route path="/KayitSayfasi" element={<Register onRegister={handleRegister} />} />
//           {isAuthenticated ? (
//             <>
//               <Route path="/OgrenciProfili" element={<StudentDashboard />} />
//               <Route path="/OgretmenProfili" element={<TeacherDashboard />} />
//               <Route path="*" element={<Navigate to={userRole === 'teacher' ? "/OgretmenProfili" : "/OgrenciProfili"} />} />
//             </>
//           ) : (
//             <Route path="*" element={<Navigate to="/GirisSayfasi" />} />
//           )}
//         </Routes>
//       </Content>
//     </Layout>
//   );
// }

// export default App;



function App() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header>
        <Menu theme="white" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1"><Link to="/">Anasayfa</Link></Menu.Item>
          <Menu.Item key="2"><Link to="/GirisSayfasi">Giriş yap</Link></Menu.Item>
          <Menu.Item key="3"><Link to="/KayitSayfasi">Kayıt ol</Link></Menu.Item>
        </Menu>
      </Header>
      <Content >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/GirisSayfasi" element={<Login />} />
          <Route path="/KayitSayfasi" element={<Register />} />
          <Route path="/OgrenciProfili" element={<StudentDashboard />} />
          <Route path="/OgretmenProfili" element={<TeacherDashboard />} />
          <Route path="*" element={<Navigate to="/GirisSayfasi" />} />
        </Routes>
      </Content>
    </Layout>
  );
}

export default App;
