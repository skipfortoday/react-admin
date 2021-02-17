import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { FormGroup, Col, Label, Input, Row, Button } from "reactstrap";
import Select from 'react-select'
import CabangValidation from "../validations/CabangValidation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { getOptUser } from "../actions/optAction";




//let options = this.state.cities.map(function (city) {
  //return { value: city.countryCode, label: city.name };
//} )
 
const renderField = ({
  input,
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
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        options={options}
        value={input.value}
         onChange={(value) => input.onChange(value)}
         //onBlur={() => input.onBlur()}
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
    getOptUser : state.Opt.getOptUser,
    initialValues: {
      KodeCabang: state.Cabang.getCabangDetail.KodeCabang,
      NamaCabang: state.Cabang.getCabangDetail.NamaCabang,
      Alamat: state.Cabang.getCabangDetail.Alamat,
      NoTelp: state.Cabang.getCabangDetail.NoTelp,
      GeneralManagerID: state.Cabang.getCabangDetail.GeneralManagerID,
      hrdID: state.Cabang.getCabangDetail.hrdID,
    },
  };
};

//let  options = [{ value: 'one', label: 'One' }, { value: 'two', label: 'Two' }];


class FormCabangComponent extends Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <FormGroup row>
          <Col md={2}>
            <FormGroup>
              <Field
                type="text"
                name="KodeCabang"
                component={renderField}
                label="Kode Cabang :"
              />
            </FormGroup>
          </Col>

          <Col md={3}>
            <FormGroup>
              <Field
                type="text"
                name="NamaCabang"
                component={renderField}
                label="Nama Cabang :"
              />
            </FormGroup>
          </Col>

          <Col md={4}>
            <FormGroup>
              <Field
                type="text"
                name="Alamat"
                component={renderField}
                label="Alamat Cabang :"
              />
            </FormGroup>
          </Col>

          <Col md={2}>
            <FormGroup>
              <Field
                type="text"
                name="NoTelp"
                component={renderField}
                label="Nomor Telepon :"
              />
            </FormGroup>
          </Col>

          <Col md={2}>
            <FormGroup>
              <Field
                type="text"
                name="GeneralManagerID"
                component={renderField}
                label="General Manager :"
              />
            </FormGroup>
          </Col>

          <Col md={2}>
            <FormGroup>
            <Field
                name="hrdID"
                component={renderField2}
                label="HRD ID :"
                options={this.props.getOptUser}
              />
            </FormGroup>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="12">
            <FormGroup>
              <Button
                color="primary"
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

FormCabangComponent = reduxForm({
  form: "formCreateCabang",
  validate: CabangValidation,
  enableReinitialize: true,
})(FormCabangComponent);
export default connect(mapStateToProps, null)(FormCabangComponent);
