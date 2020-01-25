import React, { Component } from "react";
import { Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import CustomHeader from "./header/CustomHeader";
import Register from "./Register";
import HeaderMenuButtons from "./header/HeaderMenuButtons";
import Landing from "./Landing";
import history from "./history";
import { Layout } from "antd";

class App extends Component {
  renderContent() {
    const { register } = this.props;
    if (register.registerIsVisible) {
      return <Register />;
    } else if (register.menuButtonsIsVisible) {
      return <HeaderMenuButtons />;
    } else {
      return (
        <div>
          <CustomHeader />
          <Route exact={true} path="/" component={Landing} />
        </div>
      );
    }
  }

  render() {
    return (
      <Router history={history}>
        <Layout
          style={{
            fontFamily: "Century Gothic Regular"
          }}
        >
          {this.renderContent()}
        </Layout>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    register: state.register
  };
}

export default connect(
  mapStateToProps,
  null
)(App);
