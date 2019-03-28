import React from "react";
import ReactDOM from "react-dom";
import {Menu, Tabs, message, Form, Input, Button, CheckBox, Modal} from "antd";
import {Row, Col, Layout} from "antd";
import HeaderComponent from "../component/HeaderComponent";
import FooterComponent from "../component/FooterComponent";
import CourseListComponent from "../component/CourseListComponent";
import "antd/dist/antd.css";

const {Header, Footer, Sider, Content} = Layout;

class CourseListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      //keyword: this.props.match.params.keyword,
      search: JSON.parse(this.props.match.params.keyword),
      length: -1
    };
  }

  render() {
    var keyword = "null";
    if (this.state.search.doSearch == true) {
      keyword = this.state.search.keyword;
      // console.log(keyword);
    }
    return (
      <div>
        <Layout>
          <Header style={{background: "#3f6600"}}>
            <HeaderComponent />
          </Header>
          <Content
            style={{padding: "10px", minHeight: 800, background: "#fffff1"}}
          >
            <div style={{background: "#fffff1", padding: 24, minHeight: 280}}>
              <Row>
                <Col span={2} />
                <Col span={20}>
                  <div className="container">
                    <CourseListComponent keyword={keyword} />
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

export default (CourseListContainer = Form.create({})(CourseListContainer));
