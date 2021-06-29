import React from "react";
import {Col, Row, Label, Input} from "reactstrap"
export const CheckboxFieldComponentHrz = ({
    input, name, id, type, label, checked, value,
    meta: { touched, error, warning },
  
  }) => (
      <Row>

    <Col md="12">
      <Label htmlFor="{input}" className="col-form-label" style={{display:"block"}}>
        {label}
        <Input style={{marginLeft:"10px"}}
          {...input}
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={(value) => input.onChange(value)} />
      </Label>
      {touched &&
        ((error && <p style={{ color: "yellow" }}>{error}</p>) ||
          (warning && <p style={{ color: "brown" }}>{warning}</p>))}
    </Col>
      </Row>
  );