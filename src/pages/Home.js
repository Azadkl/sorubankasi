import React from "react";
import { Layout } from "antd";
import "./Home.css"; // CSS dosyasını import ediyoruz

const { Content} = Layout;

function Home() {
  return (
    <Layout>
      <Content >
        <div className="site-layout-content">
          <h1 className="title">Soru Bankasına Hoşgeldiniz.</h1>
        </div>
      </Content>
    </Layout>
  );
}

export default Home;
