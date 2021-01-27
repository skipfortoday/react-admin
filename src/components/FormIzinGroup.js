import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { FormGroup, Col, Label, Input, Row, Button, Alert } from "reactstrap";
import IzinValidation from "../validations/IzinValidation";
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
        <option value="ACC">Acounting</option>
        <option value="TER">Terapis</option>
        <option value="DOC">Dokter</option>
        <option value="RES">Resepsionis</option>
      </Input>
      {touched &&
        ((error && <p style={{ color: "red" }}>{error}</p>) ||
          (warning && <p style={{ color: "brown" }}>{warning}</p>))}
    </Col>
  </Row>
);

const mapStateToProps = (state) => {
  return {
    initialValues: {
      DatangID: state.Izin.getIzinDetail.DatangID,
      Nama: state.Izin.getIzinDetail.Nama,
      TanggalScan: state.Izin.getIzinDetail.TanggalScan,
      Status: state.Izin.getIzinDetail.Status,
      Keterangan: state.Izin.getIzinDetail.Keterangan,
    },
  };
};

class FormIzinGroup extends Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <FormGroup row>
          <Col md={12}>
            <Alert color="danger">
              Pilih Tanggal Izin Dan Pilih Group Pegawai
            </Alert>
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
                name="Nama"
                component={renderField}
                label="Pilih Group Pegawai:"
              />
            </FormGroup>
          </Col>

          <Col md={12}>
            <Alert color="primary">
              Masukkan Tipe Izin dan Keterangan Untuk Izin
            </Alert>
          </Col>

          <Col md={3}>
            <FormGroup>
              <Field
                type="radio"
                value="OFF"
                name="Status"
                component={renderField}
                label="Tipe Izin  :"
              /> OFF
                <Field
                type="radio"
                value="CUTI"
                name="Status"
                component={renderField}
              /> CUTI
                <Field
                type="radio"
                value="Tidak Masuk"
                name="Status"
                component={renderField}
              /> TIDAK MASUK
                <Field
                type="radio"
                value="SAKIT"
                name="Status"
                component={renderField}
              /> SAKIT
            </FormGroup>
          </Col>

          <Col md={5}>
            <FormGroup>
              <Field
                type="text"
                name="Keterangan"
                component={renderField}
                label="Keterangan Izin :"
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

FormIzinGroup = reduxForm({
  form: "formCreateizin",
  validate: IzinValidation,
  enableReinitialize: true,
})(FormIzinGroup);
export default connect(mapStateToProps, null)(FormIzinGroup);
