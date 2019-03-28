import React from "react";
import ReactDOM from "react-dom";

import HomepageContainer from "./js/components/container/HomepageContainer";
import UserProfileContainer from "./js/components/container/UserProfileContainer";
import CourseListContainer from "./js/components/container/CourseListContainer";
import CourseDetailContainer from "./js/components/container/CourseDetailContainer";
import CompareContainer from "./js/components/container/CompareContainer";
import RankContainer from "./js/components/container/RankContainer";
import ConsoleContainer from "./js/components/container/ConsoleContainer";

import {HashRouter, Route, Switch} from "react-router-dom";
import "antd/dist/antd.css";

export default class Index extends React.Component {
  render() {
    return (
      <HashRouter>
        <div>
          <Switch>
            <Route exact path="/console" component={ConsoleContainer} />
            <Route exact path="/profile" component={UserProfileContainer} />
            <Route exact path="/compare" component={CompareContainer} />
            <Route exact path="/rank" component={RankContainer} />
            <Route path="/courses/:keyword" component={CourseListContainer} />
            <Route
              path="/course/:courseCode"
              component={CourseDetailContainer}
            />
            <Route path="/" component={HomepageContainer} />
          </Switch>
        </div>
      </HashRouter>
    );
  }
}
ReactDOM.render(<Index />, document.getElementById("rooter"));
