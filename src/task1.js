import React from "react";
import { Col, Form } from "react-bootstrap";
import { Input } from "./Input";
import { UserForm } from "./UserForm";

//----- render-prop function -------
const ComponentWithLocalStorage = ({ children }) => (
    children({ saveToLocalStorage, loadFromLocalStorage }
    )
);

function saveToLocalStorage(storageKey, storageValue) {
  localStorage.setItem(storageKey, JSON.stringify(storageValue));
}
function loadFromLocalStorage(storageKey) {
    return JSON.parse(localStorage.getItem(storageKey)) || null;
}

export const Task1 = () => (
  <>
    <Col>
      <Form>
        <Form.Label>Input with value from localStorage</Form.Label>
        <ComponentWithLocalStorage>
          {({ saveToLocalStorage, loadFromLocalStorage }) => (
            <Input
              // загружаем начально значение из localStorage
              defaultValue={loadFromLocalStorage("input-value")}
              // сохраняем в localStorage при изменении значения в input'e
              onChange={value => saveToLocalStorage("input-value", value)}
            />
          )}
        </ComponentWithLocalStorage>
      </Form>
    </Col>
    <Col>
      <ComponentWithLocalStorage>
        {({ saveToLocalStorage, loadFromLocalStorage }) => (
          <UserForm
            // загружаем пользователя из localStorage
            user={loadFromLocalStorage("user")}
            // по нажатию на Save сохраняем пользователя в localStorage
            onSave={user => saveToLocalStorage("user", user)}
          />
        )}
      </ComponentWithLocalStorage>
    </Col>
  </>
);

Task1.title = "1. Render prop. LocalStorage";
