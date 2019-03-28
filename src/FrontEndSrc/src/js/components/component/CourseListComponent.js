import React, {Component} from "react";
import ReactDOM from "react-dom";
import {List} from "antd";
import {Menu, Icon, Tabs, message, Form, Input, Avatar} from "antd";
import {Row, Col, Button, CheckBox, Modal, Card, Dropdown} from "antd";
import reqwest from "reqwest";
import {Link} from "react-router-dom";

const {Meta} = Card;
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const TabPane = Tabs.TabPane;
const {TextArea} = Input;

class CourseListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      keyword: this.props.keyword,
      length: -1,
      userAdmin: localStorage.getItem("userAdmin"),
      filter: "Level Filter"
    };
  }

  componentDidMount() {
    //console.log("type of keyword:" + typeof this.state.keyword);
    //console.log("keyword:" + this.state.keyword);

    if (this.state.keyword != "null") {
      reqwest({
        url: "http://localhost:8080/course/search",
        method: "post",
        data: {keyword: this.state.keyword},
        type: "json",
        error: function(err) {},
        success: function(resp) {
          var length = 0;
          for (var item in resp.data) {
            length++;
          }
          if (length == 0) {
            message.error("oops! no results found, try another code or name..");
            this.setState({length: 0});
          }
          //console.log(resp.data);
          this.setState({data: resp.data});
          //message.success(resp.msg);
          //this.state.data = resp.data;
        }.bind(this)
      });
    } else {
      //console.log("111111");
      reqwest({
        url: "http://localhost:8080/course/list",
        method: "get",
        data: {},
        type: "json",
        error: function(err) {},
        success: function(resp) {
          //console.log(resp.data);
          this.setState({data: resp.data, length: -1});
          //message.success("success");
          //message.success(resp.msg);
          //this.state.data = resp.data;
        }.bind(this)
      });
    }
  }

  handleSubmitCourse(e) {
    e.preventDefault();
    var formData = this.props.form.getFieldsValue();
    console.log(formData);

    var url = "http://localhost:8080/course/add";

    reqwest({
      url: url,
      method: "post",
      data: {
        courseCode: formData.courseCode,
        courseLevel: formData.courseLevel,
        courseName: formData.courseName,
        coursePassRate: formData.coursePassRate,
        courseDescription: formData.courseDescription,
        courseHandbook: formData.courseHandbook
      },
      type: "json",
      error: function(err) {
        message.error("server failed");
      },
      success: function(resp) {
        if (resp.code == 0) {
          message.success("success");
          this.setState({
            remarkData: resp.data
          });
        } else {
          message.error(resp.msg);
        }
      }.bind(this)
    });

    this.setModalVisible(false);
  }

  setModalVisible(value) {
    this.setState({modalVisible: value});
  }

  handleClickModal(e) {
    this.setModalVisible(true);
  }

  handleSubmitLevel(i) {
    var formData = this.props.form.getFieldsValue();
    this.setState({filter: i});
    // if(i == "?"){
    //
    // }
    var signupurl =
      "http://localhost:8080/course/level";

    reqwest({
      url: signupurl,
      method: "post",
      data: {level: i},
      type: "json",
      error: function(err) {},
      success: function(resp) {
        if (resp.code == 0) {
          this.setState({
            data: resp.data
          });
        } else {
          message.error(resp.msg);
        }
      }.bind(this)
    });
  }

  render() {
    if (this.state.length == 0) {
      return (
        <div>
          {this.state.userAdmin == "true" ? (
            <div>
              <Button
                icon="plus-circle"
                htmlType="button"
                type={"primary"}
                onClick={this.handleClickModal.bind(this)}
                style={{
                  background: "#1890ff"
                }}
              >
                add
              </Button>
              <br />
              <br />
            </div>
          ) : (
            <br />
          )}
          <center>
            <h2>No results</h2>
          </center>
        </div>
      );
    } else {
      const {getFieldProps} = this.props.form;
      const data = this.state.data;
      const {getFieldDecorator} = this.props.form;
      const menu = (
        <Menu>
          <Menu.Item>
            <Form onSubmit={this.handleSubmitLevel.bind(this, "Level 0")}>
              <Button size={"large"} type="dashed" htmlType={"submit"}>
                Level 0
              </Button>
            </Form>
          </Menu.Item>
          <Menu.Item>
            <Form onSubmit={this.handleSubmitLevel.bind(this, "Level 1")}>
              <Button size={"large"} type="dashed" htmlType={"submit"}>
                Level 1
              </Button>
            </Form>
          </Menu.Item>
          <Menu.Item>
            <Form onSubmit={this.handleSubmitLevel.bind(this, "Level 2")}>
              <Button size={"large"} type="dashed" htmlType={"submit"}>
                Level 2
              </Button>
            </Form>
          </Menu.Item>
          <Menu.Item>
            <Form onSubmit={this.handleSubmitLevel.bind(this, "Level 3")}>
              <Button size={"large"} type="dashed" htmlType={"submit"}>
                Level 3
              </Button>
            </Form>
          </Menu.Item>
        </Menu>
      );

      var items = [];
      var turn = 0;
      for (var i = 0; i < data.length; i = i + 3) {
        var path = `/course/`;
        if (data.length - turn * 3 == 1) {
          items.push(
            <Row>
              <Col span={8}>
                <div className="courses">
                  <Link to={path + data[i].courseCode}>
                    <Card
                      style={{width: "80%", background: "#87e8de"}}
                      // cover={
                      //   <img
                      //     alt="example"
                      //     src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                      //   />
                      // }
                      actions={[
                        <Icon type="star" />,
                        data[i].courseOverallRating,
                        <Icon type="message" />,
                        data[i].numberOfRemarks
                      ]}
                    >
                      <Meta
                        avatar={
                          <Avatar
                            style={{
                              color: "#f56a00",
                              backgroundColor: "#fde3cf"
                            }}
                          >
                            {data[i].courseCode.slice(0, 4)}
                          </Avatar>
                        }
                        title={data[i].courseCode}
                        description={data[i].courseName}
                      />
                    </Card>
                  </Link>
                  <br />
                  <br />
                </div>
              </Col>
            </Row>
          );
        } else if (data.length - turn * 3 == 2) {
          items.push(
            <Row>
              <Col span={8}>
                <div className="courses">
                  <Link to={path + data[i].courseCode}>
                    <Card
                      style={{width: "80%", background: "#87e8de"}}
                      // cover={
                      //   <img
                      //     alt="example"
                      //     src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                      //   />
                      // }
                      actions={[
                        <Icon type="star" />,
                        data[i].courseOverallRating,
                        <Icon type="message" />,
                        data[i].numberOfRemarks
                      ]}
                    >
                      <Meta
                        avatar={
                          <Avatar
                            style={{
                              color: "#f56a00",
                              backgroundColor: "#fde3cf"
                            }}
                          >
                            {data[i].courseCode.slice(0, 4)}
                          </Avatar>
                        }
                        title={data[i].courseCode}
                        description={data[i].courseName}
                      />
                    </Card>
                  </Link>
                  <br />
                  <br />
                </div>
              </Col>

              <Col span={8}>
                <div className="courses">
                  <Link to={path + data[i + 1].courseCode}>
                    <Card
                      style={{width: "80%", background: "#87e8de"}}
                      // cover={
                      //   <img
                      //     alt="example"
                      //     src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                      //   />
                      // }
                      actions={[
                        <Icon type="star" />,
                        data[i + 1].courseOverallRating,
                        <Icon type="message" />,
                        data[i + 1].numberOfRemarks
                      ]}
                    >
                      <Meta
                        avatar={
                          <Avatar
                            style={{
                              color: "#f56a00",
                              backgroundColor: "#fde3cf"
                            }}
                          >
                            {data[i + 1].courseCode.slice(0, 4)}
                          </Avatar>
                        }
                        title={data[i + 1].courseCode}
                        description={data[i + 1].courseName}
                      />
                    </Card>
                  </Link>
                  <br />
                  <br />
                </div>
              </Col>
            </Row>
          );
        } else {
          items.push(
            <Row>
              <Col span={8}>
                <div className="courses">
                  <Link to={path + data[i].courseCode}>
                    <Card
                      style={{width: "80%", background: "#87e8de"}}
                      // cover={
                      //   <img
                      //     alt="example"
                      //     src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                      //   />
                      // }
                      actions={[
                        <Icon type="star" />,
                        data[i].courseOverallRating,
                        <Icon type="message" />,
                        data[i].numberOfRemarks
                      ]}
                    >
                      <Meta
                        avatar={
                          <Avatar
                            style={{
                              color: "#f56a00",
                              backgroundColor: "#fde3cf"
                            }}
                          >
                            {data[i].courseCode.slice(0, 4)}
                          </Avatar>
                        }
                        title={data[i].courseCode}
                        description={data[i].courseName}
                      />
                    </Card>
                  </Link>
                  <br />
                  <br />
                </div>
              </Col>

              <Col span={8}>
                <div className="courses">
                  <Link to={path + data[i + 1].courseCode}>
                    <Card
                      style={{width: "80%", background: "#87e8de"}}
                      // cover={
                      //   <img
                      //     alt="example"
                      //     src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                      //   />
                      // }
                      actions={[
                        <Icon type="star" />,
                        data[i + 1].courseOverallRating,
                        <Icon type="message" />,
                        data[i + 1].numberOfRemarks
                      ]}
                    >
                      <Meta
                        avatar={
                          <Avatar
                            style={{
                              color: "#f56a00",
                              backgroundColor: "#fde3cf"
                            }}
                          >
                            {data[i + 1].courseCode.slice(0, 4)}
                          </Avatar>
                        }
                        title={data[i + 1].courseCode}
                        description={data[i + 1].courseName}
                      />
                    </Card>
                  </Link>
                  <br />
                  <br />
                </div>
              </Col>

              <Col span={8}>
                <div className="courses">
                  <Link to={path + data[i + 2].courseCode}>
                    <Card
                      style={{width: "80%", background: "#87e8de"}}
                      // cover={
                      //   <img
                      //     alt="example"
                      //     src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                      //   />
                      // }
                      actions={[
                        <Icon type="star" />,
                        data[i + 2].courseOverallRating,
                        <Icon type="message" />,
                        data[i + 2].numberOfRemarks
                      ]}
                    >
                      <Meta
                        avatar={
                          <Avatar
                            style={{
                              color: "#f56a00",
                              backgroundColor: "#fde3cf"
                            }}
                          >
                            {data[i + 2].courseCode.slice(0, 4)}
                          </Avatar>
                        }
                        title={data[i + 2].courseCode}
                        description={data[i + 2].courseName}
                      />
                    </Card>
                  </Link>
                  <br />
                  <br />
                </div>
              </Col>
            </Row>
          );
        }

        turn = turn + 1;
      }
      return (
        <div>
          {this.state.userAdmin == "true" ? (
            <div>
              <Button
                icon="plus-circle"
                htmlType="button"
                type={"primary"}
                onClick={this.handleClickModal.bind(this)}
                style={{
                  background: "#1890ff"
                }}
              >
                add
              </Button>
              <br />
              <br />
            </div>
          ) : (
            <br />
          )}
          {this.state.keyword == "null" ? (
            <div>
              <Dropdown overlay={menu}>
                <Button type="primary" size="large">
                  {this.state.filter} <Icon type="down" />
                </Button>
              </Dropdown>
              <br />
              <br />
            </div>
          ) : (
            <br />
          )}
          {items}
          <Modal
            title="add a course"
            wrapClassName="vertical-center-modal"
            visible={this.state.modalVisible}
            onCancel={() => this.setModalVisible(false)}
            ONOK={() => this.setModalVisible(false)}
            okText={"close"}
          >
            <Form horizontal onSubmit={this.handleSubmitCourse.bind(this)}>
              <FormItem label={"Course Code"}>
                {getFieldDecorator("courseCode", {})(<TextArea Autosize />)}
              </FormItem>
              <FormItem label={"Course Name"}>
                {getFieldDecorator("courseName", {})(<TextArea Autosize />)}
              </FormItem>
              <FormItem label={"Course Level"}>
                {getFieldDecorator("courseLevel", {})(<TextArea Autosize />)}
              </FormItem>
              <FormItem label={"Pass Rate"}>
                {getFieldDecorator("coursePassRate", {})(<TextArea Autosize />)}
              </FormItem>
              <FormItem label={"Description"}>
                {getFieldDecorator("courseDescription", {})(
                  <TextArea Autosize />
                )}
              </FormItem>
              <FormItem label={"Handbook"}>
                {getFieldDecorator("courseHandbook", {})(<TextArea Autosize />)}
              </FormItem>
              <FormItem>
                <Button type={"primary"} htmlType={"submit"}>
                  {" "}
                  submit{" "}
                </Button>
              </FormItem>
            </Form>
          </Modal>
        </div>
      );
    }
  }
}

export default (CourseListComponent = Form.create({})(CourseListComponent));
