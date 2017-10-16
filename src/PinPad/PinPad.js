import React, { Component } from "react";
import "./pinpad.css";

class PinPad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      limit: 4
    };
    this.addNumber = this.addNumber.bind(this);
    this.clearForm = this.clearForm.bind(this);
  }

  addNumber(event) {
    this.setState({
      value: this.state.value
        ? this.state.value.concat(event.target.value)
        : event.target.value
    });
    if (this.state.limit === this.state.value.length + 1) {
      const s = String(this.state.value.concat(event.target.value));
      this.submitForm(s);
    }
  }
  clearForm(e) {
    this.setState({ value: "" });
  }
  enter() {}
  submitForm(v) {
    this.props.onsubmit(v);
    this.clearForm();
  }
  createKeyPad() {
    return <div>{this.createRowKeyPad([1, 2, 3, 4, 5, 6, 7, 8, 9])}</div>;
  }
  createRowKeyPad(args) {
    return (
      <div>
        {args.map(x => this.createInput(x))}
        <br />
      </div>
    );
  }
  createInput(n) {
    return (
      <input
        key={n}
        type="button"
        className="PINbutton"
        name={n}
        value={n}
        id={n}
        onClick={this.addNumber}
      />
    );
  }
  render() {
    return (
      <div name="PINform" id="PINform">
        <input
          id="PINbox"
          type="password"
          value={this.state.value}
          name="PINbox"
          disabled
        />
        {this.createKeyPad()}
        <input
          type="button"
          className="PINbutton clear"
          name="-"
          value="clear"
          id="-"
          onClick={this.clearForm}
        />
        {this.createInput(0)}
      </div>
    );
  }
}

export default PinPad;
