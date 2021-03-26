import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { FormGroup, Col, Label, Input, Row, Button } from "reactstrap";
import IzinValidation from "../validations/IzinValidation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const renderField = ({
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
      <Input
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
      >
        <option value=""></option>
        <option value="OFF">OFF</option>
        <option value="CUTI">CUTI</option>
        <option value="TIDAK MASUK">TIDAK MASUK</option>
        <option value="SAKIT">SAKIT</option>
        <option value="DINAS LUAR">DINAS LUAR</option>
        <option value="CUTI BERSAMA">CUTI BERSAMA</option>
        <option value="CUTI KHUSUS">CUTI KHUSUS</option>
        <option value="LIBUR">LIBUR</option>
      </Input>
      {touched &&
        ((error && <p style={{ color: "yellow" }}>{error}</p>) ||
          (warning && <p style={{ color: "brown" }}>{warning}</p>))}
    </Col>
  </Row>
);

const mapStateToProps = (state) => {
  return {

    initialValues: {
      UserID: state.Izin.getIzinDetail.UserID,
      Nama: state.Izin.getIzinDetail.Nama,
      Jabatan: state.Izin.getIzinDetail.Jabatan,
      FTglMulaiCuti: state.Izin.getIzinDetail.FTglMulaiCuti,
      SisaCuti: state.Izin.getIzinDetail.SisaCuti,
      //
      DatangID: state.Izin.getIzinDetailForm.DatangID,
      TanggalScan: state.Izin.getIzinDetailForm.TanggalScan,
      Status: state.Izin.getIzinDetailForm.STATUS,
      Keterangan: state.Izin.getIzinDetailForm.Keterangan,
      statusOptions : [
        {value : '', label : '-'},
        {value : 'LIBUR', label : 'LIBUR'},
        {value : 'CUTI', label : 'CUTI'},
        {value : 'TIDAK MASUK', label : 'TIDAK MASUK'},
        {value : 'SAKIT', label : 'SAKIT'},
        {value : 'DINAS LUAR', label : 'DINAS LUAR'},
        {value : 'CUTI BERSAMA', label : 'CUTI BERSAMA'},
        {value : 'CUTI KHUSUS', label : 'CUTI KHUSUS'}
      ]
    },
  };
};

class FormIzinComponent extends Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <FormGroup row>
          <Col md={4}>
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

          <Col md={4}>
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

          <Col md={4}>
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

          <Col md={6}>
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

          <Col md={4}>
            <FormGroup>
              <Field
                type="text"
                name="SisaCuti"
                disabled
                component={renderField}
                label="Sisa Cuti:"
              />
            </FormGroup>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md={12} style={{display: "none"}}>
            <FormGroup>
              <Field
                readOnly="true"
                type="text"
                name="DatangID"
                component={renderField}
                label="DatangID:"
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Field
                type="date"
                name="TanggalScan"
                component={renderField}
                label="Tanggal:"
              />
            </FormGroup>
          </Col>

          <Col md={6}>
            <FormGroup>
              <Field
                type="select"
                name="Status"
                component={renderField}
                label="Tipe  :"
              />
            </FormGroup>
          </Col>

          <Col md={10}>
            <FormGroup>
              <Field
                type="text"
                name="Keterangan"
                component={renderField}
                label="Keterangan :"
              />
            </FormGroup>
          </Col>
          
          <Col>
            <FormGroup>
              <Button
                color="warning"
                type="submit"
                className="btn-block"
                disabled={this.props.submitting}
              >
                <FontAwesomeIcon icon={faPaperPlane} /> Kirim
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
