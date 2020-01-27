import React, { useState } from "react";
import Joi from "joi";

import { validate, validateProperty } from "./../utils/validate";
import { register } from "../../api/users";

import { Input } from "./input";

type User = {
  username: string;
  password: string;
  name: string;
};

type Field = keyof User;

type Error = User;

const schema = {
  username: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .required()
    .min(5),
  name: Joi.string().required()
};

const registerUser = async (user: User) => {
  const newUser = {
    email: user.username,
    password: user.password,
    name: user.name
  };

  await register(newUser);
};

export const RegisterForm = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    name: ""
  } as User);

  const [error, setError] = useState({
    username: "",
    password: "",
    name: ""
  } as Error);

  const handleChange = (field: Field, value: string) => {
    const newUser = { ...user };
    newUser[field] = value;
    setUser(newUser);

    const fieldError = validateProperty(field, newUser, schema);

    if (fieldError)
      setError({ ...error, [field]: fieldError.details[0].message });
    if (!fieldError) {
      delete error[field];
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const error = validate<User, Error>(user, schema);
    setError(error);

    await registerUser(user);
  };

  return (
    <>
      <h1>Register</h1>

      <form
        style={{ width: "500px", marginLeft: "20px" }}
        onSubmit={handleSubmit}
      >
        <Input
          value={user.username}
          handleChange={handleChange}
          label="Username"
          name="username"
          error={error.username}
        />

        <Input
          value={user.password}
          handleChange={handleChange}
          type="password"
          label="Password"
          name="password"
          error={error.password}
        />

        <Input
          value={user.name}
          handleChange={handleChange}
          label="Name"
          name="name"
          error={error.name}
        />

        <button
          className="btn btn-primary"
          disabled={Object.keys(error).length != 0}
        >
          Save
        </button>
      </form>
    </>
  );
};
