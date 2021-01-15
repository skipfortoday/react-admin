import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { FormGroup, Col, Label, Input, Row, Button } from "reactstrap";
import GroupValidation from "../validations/GroupValidation";

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
        ((error && <p style={{ color: "red" }}>{error}</p>) ||
          (warning && <p style={{ color: "brown" }}>{warning}</p>))}
    </Col>
  </Row>
);

const mapStateToProps = (state) => {
  return {
    initialValues : {
      GroupID : state.Group.getGroupDetail.GroupID,
      Jabatan : state.Group.getGroupDetail.Jabatan,
      JamDatang : state.Group.getGroupDetail.JamDatang,
      JamPulang : state.Group.getGroupDetail.JamPulang,
      MaxJamDatang : state.Group.getGroupDetail.MaxJamDatang,
      MinJamLembur : state.Group.getGroupDetail.MinJamLembur,
    }
  };
};

class FormGroupComponent extends Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <FormGroup row>
          <Col md={6}>
            <FormGroup>
              <Field
                type="text"
                name="GroupID"
                component={renderField}
                label="Group ID :"
              />
            </FormGroup>
          </Col>

          <Col md={6}>
            <FormGroup>
              <Field
                type="text"
                name="Jabatan"
                component={renderField}
                label="Nama Group :"
              />
            </FormGroup>
          </Col>

          <Col md={6}>
            <FormGroup>
              <Field
                type="text"
                name="JamDatang"
                component={renderField}
                label="JamDatang :"
              />
            </FormGroup>
          </Col>

          <Col md={6}>
            <FormGroup>
              <Field
                type="text"
                name="JamPulang"
                component={renderField}
                label="JamPulang :"
              />
            </FormGroup>
          </Col>

          <Col md={6}>
            <FormGroup>
              <Field
                type="text"
                name="MaxJamDatang"
                component={renderField}
                label="Max Jam Lembur :"
              />
            </FormGroup>
          </Col>

          <Col md={6}>
            <FormGroup>
              <Field
                type="text"
                name="MaxJamLembur"
                component={renderField}
                label="Max Jam Lembur :"
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
                Submit
              </Button>
            </FormGroup>
          </Col>
        </FormGroup>
      </form>
    );
  }
}

FormGroupComponent = reduxForm({
  form: "formCreateGroup",
  validate: GroupValidation,
  enableReinitialize: true,
})(FormGroupComponent);
export default connect(mapStateToProps, null)(FormGroupComponent);
