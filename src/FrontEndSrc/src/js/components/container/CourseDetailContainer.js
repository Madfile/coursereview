import React from "react";
import ReactDOM from "react-dom";
import {Menu, Tabs, message, Form, Input, Button, CheckBox, Modal} from "antd";
import {Row, Col, Layout} from "antd";
import HeaderComponent from "../component/HeaderComponent";
import FooterComponent from "../component/FooterComponent";
import CourseDetailComponent from "../component/CourseDetailComponent";
import "antd/dist/antd.css";

const {Header, Footer, Sider, Content} = Layout;

class CourseDetailContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courseCode: this.props.match.params.courseCode
    };
  }
  render() {
    return (
      <div>
        <Layout>
          <Header style={{background: "#3f6600"}}>
            <HeaderComponent />
          </Header>
          <Content
            style={{
              paddingTop: "50px",
              paddingLeft: "100px",
              paddingRight: "100px",
              paddingBottom: "50px",
              minHeight: 800,
              background: "#fffff1"
            }}
          >
            <div
              style={{
                background: "#fff2e8",
                padding: 24,
                minHeight: 280
              }}
            >
              <Row>
                <Col span={2} />
                <Col span={20}>
                  <div className="container">
                    <CourseDetailComponent courseCode={this.state.courseCode} />
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

export default (CourseDetailContainer = Form.create({})(CourseDetailContainer));
