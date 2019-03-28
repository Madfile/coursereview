import React from "react";
import ReactDOM from "react-dom";
import {List} from "antd";
import {Menu, Icon, Tabs, message, Form, Input, Avatar} from "antd";
import {Row, Col, Button, CheckBox, Modal} from "antd";
import reqwest from "reqwest";

const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;

const MenuItemGroup = Menu.ItemGroup;
const TabPane = Tabs.TabPane;
class ProfileComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      modalVisible: false,
      userNickName: "defualt",
      userEmail: "defualt",
      userBirthday: "defualt",
      userGender: "defualt",
      userPhone: "defualt",
      userid: 0
    };
  }
  handleSubmit(e) {
    e.preventDefault();
    var formData = this.props.form.getFieldsValue();
    console.log(formData);

    //fetch could not work here?
    var signupurl = "http://8080/user/" + this.state.action;
    fetch(signupurl, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(json => {
        this.state({userNickName: json.userName, userid: json.userId});
      });

    message.success("success");
    this.setModalVisible(false);
  }

  setModalVisible(value) {
    this.setState({modalVisible: value});
  }

  componentDidMount() {
    // var signupurl="http://localhost:8080/user/"+this.state.action;
    //
    // reqwest({
    //     url: signupurl,
    //     method: 'post',
    //     data: {userEmail:11,userPassword:11
    //     },
    //     type: 'json',
    //      error: function (err) { }
    //     , success: function (resp) {
    //     console.log(resp)
    // }
    // });
    //     .then(response=>response.json()).then(json=>{
    //         this.state({userNickName:json.data.userName,userid:json.data.userId});
    // });
    //this.setState({userNickName:this.props.userNickName,useri});
  }
  handleClick(e) {
    this.setModalVisible(true);
  }

  render() {
    const {getFieldProps} = this.props.form;
    const data = {
      userName: this.state.userNickName,
      userEmail: this.state.userEmail,
      userBirthday: this.state.userBirthday,
      userGender: this.state.userGender,
      userPhone: this.state.userPhone
    };
    const {getFieldDecorator} = this.props.form;
    return (
      <div>
        <div>
          <br />
          <br />
          <List
            size="large"
            header={
              <div>
                <center>My Profile</center>
              </div>
            }
            itemLayout="horizontal"
            bordered
          >
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar
                    icon="user"
                    style={{
                      backgroundColor: "#f56a00",
                      verticalAlign: "middle"
                    }}
                    size="large"
                  />
                }
                title="Username"
                description="Your nick name"
              />
              {data.userName}
            </List.Item>
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar
                    style={{
                      backgroundColor: "#f56a00",
                      verticalAlign: "middle"
                    }}
                    size="large"
                    icon="inbox"
                  />
                }
                title="Email"
                description="Your email address"
              />
              {data.userEmail}
            </List.Item>
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar
                    style={{
                      backgroundColor: "#f56a00",
                      verticalAlign: "middle"
                    }}
                    size="large"
                    icon="smile"
                  />
                }
                title="Gender"
                description="Your gender"
              />
              {data.userGender}
            </List.Item>
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar
                    style={{
                      backgroundColor: "#f56a00",
                      verticalAlign: "middle"
                    }}
                    size="large"
                    icon="phone"
                  />
                }
                title="Phone number"
                description="Your phone number"
              />
              {data.userPhone}
            </List.Item>
          </List>
        </div>
        <Row>
          <br />
          <br />
        </Row>
        <Row>
          <Col span={11} />
          <Col span={4}>
            <Button type={"primary"} onClick={this.handleClick.bind(this)}>
              {" "}
              modify{" "}
            </Button>
          </Col>
          <Col span={9} />
          <br />
          <br /> <br />
          <br />
        </Row>

        <Modal
          title="modify user information"
          wrapClassName="vertical-center-modal"
          visible={this.state.modalVisible}
          onCancel={() => this.setModalVisible(false)}
          ONOK={() => this.setModalVisible(false)}
          okText={"close"}
        >
          <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
            <FormItem label={"Email Address"}>
              {getFieldDecorator("userEmail", {initialValue: data.userEmail})(
                <input />
              )}
            </FormItem>
            <FormItem label={"Birthday"}>
              {getFieldDecorator("userBirthday", {
                initialValue: data.userBirthday
              })(<input />)}
            </FormItem>
            <FormItem label={"Gender"}>
              {getFieldDecorator("userGender", {initialValue: data.userGender})(
                <input />
              )}
            </FormItem>
            <FormItem label={"Phone number"}>
              {getFieldDecorator("userPhone", {initialValue: data.userPhone})(
                <input />
              )}
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
export default (ProfileComponent = Form.create({})(ProfileComponent));
