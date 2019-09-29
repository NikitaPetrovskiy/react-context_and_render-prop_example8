import React from "react";
import { Form } from "react-bootstrap";

export class Input extends React.Component {
  state = {
    value: this.props.defaultValue || ""
  };

  render() {
    return (
      <Form.Control
        type="text"
        value={this.state.value}
        onChange={e => {
          const value = e.target.value;
          this.setState(
            { value },
            () => this.props.onChange(value)
          );
        }}
      />
    );
  }
}
