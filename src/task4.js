import React from "react";
import { Col, Container, Row, Form } from "react-bootstrap";
import { Input } from "./Input";
import { UserForm } from "./UserForm";
let StateContext = React.createContext();

function connect(Component) {
  return class extends React.Component {
    render() {
      return (
          <StateContext.Consumer>
            {({state, setState}) => (
               <Component state={state} setState={ (newState) => setState(newState)} />
                )}
          </StateContext.Consumer>
          );
    }
  };
}

const ConnectedInput = connect(({ state, setState }) => (
  <Input
    defaultValue={state.input}
    onChange={value => setState({ input: value })}
  />
));

const ConnecetedUserForm = connect(({ state, setState }) => (
  <UserForm user={state.user} onSave={user => setState({ user })} />
));

class AppWithGlobalState extends React.Component {
  // единственное на все приложение состояние
  state = {
    input: "input text",
    user: {
      firstName: "Bill",
      lastName: "Smith",
      login: "billsmith"
    }
  };
  render() {
    return (
      <StateContext.Provider value={{
        state: this.state,
        setState: (state) => {
          this.setState(state);
        }
      }}>
        <Container>
          <Row>
            <Col>
                <ConnectedInput />
            </Col>
            <Col>
                <ConnecetedUserForm />
            </Col>
          </Row>
          <Row>
            <Form>
              <Form.Text>Глобальное состояние приложения</Form.Text>
              <Form.Group>
                <Form.Label>state.input</Form.Label>
                <Form.Control disabled type="text" value={this.state.input} />
              </Form.Group>
              <Form.Group>
                <Form.Label>state.user.firstName</Form.Label>
                <Form.Control
                  disabled
                  type="text"
                  value={this.state.user.firstName}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>state.user.lastName</Form.Label>
                <Form.Control
                  disabled
                  type="text"
                  value={this.state.user.lastName}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>state.user.login</Form.Label>
                <Form.Control
                  disabled
                  type="text"
                  value={this.state.user.login}
                />
              </Form.Group>
            </Form>
          </Row>
        </Container>
      </StateContext.Provider>
    );
  }
}

export const Task4 = () => <AppWithGlobalState />;

Task4.title = "4.Context + HoC. Глобальное состояние.";
