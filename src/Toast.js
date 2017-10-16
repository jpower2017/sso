import React, { Component } from "react";
import RaisedButton from "material-ui/RaisedButton";
import Info from "material-ui/svg-icons/action/info-outline";
import Warning from "material-ui/svg-icons/alert/warning";

class Toast extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onclick(b) {
    console.log("toast onclick " + b);
    this.props.onclick(b);
  }
  showMessage() {
    return this.props.message;
  }
  showIcon() {
    const sty = { color: "white", paddingLeft: "8px", paddingBottom: "2px" };
    return this.props.data.alert ? (
      <Warning style={sty} />
    ) : (
      <Info style={sty} />
    );
  }
  render() {
    //const { color1 } = this.props;
    return (
      <div>
        <div
          style={{
            backgroundColor: "#DF5C33",
            width: "600px",
            padding: "20px",
            borderRadius: "10px",
            width: "auto",
            opacity: 0.8,
            borderColor: "#770000",
            fontSize: "125%"
          }}
        >
          {this.showIcon()}
          <div
            style={{
              paddingBottom: "5px",
              paddingLeft: "10px",
              color: "white"
            }}
            key="message"
          >
            {this.showMessage()}
          </div>
          {this.props.data.buttons ? (
            this.props.data.buttons.map((b, i) => (
              <RaisedButton
                key={i}
                label={b}
                onClick={() => this.onclick(b)}
                labelColor="#FFFFFF"
                buttonStyle={{
                  borderRadius: "4px",
                  backgroundColor: "#f58c32"
                }}
                style={{ backgroundColor: "none", margin: "5px" }}
              />
            ))
          ) : null}
        </div>
      </div>
    );
  }
}

export default Toast;
