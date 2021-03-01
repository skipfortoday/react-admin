import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { FormGroup, Col, Label, Input, Row, Button ,Card, CardTitle, CardText  } from "reactstrap";
import LoginValidation from "../validations/LoginValidation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";

 
const renderField = ({
  input,
  type,
  placeholder,
  label,
  disabled,
  readOnly,
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
        {...input}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        
      ></Input>
      {touched &&
        ((error && <p style={{ color: "#fafa00" }}>{error}</p>) ||
          (warning && <p style={{ color: "brown" }}>{warning}</p>))}
    </Col>
  </Row>
);

const mapStateToProps = (state) => {

  //console.log(optsiterpilih);
  return {
    initialValues: {
      AdminID : state.Login.postLoginUser,
      Password: state.Login.postLoginUser,
    },
  };
};


class LoginComponent extends Component {
  render() {
    return (
        
      <Card body inverse color="dark">
        <CardTitle tag="h5">Login Lviors Absensi</CardTitle> 
      <form onSubmit={this.props.handleSubmit}>
        <FormGroup row>
          <Col md={5}>
            <FormGroup>
              <Field
                type="text"
                name="AdminID"
                component={renderField}
                label="Username :"
              />
            </FormGroup>
          </Col>

          <Col md={5}>
            <FormGroup>
              <Field
                type="Password"
                name="Password"
                component={renderField}
                label="Password :"
              />
            </FormGroup>
         
          </Col>

          <Col md={1}>
            <Label></Label>
          <Button
                color="warning"
                type="submit"
                disabled={this.props.submitting}
              >
                <FontAwesomeIcon icon={faSignInAlt} /> Login
              </Button>
          </Col>
        </FormGroup>
      </form>
      </Card>
    );
  }
}

LoginComponent = reduxForm({
  form: "formLogin",
  validate: LoginValidation,
  enableReinitialize: true,
})(LoginComponent);
export default connect(mapStateToProps, null)(LoginComponent);