import React, { Component } from "react";
import { bindActionCreators } from "redux";
import * as registerActionCreators from "../actions/register";
import { connect } from "react-redux";
import { Layout, Row, Col, Icon, Divider } from "antd";
import InputField from "./input/InputField";
import InputChoice from "./input/InputChoice";

import { GREY_0, GREY_5, GREY_8 } from "../styles/ColorConstants";
import "./register.css";

const { Content } = Layout;

class Register extends Component {
  constructor() {
    super();
    this.state = {
      firstName: null,
      lastName: null,
      age: null,
      gender: null,
      errors: {}
    };
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  renderSaveIcon(saveState) {
    if (saveState === "start") {
      return <Icon type="loading" />;
    } else if (saveState === "done") {
      return <Icon type="check" />;
    } else if (saveState === "error") {
      return <Icon type="warning" />;
    }
  }

  renderInput() {
    const errors = this.state.errors;

    return (
      <div>
        <Row style={{ paddingTop: 15 }} type="flex" justify="center">
          <Col>
            <InputField
              value={this.state.firstName}
              placeholder="First Name"
              onChange={this.onChange}
              hasError={false}
              width={"350px"}
              id="firstName"
              type="string"
            />
          </Col>
        </Row>
      </div>
    );
  }

  render() {
    const { register } = this.props;

    return (
      <Content
        style={{
          backgroundColor: GREY_0,
          height: "100vh",
          width: "100vw",
          textAlign: "center",
          padding: "60px 0px 0px 0px"
        }}
      >
        <Row style={{ paddingTop: "60px" }} type="flex" justify="center">
          <Col>
            <Divider style={{ color: GREY_5 }}>Register</Divider>
            <Row style={{ paddingBottom: 10 }} type="flex" justify="center">
              <Col span={22}>
                {this.renderInput()}
                <Row style={{ paddingTop: 30 }} type="flex" justify="center">
                  <Col>
                    <button
                      className="button-register-save"
                      onClick={
                        () =>
                          this.props.register(
                            register.mongoDBUserId,
                            JSON.parse(JSON.stringify(this.state))
                          ) // need to send copy of state
                      }
                    >
                      Save {this.renderSaveIcon(register.saveState)}
                    </button>
                  </Col>
                </Row>
              </Col>
            </Row>
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
    register: (mongoDBUserId, register) => {
      registerDispatchers.register(mongoDBUserId, register);
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
