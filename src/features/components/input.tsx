import React from "react";

type InputProps = {
  value: any;
  handleChange: (name: any, value: any) => void;
  name: string;
  label: string;
  error?: string;
  type?: string;
};

export const Input = ({
  value,
  handleChange,
  name,
  label,
  error,
  type = "text"
}: InputProps) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        className="form-control"
        id={name}
        value={value}
        onChange={e => handleChange(name, e.target.value)}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};
