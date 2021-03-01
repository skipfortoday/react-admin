import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { FormGroup, Col, Label, Input, Row, Button } from "reactstrap";
import AdminValidation from "../validations/AdminValidation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";


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
        ((error && <p style={{ color: "yellow" }}>{error}</p>) ||
          (warning && <p style={{ color: "brown" }}>{warning}</p>))}
    </Col>
  </Row>
);

const mapStateToProps = (state) => {

  //console.log(optsiterpilih);
  return {
    getOptUser : state.Opt.getOptUser,
    initialValues: {
      AdminID: state.Admin.getAdminDetail.AdminID,
      TanggalCreate: state.Admin.getAdminDetail.TanggalCreate,
      Password: state.Admin.getAdminDetail.Password
    },
  };
};

//let  options = [{ value: 'one', label: 'One' }, { value: 'two', label: 'Two' }];


class FormAdminComponent extends Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
   
        <FormGroup row>
          <Col md={3}>
            <FormGroup>
              <Field
                type="text"
                name="AdminID"
                component={renderField}
                label="Admin ID :"
              />
            </FormGroup>
          </Col>

          <Col md={3}>
            <FormGroup>
              <Field
                type="password"
                name="Password"
                component={renderField}
                label="Password :"
              />
            </FormGroup>
          </Col>

          <Col md={3}>
            <FormGroup>
              <Field
                type="date"
                name="TanggalCreate"
                component={renderField}
                disabled
                label="Tanggal Create :"
              />
            </FormGroup>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="12">
            <FormGroup>
              <Button
                color="dark"
                type="submit"
                disabled={this.props.submitting}
              >
                <FontAwesomeIcon icon={faSave} /> SIMPAN
              </Button>
            </FormGroup>
          </Col>
        </FormGroup>
      </form>
    );
  }
}

FormAdminComponent = reduxForm({
  form: "formCreateAdmin",
  validate: AdminValidation,
  enableReinitialize: true,
})(FormAdminComponent);
export default connect(mapStateToProps, null)(FormAdminComponent);
