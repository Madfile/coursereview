import React from "react";
import ReactDOM from "react-dom";
import {Menu, Tabs, message, Form, Input, Button, CheckBox, Modal} from "antd";
import {Row, Col, Layout} from "antd";
import HeaderComponent from "../component/HeaderComponent";
import FooterComponent from "../component/FooterComponent";
import ConsoleComponent from "../component/ConsoleComponent";
import "antd/dist/antd.css";
const {Header, Footer, Sider, Content} = Layout;

class ConsoleContainer extends React.Component {
  render() {
    return (
      <div>
        <Layout>
          <Header style={{background: "#3f6600"}}>
            <HeaderComponent />
          </Header>
          <Content
            style={{
              paddingLeft: "350px",
              paddingRight: "350px",
              paddingTop: "100px",
              minHeight: 800,
              background: "#fffff1"
            }}
          >
            <div style={{background: "#ffffff", padding: 24, minHeight: 280}}>
              <Row>
                <Col span={6} />
                <Col span={12}>
                  <ConsoleComponent />
                </Col>
                <Col span={6} />
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

export default (ConsoleContainer = Form.create({})(ConsoleContainer));
