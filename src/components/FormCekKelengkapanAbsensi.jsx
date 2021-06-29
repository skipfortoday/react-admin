import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { FormGroup, Col, Button } from "reactstrap";
import IzinValidation from "../validations/IzinValidation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faSearch } from "@fortawesome/free-solid-svg-icons";
import { formatTglYmd } from "../containers/formatTgl";
import { InputFieldComponent } from "./formController/InputFieldComponent";
import { SelectRenderComponent } from "./SelectRenderComponent";

const opsi = [
  { value: "OFF", label: "OFF" },
  { value: "CUTI", label: "CUTI" },
  { value: "TIDAK MASUK", label: "IZIN TIDAK MASUK" },
  { value: "SAKIT", label: "SAKIT" },
  { value: "DINAS LUAR", label: "DINAS LUAR" },
  { value: "CUTI BERSAMA", label: "CUTI BERSAMA" },
  { value: "CUTI KHUSUS", label: "CUTI KHUSUS" },
  { value: "LIBUR", label: "LIBUR" },
  { value: "LENGKAPI", label: "LENGKAPI ABSEN" },
];

const mapStateToProps = (state) => {
  var option = [{ value: "all", label: "Semua Karyawan" }];
  option = option.concat(state.Opt.getOptUser);

  return {
    getOptUser: option,
    initialValues: {
      TanggalScan: state.Laporan.defTglAwal,
      TanggalScanSampai: state.Laporan.defTglAkhir,
      Nama: state.Laporan.defNama
    },
  };
};

class FormCekKelengkapanAbsensi extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleTanggalScanChange(event) {
    console.log(event.target.value);
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <FormGroup row>
          <Col md={3}>
            <FormGroup>
              <Field
                type="date"
                name="TanggalScan"
                component={InputFieldComponent}
                label="Tanggal Awal:"
                onChange={this.handleTanggalScanChange}
                value={this.state.TanggalScan}
              />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Field
                type="date"
                name="TanggalScanSampai"
                component={InputFieldComponent}
                label="Tanggal Akhir:"
              />
            </FormGroup>
          </Col>

          <Col md={4}>
            <FormGroup>
              <Field
                type="text"
                name="Nama"
                component={SelectRenderComponent}
                options={this.props.getOptUser}
                label="Nama :"
              />
            </FormGroup>
          </Col>

          <Col md={2}>
            <FormGroup>
              {/* <Label> Kirim </Label> */}
              <Button
                style={{ marginTop: "35px" }}
                color="dark"
                type="submit"
                disabled={this.props.submitting}
                className="btn-block"
              >
                <FontAwesomeIcon icon={faSearch} /> Cek
              </Button>
            </FormGroup>
          </Col>
        </FormGroup>
      </form>
    );
  }
}

FormCekKelengkapanAbsensi = reduxForm({
  form: "formCekKelengkapanAbsensi",
  validate: IzinValidation,
  enableReinitialize: true,
})(FormCekKelengkapanAbsensi);

export default connect(mapStateToProps, null)(FormCekKelengkapanAbsensi);