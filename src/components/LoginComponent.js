import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { FormGroup, Col, Label, Row, Button, } from "reactstrap";
import LoginValidation from "../validations/LoginValidation";
import '../containers/LoginStyle.css';
import { Link } from "react-router-dom";

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
      <input
        {...input}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}

      ></input>
      {touched &&
        ((error && <p style={{ color: "brown" }}>{error}</p>) ||
          (warning && <p style={{ color: "brown" }}>{warning}</p>))}
    </Col>
  </Row>
);

const mapStateToProps = (state) => {

  //console.log(optsiterpilih);
  return {
    initialValues: {
      AdminID: state.Login.postLoginUser,
      Password: state.Login.postLoginUser,
    },
  };
};


class LoginComponent extends Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit} className="formLogin">
        <FormGroup row>
          <Col md={12}>
            <FormGroup>
              <Field
                type="text"
                name="AdminID"
                component={renderField}
                label="Username"
              />
            </FormGroup>
          </Col>

          <Col md={12}>
            <FormGroup>
              <Field
                type="Password"
                name="Password"
                component={renderField}
                label="Password"
              />
            </FormGroup>
          </Col>
          <Col md="12" className="cas">
            <div class="custom-control custom-switch rememberMe">
              <input type="checkbox" class="custom-control-input" id="customSwitch1" />
              <label class="custom-control-label" for="customSwitch1">Remember me</label>
            </div>
            <Link to={"/home"} className="forgotPassword">Kembali Ke Dashboard</Link>
          </Col>
          <Col md={12}>
            <Label></Label>
            <Button
              className="buttonLogin btn-block"
              type="submit"
              disabled={this.props.submitting}
            >
              Login
              </Button>
          </Col>
          
        </FormGroup>
      </form>
    );
  }
}

LoginComponent = reduxForm({
  form: "formLogin",
  validate: LoginValidation,
  enableReinitialize: true,
})(LoginComponent);
export default connect(mapStateToProps, null)(LoginComponent);