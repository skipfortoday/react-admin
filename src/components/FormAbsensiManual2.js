import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { FormGroup, Col, Label, Input, Row, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFingerprint, faSave } from "@fortawesome/free-solid-svg-icons";
import AbsensiManualValidation from "../validations/AbsensiManualValidation";
import { SelectFieldComponent } from "./formController/SelectFieldComponent";
import { InputFieldComponent } from "./formController/InputFieldComponent";


const mapStateToProps = (state) => {

  let initNama = state.Opt.getAfterFinger ?
    state.Opt.getAfterFinger.status == 1 ?
      {
        DatangID: state.Opt.getAfterFinger.DatangID,
        value: state.Opt.getAfterFinger.UserID,
        label: state.Opt.getAfterFinger.UserID + " - " + state.Opt.getAfterFinger.Nama
      }
      : null : null;

  return {
    getOptUserManualPulang: state.Opt.getOptUserManualPulang,
    initialValues: {
      Nama: initNama,
      NormalPulang: state.Opt.getAfterFinger ? state.Opt.getAfterFinger.PulangCepat + "" + state.Opt.getAfterFinger.Lembur : "NN"
    }
  };
};



class FormAbsensiManual2 extends Component {
  render() {

    return (
      <form onSubmit={this.props.handleSubmit}>
        <FormGroup>
          <Row>
            <Col md={4} className="text-center">
              <div
                onClick={this.props.onclick}
                style={{
                  cursor: "pointer",
                  border: "4px solid #FFF",
                  width: "160px",
                  height: "180px",
                  padding: "20px",
                  margin: "20px auto 10px auto",
                  position: "relative",
                  overflow: "hidden",
                  borderColor: this.props.borderColor
                }}>
                <FontAwesomeIcon
                  style={{
                    marginTop: "40px",
                    color: this.props.borderColor,
                    fontSize: "60px",
                  }}
                  icon={faFingerprint} />
                {this.props.base64 ?
                  <img
                    src={`data:image/png;base64,${this.props.base64}`}
                    style={{
                      background: "#f00",
                      width: "120%",
                      height: "120%",
                      position: "absolute",
                      left: "-10%",
                      top: "-10%"
                    }}

                  /> : ''}
                <div style={{
                  padding: "5px",
                  color: "#fff",
                  fontWeight: "bolder"
                }}>KLIK DI SINI</div>
              </div>
            </Col>
            <Col md={8}>
              <FormGroup row>
                <Col md={12}>
                  <FormGroup>
                    <Field
                      type="text"
                      name="Nama"
                      component={SelectFieldComponent}
                      options={this.props.getOptUserManualPulang}
                      label="Nama:"
                      placeholder="Pilih Nama"
                    />
                  </FormGroup>
                </Col>
                <Col md={12}>
                  <FormGroup>
                    <Field
                      type="text"
                      name="KetPulang"
                      placeholder="Keterangan Pulang"
                      component={InputFieldComponent}
                      label="Keterangan :"
                    />
                  </FormGroup>
                  <FormGroup hidden>
                    <Field
                      type="text"
                      name="NormalPulang"
                      component={InputFieldComponent}
                    />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Button
                      color="dark"
                      type="submit"
                      disabled={this.props.submitting}
                    > <FontAwesomeIcon icon={faSave} /> SIMPAN
              </Button>
                  </FormGroup>
                </Col>

              </FormGroup>
            </Col>
          </Row>
        </FormGroup>
      </form>
    );
  }
}

FormAbsensiManual2 = reduxForm({
  form: "FormAbsensiManual2",
  validate: AbsensiManualValidation,
  enableReinitialize: true,
})(FormAbsensiManual2);
export default connect(mapStateToProps, null)(FormAbsensiManual2);
