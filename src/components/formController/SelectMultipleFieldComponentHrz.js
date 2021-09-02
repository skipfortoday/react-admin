import React from "react";
import {Row, Col, Label, Input} from "reactstrap"
import Select from 'react-select'

export const SelectMultipleFieldComponentHrz = ({
    input,
    name,
    id,
    type,
    placeholder,
    label,
    disabled,
    isDisabled,
    options,
    readOnly,
    meta: { touched, error, warning },
  }) => (
    <Row>
      <Label md="4" htmlFor="{input}" className="col-form-label text-right">
        {label}
      </Label>
      <Col md="8">
        
        <Select
          {...Input}
          id={id} 
          name={name} 
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          options={options}
          isMulti
          value={input.value}
          isDisabled={isDisabled}
          onChange={(value) => input.onChange(value)}
           //onBlur={() => input.onBlur()}
        />
        {touched &&
          ((error && <p style={{ color: "red" }}>{error}</p>) ||
            (warning && <p style={{ color: "brown" }}>{warning}</p>))}
      </Col>
    </Row>
  );