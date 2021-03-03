import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { FormGroup, Col, Label, Input, Row, Button } from "reactstrap";
import IzinValidation from "../validations/IzinValidation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
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
        <option value=""></option>
        <option value="OFF">OFF</option>
        <option value="CUTI">CUTI</option>
        <option value="TIDAK MASUK">IZIN TIDAK MASUK</option>
        <option value="SAKIT">SAKIT</option>
        <option value="DINAS LUAR">DINAS LUAR</option>
        <option value="CUTI BERSAMA">CUTI BERSAMA</option>
        <option value="CUTI KHUSUS">CUTI KHUSUS</option>
        <option value="LIBUR">LIBUR</option>
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
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        options={options}
        isMulti
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
  return {
    getOptUser : state.Opt.getOptUser,
    initialValues: {
      Nama: state.Opt.getOptUser,
    },
  };
};

class FormIzinGroup extends Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <FormGroup row>



        

          <Col md={12}>
            <FormGroup>
              <Field
                name="Nama"
                disabled
                component={renderField2}
                label="Nama:"
                options={this.props.getOptUser}
              />
            </FormGroup>
          </Col>

          <Col md={3}>
            <FormGroup>
              <Field
                type="date"
                name="TanggalScan"
                component={renderField}
                label="Tanggal:"
              />
            </FormGroup>
          </Col>

          <Col md={3}>
            <FormGroup>
              <Field
                type="select"
                name="Status"
                component={renderField}
                label="Tipe  :"
              />
            </FormGroup>
          </Col>

          <Col md={5}>
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
            <Label> Kirim </Label>
              <Button
                color="dark"
                type="submit"
                disabled={this.props.submitting} 
              >
                <FontAwesomeIcon icon={faPaperPlane} /> 
              </Button>
            </FormGroup>

            </Col>
        </FormGroup>
      </form>
    );
  }
}

FormIzinGroup = reduxForm({
  form: "formCreateizin",
  validate: IzinValidation,
  enableReinitialize: true,
})(FormIzinGroup);
export default connect(mapStateToProps, null)(FormIzinGroup);
