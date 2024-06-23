import React, { useState } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { Layout, Menu, Modal, Button } from "antd";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";

const { Header, Content } = Layout;
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [profileVisible, setProfileVisible] = useState(false);

  const handleLogin = (username, password) => {
    setIsAuthenticated(true);
    const user = {
      role: username === "teacher" ? "teacher" : "student",
    };
    setUserRole(user.role);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole("");
  };

  const handleRegister = (username, password, role) => {
    console.log(
      "User registered with username:",
      username,
      "and password:",
      password
    );
    setIsAuthenticated(true);
    setUserRole(role);
  };
  const closeProfile = () => {
    setProfileVisible(false);
  };
  const showProfile = () => {
    setProfileVisible(true);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header>
        <Menu theme="white" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">
            <Link to="/">Anasayfa</Link>
          </Menu.Item>
          {!isAuthenticated && (
            <Menu.Item key="2">
              <Link to="/login">Giriş yap</Link>
            </Menu.Item>
          )}
          {!isAuthenticated && (
            <Menu.Item key="3">
              <Link to="/register">Kayıt ol</Link>
            </Menu.Item>
          )}
          {isAuthenticated && (
            <>
              <Menu.Item key="4" onClick={handleLogout}>
                Çıkış yap
              </Menu.Item>
              <Menu.Item>
                <Menu.Item onClick={showProfile} type="text">
                  Profil
                </Menu.Item>
                <Modal
                  title={`Profil`}
                  visible={profileVisible}
                  onCancel={closeProfile}
                  footer={[
                    <Button key="close" onClick={closeProfile}>
                      Kapat
                    </Button>,
                  ]}
                >
                  <span>
                    <strong>Kullanıcı Adı: </strong>
                    {currentUser.username}
                  </span>
                  <br />
                  <span>
                    <strong>Rol: </strong>
                    {currentUser.role}
                  </span>
                  <br />
                </Modal>
              </Menu.Item>
            </>
          )}
        </Menu>
      </Header>
      <Content>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <Login onLogin={handleLogin} setCurrentUser={setCurrentUser} />
            }
          />
          <Route
            path="/register"
            element={<Register onRegister={handleRegister} />}
          />
          {isAuthenticated ? (
            <>
              <Route
                path="/StudentDashboard"
                element={<StudentDashboard currentUser={currentUser} />}
              />
              <Route
                path="/TeacherDashboard"
                element={<TeacherDashboard currentUser={currentUser} />}
              />
              <Route
                path="*"
                element={
                  <Navigate
                    to={
                      userRole === "teacher"
                        ? "/TeacherDashboard"
                        : "/StudentDashboard"
                    }
                  />
                }
              />
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

// function App() {
//   return (
//     <Layout style={{ minHeight: '100vh' }}>
//       <Header>
//         <Menu theme="white" color='black' mode="horizontal" defaultSelectedKeys={['1']}>
//           <Menu.Item key="1"><Link to="/">Anasayfa</Link></Menu.Item>
//           <Menu.Item key="2"><Link to="/GirisSayfasi">Giriş yap</Link></Menu.Item>
//           <Menu.Item key="3"><Link to="/KayitSayfasi">Kayıt ol</Link></Menu.Item>
//         </Menu>
//       </Header>
//       <Content >
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/GirisSayfasi" element={<Login />} />
//           <Route path="/KayitSayfasi" element={<Register />} />
//           <Route path="/OgrenciProfili" element={<StudentDashboard />} />
//           <Route path="/OgretmenProfili" element={<TeacherDashboard />} />
//           <Route path="*" element={<Navigate to="/GirisSayfasi" />} />
//         </Routes>
//       </Content>
//     </Layout>
//   );
// }

// export default App;
