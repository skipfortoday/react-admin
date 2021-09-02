import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { FormGroup, Col, Label, Input, Row, Button } from "reactstrap";
import CabangValidation from "../validations/CabangValidation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { InputFieldComponentHrz } from "./formController/InputFieldComponentHrz";

const mapStateToProps = (state) => {

   return {
      initialValues: {
         KodeCabang: state.Cabang.getCabangDetail.KodeCabang,
         NamaCabang: state.Cabang.getCabangDetail.NamaCabang,
         Alamat: state.Cabang.getCabangDetail.Alamat,
         NoTelp: state.Cabang.getCabangDetail.NoTelp,
         IP:state.Cabang.getCabangDetail.IP,
         MaxAccLupaAbsen:state.Cabang.getCabangDetail.MaxAccLupaAbsen
      },
   };
};

class FormCabangComponent extends Component {
   render() {
      return (
         <form onSubmit={this.props.handleSubmit}>

            <FormGroup row>
               <Col md={6}>
                  <FormGroup>
                     <Field
                        type="text"
                        name="KodeCabang"
                        component={InputFieldComponentHrz}
                        label="Kode Cabang"
                     />
                  </FormGroup>

                  <FormGroup>
                     <Field
                        type="text"
                        name="NamaCabang"
                        component={InputFieldComponentHrz}
                        label="Nama Cabang"
                     />
                  </FormGroup>

                  <FormGroup>
                     <Field
                        type="textarea"
                        name="Alamat"
                        component={InputFieldComponentHrz}
                        label="Alamat Cabang"
                     />
                  </FormGroup>

                  <FormGroup>
                     <Field
                        type="text"
                        name="NoTelp"
                        component={InputFieldComponentHrz}
                        label="Nomor Telepon"
                     />
                  </FormGroup>

                  <FormGroup>
                     <Field
                        type="text"
                        name="MaxAccLupaAbsen"
                        component={InputFieldComponentHrz}
                        label="Max Acc Lupa Absen"
                     />
                  </FormGroup>
               </Col>
               <Col md={6}>
               <FormGroup>
                     <Field
                        type="text"
                        name="IP"
                        component={InputFieldComponentHrz}
                        label="IP"
                     />
                  </FormGroup>
                  <FormGroup>
                     <Field
                        type="password"
                        name="Password"
                        component={InputFieldComponentHrz}
                        label="Password"
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

FormCabangComponent = reduxForm({
   form: "formCreateCabang",
   validate: CabangValidation,
   enableReinitialize: true,
})(FormCabangComponent);
export default connect(mapStateToProps, null)(FormCabangComponent);
