import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { FormGroup, Col, Label, Input, Row, Button } from "reactstrap";
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
        <option value="Senin">SENIN</option>
        <option value="Selasa">SELASA</option>
        <option value="Rabu">RABU</option>
        <option value="Kamis">KAMIS</option>
        <option value="Jumat">JUM'AT</option>
        <option value="Sabtu">SABTU</option>
        <option value="Minggu">MINGGU</option>
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
      GroupID: state.Group.getGroupDetail.GroupID,
      Jabatan: state.Group.getGroupDetail.Jabatan,
      AdaOff: state.Group.getGroupDetail.AdaOff,
      CekJamKembali: state.Group.getGroupDetail.CekJamKembali,
      RuleTerlambatBertingkat: state.Group.getGroupDetail.RuleTerlambatBertingkat,
      JamDatang: state.Group.getGroupDetail.JamDatang,
      MaxJamDatang: state.Group.getGroupDetail.MaxJamDatang,
      JamPulang: state.Group.getGroupDetail.JamPulang,
      MinJamLembur: state.Group.getGroupDetail.MinJamLembur,
      JamMulaiLembur: state.Group.getGroupDetail.JamMulaiLembur,
      RpPotonganTerlambat: state.Group.getGroupDetail.RpPotonganTerlambat,
      JamDatangSiang: state.Group.getGroupDetail.JamDatangSiang,
      MaxJamDatangSiang: state.Group.getGroupDetail.MaxJamDatangSiang,
      JamPulangSiang: state.Group.getGroupDetail.JamPulangSiang,
      JamMulaiLemburSiang: state.Group.getGroupDetail.JamMulaiLemburSiang,
      MinJamLemburSiang: state.Group.getGroupDetail.MinJamLemburSiang,
      HariLibur: state.Group.getGroupDetail.HariLibur,
      RpPotonganTerlambatKembali: state.Group.getGroupDetail.RpPotonganTerlambatKembali,
      RpPotonganTidakMasuk: state.Group.getGroupDetail.RpPotonganTidakMasuk,
      RpLemburPerJam: state.Group.getGroupDetail.RpLemburPerJam,
      JamDatangSore: state.Group.getGroupDetail.JamDatangSore,
      MaxJamDatangSore: state.Group.getGroupDetail.MaxJamDatangSore,
      JamPulangSore: state.Group.getGroupDetail.JamPulangSore,
      MinJamLemburSore: state.Group.getGroupDetail.MinJamLemburSore,
      JamMulaiLemburSore: state.Group.getGroupDetail.JamMulaiLemburSore,
      JamMulaiPagi: state.Group.getGroupDetail.JamMulaiPagi,
      MaxJamKembali: state.Group.getGroupDetail.MaxJamKembali,
      JamMulaiSiang: state.Group.getGroupDetail.JamMulaiSiang,
      MaxJamKembaliSiang: state.Group.getGroupDetail.MaxJamKembaliSiang,
      JamMulaiSore: state.Group.getGroupDetail.JamMulaiSore,
      MaxJamKembaliSore: state.Group.getGroupDetail.MaxJamKembaliSore,
    },
  };
};

class FormGroupComponent extends Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <FormGroup row >
          <Col md={12}>
          <div style={{ backgroundColor: "#f9a826" }}>
              Masukkan Group ID untuk Kode & Nama Group / Nama Jabatan (WAJIB)
            </div>
          </Col>

          
          <Col md={4}>
            <FormGroup>
              <Field
                type="text"
                name="GroupID"
                readOnly={this.props.dis}
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
                readOnly={this.props.dis}
                component={renderField}
                label="Nama Group :"
              />
            </FormGroup>
          </Col>

          <Col md={12}>
          <div style={{ backgroundColor: "#363b41" , color:"white"  }}>
            Masukkan Hari Libur Dan Komponen Gaji</div>
          </Col>

          <Col md={1}>
            <FormGroup></FormGroup>
          </Col>

          <Col md={2}>
            <FormGroup>
              <Field type="checkbox" name="AdaOff" component={renderField} />
              Ada Hari Libur Mingguan
            </FormGroup>
          </Col>

          <Col md={2}>
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
              <Field type="checkbox" name="RuleTerlambatBertingkat" component={renderField} />
              Menggunakan Terlambat Bertingkat
            </FormGroup>
          </Col>
   

          <Col md={2}>
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
                name="RpPotonganTerlambatKembali"
                component={renderField}
                label="Rp Potongan Terlambat Kembali:"
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
          <div style={{ backgroundColor: "#363b41" ,color:"white"}}>
              Masukkan Aturan Jadwal Pagi atau Jadwal Shift 1 (WAJIB)
            </div>
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
                name="JamMulaiPagi"
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
          <div style={{ backgroundColor: "#363b41" ,color:"white"}}>
              Masukkan Aturan Jadwal Siang atau Jadwal Shift 2
            </div>
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
                name="JamMulaiLemburSiang"
                component={renderField}
                label="Jam Mulai Lembur :"
              />
            </FormGroup>
          </Col>

          <Col md={3}>
            <FormGroup>
              <Field
                type="time"
                name="JamMulaiSiang"
                component={renderField}
                label="Jam Mulai Istirahat :"
              />
            </FormGroup>
          </Col>

          <Col md={3}>
            <FormGroup>
              <Field
                type="time"
                name="MaxJamKembaliSiang"
                component={renderField}
                label="Max Kembali Istirahat :"
              />
            </FormGroup>
          </Col>

          <Col md={12}>
          <div style={{ backgroundColor: "#363b41",color:"white" }}>
              Masukkan Aturan Jadwal Sore atau Jadwal Shift 3
           </div>
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
                name="JamMulaiLemburSore"
                component={renderField}
                label="Jam Mulai Lembur :"
              />
            </FormGroup>
          </Col>

          <Col md={3}>
            <FormGroup>
              <Field
                type="time"
                name="JamMulaiSore"
                component={renderField}
                label="Jam Mulai Istirahat :"
              />
            </FormGroup>
          </Col>

          <Col md={3}>
            <FormGroup>
              <Field
                type="time"
                name="MaxJamKembaliSore"
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
                color="dark"
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
