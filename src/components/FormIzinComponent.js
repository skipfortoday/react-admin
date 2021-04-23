import React, { Component } from "react";
import { reduxForm, Field, change } from "redux-form";
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import { FormGroup, Col, Row, Button } from "reactstrap";
import IzinValidation from "../validations/IzinValidation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

import { InputFieldComponent } from "../components/formController/InputFieldComponent";
import { SelectFieldComponent } from "../components/formController/SelectFieldComponent";
import { CheckboxFieldComponent } from "../components/formController/CheckboxFieldComponent";


const mapStateToProps = (state) => {
  return {
    editJam: state.Izin.editJamForm,
    initialValues: {
      UserID: state.Izin.getIzinDetail.UserID,
      Nama: state.Izin.getIzinDetail.Nama,
      Jabatan: state.Izin.getIzinDetail.Jabatan,
      FTglMulaiCuti: state.Izin.getIzinDetail.FTglMulaiCuti,
      SisaCuti: state.Izin.getIzinDetail.SisaCuti,
      DatangID: state.Izin.getIzinDetailForm.DatangID,
      TanggalScan: state.Izin.getIzinDetailForm.TanggalScan,
      TanggalScanSampai: state.Izin.getIzinDetailForm.TanggalScan,
      Status: {
        value: state.Izin.getIzinDetailForm ? state.Izin.getIzinDetailForm.STATUS : state.Izin.getIzinDetailFormStatus.STATUS,
        label: state.Izin.getIzinDetailForm ? state.Izin.getIzinDetailForm.STATUS : state.Izin.getIzinDetailFormStatus.STATUS
      },
      Shift: {
        value: state.Izin.getIzinDetailForm.Shift,
        label: state.Izin.getIzinDetailForm.Shift
      },
      Keterangan: state.Izin.getIzinDetailForm.Keterangan,
      ScanMasuk: state.Izin.getIzinDetailForm.ScanMasuk,
      ScanPulang: state.Izin.getIzinDetailForm.ScanPulang,
      editJam: state.Izin.editJamForm
    },
    StatusAbsensi:state.Izin.getIzinDetailForm ? state.Izin.getIzinDetailForm.STATUS : state.Izin.getIzinDetailFormStatus.STATUS
  };
};

const mapDispatchToProps = (dispatch) => ({
  updateField: bindActionCreators((field, data) => {
    change("formCreateizin", field, data)
  }, dispatch)
})

class FormIzinComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      StatusOption: [
        { value: '', label: '-' },
        { value: 'LIBUR', label: 'LIBUR' },
        { value: 'MASUK', label: 'MASUK' },
        { value: 'CUTI', label: 'CUTI' },
        { value: 'TIDAK MASUK', label: 'TIDAK MASUK' },
        { value: 'SAKIT', label: 'SAKIT' },
        { value: 'DINAS LUAR', label: 'DINAS LUAR' },
        { value: 'CUTI BERSAMA', label: 'CUTI BERSAMA' },
        { value: 'CUTI KHUSUS', label: 'CUTI KHUSUS' }
      ],
      ShiftOption: [
        { value: '1', label:'Shift 1'},
        { value: '2', label:'Shift 2'},
        { value: '3', label:'Shift 3'}
      ],
      inputJam: false,
      isStatusMasuk: false,
    }
    this.handleStatusChange = this.handleStatusChange.bind(this)

  }

  handleEditTglClick = event => {
    //this.props.dispatch(setEditJamForm(event.target.checked));
    this.setState({
      ...this.state,
      inputJam:event.target.checked
    });
  }

  handleStatusChange(data){
    this.setState({
      ...this.state,
      isStatusMasuk:data.value === "MASUK" ? true : false
    });
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <FormGroup row>
          {/* <div>TEST</div> */}
          <Col md={4} >
            <FormGroup>
              <Field
                type="text"
                name="UserID"
                disabled
                component={InputFieldComponent}
                label="ID :"
              />
            </FormGroup>
          </Col>

          <Col md={4} style={{ display: "none" }}>
            <FormGroup>
              <Field
                type="text"
                name="Nama"
                disabled
                component={InputFieldComponent}
                label="Nama:"
              />
            </FormGroup>
          </Col>

          <Col md={4} style={{ display: "none" }}>
            <FormGroup>
              <Field
                type="text"
                name="Jabatan"
                disabled
                component={InputFieldComponent}
                label="Jabatan:"
              />
            </FormGroup>
          </Col>

          <Col md={4}>
            <FormGroup>
              <Field
                type="text"
                name="FTglMulaiCuti"
                disabled
                component={InputFieldComponent}
                label="Mulai Cuti:"
              />
            </FormGroup>
          </Col>

          <Col md={4}>
            <FormGroup>
              <Field
                type="text"
                name="SisaCuti"
                disabled
                component={InputFieldComponent}
                label="Sisa Cuti:"
              />
            </FormGroup>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md={12} style={{ display: "none" }}>
            <FormGroup>
              <Field
                readOnly="true"
                type="text"
                name="DatangID"
                component={InputFieldComponent}
                label="DatangID:"
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Field
                type="date"
                name="TanggalScan"
                component={InputFieldComponent}
                label="Tanggal:"
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Field
                type="date"
                name="TanggalScanSampai"
                component={InputFieldComponent}
                label="Tanggal:"
              />
            </FormGroup>
          </Col>

          <Col md={5}>
            <FormGroup>
              <Field
                type="select"
                name="Status"
                component={SelectFieldComponent}
                options={this.state.StatusOption}
                label="Tipe  :"
                onChange={this.handleStatusChange}
              />
            </FormGroup>
          </Col>

          <Col md={7}>
            <FormGroup>
              <Field
                type="text"
                name="Keterangan"
                component={InputFieldComponent}
                label="Keterangan :"
              />
            </FormGroup>
          </Col>
          {this.state.isStatusMasuk ? 
            (
              <Col md={4}>
                <FormGroup>
                  <Field
                    name="editJam"
                    type="checkbox"
                    component={CheckboxFieldComponent}
                    label="Perbaiki Jam"
                    onChange={this.handleEditTglClick}
                  /> 
                </FormGroup>
              </Col>
            ) : ("")
          }
         
          <Col md={4} style={{display:"none"}}>
            <FormGroup>
              <Field
                type="text"
                name="editJam"
                component={InputFieldComponent}
              />
            </FormGroup>
          </Col>
        

          {this.state.inputJam ? (
            <Col md="12">
              <Row>
                <Col md={4}>
                  <FormGroup>
                    <Field
                      type="select"
                      name="Shift"
                      component={SelectFieldComponent}
                      options={this.state.ShiftOption}
                      label="Shift :"
                    />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Field
                      type="time"
                      name="ScanMasuk"
                      component={InputFieldComponent}
                      label="Masuk :"
                    />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Field
                      type="time"
                      name="ScanPulang"
                      component={InputFieldComponent}
                      label="Pulang :"
                    />
                  </FormGroup>
                </Col> </Row></Col>) : ''}
          <Col md="12">
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
export default connect(mapStateToProps)(FormIzinComponent);
