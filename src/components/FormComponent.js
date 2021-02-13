import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { FormGroup, Col, Label, Input, Row, Button} from "reactstrap";
import AsyncVUser from "../validations/AsyncVUser";
import UserValidation from "../validations/UserValidation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";

const renderField = ({
  input,
  type,
  placeholder,
  label,
  disabled,
  readOnly,
  meta: { asyncValidating, touched, error, warning },
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
        <option value ="">-</option>
        <option value ="1">Atasan Kantor</option>
        <option value = "2">Atasan Group</option>
        <option value = "3">Staff</option>
      </Input>
      <div className={ asyncValidating ? 'async-validating' : ''}>
      {touched &&
        ((error && <p style={{ color: "red" }}>{error}</p>) ||
          (warning && <p style={{ color: "brown" }}>{warning}</p>))}</div>
    </Col>
  </Row>
);

const mapStateToProps = (state) => {
  return {
    initialValues : {
      UserID        : state.users.getUserDetail.UserID,
      Pass          : state.users.getUserDetail.Pass, 
      Nama          : state.users.getUserDetail.Nama,
      Alamat        : state.users.getUserDetail.Alamat,
	    TglLahir      : state.users.getUserDetail.FTglLahir,
    	HP            : state.users.getUserDetail.HP,
      TglMasuk      : state.users.getUserDetail.FTglMasuk,
	    TglMulaiCuti  : state.users.getUserDetail.FTglMulaiCuti, 
      TglAwalKontrakPertama : state.users.getUserDetail.FTglAwalKontrakPertama, 
      GroupID       : state.users.getUserDetail.GroupID, 
      RoleID       : state.users.getUserDetail.RoleID,
      KodeCabang    : state.users.getUserDetail.KodeCabang,   
      Status        : state.users.getUserDetail.Status,
      Posisi        :   state.users.getUserDetail.Posisi,
	    TampilkanLembur : state.users.getUserDetail.TampilkanLembur, 
      TampilkanTerlambat : state.users.getUserDetail.TampilkanTerlambat,
    }
  };
};

class FormComponent extends Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <FormGroup row>
          <Col md={4}>
            <FormGroup>
              <Field
                type="text"
                name="Nama"
                component={renderField}
                label="Nama Pegawai :"
              />
            </FormGroup>
          </Col>

          <Col md={5}>
            <FormGroup>
              <Field
                type="text"
                name="Alamat"
                component={renderField}
                label="Alamat Pegawai :"
              />
            </FormGroup>
          </Col>

          <Col md={3}>
            <FormGroup>
              <Field
                type="date"
                name="TglLahir"
                component={renderField}
                label="Tanggal Lahir :"
              />
            </FormGroup>
          </Col>

          <Col md={3}>
            <FormGroup>
              <Field
                type="number"
                name="HP"
                component={renderField}
                label="Nomor HP Pegawai :"
              />
            </FormGroup>
          </Col>


          <Col md={3}>
            <FormGroup>
              <Field
                type="text"
                name="GroupID"
                component={renderField}
                label="Group :"
              />
            </FormGroup>
          </Col>

          <Col md={3}>
            <FormGroup>
              <Field
                type="text"
                name="Posisi"
                component={renderField}
                label="Posisi :"
              />
            </FormGroup>
          </Col>
          
          <Col md={3}>
            <FormGroup>
              <Field
                type="text"
                name="KodeCabang"
                component={renderField}
                label="Kode Cabang :"
              />
            </FormGroup>
          </Col>

          <Col md={2}>
            <FormGroup>
              <Field
                type="CheckBox"
                name="TampilkanLembur"
                component={renderField}
                label="Tampilkan Lembur :"
              />
            </FormGroup>
          </Col>

          <Col md={2}>
            <FormGroup>
            <Field
                type="CheckBox"
                name="TampilkanTerlambat"
                component={renderField}
                label="Tampilkan Terlambat :"
              />
            </FormGroup>
          </Col>

          <Col md={2}>
            <FormGroup>
              <Field
                type="CheckBox"
                name="Status"
                component={renderField}
                label="Status :"
              />
            </FormGroup>
          </Col>

          <Col md={4}>
            <FormGroup>
              <Field
                type="date"
                name="TglMasuk"
                component={renderField}
                label="Tanggal Masuk :"
              />
            </FormGroup>
          </Col>

          <Col md={4}>
            <FormGroup>
              <Field
                type="date"
                name="TglAwalKontrakPertama"
                component={renderField}
                label="Tanggal Awal Kontrak :"
              />
            </FormGroup>
          </Col>

          <Col md={4}>
            <FormGroup>
              <Field
                type="date"
                name="TglMulaiCuti"
                component={renderField}
                label="Tanggal Mulai Cuti:"
              />
            </FormGroup>
          </Col>

  

          <Col md={4}>
            <FormGroup>
              <Field
                type="text"
                name="UserID"
                component={renderField}
                label="UserID:"
              />
            </FormGroup>
          </Col>

          <Col md={4}>
            <FormGroup>
              <Field
                type="text"
                name="Pass"
                component={renderField}
                label="PIN Password :"
              />
            </FormGroup>
          </Col>

          <Col md={4}>
            <FormGroup>
              <Field
                type="select"
                name="RoleID"
                component={renderField}
                label="Akses Karyawan :"
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

FormComponent = reduxForm({
  form: "formCreateUser",
  validate: UserValidation,
  asyncValidate: AsyncVUser,
  asyncBlurFields : ['UserID'] ,
  enableReinitialize: true,
})(FormComponent);
export default connect(mapStateToProps, null)(FormComponent);
