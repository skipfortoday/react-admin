import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { FormGroup, Col, Label, Input, Row, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import AbsensiManualValidation from "../validations/AbsensiManualValidation";
import Select from 'react-select';


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
        ((error && <p style={{ color: "brown" }}>{error}</p>) ||
          (warning && <p style={{ color: "brown" }}>{warning}</p>))}
    </Col>
  </Row>
);

const renderField2 = ({
  input,
  name,
  id,
  type,
  placeholder,
  label,
  disabled,
  options,
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
      
      <Select
        {...Input}
        id={id} 
        name={name} 
        type={type}
        placeholder="Pilih Nama"
        disabled={disabled}
        readOnly={readOnly}
        options={options}
        value={input.value}
        onChange={(value) => input.onChange(value)}
        // onBlur={() => input.onBlur()}
      />
      {touched &&
        ((error && <p style={{ color: "red" }}>{error}</p>) ||
          (warning && <p style={{ color: "brown" }}>{warning}</p>))}
    </Col>
  </Row>
);

const mapStateToProps = (state) => {

  //console.log(optsiterpilih);
  return {
    getOptUserManualPulang: state.Opt.getOptUserManualPulang,
  };
};

//let  options = [{ value: 'one', label: 'One' }, { value: 'two', label: 'Two' }];


class FormAbsensiManual2 extends Component {
  render() {
    
    return (
      <form onSubmit={this.props.handleSubmit}>
   
        <FormGroup row>
          <Col md={5}>
            <FormGroup>
              <Field
                type="text"
                name="Nama"
                component={renderField2}
                options={this.props.getOptUserManualPulang}
                label="Nama:"
              />
            </FormGroup>
          </Col>

          <Col md={3}>
            <FormGroup>
              <Field
                type="text"
                name="Keterangan"
                component={renderField}
                label="Keterangan :"
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

FormAbsensiManual2 = reduxForm({
  form: "FormAbsensiManual2",
  validate: AbsensiManualValidation,
  enableReinitialize: true,
})(FormAbsensiManual2);
export default connect(mapStateToProps, null)(FormAbsensiManual2);
