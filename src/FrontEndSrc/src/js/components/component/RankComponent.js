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

class RankComponent extends Component {
  constructor() {
    super();
    this.state = {
      rankByOverallRanking: "none",
      rankByDifficultyRanking: "none",
      rankByPassRate: "none",
      rankByPopularity: "none",
      display: "none",
      data: []
    };
  }
  handleSubmit(i) {
    var formData = this.props.form.getFieldsValue();
    var signupurl = "http://localhost:8080/course/" + i;

    reqwest({
      url: signupurl,
      method: "get",
      data: {},
      type: "json",
      error: function(err) {},
      success: function(resp) {
        if (resp.code == 0) {
          this.setState({
            display: null,
            data: resp.data,
            rankByOverallRanking: "none",
            rankByDifficultyRanking: "none",
            rankByPassRate: "none",
            rankByPopularity: "none"
          });
          if (i == "rankByOverallRanking") {
            this.setState({rankByOverallRanking: null});
          }
          if (i == "rankByDifficultyRanking") {
            this.setState({rankByDifficultyRanking: null});
          }
          if (i == "rankByPassRate") {
            this.setState({rankByPassRate: null});
          }
          if (i == "rankByPopularity") {
            this.setState({rankByPopularity: null});
          }
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
    const {getFieldDecorator} = this.props.form;
    const course = this.state.data;
    var rankNum = 0;
    //可以用for循环，给data里面的数据加上序号属性

    return (
      <div>
        <Row>
          <Col span={2} />
          <Col span={4}>
            <Form
              onSubmit={this.handleSubmit.bind(this, "rankByOverallRanking")}
            >
              <Button size={"large"} htmlType={"submit"}>
                Rank By Rating
              </Button>
            </Form>
          </Col>
          <Col span={1} />
          <Col span={4}>
            <Form
              onSubmit={this.handleSubmit.bind(this, "rankByDifficultyRanking")}
            >
              <Button size={"large"} htmlType={"submit"}>
                Rank By Difficulty
              </Button>
            </Form>
          </Col>
          <Col span={1} />
          <Col span={4}>
            <Form onSubmit={this.handleSubmit.bind(this, "rankByPassRate")}>
              <Button size={"large"} htmlType={"submit"}>
                Rank By Pass Rate
              </Button>
            </Form>
          </Col>
          <Col span={1} />
          <Col span={4}>
            <Form onSubmit={this.handleSubmit.bind(this, "rankByPopularity")}>
              <Button size={"large"} htmlType={"submit"}>
                Rank by Popularity
              </Button>
            </Form>
          </Col>
          <Col span={3} />
        </Row>
        <br />
        <br />
        <div style={{display: this.state.display}}>
          <Row>
            <Col span={6} />
            <Col span={12}>
              <List
                header={<h2>{this.state.rank}</h2>}
                itemLayout="horizontal"
                bordered="false"
                size="small"
                pagination={{
                  onChange: page => {
                    console.log(page);
                  },
                  pageSize: 6
                }}
                dataSource={course}
                renderItem={item => (
                  <List.Item key={item.courseId}>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          style={{color: "#f56a00", backgroundColor: "#fde3cf"}}
                        >
                          {item.courseCode.slice(0, 4)}
                        </Avatar>
                      }
                      title={
                        <span>
                          <span>{item.courseCode}</span>
                        </span>
                      }
                      description={
                        <Link to={"/course/" + item.courseCode}>
                          <h3>{item.courseName}</h3>
                        </Link>
                      }
                    />
                    <div style={{display: this.state.rankByOverallRanking}}>
                      {"Overall rating: " + item.courseOverallRating}
                    </div>
                    <div style={{display: this.state.rankByDifficultyRanking}}>
                      {"Difficulty rating: " + item.courseDifficultyRating}
                    </div>
                    <div style={{display: this.state.rankByPassRate}}>
                      {"Pass rate: " + item.coursePassRate}
                    </div>
                    <div style={{display: this.state.rankByPopularity}}>
                      {"Comments: " + item.numberOfRemarks}
                    </div>
                  </List.Item>
                )}
              />
            </Col>
            <Col span={6} />
          </Row>
        </div>
      </div>
    );
  }
}

export default (RankComponent = Form.create({})(RankComponent));
