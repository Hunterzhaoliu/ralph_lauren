import React, { Component } from "react";
import { Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import CustomHeader from "./header/CustomHeader";
import Landing from "./Landing";
import Result from "./Result";
import history from "./history";
import { Layout } from "antd";

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Layout
          style={{
            fontFamily: "Fenice"
          }}
        >
          <Result />
          <CustomHeader />
          <Route exact={true} path="/" component={Landing} />
        </Layout>
      </Router>
    );
  }
}

export default connect(
  null,
  null
)(App);
