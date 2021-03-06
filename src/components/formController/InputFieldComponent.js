import React from "react";
import {Row, Col, Label, Input} from "reactstrap"
export const InputFieldComponent = ({
    input,
    name,
    id,
    type,
    placeholder,
    label,
    disabled,
    options,
    readOnly,
    hh,
    meta: { touched, error, warning },
}) => (
    <Row>
        <Col md="12">
            <Label htmlFor="{input}" className="col-form-label">
                {label}
            </Label>
        </Col>
        <Col md="12">
            <Input
                {...Input}
                id={id}
                name={name}
                type={type}
                placeholder={placeholder}
                disabled={disabled}
                readOnly={readOnly}
                options={options}
                value={input.value}
                onChange={(value) => input.onChange(value)}
                style={{height:hh}}
            >

            </Input>
            {touched &&
                ((error && <p style={{ color: "brown" }}>{error}</p>) ||
                    (warning && <p style={{ color: "brown" }}>{warning}</p>))}
        </Col>
    </Row>
);