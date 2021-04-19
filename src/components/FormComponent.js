import React, { Component } from "react";
import { reduxForm, Field, change, reset } from "redux-form";
import { connect } from "react-redux";
import { FormGroup, Col, Label, Input, Row, Button } from "reactstrap";
import UserValidation from "../validations/UserValidation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import Select from 'react-select'
import { formatTglYmd } from "../containers/formatTgl";

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
    {/* <Col md="4"> */}
    <Label md="4" htmlFor="{input}" className="col-form-label text-right">
      {label}
    </Label>
    {/* </Col> */}
    <Col md="8">
      <Input
        {...input}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
      >
        <option value="">-</option>
        <option value="1">Atasan Kantor</option>
        <option value="2">Atasan Group</option>
        <option value="3">Staff Bisa View Jam</option>
        <option value="4">Staff Tidak Bisa View Jam</option>
        <option value="5">Staff Tidak Bisa Akses</option>
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
    {/* <Col md="4"> */}
    <Label md="4" htmlFor="{input}" className="col-form-label text-right">
      {label}
    </Label>
    {/* </Col> */}
    <Col md="8">

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

const renderFieldCb = ({
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
  <Col>
    <Label htmlFor="{input}" className="col-form-label">
      <Input
        {...input}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
      />
      {touched &&
        ((error && <p style={{ color: "red" }}>{error}</p>) ||
          (warning && <p style={{ color: "brown" }}>{warning}</p>))}
      {label}
    </Label>
  </Col>
);

// Decorate form with dispatchable actions
const mapDispatchToProps = (dispatch) => ({
  change, reset
});

// const form = formValueSelector("formCreateUserx");
const mapStateToProps = (state) => {
  // const {TglAwalKontrakPertama, TglMulaiCuti, Posisi}  = form(state, "TglAwalKontrakPertama", "TglMulaiCuti", "Posisi");

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
      RoleID: state.users.getUserDetail.RoleID,
      KodeCabang: { value: state.users.getUserDetail.KodeCabang, label: state.users.getUserDetail.NamaCabang },
      Status: state.users.getUserDetail.Status,
      Posisi: state.users.getUserDetail.Posisi,
      TampilkanLembur: state.users.getUserDetail.TampilkanLembur,
      TampilkanTerlambat: state.users.getUserDetail.TampilkanTerlambat,
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
                    type="text"
                    name="UserID"
                    component={renderField}
                    label="UserID :"
                  />
                </FormGroup>
              </Col>
              <Col md={12}>
                <FormGroup>
                  <Field
                    type="text"
                    name="Nama"
                    component={renderField}
                    label="Nama Pegawai :"
                  />
                </FormGroup>
              </Col>

              <Col md={12}>
                <FormGroup>
                  <Field
                    type="textarea"
                    name="Alamat"
                    component={renderField}
                    label="Alamat Pegawai :"
                  />
                </FormGroup>
              </Col>


              <Col md={12}>
                <FormGroup>
                  <Field
                    type="number"
                    name="HP"
                    component={renderField}
                    label="Nomor HP Pegawai :"
                  />
                </FormGroup>
              </Col>

              <Col md={12}>
                <FormGroup>
                  <Field
                    type="date"
                    name="TglLahir"
                    component={renderField}
                    label="Tanggal Lahir :"
                  />
                </FormGroup>
              </Col>

              <Col md={12}>
                <FormGroup>
                  <Field
                    type="date"
                    name="TglMasuk"
                    component={renderField}
                    label="Tanggal Masuk :"
                  />
                </FormGroup>
              </Col>

              <Col md={12}>
                <FormGroup>
                  <Field
                    type="date"
                    name="TglKeluar"
                    component={renderField}
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
                    component={renderField}
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
                    component={renderField}
                    label="Tanggal Mulai Cuti :"
                  />
                </FormGroup>
              </Col>

              <Col md={12}>
                <FormGroup>
                  <Field
                    name="KodeCabang"
                    component={renderField2}
                    options={this.props.getOptCabang}
                    label="Cabang :"
                  />
                </FormGroup>
              </Col>


              <Col md={12}>
                <FormGroup>
                  <Field
                    name="GroupID"
                    component={renderField2}
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
                    component={renderField}
                    label="Posisi :"
                  />
                </FormGroup>
              </Col>


              <Col md={12}>
                <FormGroup>
                  <Field
                    type="select"
                    name="RoleID"
                    component={renderField}
                    label="Akses Karyawan :"
                  />
                </FormGroup>
              </Col>

              {/* <Col md={2}>
                <FormGroup>
                  <Field
                    type="password"
                    name="Pass"
                    disabled={disabled}
                    component={renderField}
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
                        component={renderFieldCb}
                        label="Hitung Lembur"
                      />
                    </FormGroup>
                    <FormGroup className="mb-0">
                      <Field
                        type="checkbox"
                        name="TampilkanTerlambat"
                        component={renderFieldCb}
                        label="Hitung Terlambat"
                      />
                    </FormGroup>
                    <FormGroup className="mb-0">
                      <Field
                        type="checkbox"
                        name="Status"
                        component={renderFieldCb}
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
