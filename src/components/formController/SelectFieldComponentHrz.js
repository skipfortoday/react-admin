import React from "react";
import { Row, Col, Label, Input } from "reactstrap"
import Select from 'react-select'
export const SelectFieldComponentHrz = ({
    input,
    name,
    id,
    type,
    placeholder,
    label,
    disabled,
    options,
    readOnly,
    isDisabled,
    labelAlign,
    meta: { touched, error, warning },
}) => (
    <Row>
        <Label md="4" htmlFor="{input}" 
            className={"col-form-label " + labelAlign ? labelAlign : "text-right"} >
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
                value={input.value}
                isDisabled={isDisabled}
                onChange={(value) => input.onChange(value)}
            //onBlur={() => input.onBlur()}
            />
            {touched &&
                ((error && <p style={{ color: "brown" }}>{error}</p>) ||
                    (warning && <p style={{ color: "brown" }}>{warning}</p>))}
        </Col>
    </Row>
);