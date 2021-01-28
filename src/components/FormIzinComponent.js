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
        <option value="OFF">OFF</option>
        <option value="CUTI">CUTI</option>
        <option value="TIDAK MASUK">TIDAK MASUK</option>
        <option value="SAKIT">SAKIT</option>
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
      UserID: state.Izin.getIzinDetail.UserID,
      Nama: state.Izin.getIzinDetail.Nama,
      Jabatan: state.Izin.getIzinDetail.Jabatan,
      FTglMulaiCuti: state.Izin.getIzinDetail.FTglMulaiCuti,
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
              Detail Data User
            </Alert>
          </Col>


          <Col md={3}>
            <FormGroup>
              <Field
                type="text"
                name="UserID"
                disabled
                component={renderField}
                label="ID :"
              />
            </FormGroup>
          </Col>

        

          <Col md={3}>
            <FormGroup>
              <Field
                type="text"
                name="Nama"
                disabled
                component={renderField}
                label="Nama:"
              />
            </FormGroup>
          </Col>

          <Col md={3}>
            <FormGroup>
              <Field
                type="text"
                name="Jabatan"
                disabled
                component={renderField}
                label="Jabatan:"
              />
            </FormGroup>
          </Col>

          <Col md={3}>
            <FormGroup>
              <Field
                type="text"
                name="FTglMulaiCuti"
                disabled
                component={renderField}
                label="Tanggal Mulai Cuti:"
              />
            </FormGroup>
          </Col>

          <Col md={12}>
            <Alert color="primary">
              Masukkan Tipe Izin Tanggal Izin dan Keterangan Untuk Izin
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
                name="Status"
                component={renderField}
                label="Tipe Izin  :"
              />
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

FormIzinComponent = reduxForm({
  form: "formCreateizin",
  validate: IzinValidation,
  enableReinitialize: true,
})(FormIzinComponent);
export default connect(mapStateToProps, null)(FormIzinComponent);
