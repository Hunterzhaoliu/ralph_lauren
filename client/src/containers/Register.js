import _ from "lodash";
import React, { Component } from "react";
import { bindActionCreators } from "redux";
import * as registerActionCreators from "../actions/register";
import { connect } from "react-redux";
import { Layout, Row, Col, Icon, Divider } from "antd";
import InputField from "./input/InputField";
import InputChoice from "./input/InputChoice";
import options from "./input/options";

import { GREY_0, GREY_4, GREY_8 } from "../styles/ColorConstants";
import "./register.css";

const { Content } = Layout;

class Register extends Component {
  constructor() {
    super();
    this.state = {
      score: null
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

  renderAnswer(question, questionIndex, answerIndex) {
    const imageWidth = "150px";

    return (
      <Col span={11}>
        <a
          className="a-answer"
          style={{
            borderRadius: 10,
            backgroundColor: GREY_0,
            borderColor: GREY_0,
            width: "100%"
          }}
          href={"#question" + String(answerIndex + 1)}
        >
          <img
            style={{
              width: imageWidth,
              height: imageWidth
            }}
            alt=""
            src={"./1.png"}
          />
        </a>
      </Col>
    );
  }

  renderInput() {
    const questionnaires = options.questionnaire;
    return _.map(questionnaires, (question, questionIndex) => {
      return (
        <div key={questionIndex}>
          <Row
            style={{
              padding: "30px 0px 0px 0px"
            }}
            type="flex"
            justify="center"
            align="middle"
          >
            <h4 id={"question" + String(questionIndex)}>{question.ask}</h4>
          </Row>
          <Row
            style={{
              padding: "30px 0px 0px 0px"
            }}
            type="flex"
            justify="center"
            align="middle"
          >
            {this.renderAnswer(question, questionIndex, 0)}
            <Col span={1} />
            {this.renderAnswer(question, questionIndex, 1)}
          </Row>
          <Row
            style={{
              padding: "30px 0px 0px 0px" // TRBL
            }}
            type="flex"
            justify="center"
            align="middle"
          >
            {this.renderAnswer(question, questionIndex, 3)}
            <Col span={1} />
            {this.renderAnswer(question, questionIndex, 4)}
          </Row>
        </div>
      );
    });
  }

  render() {
    const { register } = this.props;

    return (
      <Content
        style={{
          backgroundColor: GREY_0,
          textAlign: "center",
          padding: "45px 0px 0px 0px"
        }}
      >
        <Row type="flex" justify="center">
          <Col>
            <Divider id="questionnaire" style={{ color: GREY_4 }}>
              Questionnaire
            </Divider>
            <Row type="flex" justify="center">
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
