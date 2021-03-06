import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { FormGroup, Col, Label, Input, Row, Button } from "reactstrap";
import CabangValidation from "../validations/CabangValidation";
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
      
      >
           <option value ="">-</option>
        <option value ="1">Shift 1</option>
        <option value = "2">Shift 2</option>
        <option value = "3">Shift 3</option>
      </Input>
   
      {touched &&
        ((error && <p style={{ color: "yellow" }}>{error}</p>) ||
          (warning && <p style={{ color: "brown" }}>{warning}</p>))}
    </Col>
  </Row>
);

const mapStateToProps = (state) => {

  //console.log(optsiterpilih);
  return {
    initialValues: {
      GroupID: state.Group.getGroupDetail.GroupID,
      Jabatan: state.Group.getGroupDetail.Jabatan,
      Shift: state.TerlambatBertingkat.getTerlambatBertingkatDetail2.Shift,
      MaxJamDatang: state.TerlambatBertingkat.getTerlambatBertingkatDetail2.MaxJamDatang,
      RpPotonganTerlambat: state.TerlambatBertingkat.getTerlambatBertingkatDetail2.RpPotonganTerlambat,

    },
  };
};

//let  options = [{ value: 'one', label: 'One' }, { value: 'two', label: 'Two' }];


class FormTTComponent extends Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
   
        <FormGroup row>
          <Col md={1}>
            <FormGroup>
              <Field
                type="text"
                name="GroupID"
                component={renderField}
                label="GroupID:"
                disabled
              />
            </FormGroup>
          </Col>

          <Col md={3}>
            <FormGroup>
              <Field
                type="text"
                name="Jabatan"
                component={renderField}
                label="Jabatan :"
                disabled
              />
            </FormGroup>
          </Col>

          <Col md={2}>
            <FormGroup>
              <Field
                type="select"
                name="Shift"
                component={renderField}
                label="Shift :"
              />
            </FormGroup>
          </Col>

          <Col md={2}>
            <FormGroup>
              <Field
                type="time"
                name="MaxJamDatang"
                component={renderField}
                label="Max Jam Datang :"
              />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Field
                type="number"
                name="RpPotonganTerlambat"
                component={renderField}
                label="Rp Potongan :"
              />
            </FormGroup>
          </Col>
          <Col md={1}>
            <FormGroup>
              <Label>.</Label>
            <Button
                color="dark"
                type="submit"
                disabled={this.props.submitting}
              > <FontAwesomeIcon icon={faSave} /> SIMPAN
              </Button>
            </FormGroup>
          </Col>
        </FormGroup>
      </form>
    );
  }
}

FormTTComponent = reduxForm({
  form: "FormTTComponent",
  validate: CabangValidation,
  enableReinitialize: true,
})(FormTTComponent);
export default connect(mapStateToProps, null)(FormTTComponent);
