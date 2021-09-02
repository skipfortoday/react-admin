import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { FormGroup, Col, Label, Input, Row, Button } from "reactstrap";
import AdminValidation from "../validations/AdminValidation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { InputFieldComponentHrz } from "./formController/InputFieldComponentHrz";
import { SelectFieldComponentHrz } from "./formController/SelectFieldComponentHrz";
import { SelectMultipleFieldComponentHrz } from "./formController/SelectMultipleFieldComponentHrz";

const mapStateToProps = (state) => {

   let RoleAdmins = [
      {value:99, label:"SUPERADMIN"},
      {value:1, label:"ADMIN"},
      {value:2, label:"SUPERVISOR"}
   ]

   let roleSet = {}
   let cabangSet = []
   let allCabang = [{value:"PST", label:"PUSAT"}]
   if(state.Admin.getAdminDetail){
      RoleAdmins.map((item)=>{
         if(item.value === state.Admin.getAdminDetail.RoleAdmin ){
            roleSet = item
            return
         }
      })
      let kcs = state.Admin.getAdminDetail.KodeCabang.split(",")
      if(state.Opt.getOptCabang){
         state.Opt.getOptCabang.map(item=>allCabang.push(item))
         allCabang.map((item)=>{
            if(kcs.includes(item.value)) cabangSet.push({value:item.value, label:item.label})
         })
      }
   }

   // console.log(state.Admin.getAdminDetail);
   
   return {
      optionRoleAdmin:RoleAdmins,
      getOptUser: state.Opt.getOptUser,
      getOptCabang: allCabang,
      roleSet:roleSet,
      cabangSet:cabangSet,
      initialValues: {
         AdminID: state.Admin.getAdminDetail.AdminID,
         Username: state.Admin.getAdminDetail.Username,
         TanggalCreate: state.Admin.getAdminDetail.TanggalCreate,
         Password: state.Admin.getAdminDetail.Password,
         KodeCabang: cabangSet,
         RoleAdmin : roleSet,
         Nama : state.Admin.getAdminDetail.Nama,
         Status : {value: state.Admin.getAdminDetail.Status, label:state.Admin.getAdminDetail.Status}
      },
   };
};

class FormAdminComponent extends Component {
   render() {
      console.log(this.props.cabangSet)
      return (
         <form onSubmit={this.props.handleSubmit}>
            <FormGroup row>
               <Col md={6}>
                  <FormGroup>
                     <Field
                        type="text"
                        name="Nama"
                        component={InputFieldComponentHrz}
                        label="Nama :"
                        
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

                  

                  <FormGroup hidden>
                     <Field
                        type="date"
                        name="TanggalCreate"
                        component={InputFieldComponentHrz}
                        disabled
                        label="Tanggal Create :"
                     />
                  </FormGroup>
               </Col>
               <Col md={6}>
                  <FormGroup>
                     <Field
                        type="text"
                        name="KodeCabang"
                        options={this.props.getOptCabang}
                        component={SelectMultipleFieldComponentHrz}
                        label="Cabang :"
                        isDisabled ={this.props.editing || this.props.disabled}
                        
                     />
                  </FormGroup>
                  <FormGroup>
                     <Field
                        type="text"
                        name="RoleAdmin"
                        options={this.props.optionRoleAdmin}
                        component={SelectFieldComponentHrz}
                        label="Role Admin :"
                        isDisabled={this.props.disabled}
                     />
                  </FormGroup>
                  <FormGroup>
                     <Field
                        type="text"
                        name="Status"
                        options={[{value:"AKTIF", label:"AKTIF"}, {value:"NONAKTIF", label:"NONAKTIF"}]}
                        component={SelectFieldComponentHrz}
                        label="Status Admin :"
                        disabled={this.props.readOnly}
                        isDisabled={this.props.disabled}
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
