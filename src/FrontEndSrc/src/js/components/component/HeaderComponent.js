import React, {Component} from "react";
import ReactDOM from "react-dom";
import {Menu, Icon, Tabs, message, Form, Select} from "antd";
import {Row, Col, Input, Button, CheckBox, Modal, DatePicker} from "antd";
import moment from "moment";
import register from "../../registerServiceWorker";
import "../../../css/pc.css";
import {Link, hashHistory} from "react-router-dom";
import {HashRouter, Route, Switch} from "react-router-dom";
import {Layout} from "antd";
import reqwest from "reqwest";

const {Header} = Layout;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class HeaderComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      modalVisible: false,
      action: "login",
      hasLogined: false,
      userNickName: "",
      userAdmin: "false",
      userid: "null"
    };
  }

  componentWillMount() {
    if (localStorage.getItem("userid") == null) {
      this.setState({hasLogined: false});
    }
    /*else*/ if (localStorage.getItem("userid") != "null") {
      //console.log(localStorage.getItem("userid"));
      this.setState({hasLogined: true});
      this.setState({
        userNickName: localStorage.getItem("userNickname"),
        userid: localStorage.getItem("userid"),
        userAdmin: localStorage.getItem("userAdmin")
      });
    }
    //console.log(this.state.userAdmin);
  }

  setModalVisible(value) {
    this.setState({modalVisible: value});
  }

  handleClick(e) {
    this.setModalVisible(true);
  }
  handleMenuClick(e) {
    //console.log("click ", e);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state.action);

    var formData = this.props.form.getFieldsValue();
    //console.log(formData.userEmail);
    //var signupurl = "http://localhost:8080/user/" + this.state.action;
    var signupurl = "aa";
    if (this.state.action == "signup") {
      signupurl = "http://localhost:8080/user/signup";
    } else {
      signupurl = "http://localhost:8080/user/login";
    }
    reqwest({
      url: signupurl,

      method: "post",
      data: {
        userEmail: formData.userEmail,
        userPassword: formData.userPassword,
        userName: formData.userName,
        userGender: formData.userGender,
        userPhone: formData.userPhone
      },
      type: "json",
      error: function(err) {},
      success: function(resp) {
        if (resp.code == 0) {
          message.success(resp.msg);
          this.setState({
            modalVisible: false,
            userNickName: resp.data.userName,
            userid: resp.data.userId,
            hasLogined: true
          });
          localStorage.setItem("userNickname", resp.data.userName);
          localStorage.setItem("userid", resp.data.userId);
          if (this.state.action == "admin") {
            localStorage.setItem("userAdmin", "true");
            this.setState({userAdmin: "true"});
            //console.log(this.state.userAdmin);
          } else {
            localStorage.setItem("userAdmin", "false");
            this.setState({userAdmin: "false"});
            //console.log(this.state.userAdmin);
          }
        } else {
          message.error(resp.msg);
        }
      }.bind(this)
    });

    //     .then(response=>response.json()).then(json=>{
    //         this.state({userNickName:json.data.userName,userid:json.data.userId});
    // });

    // localStorage.setItem("userNickname", "TestUser");
    // localStorage.setItem("userid", "1");
    // this.setState({userNickName: "TestUser"});
    //
    // message.success("success");
    // this.setModalVisible(false);
  }

  callback(key) {
    if (key == 1) {
      this.setState({action: "login"});
    } else if (key == 2) {
      this.setState({action: "signup"});
    } else if (key == 3) {
      this.setState({action: "admin"});
    }
  }
  logout() {
    localStorage.setItem("userid", "null");
    localStorage.setItem("userNickname", "null");
    localStorage.setItem("userAdmin", "false");
    this.setState({hasLogined: false});
  }

  render() {
    const {getFieldProps} = this.props.form;
    const dateFormat = "YYYY-MM-DD";
    const userShow = this.state.hasLogined ? (
      <Menu mode="horizontal" style={{background: "#3f6600"}} theme="dark">
        <SubMenu
          theme="light"
          title={
            <span>
              <Icon type="user" />
              <span>{this.state.userNickName}</span>
            </span>
          }
          style={{background: "#3f6600"}}
        >
          <Menu.Item style={{background: "##3f6600"}}>
            <Link to="/profile">
              <Button type="dashed" htmlType="button">
                My Profile
              </Button>
            </Link>
          </Menu.Item>
          {this.state.userAdmin == "true" ? (
            <Menu.Item style={{background: "##3f6600"}}>
              <Link to="/console">
                <Button type="dashed" htmlType="button">
                  Console
                </Button>
              </Link>
            </Menu.Item>
          ) : (
            <br />
          )}
          <Menu.Item
            key="logout"
            className="register"
            style={{background: "##3f6600"}}
          >
            <Link to={"/"}>
              <Button
                type="dashed"
                htmlType="button"
                onClick={this.logout.bind(this)}
              >
                logout
              </Button>
            </Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    ) : (
      <Menu mode="horizontal" style={{background: "#3f6600"}} theme="dark">
        <Menu.Item style={{background: "#3f6600"}}>
          <Button onClick={this.handleClick.bind(this)} key={"register"}>
            login/regist
          </Button>
        </Menu.Item>
      </Menu>
    );
    return (
      <div>
        <Row className={"headerbg"}>
          <Col span={1} />
          <Col span={4}>
            <Menu
              mode="horizontal"
              style={{background: "#3f6600"}}
              theme="dark"
            >
              <Menu.Item key="homepage" style={{background: "#3f6600"}}>
                <Link to={"/"} />
                <span style={{fontSize: 20, color: "#d9d9d9"}}>
                  CourseReview
                </span>
              </Menu.Item>
            </Menu>
          </Col>
          <Col span={2} />
          <Col span={12} style={{background: "#3f6600"}}>
            <Menu
              mode="horizontal"
              style={{background: "#3f6600"}}
              theme="dark"
            >
              <Menu.Item key="courses" style={{background: "#3f6600"}}>
                <Link
                  to={
                    "/courses/" +
                    JSON.stringify({
                      doSearch: true,
                      keyword: "null"
                    })
                  }
                />
                <Icon type="book" style={{fontSize: "16px"}} theme="twoTone" />
                <span style={{fontSize: 18}}>Courses</span>
              </Menu.Item>
              <Menu.Item key="compare" style={{background: "#3f6600"}}>
                <Link to={"/compare"} />
                <Icon type="tags" style={{fontSize: "16px"}} theme="twoTone" />
                <span style={{fontSize: 18}}>Compare</span>
              </Menu.Item>
              <Menu.Item key="rank" style={{background: "#3f6600"}}>
                <Link to={"/rank"} />
                <Icon
                  type="profile"
                  style={{fontSize: "16px"}}
                  theme="twoTone"
                />
                <span style={{fontSize: 18}}>Rank</span>
              </Menu.Item>
              {
                // <Menu.Item key="chatbot" style={{background: "#3f6600"}}>
                //   <a
                //     href="http://localhost:8084/test.html"
                //     style={{fontSize: 18}}
                //   >
                //     <Icon
                //       type="smile"
                //       style={{fontSize: "16px"}}
                //       theme="twoTone"
                //     />
                //     chatbot
                //   </a>
                // </Menu.Item>
              }
            </Menu>
          </Col>
          <Col span={5}>
            {userShow}

            <Modal
              title="user center"
              wrapclass="vertical-center-modal"
              visible={this.state.modalVisible}
              onCancel={() => this.setModalVisible(false)}
              ONOK={() => this.setModalVisible(false)}
              okText={"close"}
            >
              <Tabs type={"card"} onChange={this.callback.bind(this)}>
                <TabPane tab={"login"} key={"1"}>
                  <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem label="username">
                      <Input
                        placeholder="input username"
                        {...getFieldProps("userEmail")}
                      />
                    </FormItem>
                    <FormItem label={"password"}>
                      <Input
                        type={"password"}
                        placeholder={"input password"}
                        {...getFieldProps("userPassword")}
                      />
                    </FormItem>
                    <Button type={"primary"} htmlType={"submit"}>
                      {" "}
                      login{" "}
                    </Button>
                  </Form>
                </TabPane>
                <TabPane tab={"signup"} key={"2"}>
                  <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem label="Username">
                      <Input
                        placeholder="input username"
                        {...getFieldProps("userName")}
                      />
                    </FormItem>
                    <FormItem label={"Password"}>
                      <Input
                        type={"password"}
                        placeholder={"input password"}
                        {...getFieldProps("userPassword")}
                      />
                    </FormItem>
                    <FormItem label={"Confirm password"}>
                      <Input
                        type={"password"}
                        placeholder={"cofirm Password"}
                        {...getFieldProps("confirmPassword")}
                      />
                    </FormItem>
                    <FormItem label={"Email address"}>
                      <Input
                        placeholder={"input Email"}
                        {...getFieldProps("userEmail")}
                      />
                    </FormItem>
                    <FormItem label={"Birthday"}>
                      <DatePicker
                        defaultValue={moment("1998-01-01", dateFormat)}
                        format={dateFormat}
                        {...getFieldProps("userBirthday")}
                      />
                    </FormItem>
                    <FormItem label={"Gender"}>
                      <Select
                        defaultValue="male"
                        {...getFieldProps("userGender")}
                      >
                        <Option value="male">male</Option>
                        <Option value="female">female</Option>
                      </Select>
                    </FormItem>
                    <FormItem label={"Phone number"}>
                      <Input
                        placeholder={"input your phone number"}
                        {...getFieldProps("userPhone")}
                      />
                    </FormItem>
                    <Button type={"primary"} htmlType={"submit"}>
                      {" "}
                      regist{" "}
                    </Button>
                  </Form>
                </TabPane>
                {/*
                <TabPane tab={"admin"} key={"3"}>
                  <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem label="username">
                      <Input
                        placeholder="input username"
                        {...getFieldProps("userEmail")}
                      />
                    </FormItem>
                    <FormItem label={"password"}>
                      <Input
                        type={"password"}
                        placeholder={"input password"}
                        {...getFieldProps("userPassword")}
                      />
                    </FormItem>
                    <Button type={"primary"} htmlType={"submit"}>
                      {" "}
                      login{" "}
                    </Button>
                  </Form>
                </TabPane>
              */}
              </Tabs>
            </Modal>
          </Col>
        </Row>
      </div>
    );
  }
}

export default (HeaderComponent = Form.create({})(HeaderComponent));
