import React from "react";
import { Link } from "react-router-dom";
import { Layout } from "antd";
import "./Home.css"; // CSS dosyasını import ediyoruz

const { Content, Footer } = Layout;

function Home() {
  return (
    <Layout className="back">
      <Content style={{ padding: "0 50px", minHeight: "calc(100vh - 64px)" }}>
        <div className="site-layout-content">
          <h1 className="title">Soru Bankasına Hoşgeldiniz.</h1>
        </div>
      </Content>
      <Footer className="footer">
        Ant Design ©2024 Created by Ant UED
      </Footer>
    </Layout>
  );
}

export default Home;
