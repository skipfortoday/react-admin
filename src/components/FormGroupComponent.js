import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { FormGroup, Col, Label, Input, Row, Button, Alert } from "reactstrap";
import GroupValidation from "../validations/GroupValidation";
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
        <option value="0">-</option>
        <option value="MONDAY">SENIN</option>
        <option value="TUESDAY">SELASA</option>
        <option value="WEDNESDAY">RABU</option>
        <option value="THURSDAY">KAMIS</option>
        <option value="FRIDAY">JUMAT</option>
        <option value="SATURDAY">SABTU</option>
        <option value="SUNDAY">MINGGU</option>
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
      GroupID: state.Group.getGroupDetail.GroupID,
      Jabatan: state.Group.getGroupDetail.Jabatan,
      JamDatang: state.Group.getGroupDetail.JamDatang,
      JamPulang: state.Group.getGroupDetail.JamPulang,
      MaxJamDatang: state.Group.getGroupDetail.MaxJamDatang,
      MinJamLembur: state.Group.getGroupDetail.MinJamLembur,
      JamDatangSiang: state.Group.getGroupDetail.JamDatangSiang,
      JamPulangSiang: state.Group.getGroupDetail.JamPulangSiang,
      MaxJamDatangSiang: state.Group.getGroupDetail.MaxJamDatangSiang,
      MinJamLemburSiang: state.Group.getGroupDetail.MinJamLemburSiang,
      JamDatangSore: state.Group.getGroupDetail.JamDatangSore,
      JamPulangSore: state.Group.getGroupDetail.JamPulangSore,
      MaxJamDatangSore: state.Group.getGroupDetail.MaxJamDatangSore,
      MinJamLemburSore: state.Group.getGroupDetail.MinJamLemburSore,
      HariLibur: state.Group.getGroupDetail.HariLibur,
      RpLemburPerJam: state.Group.getGroupDetail.RpLemburPerJam,
      RpPotonganTerlambat: state.Group.getGroupDetail.RpPotonganTerlambat,
      RpPotonganTidakMasuk: state.Group.getGroupDetail.RpPotonganTidakMasuk,
    },
  };
};

class FormGroupComponent extends Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <FormGroup row>
          <Col md={12}>
            <Alert color="danger">
              Masukkan Group ID untuk Kode & Nama Group / Nama Jabatan (WAJIB)
            </Alert>
          </Col>

          <Col md={4}>
            <FormGroup>
              <Field
                type="text"
                name="GroupID"
                component={renderField}
                label="Group ID :"
              />
            </FormGroup>
          </Col>

          <Col md={4}>
            <FormGroup>
              <Field
                type="text"
                name="Jabatan"
                component={renderField}
                label="Nama Group :"
              />
            </FormGroup>
          </Col>

          <Col md={12}>
            <Alert color="info">Masukkan Hari Libur Dan Komponen Gaji</Alert>
          </Col>

          <Col md={1}>
            <FormGroup></FormGroup>
          </Col>

          <Col md={2}>
            <FormGroup>
              <Field type="checkbox" name="AdaLibur" component={renderField} />
              Ada Hari Libur Mingguan
            </FormGroup>
          </Col>

          <Col md={3}>
            <FormGroup>
              <Field
                type="select"
                name="HariLibur"
                component={renderField}
                label="Hari Libur :"
              />
            </FormGroup>
          </Col>

          <Col md={1}>
            <FormGroup></FormGroup>
          </Col>

          <Col md={2}>
            <FormGroup>
              <Field
                type="checkbox"
                name="CekJamKembali"
                component={renderField}
              />
              Cek Jam Kembali Istirahat
            </FormGroup>
          </Col>

          <Col md={2}>
            <FormGroup>
              <Field type="checkbox" name="Terlamb" component={renderField} />
              Menggunakan Terlambat Bertingkat
            </FormGroup>
          </Col>

          <Col md={1}>
            <FormGroup></FormGroup>
          </Col>

          <Col md={1}>
            <FormGroup></FormGroup>
          </Col>

          <Col md={3}>
            <FormGroup>
              <Field
                type="number"
                name="RpLemburPerJam"
                component={renderField}
                label="Rupiah Lembur Perjam :"
              />
            </FormGroup>
          </Col>

          <Col md={3}>
            <FormGroup>
              <Field
                type="number"
                name="RpPotonganTerlambat"
                component={renderField}
                label="Rupiah Potongan Terlambat :"
              />
            </FormGroup>
          </Col>

          <Col md={3}>
            <FormGroup>
              <Field
                type="number"
                name="RpPotonganTidakMasuk"
                component={renderField}
                label="Potongan Tidak Masuk :"
              />
            </FormGroup>
          </Col>

          <Col md={12}>
            <Alert color="primary">
              Masukkan Aturan Jadwal Pagi atau Jadwal Shift 1 (WAJIB)
            </Alert>
          </Col>

          <Col md={3}>
            <FormGroup>
              <Field
                type="time"
                name="JamDatang"
                component={renderField}
                label="Jam Datang Pagi :"
              />
            </FormGroup>
          </Col>

          <Col md={3}>
            <FormGroup>
              <Field
                type="time"
                name="JamPulang"
                component={renderField}
                label="Jam Pulang Pagi :"
              />
            </FormGroup>
          </Col>

          <Col md={2}>
            <FormGroup>
              <Field
                type="time"
                name="MaxJamDatang"
                component={renderField}
                label="Max Jam Datang Pagi :"
              />
            </FormGroup>
          </Col>

          <Col md={2}>
            <FormGroup>
              <Field
                type="time"
                name="MinJamLembur"
                component={renderField}
                label="Min Jam Lembur:"
              />
            </FormGroup>
          </Col>

          <Col md={2}>
            <FormGroup>
              <Field
                type="time"
                name="JamMulaiLembur"
                component={renderField}
                label="Jam Mulai Lembur :"
              />
            </FormGroup>
          </Col>

          <Col md={3}>
            <FormGroup>
              <Field
                type="time"
                name="JamMulaiIstirahat"
                component={renderField}
                label="Jam Mulai Istirahat :"
              />
            </FormGroup>
          </Col>

          <Col md={3}>
            <FormGroup>
              <Field
                type="time"
                name="MaxJamKembali"
                component={renderField}
                label="Max Kembali Istirahat :"
              />
            </FormGroup>
          </Col>

          <Col md={12}>
            <Alert color="success">
              Masukkan Aturan Jadwal Siang atau Jadwal Shift 2
            </Alert>
          </Col>

          <Col md={3}>
            <FormGroup>
              <Field
                type="time"
                name="JamDatangSiang"
                component={renderField}
                label="Jam Datang Siang  :"
              />
            </FormGroup>
          </Col>

          <Col md={3}>
            <FormGroup>
              <Field
                type="time"
                name="JamPulangSiang"
                component={renderField}
                label="Jam Pulang Siang :"
              />
            </FormGroup>
          </Col>

          <Col md={2}>
            <FormGroup>
              <Field
                type="time"
                name="MaxJamDatangSiang"
                component={renderField}
                label="MaxJam DtngSiang :"
              />
            </FormGroup>
          </Col>

          <Col md={2}>
            <FormGroup>
              <Field
                type="time"
                name="MinJamLemburSiang"
                component={renderField}
                label="MinJam LemburSiang :"
              />
            </FormGroup>
          </Col>

          <Col md={2}>
            <FormGroup>
              <Field
                type="time"
                name="JamMulaiLembur"
                component={renderField}
                label="Jam Mulai Lembur :"
              />
            </FormGroup>
          </Col>

          <Col md={3}>
            <FormGroup>
              <Field
                type="time"
                name="JamMulaiIstirahat"
                component={renderField}
                label="Jam Mulai Istirahat :"
              />
            </FormGroup>
          </Col>

          <Col md={3}>
            <FormGroup>
              <Field
                type="time"
                name="MaxJamKembali"
                component={renderField}
                label="Max Kembali Istirahat :"
              />
            </FormGroup>
          </Col>

          <Col md={12}>
            <Alert color="warning">
              Masukkan Aturan Jadwal Sore atau Jadwal Shift 3
            </Alert>
          </Col>

          <Col md={3}>
            <FormGroup>
              <Field
                type="time"
                name="JamDatangSore"
                component={renderField}
                label="Jam Datang Sore  :"
              />
            </FormGroup>
          </Col>

          <Col md={3}>
            <FormGroup>
              <Field
                type="time"
                name="JamPulangSore"
                component={renderField}
                label="Jam Pulang Sore :"
              />
            </FormGroup>
          </Col>

          <Col md={2}>
            <FormGroup>
              <Field
                type="time"
                name="MaxJamDatangSore"
                component={renderField}
                label="MaxJam DtgSore:"
              />
            </FormGroup>
          </Col>

          <Col md={2}>
            <FormGroup>
              <Field
                type="time"
                name="MinJamLemburSore"
                component={renderField}
                label="MinJam LemburSore:"
              />
            </FormGroup>
          </Col>

          <Col md={2}>
            <FormGroup>
              <Field
                type="time"
                name="JamMulaiLembur"
                component={renderField}
                label="Jam Mulai Lembur :"
              />
            </FormGroup>
          </Col>

          <Col md={3}>
            <FormGroup>
              <Field
                type="time"
                name="JamMulaiIstirahat"
                component={renderField}
                label="Jam Mulai Istirahat :"
              />
            </FormGroup>
          </Col>

          <Col md={3}>
            <FormGroup>
              <Field
                type="time"
                name="MaxJamKembali"
                component={renderField}
                label="Max Kembali Istirahat :"
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

FormGroupComponent = reduxForm({
  form: "formCreateGroup",
  validate: GroupValidation,
  enableReinitialize: true,
})(FormGroupComponent);
export default connect(mapStateToProps, null)(FormGroupComponent);
