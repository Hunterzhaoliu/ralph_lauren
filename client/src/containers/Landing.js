import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as registerActionCreators from "../actions/register";
import { Layout, Row, Col, Icon } from "antd";
import Register from "./Register";
import "./landing.css";

import { GREY_0, GREY_8 } from "../styles/ColorConstants";

const { Content } = Layout;

class Landing extends Component {
  renderResult() {
    const { register } = this.props;

    if (register.teamIsVisible) {
      return (
        <div id="result">
          <Row
            style={{
              paddingTop: "60px"
            }}
            type="flex"
            justify="center"
            align="middle"
          >
            <Col>
              <img
                className="img-team"
                alt=""
                src="../images/pony_colors/5.png"
              />
            </Col>
          </Row>
          <Row type="flex" justify="center" align="middle">
            <Col>
              <h3>Welcome to Team</h3>
              <h3 className="h3-red">RED</h3>
              <h3>!</h3>
            </Col>
          </Row>
        </div>
      );
    }
  }

  render() {
    return (
      <Content
        style={{
          backgroundColor: GREY_0,
          textAlign: "center",
          padding: "60px 0px 0px 0px"
        }}
      >
        <Row
          style={{
            paddingTop: "30px"
          }}
          type="flex"
          justify="center"
          align="middle"
        >
          <Col>
            <h3 className="h3-logo">Ralph Lauren</h3>
          </Col>
        </Row>
        <Row
          style={{
            paddingTop: "45px"
          }}
          type="flex"
          justify="center"
          align="middle"
        >
          <Col>
            <h4>Customer Review</h4>
          </Col>
        </Row>
        <Row
          style={{
            paddingTop: "45px"
          }}
          type="flex"
          justify="center"
          align="middle"
        >
          <Col>
            <a className="a-down" href="#questionnaire">
              <Icon style={{ fontSize: "18px", color: "black" }} type="down" />
            </a>
          </Col>
        </Row>
        <Row>
          <Col>
            <Register />
          </Col>
        </Row>
        {this.renderResult()}
      </Content>
    );
  }
}

function mapStateToProps(state) {
  return {
    register: state.register
  };
}

function mapDispatchToProps(dispatch) {
  const registerDispatchers = bindActionCreators(
    registerActionCreators,
    dispatch
  );

  return {
    switchPopUpVisibility: popUpName => {
      registerDispatchers.switchPopUpVisibility(popUpName);
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Landing);
