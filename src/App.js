import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Toast from "./Toast";
import ThemeDefault from "./theme-default";
import muiThemeable from "material-ui/styles/muiThemeable";

import "./App.css";
import PinPad from "./PinPad/PinPad.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bJWT: false,
      showPin: false,
      firstTry: null,
      secondTry: null,
      alldata: [
        {},
        {
          message: "Want PIN?",
          buttons: ["yes", "skip"]
        },
        { message: "Enter PIN" },
        { message: "Enter PIN again" },
        {
          message: "PINS do not match",
          buttons: ["retry", "skip"],
          alert: true
        },
        { message: "SUCCESS" }
      ],
      data: {}
    };
    this.onsubmit = this.onsubmit.bind(this);
    this.ontoast = this.ontoast.bind(this);
  }
  componentWillMount() {}
  componentDidMount() {
    console.log("componentDidMount()");
    console.log("data " + this.state.alldata[1]);
    this.updateState(1);
  }

  onsubmit(val) {
    console.log("onsubmit");
    !this.state.firstTry
      ? this.setState({ firstTry: val })
      : this.setState({ secondTry: val });
    this.state.firstTry
      ? this.evalPins(this.state.firstTry, val)
      : this.updateState(3);
  }
  evalPins(a, b) {
    a == b ? this.success() : this.updateState(4);
  }
  success() {
    console.log("success url ");
    this.props.action("success");
    this.updateState(5);
  }
  ontoast(val) {
    switch (val) {
      case "yes":
        this.setState({ showPin: true });
        this.updateState(2);
        break;
      case "retry":
        this.clear();
        this.updateState(2);
        break;
      case "skip":
        console.log("skip url  ");
        this.props.action("skip");
        break;
      default:
    }
  }
  updateState(n) {
    this.setState({ data: this.state.alldata[n] });
  }
  clear() {
    this.setState({
      firstTry: null,
      secondTry: null
    });
  }
  retry() {
    this.updateState(1);
  }
  getStyle() {
    return this.state.showPin ? "another" : "hide";
  }
  render() {
    return (
      <MuiThemeProvider>
        <div style={{ margin: "20px" }}>
          <div className="main">
            <div style={{ margin: "20px" }}>
              <Toast
                data={this.state.data}
                message={this.state.data.message}
                onclick={x => this.ontoast(x)}
                color1="#DF5C33"
              />
            </div>
            <div className={this.getStyle()}>
              <PinPad onsubmit={this.onsubmit} />
            </div>
          </div>
          <div className="footer" />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
