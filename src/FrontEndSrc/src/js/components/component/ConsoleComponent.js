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
class ConsoleComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      modalVisible: false
    };
  }

  componentWillMount() {
    reqwest({
      url: "http://localhost:8080/user/list",
      method: "get",
      type: "json",
      error: function(err) {},
      success: function(resp) {
        this.setState({data: resp.data});
      }.bind(this)
    });
  }

  handleClickDelete(userId) {
    var url = "http://localhost:8080/user/ban";
    reqwest({
      url: url,
      method: "post",
      data: {
        userId: userId
      },
      type: "json",
      error: function(err) {},
      success: function(resp) {
        if (resp.code == 0) {
          //message.success("comment successful!");
          this.setState({
            data: resp.data
          });
        } else {
          message.error(resp.msg);
        }
      }.bind(this)
    });
  }

  setModalVisible(value) {
    this.setState({modalVisible: value});
  }

  handleClick(e) {
    this.setModalVisible(true);
  }

  render() {
    const {getFieldProps} = this.props.form;
    const data = this.state.data;

    const {getFieldDecorator} = this.props.form;
    return (
      <div>
        <div>
          <br />
          <br />
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={item => (
              <List.Item
                actions={[
                  <Button
                    icon="user-delete"
                    htmlType="button"
                    type={"primary"}
                    onClick={this.handleClickDelete.bind(this, item.userId)}
                    style={{
                      background: "#f5222d"
                    }}
                  />
                ]}
              >
                <List.Item.Meta
                  title={item.userName}
                  description={"user id:  " + item.userId}
                />
              </List.Item>
            )}
          />
        </div>
      </div>
    );
  }
}
export default (ConsoleComponent = Form.create({})(ConsoleComponent));
