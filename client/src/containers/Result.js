import React, { Component } from "react";
import { connect } from "react-redux";
import * as registerActionCreators from "../actions/register";
import { bindActionCreators } from "redux";
import { Row, Col, Modal } from "antd";
import "./result.css";

import options from "./input/options";

const randomColorIndex = Math.round(Math.random() * 5);

class Result extends Component {
  render() {
    const { isResultVisible } = this.props;
    console.log("options.results = ", options.results);
    console.log("randomColorIndex = ", randomColorIndex);
    const poloArray = options.results[randomColorIndex];

    console.log("poloArray = ", poloArray);
    console.log("poloArray[0] = ", poloArray[0]);

    if (isResultVisible) {
      return (
        <Modal
          visible={isResultVisible}
          onCancel={e => this.props.closeModal()}
          footer={null}
          centered={true}
          bodyStyle={{ padding: "15px 15px 30px", backgroundColor: "white" }}
          style={{ padding: "60px 0px 0px 0px" }} // modal relative to screen
        >
          <div>
            <Row
              style={{
                paddingTop: "30px"
              }}
              type="flex"
              justify="center"
              align="middle"
            >
              <Col>
                <img className="img-team" alt="" src={poloArray[0]} />
              </Col>
            </Row>
            <Row
              style={{
                paddingTop: "15px"
              }}
              id="result"
              type="flex"
              justify="center"
              align="middle"
            >
              <Col>
                <h5 className="h5-welcome">{"Welcome to Team "}</h5>
                <h5
                  className="h5-welcome-color"
                  style={{ color: poloArray[2] }}
                >
                  {" " + poloArray[1]}
                </h5>
                <h5 className="h5-welcome">!</h5>
              </Col>
            </Row>
          </div>
        </Modal>
      );
    } else {
      return <div />;
    }
  }
}

function mapStateToProps(state) {
  return {
    isResultVisible: state.register.isResultVisible
  };
}

function mapDispatchToProps(dispatch) {
  const registerDispatchers = bindActionCreators(
    registerActionCreators,
    dispatch
  );

  return {
    closeModal: () => {
      registerDispatchers.closeModal();
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Result);
