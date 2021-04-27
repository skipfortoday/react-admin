import React from "react";
import { Row, Col, Label, Input } from "reactstrap"

export const InputFieldComponentHrz = ({
    input,
    type,
    placeholder,
    label,
    disabled,
    readOnly,
    meta: { touched, error, warning },
}) => (
    <Row>
        <Label md="4" htmlFor="{input}" className="col-form-label text-right">
            {label}
        </Label>
        <Col md="8">
            <Input
                {...input}
                type={type}
                placeholder={placeholder}
                disabled={disabled}
                readOnly={readOnly}
            >
            </Input>

            {touched &&
                ((error && <p style={{ color: "brown" }}>{error}</p>) ||
                    (warning && <p style={{ color: "brown" }}>{warning}</p>))}
        </Col>
    </Row>
);