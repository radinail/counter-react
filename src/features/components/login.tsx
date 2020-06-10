import React, { useState, useContext } from "react";
import Joi from "joi";
import { RouteComponentProps } from "react-router-dom";
import jwtDecode from "jwt-decode";

import { UserContext } from "../../context/user";

import { login } from "../../api/users";

export type FieldValue = {
  username: string;
  password: string;
};

export type Field = keyof FieldValue;

export const Login = ({ history, location }: RouteComponentProps) => {
  //const userName: React.RefObject<HTMLInputElement> = React.createRef();
  const [account, setAccount] = useState({
    username: "",
    password: ""
  } as FieldValue);
  const [errors, setErrors] = useState({
    username: "",
    password: ""
  } as FieldValue);

  const userContext = useContext(UserContext);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    validate(account);

    const credentials = {
      email: account.username,
      password: account.password
    };

    const token = await login(credentials);
    if (token) {
      const decoded = jwtDecode(token);
      userContext.setUser(decoded);
      console.log('location = ', location);
      if (location.state) history.push(location.state.from);
      else {
        history.push("/");
      }
    }
  };

  const handleChange = (field: Field, value: string) => {
    const newAccount = { ...account };
    newAccount[field] = value;
    validateProperty(field, newAccount);
    setAccount(newAccount);
  };

  const validateProperty = (field: Field, account: FieldValue) => {
    const { error } = Joi.validate(
      { [field]: account[field] },
      { [field]: schema[field] }
    );

    if (error) setErrors({ ...errors, [field]: error.details[0].message });
    if (!error) {
      delete errors[field];
    }
  };

  const schema = {
    username: Joi.string()
      .email()
      .required(),
    password: Joi.string().required()
  };

  const validate = (account: FieldValue) => {
    const validationError = {} as FieldValue;
    const { error } = Joi.validate(account, schema, {
      abortEarly: false
    });
    if (error)
      error.details.map(d => (validationError[d.path[0] as Field] = d.message));
    setErrors(validationError);
  };

  return (
    <form
      style={{ width: "500px", marginLeft: "20px" }}
      onSubmit={handleSubmit}
    >
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          // ref={userName}
          type="text"
          className="form-control"
          id="username"
          value={account.username}
          onChange={e => handleChange("username", e.target.value)}
        />
        {errors.username && (
          <div className="alert alert-danger">{errors.username}</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={account.password}
          onChange={e => handleChange("password", e.target.value)}
        />
        {errors.password && (
          <div className="alert alert-danger">{errors.password}</div>
        )}
      </div>

      <button
        className="btn btn-primary"
        disabled={Object.keys(errors).length !== 0}
      >
        Login
      </button>
    </form>
  );
};
