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
      ></Input>
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

class FormIzinComponent extends Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <FormGroup row>
          <Col md={12}>
          <Alert color="danger">
           Pilih Tanggal Mulai Dan Tanggal Akhir Izin
          </Alert>
          </Col>

          <Col md={6}>
            <FormGroup>
              <Field
                type="date"
                name="TanggalScan"
                component={renderField}
                label="Tanggal Mulai Izin :"
              />
            </FormGroup>
          </Col>

          <Col md={6}>
            <FormGroup>
              <Field
                type="date"
                name="TanggalScan"
                component={renderField}
                label="Tanggal Selesai:"
              />
            </FormGroup>
          </Col>

          <Col md={12}>
          <Alert color="primary">
           Pilih Pegawai yang akan izin
          </Alert>
          </Col>

          <Col md={3}>
            <FormGroup>
              <Field
                type="text"
                name="Nama"
                component={renderField}
                label="Izin Perorang :"
              />
            </FormGroup>
          </Col>

          <Col md={3}>
            <FormGroup>
              <Field
                type="text"
                name="Group"
                component={renderField}
                label="Izin Pergroup :"
              />
            </FormGroup>
          </Col>

          <Col md={3}>
            <FormGroup>
              <Field
                type="text"
                name="Cabang"
                component={renderField}
                label="Izin Percabang :"
              />
            </FormGroup>
          </Col>


          <Col md={12}>
          <Alert color="success">
           Masukkan Tipe Izin dan Keterangan Untuk Izin
          </Alert>
          </Col>

          <Col md={3}>
            <FormGroup>
              <Field
                type="text"
                name="Status"
                component={renderField}
                label="Tipe Izin  :"
              />
            </FormGroup>
          </Col>

          <Col md={3}>
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

FormIzinComponent = reduxForm({
  form: "formCreateizin",
  validate: IzinValidation,
  enableReinitialize: true,
})(FormIzinComponent);
export default connect(mapStateToProps, null)(FormIzinComponent);
