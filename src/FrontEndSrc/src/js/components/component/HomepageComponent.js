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

class HomepageComponent extends Component {
  constructor() {
    super();
    this.state = {
      courseDetail: []
    };
  }

  handleSubmit(e) {
    e.preventDefault();

    var formData = this.props.form.getFieldsValue();
    //console.log(formData.userEmail);
    var signupurl = "http://localhost:8080/course/search";

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

  componentDidMount() {}

  render() {
    const {getFieldProps} = this.props.form;
    const data = this.state.data;
    //const {getFieldDecorator} = this.props.form;

    return (
      <div>
        <div>
          <img src="/src/img/cover.jpg" height="25%" width="100%" />
        </div>
        <br />
        <div>
          <a className="logo">
            {/*<img src={holilogo} alt="logo"/>*/}
            <span>Search UNSW courses, see the reviews and make comments!</span>
          </a>
        </div>
        <br />
        <Form layout="inline">
          <FormItem>
            <Input
              style={{width: 850}}
              placeholder={"Search course code or course name, e.g. COMP9021.."}
              {...getFieldProps("keyword")}
            />
          </FormItem>
          <FormItem>
            <Link
              to={
                "/courses/" +
                JSON.stringify({
                  doSearch: true,
                  keyword: this.props.form.getFieldsValue().keyword
                })
              }
            >
              <Button type={"primary"} htmlType={"submit"}>
                {" "}
                <Icon type="search" size="large" />{" "}
              </Button>
            </Link>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default (HomepageComponent = Form.create({})(HomepageComponent));
