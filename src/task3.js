import React from "react";
import PropTypes from "prop-types";
import { Button, Form, DropdownButton, Dropdown, Col } from "react-bootstrap";
const LanguagesContext = React.createContext();

const dictionaries = {
  en: {
    Cancel: "Cancel",
    Save: "Save",
    Clear: "Clear"
  },
  de: {
    Cancel: "Stornieren",
    Save: "Sparen"
  },
  ru: {
    Cancel: "Отмена",
    Save: "Сохранить",
    Clear: "Очистить"
  }
};

const languages = ["EN", "DE", "RU"];

const LocalizedText = ({children}) => {
  LocalizedText.propTypes = {
    children: PropTypes.string.isRequired
  };
  const languageEN = 'EN';

  return (
      <LanguagesContext.Consumer >
        {(languages) => {
          let buttonTextLanguages = dictionaries[languages.toLowerCase()][children];
          if (!buttonTextLanguages) {
            buttonTextLanguages = dictionaries[languageEN.toLowerCase()][children];
          }
          return buttonTextLanguages;
        }}
      </LanguagesContext.Consumer>
  )
};

class UserForm extends React.Component {
  state = {
    value: ""
  };

  render() {
    return (
      <Form>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={this.state.value}
            onChange={e => this.setState({ value: e.target.value })}
          />
        </Form.Group>
        <Form.Group>
          <Button variant="primary">
            <LocalizedText>Save</LocalizedText>
          </Button>
          <Button variant="danger">
            <LocalizedText>Cancel</LocalizedText>
          </Button>
          <Button variant="warning">
            <LocalizedText>Clear</LocalizedText>
          </Button>
        </Form.Group>
      </Form>
    );
  }
}

const LanguageSelector = ({ languages, currentLanguage, onChange }) => (
  <DropdownButton
    variant="primary"
    title={currentLanguage}
    onChange={console.log}
  >
    {languages.map(language => (
      <Dropdown.Item
        key={language}
        eventKey={language}
        active={language === currentLanguage}
        onSelect={onChange}
      >
        {language}
      </Dropdown.Item>
    ))}
  </DropdownButton>
);

class LocalizedApp extends React.Component {
  state = {
    language: "RU"
  };

  render() {
    return (
        <LanguagesContext.Provider value={this.state.language} >
          <Col>
            <LanguageSelector
              languages={languages}
              currentLanguage={this.state.language}
              onChange={language => this.setState({ language })}
            />
          </Col>
          <Col>
            <UserForm />
          </Col>
        </LanguagesContext.Provider>
    );
  }
}

export const Task3 = () => <LocalizedApp />;
Task3.title = "3. Context. Локализация.";
Task3.description = "Текст на кнопках должен меняться со сменой языка.";
