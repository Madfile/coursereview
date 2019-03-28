import React from "react";
import ReactDOM from "react-dom";
import {Menu, Tabs, message, Form, Input, Button, CheckBox, Modal} from "antd";
import {Row, Col, Layout} from "antd";
import HeaderComponent from "../component/HeaderComponent";
import FooterComponent from "../component/FooterComponent";
import CompareComponent from "../component/CompareComponent";
import "antd/dist/antd.css";
const {Header, Footer, Sider, Content} = Layout;

class CompareContainer extends React.Component {
  render() {
    return (
      <div>
        <Layout>
          <Header style={{background: "#3f6600"}}>
            <HeaderComponent />
          </Header>
          <Content
            style={{padding: "100px", minHeight: 800, background: "#fffff1"}}
          >
            <div style={{background: "#fffff1", padding: 24, minHeight: 280}}>
              <Row>
                <Col span={2} />
                <Col span={20}>
                  <div className="container">
                    <CompareComponent />
                  </div>
                </Col>
                <Col span={2} />
              </Row>
            </div>
          </Content>
          <Footer
            style={{
              textAlign: "center",
              bottom: "0",
              position: "fixed",
              width: "100%",
              background: "#f0f5ff"
            }}
          >
            <FooterComponent />
          </Footer>
        </Layout>
      </div>
    );
  }
}

export default (CompareContainer = Form.create({})(CompareContainer));
