import React, {Component} from "react";
import ReactDOM from "react-dom";
import {Form} from "antd";
import {Layout} from "antd";
const {Footer} = Layout;

<Footer style={{textAlign: "center"}}>
  Ant Design ©2018 Created by Ant UED
</Footer>;

class FooterComponent extends Component {
  constructor() {
    super();
  }

  render() {
    return <div>CourseReview ©2018 Created by Group9</div>;
  }
}

export default (FooterComponent = Form.create({})(FooterComponent));

// const wrapper = document.getElementById("footer");
// wrapper ? ReactDOM.render(<Footer />, wrapper) : false;
