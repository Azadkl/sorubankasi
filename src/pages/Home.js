import React from "react";
import { Layout } from "antd";
import "./Home.css"; 

const { Content} = Layout;

function Home() {
  return (
    <Layout className="layout" style={{ minHeight: '100vh' }}>
      <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="site-layout-content">
          <h1 className="title">Soru Bankası</h1>
        </div>
      </Content>
    </Layout>
  );
}

export default Home;
