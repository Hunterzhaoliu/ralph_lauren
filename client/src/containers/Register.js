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
      email: "",
      score: 0
    };
  }

  onSelectAnswer = e => {
    this.setState({ score: this.state.score + 3 });
  };

  onChangeEmail = e => {
    this.setState({ [e.target.id]: [e.target.value] });
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
      <Col>
        <a
          className="a-answer"
          style={{
            backgroundColor: GREY_0,
            borderColor: GREY_0
          }}
          href={"#question" + String(questionIndex + 1)}
          onClick={answerIndex => this.onSelectAnswer(answerIndex)}
        >
          <img
            style={{
              width: imageWidth,
              height: imageWidth
            }}
            alt=""
            src={question.imageSources[answerIndex]}
          />
        </a>
      </Col>
    );
  }

  renderInput() {
    const questionnaires = options.questionnaire;
    return _.map(questionnaires, (question, questionIndex) => {
      return (
        <div
          style={{
            padding: "60px 0px 0px 0px"
          }}
          id={"question" + String(questionIndex)}
          key={questionIndex}
        >
          <Row type="flex" justify="center" align="middle">
            <h4>{question.ask}</h4>
          </Row>
          <Row
            style={{
              padding: "15px 0px 0px 0px"
            }}
            type="flex"
            justify="center"
            align="middle"
          >
            {this.renderAnswer(question, questionIndex, 0)}
            <div style={{ width: "5px" }} />
            {this.renderAnswer(question, questionIndex, 1)}
          </Row>
          <Row
            style={{
              padding: "5px 0px 0px 0px" // TRBL
            }}
            type="flex"
            justify="center"
            align="middle"
          >
            {this.renderAnswer(question, questionIndex, 2)}
            <div style={{ width: "5px" }} />
            {this.renderAnswer(question, questionIndex, 3)}
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
              <Col>
                {this.renderInput()}
                <Row
                  id="question6"
                  style={{ paddingTop: 60 }}
                  type="flex"
                  justify="center"
                >
                  <Col>
                    <InputField
                      value={this.state.email}
                      label="Email"
                      errorMessage="Email must be filled and be a valid email."
                      hasError={false}
                      onChange={this.onChangeEmail}
                      width={300}
                      id="email"
                      type="email"
                    />
                    <Row style={{ padding: "30px 0px 60px" }}>
                      <Col>
                        <a className="a-result" href={"#result"}>
                          <button
                            className="button-register-save"
                            onClick={() =>
                              this.props.registerUser(
                                this.state.email[0],
                                this.state.score
                              )
                            }
                          >
                            SAVE {this.renderSaveIcon(register.saveState)}
                          </button>
                        </a>
                      </Col>
                    </Row>
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
    registerUser: (email, score) => {
      registerDispatchers.registerUser(email, score);
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
