import React from "react";
import {Col, Label, Input} from "reactstrap"
export const CheckboxFieldComponent = ({
    input, name, id, type, label, checked, value,
    meta: { touched, error, warning },
  
  }) => (
    <Col md="12">
      <Label htmlFor="{input}" className="col-form-label">
        <Input
          {...input}
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={(value) => input.onChange(value)} />
        {label}
      </Label>
      {touched &&
        ((error && <p style={{ color: "yellow" }}>{error}</p>) ||
          (warning && <p style={{ color: "brown" }}>{warning}</p>))}
    </Col>
  );