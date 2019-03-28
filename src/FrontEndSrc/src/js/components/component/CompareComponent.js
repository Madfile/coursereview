import React, {Component} from "react";
import ReactDOM from "react-dom";
import {List} from "antd";
import {Menu, Icon, Tabs, message, Form, Input, Avatar} from "antd";
import {Row, Col, Button, CheckBox, Modal, Card} from "antd";
import reqwest from "reqwest";
import {Link} from "react-router-dom";
const Search = Input.Search;

const {Meta} = Card;
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const TabPane = Tabs.TabPane;

class CompareComponent extends Component {
  constructor() {
    super();
    this.state = {
      display: "none",
      data: [
        {
          courseId: "10000",
          courseCode: "COMP9021",
          courseName: "Programming Principle",
          courseLevel: "0",
          courseMark: "5",
          courseInfo: "www.baidu.com",
          courseComments: "2",
          courseOverallRating: "4.4",
          courseDescription: "This is a test Description",
          courseDifficultyRating: "3.2",
          coursePassRate: "78%"
        },
        {
          courseId: "10000",
          courseCode: "COMP9020",
          courseName: "Distributed Maths",
          courseLevel: "0",
          courseMark: "5",
          courseInfo: "www.baidu.com",
          courseComments: "2",
          courseOverallRating: "4.7",
          courseDescription: "This is another test Description",
          courseDifficultyRating: "1.5",
          coursePassRate: "88%"
        }
      ]
    };
  }

  componentDidMount() {}

  handleSubmit(e) {
    e.preventDefault();

    var formData = this.props.form.getFieldsValue();
    //console.log(formData.userEmail);
    var signupurl = "http://localhost:8080/course/compare";

    reqwest({
      url: signupurl,
      method: "post",
      data: {
        courseCode1: formData.courseCode1,
        courseCode2: formData.courseCode2
      },
      type: "json",
      error: function(err) {},
      success: function(resp) {
        if (resp.code == 0) {
          this.setState({
            display: null,
            data: resp.data
          });
        } else {
          message.error(resp.msg);
        }
      }.bind(this)
    });
  }

  render() {
    const {getFieldProps} = this.props.form;
    const data = this.state.data;

    return (
      <div>
        <Row>
          <Col span={1} />
          <Form onSubmit={this.handleSubmit.bind(this)}>
            <Col span={9}>
              <Input
                size="large"
                placeholder="Put in course code e.g. COMP9021.."
                {...getFieldProps("courseCode1")}
              />
            </Col>
            <Col span={1} />
            <Col span={9}>
              <Input
                size="large"
                placeholder="Put in course code e.g. COMP9020.."
                {...getFieldProps("courseCode2")}
              />
            </Col>
            <Col span={1} />
            <Col span={2}>
              <Button type="primary" size={"large"} htmlType={"submit"}>
                Compare
              </Button>
            </Col>
          </Form>
          <Col span={1} />
        </Row>
        <br />
        <br />
        <div style={{display: this.state.display}}>
          <Row>
            <Col span={1} />
            <Col span={9}>
              <div style={{background: "#feffe6", padding: 24, minHeight: 280}}>
                <h2 style={{color: "#ff7a45"}}>
                  {data[0].courseCode} {data[0].courseName}
                </h2>
                <List itemLayout="horizontal" style={{background: "#feffe6"}}>
                  <List.Item>
                    <List.Item.Meta title={"Overall Rating"} />
                    {data[0].courseOverallRating}
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta title={"Difficulty Rating"} />
                    {data[0].courseDifficultyRating}
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta title={"Course Level"} />
                    {data[0].courseLevel}
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta title={"Course Pass Rate"} />
                    {data[0].coursePassRate + "%"}
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta title={"Course handbook"} />
                    <a href={data[0].courseHandbook}>link</a>
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta
                      title={"Course Description"}
                      description={<span>{data[0].courseDescription}</span>}
                    />
                  </List.Item>
                </List>
              </div>
            </Col>
            <Col span={1} />
            <Col span={9}>
              <div style={{background: "#feffe6", padding: 24, minHeight: 280}}>
                <h2 style={{color: "#ff7a45"}}>
                  {data[1].courseCode} {data[1].courseName}
                </h2>
                <List itemLayout="horizontal" style={{background: "#feffe6"}}>
                  <List.Item>
                    <List.Item.Meta title={"Overall Rating"} />
                    {data[1].courseOverallRating}
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta title={"Difficulty Rating"} />
                    {data[1].courseDifficultyRating}
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta title={"Course Level"} />
                    {data[1].courseLevel}
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta title={"Course Pass Rate"} />
                    {data[1].coursePassRate + "%"}
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta title={"Course handbook"} />
                    <a href={data[1].courseHandbook}>link</a>
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta
                      title={"Overall Rating"}
                      description={<span>{data[1].courseDescription}</span>}
                    />
                  </List.Item>
                </List>
              </div>
            </Col>
            <Col span={4} />
          </Row>
        </div>
      </div>
    );
  }
}

export default (CompareComponent = Form.create({})(CompareComponent));
