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
  renderRegistration() {
    return (
      <div>
        <Row type="flex" justify="center" align="middle">
          <Col
            span={10}
            style={{
              paddingTop: "60px"
            }}
          >
            <button
              style={{
                color: GREY_0,
                background: GREY_8,
                width: "100%"
              }}
              onClick={e => this.props.switchPopUpVisibility("register")}
            >
              Create an account
            </button>
          </Col>
        </Row>
        <Row type="flex" justify="center" align="middle">
          <Col span={10}>
            <Row
              type="flex"
              justify="center"
              align="middle"
              style={{ paddingTop: 30 }}
            >
              <Col>
                <h5
                  style={{
                    color: GREY_8
                  }}
                >
                  Already registered?
                </h5>
              </Col>
              <Col offset={4}>
                <button
                  style={{
                    color: GREY_0,
                    background: GREY_8
                  }}
                  onClick={e => this.props.switchPopUpVisibility("login")}
                >
                  Log in
                </button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
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
      </Content>
    );
  }
}

function mapStateToProps(state) {
  return {
    register: state.register,
    windowWidth: state.customHeader.windowWidth
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
