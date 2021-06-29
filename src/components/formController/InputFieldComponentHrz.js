import { faTimes, faUndoAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Row, Col, Label, Input, Button } from "reactstrap"

export const InputFieldComponentHrz = ({
    input,
    type,
    placeholder,
    label,
    disabled,
    readOnly,
    hh,
    meta: { touched, error, warning },
}) => (
    <Row style={{border:"0px solid #f00"}}>
        <Label md="4" htmlFor="{input}" className="col-form-label text-right">
            {label}
        </Label>
        <Col md="8" style={type=='date' ? colDateStyle : {}}>
            <Input
                {...input}
                type={type}
                placeholder={placeholder}
                disabled={disabled}
                readOnly={readOnly}
                style={{height:hh}}
            >
            </Input>

            {touched &&
                ((error && <p style={{ color: "brown" }}>{error}</p>) ||
                    (warning && <p style={{ color: "brown" }}>{warning}</p>))}
            {/* {type == 'date' ? (
                <Button
                    type="button"
                    color="danger"
                    size="md"
                >
                    <FontAwesomeIcon 
                        style={{color:"#FFF"}}
                        icon={faTimes}/>
                </Button>
            ) : ""} */}
        </Col>
       
    </Row>
);

const colDateStyle = {
    // paddingRight:"50px"
  };