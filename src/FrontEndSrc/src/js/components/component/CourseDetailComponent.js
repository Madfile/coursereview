import React, {Component} from "react";
import ReactDOM from "react-dom";
import {List} from "antd";
import {Menu, Icon, Tabs, message, Form, Input, Avatar} from "antd";
import {Row, Col, Button, CheckBox, Modal, Card, Rate, Progress} from "antd";
import reqwest from "reqwest";
import {Link} from "react-router-dom";
import {HashRouter, Route, Switch} from "react-router-dom";
import {withRouter} from "react-router";

const {Meta} = Card;
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const TabPane = Tabs.TabPane;
const {TextArea} = Input;

class CourseDetailComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userAdmin: localStorage.getItem("userAdmin"),
      courseCode: this.props.courseCode,
      courseData: "",
      remarkData: ""
    };
  }

  componentWillMount() {
    //console.log(this.state.courseCode);
    if (true) {
      reqwest({
        url: "http://localhost:8080/course/getOne",
        method: "post",
        data: {
          courseCode: this.state.courseCode,
          userId: localStorage.getItem("userid")
        },
        type: "json",
        error: function(err) {},
        success: function(resp) {
          //console.log(resp.data);
          this.setState({courseData: resp.data});
          //message.success(resp.msg);
          //this.state.data = resp.data;
        }.bind(this)
      });
    }
    if (true) {
      reqwest({
        url: "http://localhost:8080/remark/list",
        method: "post",
        data: {
          courseCode: this.state.courseCode,
          userId: localStorage.getItem("userid")
        },
        type: "json",
        error: function(err) {},
        success: function(resp) {
          //console.log(resp.data);
          this.setState({remarkData: resp.data});
          //message.success(resp.msg);
          //this.state.data = resp.data;
        }.bind(this)
      });
    }
  }

  buttonType(item) {
    //console.log(localStorage.getItem("userid"));
    if (item.likeUserId.includes(localStorage.getItem("userid"))) {
      console.log("includes");
      return true;
    } else {
      return false;
    }
  }

  handleClickLike(userId, remarkId) {
    console.log("userid" + localStorage.getItem("userid"));
    if (localStorage.getItem("userid") == "null") {
      message.error("You have not logged in");
    } else {
      var url = "http://localhost:8080/like/update";
      reqwest({
        url: url,
        method: "post",
        data: {
          userId: userId,
          remarkId: remarkId,
          courseCode: this.state.courseCode
        },
        type: "json",
        error: function(err) {},
        success: function(resp) {
          if (resp.code == 0) {
            //message.success("comment successful!");
            this.setState({
              remarkData: resp.data
            });
          } else {
            message.error(resp.msg);
          }
        }.bind(this)
      });
    }
  }

  handleSubmit(e) {
    if (localStorage.getItem("userid") == "null") {
      message.error("You have not logged in");
    } else {
      e.preventDefault();
      //添加判断用户是否登陆
      var formData = this.props.form.getFieldsValue();
      //console.log(formData.remarkOverallMark);
      var url = "http://localhost:8080/remark/save";

      reqwest({
        url: url,
        method: "post",
        data: {
          courseId: this.state.courseData.courseId,
          remarkOverallMark: formData.remarkOverallMark,
          remarkDifficultyMark: formData.remarkDifficultyMark,
          remarkContent: formData.remarkContent,
          remarkUserId: localStorage.getItem("userid"),
          remarkUsername: localStorage.getItem("userNickname")
        },
        type: "json",
        error: function(err) {},
        success: function(resp) {
          if (resp.code == 0) {
            message.success("comment successful!");
            this.setState({
              remarkData: resp.data
            });

            reqwest({
              url:
                "http://localhost:8080/course/getOne",
              method: "post",
              data: {
                courseCode: this.state.courseCode,
                userId: localStorage.getItem("userid")
              },
              type: "json",
              error: function(err) {},
              success: function(resp) {
                //console.log(resp.data);
                this.setState({courseData: resp.data});
                //message.success(resp.msg);
                //this.state.data = resp.data;
              }.bind(this)
            });

            this.props.form.setFieldsValue({remarkOverallMark: 0});
            this.props.form.setFieldsValue({remarkDifficultyMark: 0});
            this.props.form.setFieldsValue({remarkContent: ""});
            //this.props.form.getFieldsValue().remarkContent = "";
          } else {
            message.error(resp.msg);
          }
        }.bind(this)
      });
      //     .then(response=>response.json()).then(json=>{
      //         this.state({userNickName:json.data.username,userid:json.data.userId});
      // });
      //this.setState({userNickName:this.props.userNickName,useri});
    }
  }

  handleClickDelete(courseCode) {
    var url = "http://localhost:8080/course/delete";
    reqwest({
      url: url,
      method: "post",
      data: {
        courseCode: courseCode
      },
      type: "json",
      error: function(err) {
        message.error("server fail");
      },
      success: function(resp) {
        if (resp.code == 0) {
          //message.success("comment successful!");
          this.setState({
            data: resp.data
          });
          //this.props.history.push("/courses");
        } else {
          message.error(resp.msg);
          //this.props.history.push("/courses");
        }
      }.bind(this)
    });
  }

  setModalVisible(value) {
    this.setState({modalVisible: value});
  }

  handleClickModal(e) {
    this.setModalVisible(true);
  }

  handleSubmitCourse(e) {
    e.preventDefault();
    var formData = this.props.form.getFieldsValue();
    console.log(formData);

    var url = "http://localhost:8080/course/modify";

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

  componentDidMount() {}

  render() {
    //const {getFieldProps} = this.props.form;
    const courseDetail = this.state.courseData;
    const remark = this.state.remarkData;
    const overallRating = this.state.overallRating;
    const difficultyRating = this.state.difficultyRating;
    const {getFieldDecorator} = this.props.form;
    console.log("userAdmin:" + this.state.userAdmin);

    const IconText = ({type, text}) => (
      <span>
        <Icon type={type} style={{marginRight: 8}} />
        {text}
      </span>
    );

    return (
      <div>
        <Row>
          <div>
            {this.state.userAdmin == "true" ? (
              <div>
                <Link
                  to={
                    "/courses/" +
                    JSON.stringify({
                      doSearch: true,
                      keyword: "null"
                    })
                  }
                >
                  <Button
                    icon="delete"
                    htmlType="button"
                    type={"primary"}
                    onClick={this.handleClickDelete.bind(
                      this,
                      courseDetail.courseCode
                    )}
                    style={{
                      background: "#f5222d"
                    }}
                  />
                </Link>
                <span> </span>
                <Button
                  icon="tool"
                  htmlType="button"
                  type={"primary"}
                  onClick={this.handleClickModal.bind(this)}
                  style={{
                    background: "#69c0ff"
                  }}
                />
                <br />
                <br />
              </div>
            ) : (
              <div>
                <br />
              </div>
            )}
          </div>
          <h2>{courseDetail.courseCode}</h2>
          <span>
            <h2>{courseDetail.courseName}</h2>
            <span>
              <h4>{courseDetail.courseLevel}</h4>
            </span>
          </span>
          <br />
        </Row>
        <Row>
          <h3>Description</h3>
          <span>{courseDetail.courseDescription}</span>
        </Row>
        <br />
        <Row>
          <a href={courseDetail.courseHandbook}>handbook link</a>
        </Row>
        <br />
        <Row>
          <h3>Pass Rate</h3>
          <Progress
            type="circle"
            percent={parseInt(courseDetail.coursePassRate)}
            width={50}
          />
        </Row>
        <br />
        <Row>
          <h3>Average Rating</h3>
          <span>
            <Rate
              disabled
              defaultValue={0}
              value={parseFloat(courseDetail.courseOverallRating)}
            />
            {
              <span className="ant-rate-text">
                {courseDetail.courseOverallRating}
              </span>
            }
          </span>
          <h3>Difficulty Rating</h3>
          <span>
            <Rate
              disabled
              defaultValue={0}
              value={parseFloat(courseDetail.courseDifficultyRating)}
            />
            {
              <span className="ant-rate-text">
                {courseDetail.courseDifficultyRating}
              </span>
            }
          </span>
        </Row>
        <br />
        <h5>(Number of Votes: {courseDetail.numberOfRemarks})</h5>
        <br />
        <br />
        <Row>
          <h3>Reviews:</h3>
        </Row>
        <Row>
          <List
            itemLayout="vertical"
            bordered="true"
            size="large"
            pagination={{
              onChange: page => {
                console.log(page);
              },
              pageSize: 2
            }}
            dataSource={remark}
            renderItem={item => (
              <List.Item
                key={item.remarkId}
                actions={[
                  <Button
                    htmlType="button"
                    type={item.userLiked ? "primary" : "dashed"}
                    ghost={item.userLiked ? true : false}
                    onClick={this.handleClickLike.bind(
                      this,
                      localStorage.getItem("userid"),
                      item.remarkId
                    )}
                    style={{
                      background: "#fff2e8"
                    }}
                  >
                    <IconText
                      type="like"
                      text={item.numberOfLike}
                      color="#000100"
                    />
                  </Button>
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      style={{color: "#f56a00", backgroundColor: "#fde3cf"}}
                    >
                      {item.remarkUsername.slice(0, 3)}
                    </Avatar>
                  }
                  title={
                    <div>
                      <Icon type="user" />
                      <span style={{color: "#ad4e00"}}>
                        {" " + item.remarkUsername}
                      </span>
                    </div>
                  }
                  description={item.updateTime}
                />
                <span style={{fontSize: 16}}>{item.remarkContent}</span>
              </List.Item>
            )}
          />
        </Row>
        <br />
        <br />
        <br />
        <Row>
          <Form onSubmit={this.handleSubmit.bind(this)}>
            <Row>
              <h3>Give Your Overall Rating Here: </h3>
            </Row>

            <Row>
              <span>
                <FormItem>
                  {getFieldDecorator("remarkOverallMark", {
                    initialValue: 0
                  })(<Rate al lowHalf required />)}
                </FormItem>
              </span>
            </Row>

            <Row>
              <h3>Give Your Difficulty Rating Here: </h3>
            </Row>
            <Row>
              <span>
                <FormItem>
                  {getFieldDecorator("remarkDifficultyMark", {
                    initialValue: 0
                  })(<Rate al lowHalf required />)}
                </FormItem>
              </span>
            </Row>
            <FormItem>
              <Row>
                {getFieldDecorator("remarkContent", {
                  rules: [
                    {
                      required: true,
                      message: "Please input your comments before submit!"
                    }
                  ]
                })(<TextArea rows={4} />)}
              </Row>
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </FormItem>
          </Form>
        </Row>

        <Modal
          title="modify course detail"
          wrapClassName="vertical-center-modal"
          visible={this.state.modalVisible}
          onCancel={() => this.setModalVisible(false)}
          ONOK={() => this.setModalVisible(false)}
          okText={"close"}
        >
          <Form horizontal onSubmit={this.handleSubmitCourse.bind(this)}>
            <FormItem label={"Course Code"}>
              {getFieldDecorator("courseCode", {
                initialValue: courseDetail.courseCode
              })(<TextArea Autosize />)}
            </FormItem>
            <FormItem label={"Course Name"}>
              {getFieldDecorator("courseName", {
                initialValue: courseDetail.courseName
              })(<TextArea Autosize />)}
            </FormItem>
            <FormItem label={"Course Level"}>
              {getFieldDecorator("courseLevel", {
                initialValue: courseDetail.courseLevel
              })(<TextArea Autosize />)}
            </FormItem>
            <FormItem label={"Pass Rate"}>
              {getFieldDecorator("coursePassRate", {
                initialValue: courseDetail.coursePassRate
              })(<TextArea Autosize />)}
            </FormItem>
            <FormItem label={"Description"}>
              {getFieldDecorator("courseDescription", {
                initialValue: courseDetail.courseDescription
              })(<TextArea Autosize />)}
            </FormItem>
            <FormItem label={"Handbook"}>
              {getFieldDecorator("courseHandbook", {
                initialValue: courseDetail.courseHandbook
              })(<TextArea Autosize />)}
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

export default (CourseDetailComponent = Form.create({})(CourseDetailComponent));
