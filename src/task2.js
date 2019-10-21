import React from "react";
import { Col, Form } from "react-bootstrap";

const isPlainObject = (obj) => {
    return Object.prototype.toString.call(obj) === '[object Object]';
};

class State extends React.Component {
    constructor(props) {
        super(props);
        this.state = !this.props.initialState ? {} :
            isPlainObject(this.props.initialState) ?
                this.props.initialState : { value: this.props.initialState };
    }

    render() {
    return this.props.children({
        state: {
            value: this.state.value
        },
        setState: (value) => {
            this.setState(value);
        }
    });
  }
}

const StatelessInput = ({ value = "", onChange }) => (
  <Form.Control
    type="text"
    value={value}
    onChange={e => onChange(e.target.value)}
  />
);

const SettingsForm = ({
  isNotificationEnabled = false,
  isOnlineStatusVisible = false,
  onNotificationSettingChanged,
  onOnlineStatusSettingChanged
}) => (
  <Form>
    <Form.Group>
      <Form.Label>Нотификаии включены</Form.Label>
      <Form.Check
        value={isNotificationEnabled}
        onChange={e => onNotificationSettingChanged(e.target.checked)}
      />
    </Form.Group>
    <Form.Group>
      <Form.Label>Другие пользователи видят, что вы в сети</Form.Label>
      <Form.Check
        value={isOnlineStatusVisible}
        onChange={e => onOnlineStatusSettingChanged(e.target.checked)}
      />
    </Form.Group>
  </Form>
);

export const Task2 = () => (
  <>
    <Col>
      <Form>
        <Form.Group>
          <Form.Label>Input без состояния</Form.Label>
          <State initialState="type something here...">
            {({ state, setState }) => {
              console.log("input state", state);
              return (
                <StatelessInput
                  value={state.value}
                  onChange={value => setState({ value })}
                />
              );
            }}
          </State>
        </Form.Group>
      </Form>
    </Col>
    <Col>
      <State
        initialState={{
          isNotificationEnabled: true,
          isOnlineStatusVisible: true
        }}
      >
        {({ state, setState }) => {
          console.log("settings form state", state);
          return (
            <SettingsForm
              {...state}
              onNotificationSettingChanged={value =>
                setState({ isNotificationEnabled: value })
              }
              onOnlineStatusSettingChanged={value =>
                setState({ isOnlineStatusVisible: value })
              }
            />
          );
        }}
      </State>
    </Col>
  </>
);

Task2.title = "2. Render prop. State";
