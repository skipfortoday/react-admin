import React, { Component } from "react";
import { reduxForm, Field, change, reset } from "redux-form";
import { connect } from "react-redux";
import { FormGroup, Col, Label, Input, Row, Button } from "reactstrap";
import UserValidation from "../validations/UserValidation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { formatTglYmd } from "../containers/formatTgl";
import { InputFieldComponentHrz } from "./formController/InputFieldComponentHrz";
import { CheckboxFieldComponent } from "./formController/CheckboxFieldComponent";
import { SelectFieldComponentHrz } from "./formController/SelectFieldComponentHrz";
import { siteConfig } from "../config";



const opsiAkses = [
  {value:"", label:"-"},
  {value:"1", label:"Atasan Kantor"},
  {value:"2", label:"Atasan Group"},
  {value:"3", label:"Staff Bisa View Jam"},
  {value:"4", label:"Staff Tidak Bisa View Jam"},
  {value:"5", label:"Staff Tidak Bisa Akses"}
]

// Decorate form with dispatchable actions
const mapDispatchToProps = (dispatch) => ({
  change, reset
});

// const form = formValueSelector("formCreateUserx");
const mapStateToProps = (state) => {
  // const {TglAwalKontrakPertama, TglMulaiCuti, Posisi}  = form(state, "TglAwalKontrakPertama", "TglMulaiCuti", "Posisi");
  let opsiAksesInit = {};
  opsiAkses.map((data) => {
    if(data.value == state.users.getUserDetail.RoleID){
      opsiAksesInit = data;
      return;
    }
  })

  return {
    getOptGroup: state.Opt.getOptGroup,
    getOptCabang: state.Opt.getOptCabang,
    getuserDetail: state.users.getUserDetail.UserID,
    initialValues: {
      UserID: state.users.getUserDetail.UserID,
      Nama: state.users.getUserDetail.Nama,
      Alamat: state.users.getUserDetail.Alamat,
      TglLahir: state.users.getUserDetail.FTglLahir,
      HP: state.users.getUserDetail.HP,
      TglMasuk: state.users.getUserDetail.FTglMasuk,
      TglMulaiCuti: state.users.getUserDetail.FTglMulaiCuti,
      TglAwalKontrakPertama: state.users.getUserDetail.FTglAwalKontrakPertama,
      GroupID: { value: state.users.getUserDetail.GroupID, label: state.users.getUserDetail.Jabatan },
      RoleID: opsiAksesInit,
      KodeCabang: siteConfig.kodeCabang,
      Status: state.users.getUserDetail.Status,
      Posisi: state.users.getUserDetail.Posisi,
      TampilkanLembur: state.users.getUserDetail.TampilkanLembur,
      TampilkanTerlambat: state.users.getUserDetail.TampilkanTerlambat,
      TglKeluar: state.users.getUserDetail.FTglKeluar
    }
  };
};

class FormComponent extends Component {

  handleTglKontrakChange = (e, TglKontrak) => {
    // console.log(text);
    // Sementara pakai begii , beberapa metode redux change saya coba, tapi masih mentok tidak bisa mengupdate, akhirnya pakai cara seperti ini. CODE.NGAWUR

    var form = document.getElementById('formEditUser');
    var inTglMulaiCuti = form.querySelector('input[name="TglMulaiCuti"]');
    var d = new Date(TglKontrak);
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    var c = new Date(year + 1, month, day);
    inTglMulaiCuti.value = formatTglYmd(c);

    // this.props.change("formCreateUserx", "TglMulaiCuti", formatTglYmd(c));
    // this.props.reset();
    // this.props.dispatch()
    // this.setState({
    //   TglMulaiCuti:text
    // })    
    //dispatch()
    //this.props.change("formCreateUser", "TglMulaiCuti", "2023-02-01");
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit} id="formEditUser">
        <FormGroup row>
          <Col md="6">
            <Row>
              <Col md={12}>
                <FormGroup>
                  <Field
                    readOnly
                    type="text"
                    name="UserID"
                    component={InputFieldComponentHrz}
                    label="UserID :"
                  />
                </FormGroup>
              </Col>
              <Col md={12}>
                <FormGroup>
                  <Field
                    type="text"
                    name="Nama"
                    component={InputFieldComponentHrz}
                    label="Nama Pegawai :"
                  />
                </FormGroup>
              </Col>

              <Col md={12}>
                <FormGroup>
                  <Field
                    type="textarea"
                    name="Alamat"
                    component={InputFieldComponentHrz}
                    label="Alamat Pegawai :"
                  />
                </FormGroup>
              </Col>


              <Col md={12}>
                <FormGroup>
                  <Field
                    type="number"
                    name="HP"
                    component={InputFieldComponentHrz}
                    label="Nomor HP Pegawai :"
                  />
                </FormGroup>
              </Col>

              <Col md={12}>
                <FormGroup>
                  <Field
                    type="date"
                    name="TglLahir"
                    component={InputFieldComponentHrz}
                    label="Tanggal Lahir :"
                  />
                </FormGroup>
              </Col>

              <Col md={12}>
                <FormGroup>
                  <Field
                    type="date"
                    name="TglMasuk"
                    component={InputFieldComponentHrz}
                    label="Tanggal Masuk :"
                  />
                </FormGroup>
              </Col>

              <Col md={12}>
                <FormGroup>
                  <Field
                    type="date"
                    name="TglKeluar"
                    component={InputFieldComponentHrz}
                    label="Tanggal Keluar :"
                  />
                </FormGroup>
              </Col>
            </Row>
          </Col>
          <Col md="6">
            <Row>
              <Col md={12}>
                <FormGroup>
                  <Field
                    type="date"
                    name="TglAwalKontrakPertama"
                    component={InputFieldComponentHrz}
                    onChange={this.handleTglKontrakChange}
                    label="Tanggal Awal Kontrak :"
                  />
                </FormGroup>
              </Col>

              <Col md={12}>
                <FormGroup>
                  <Field
                    type="date"
                    disabled
                    name="TglMulaiCuti"
                    component={InputFieldComponentHrz}
                    label="Tanggal Mulai Cuti :"
                  />
                </FormGroup>
              </Col>

              <Col md={12}>
                <FormGroup>
                  <Field
                    name="KodeCabang"
                    component={InputFieldComponentHrz}
                    label="Cabang :"
                    readOnly
                  />
                </FormGroup>
              </Col>


              <Col md={12}>
                <FormGroup>
                  <Field
                    name="GroupID"
                    component={SelectFieldComponentHrz}
                    options={this.props.getOptGroup}
                    label="Group Karyawan :"
                  />
                </FormGroup>
              </Col>

              <Col md={12}>
                <FormGroup>
                  <Field
                    type="text"
                    name="Posisi"
                    component={InputFieldComponentHrz}
                    label="Posisi :"
                  />
                </FormGroup>
              </Col>


              <Col md={12}>
                <FormGroup>
                  <Field
                    type="select"
                    name="RoleID"
                    component={SelectFieldComponentHrz}
                    label="Akses Karyawan :"
                    options={opsiAkses}
                  />
                </FormGroup>
              </Col>

              {/* <Col md={2}>
                <FormGroup>
                  <Field
                    type="password"
                    name="Pass"
                    disabled={disabled}
                    component={InputFieldComponentHrz}
                    label="PIN Password :"
                  />
                </FormGroup>
              </Col> */}

              <Col md={12}>
                <Row>
                  <Col md="4">
                  </Col>
                  <Col md="8">
                    <FormGroup className="mb-0">
                      <Field
                        type="checkbox"
                        name="TampilkanLembur"
                        component={CheckboxFieldComponent}
                        label="Hitung Lembur"
                      />
                    </FormGroup>
                    <FormGroup className="mb-0">
                      <Field
                        type="checkbox"
                        name="TampilkanTerlambat"
                        component={CheckboxFieldComponent}
                        label="Hitung Terlambat"
                      />
                    </FormGroup>
                    <FormGroup className="mb-0">
                      <Field
                        type="checkbox"
                        name="Status"
                        component={CheckboxFieldComponent}
                        label="Bisa Absen Manual"
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </Col>


            </Row>
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

// export default reduxForm({
//   form: "formCreateUserx",
//   validate: UserValidation,
//   enableReinitialize: true,
// })(
//   connect(
//     mapStateToProps,
//     mapDispatchToProps
//   )(FormComponent)
// );

FormComponent = reduxForm({
  form: "formCreateUserx",
  validate: UserValidation,
  enableReinitialize: true,
})(FormComponent);
export default connect(mapStateToProps, mapDispatchToProps)(FormComponent);
