import React, { Component } from "react";
import * as registerActionCreators from "../../actions/register";
import * as customHeaderActionCreators from "../../actions/customHeader";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Layout, Row, Col, Icon } from "antd";
import "./custom-header.css";
import logo from "../../images/logo.png";
import { GREY_1 } from "../../styles/ColorConstants";
const { Header } = Layout;

class CustomHeader extends Component {
  constructor(props) {
    super(props);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.props.updateWindowDimensions(window.innerWidth, window.innerHeight);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  render() {
    return (
      <Header
        style={{
          background: "white",
          position: "fixed",
          zIndex: 2,
          width: "100%",
          height: "60px",
          lineHeight: "60px",
          padding: "0px 20px"
        }}
      >
        <Row
          style={{ height: "60px" }}
          type="flex"
          justify="center"
          align="middle"
        >
          <Col>
            <a className="a-logo" href="/">
              <img alt="" src={logo} />
            </a>
          </Col>
        </Row>{" "}
      </Header>
    );
  }
}

function mapDispatchToProps(dispatch) {
  const customHeaderDispatchers = bindActionCreators(
    customHeaderActionCreators,
    dispatch
  );

  const registerDispatchers = bindActionCreators(
    registerActionCreators,
    dispatch
  );

  return {
    updateWindowDimensions: (newWindowWidth, newWindowHeight) => {
      customHeaderDispatchers.updateWindowDimensions(
        newWindowWidth,
        newWindowHeight
      );
    },
    switchPopUpVisibility: popUpName => {
      registerDispatchers.switchPopUpVisibility(popUpName);
    }
  };
}

export default connect(
  null,
  mapDispatchToProps
)(CustomHeader);
