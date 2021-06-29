import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { FormGroup, Col, Label, Input, Row, Button } from "reactstrap";
import AdminValidation from "../validations/AdminValidation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { InputFieldComponentHrz } from "./formController/InputFieldComponentHrz";
import { SelectFieldComponentHrz } from "./formController/SelectFieldComponentHrz";

const mapStateToProps = (state) => {

   let valKodeCabang = null;
   if(state.Opt.getOptCabang){
      state.Opt.getOptCabang.map((data) =>{
         if(data.value == state.Admin.getAdminDetail.KodeCabang){
            valKodeCabang = data;
            return;
         }
      })

   }
   // console.log(state.Admin.getAdminDetail);
   return {
      getOptUser: state.Opt.getOptUser,
      getOptCabang: state.Opt.getOptCabang,
      initialValues: {
         AdminID: state.Admin.getAdminDetail.AdminID,
         Username: state.Admin.getAdminDetail.Username,
         TanggalCreate: state.Admin.getAdminDetail.TanggalCreate,
         Password: state.Admin.getAdminDetail.Password,
         KodeCabang: valKodeCabang
      },
   };
};

class FormAdminComponent extends Component {
   render() {
      return (
         <form onSubmit={this.props.handleSubmit}>
            <FormGroup row>
               <Col md={6}>
                  <FormGroup>
                     <Field
                        type="text"
                        name="KodeCabang"
                        options={this.props.getOptCabang}
                        component={SelectFieldComponentHrz}
                        label="Cabang :"
                        isDisabled ={this.props.editing}
                     />
                  </FormGroup>
                  <FormGroup>
                     <Field
                        type="text"
                        name="Username"
                        component={InputFieldComponentHrz}
                        label="Username :"
                        
                     />
                  </FormGroup>

                  <FormGroup>
                     <Field
                        type="password"
                        name="Password"
                        component={InputFieldComponentHrz}
                        label="Password :"
                     />
                  </FormGroup>

                  <FormGroup>
                     <Field
                        type="date"
                        name="TanggalCreate"
                        component={InputFieldComponentHrz}
                        disabled
                        label="Tanggal Create :"
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

FormAdminComponent = reduxForm({
   form: "formCreateAdmin",
   validate: AdminValidation,
   enableReinitialize: true,
})(FormAdminComponent);
export default connect(mapStateToProps, null)(FormAdminComponent);
