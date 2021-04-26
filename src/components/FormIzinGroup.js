import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { FormGroup, Col, Button } from "reactstrap";
import IzinValidation from "../validations/IzinValidation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { formatTglYmd } from "../containers/formatTgl";
import { SelectMultipleFieldComponent } from "./formController/SelectMultipleFieldComponent";
import { InputFieldComponent } from "./formController/InputFieldComponent";
import { SelectFieldComponent } from "./formController/SelectFieldComponent";

const opsi = [
  {value: "OFF", label:"OFF"},
  {value: "CUTI", label:"CUTI"},
  {value: "TIDAK MASUK", label:"IZIN TIDAK MASUK"},
  {value: "SAKIT", label:"SAKIT"},
  {value: "DINAS LUAR", label:"DINAS LUAR"},
  {value: "CUTI BERSAMA", label:"CUTI BERSAMA"},
  {value: "CUTI KHUSUS", label:"CUTI KHUSUS"},
  {value: "LIBUR", label:"LIBUR"},
  {value: "LENGKAPI", label:"LENGKAPI ABSEN"}
]

const mapStateToProps = (state) => {
  return {
    getOptUser : state.Opt.getOptUser,
    initialValues: {
      Nama: state.Opt.getOptUser,
      TanggalScan: formatTglYmd(new Date()),
      TanggalScanSampai: formatTglYmd(new Date())
    },
  };
};

class FormIzinGroup extends Component {
  constructor(props){
    super(props);
    this.state = { 
      
    };
  }

  handleTanggalScanChange(event){
    console.log(event.target.value);
  }
  
  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <FormGroup row>
          <Col md={12}>
            <FormGroup>
              <Field
                name="Nama"
                disabled
                component={SelectMultipleFieldComponent}
                label="Nama:"
                options={this.props.getOptUser}
              />
            </FormGroup>
          </Col>

          <Col md={2}>
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
          <Col md={2}>
            <FormGroup>
              <Field
                type="date"
                name="TanggalScanSampai"
                component={InputFieldComponent}
                label="Tanggal Akhir:"
              />
            </FormGroup>
          </Col>

          <Col md={2}>
            <FormGroup>
              <Field
                type="select"
                name="Status"
                component={SelectFieldComponent}
                label="Tipe  :"
                options={opsi}
              />
            </FormGroup>
          </Col>

          <Col md={4}>
            <FormGroup>
              <Field
                type="text"
                name="Keterangan"
                component={InputFieldComponent}
                label="Keterangan :"
              />
            </FormGroup>
          </Col>
         <Col md={2}>
          <FormGroup>
            {/* <Label> Kirim </Label> */}
              <Button
                style={{marginTop:"35px"}}
                color="dark"
                type="submit"
                disabled={this.props.submitting} 
                className="btn-block"
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

FormIzinGroup = reduxForm({
  form: "formCreateizin",
  validate: IzinValidation,
  enableReinitialize: true,
})(FormIzinGroup);

export default connect(mapStateToProps, null)(FormIzinGroup);
