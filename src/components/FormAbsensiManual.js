import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { FormGroup, Col, Label, Input, Row, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFingerprint, faSave } from "@fortawesome/free-solid-svg-icons";
import AbsensiManualValidation from "../validations/AbsensiManualValidation";
import Select from 'react-select';
import { SelectFieldComponent } from "./formController/SelectFieldComponent";
import { InputFieldComponent } from "./formController/InputFieldComponent";

const mapStateToProps = (state) => {
   let initNama = state.Opt.getAfterFinger ? 
      state.Opt.getAfterFinger.status == 1 ? 
         {
            value:state.Opt.getAfterFinger.UserID,
            label:state.Opt.getAfterFinger.UserID +" - "+ state.Opt.getAfterFinger.Nama
         } 
      : null : null;
   let initShift = state.Opt.getAfterFinger ? 
   state.Opt.getAfterFinger.status == 1 && state.Opt.getAfterFinger.DefaultShift ? 
      {
         value:state.Opt.getAfterFinger.DefaultShift,
         label:"Shift "+ state.Opt.getAfterFinger.DefaultShift
      } 
   : null : null;
   return {
      getOptUserManual: state.Opt.getOptUserManual,
      initialValues: {
         Nama: initNama,
         Shift:initShift,
         DefaultShift:state.Opt.getAfterFinger.DefaultShift ? 
         state.Opt.getAfterFinger.DefaultShift : 100,
         IsFP : state.Opt.getAfterFinger ? 1: 0 
      }
   };
};

class FormAbsensiManual extends Component {
   
   render() {
      let Shift = [
         {"label":"Shift 1", "value":"1"},
         {"label":"Shift 2", "value":"2"},
         {"label":"Shift 3", "value":"3"},
      ]

   
      return (
         <form onSubmit={this.props.handleSubmit}>

            <FormGroup>
               <Row>
                  
                  <Col md={4} className="text-center">
                     <div 
                        onClick={this.props.onclick}
                        style={{
                        cursor:"pointer",
                        border:"4px solid #FFF",
                        width:"160px",
                        height:"180px",
                        padding:"20px",
                        margin:"20px auto 10px auto",
                        position:"relative",
                        overflow:"hidden",
                        borderColor:this.props.borderColor
                        
                     }}>
                        <FontAwesomeIcon 
                           style={{
                              marginTop:"40px",
                              color: "#fff",
                              fontSize:"60px",
                           }}
                           icon={faFingerprint}/>
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

                              />: ''}
                        <div style={{
                           padding:"5px",
                           color:"#fff",
                           fontWeight:"bolder"
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
                                 options={this.props.getOptUserManual}
                                 label="Nama:"
                                 placeholder="Pilih Nama"
                              />
                           </FormGroup>
                        </Col>

                        <Col md={4}>
                           <FormGroup>
                              <Field
                                 type="select"
                                 name="Shift"
                                 component={SelectFieldComponent}
                                 label="Shift :"
                                 options={Shift}
                                 placeholder="Pilih Shift"
                              />
                           </FormGroup>
                           <FormGroup hidden>
                              <Field
                                 type="number"
                                 name="DefaultShift"
                                 component={InputFieldComponent}
                              />
                           </FormGroup>
                           <FormGroup hidden>
                              <Field
                                 type="number"
                                 name="IsFP"
                                 component={InputFieldComponent}
                              />
                           </FormGroup>
                        </Col>

                        <Col md={8}>
                           <FormGroup>
                              <Field
                                 type="text"
                                 name="Keterangan"
                                 component={InputFieldComponent}
                                 label="Keterangan :"
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

FormAbsensiManual = reduxForm({
   form: "FormAbsensiManual",
   validate: AbsensiManualValidation,
   enableReinitialize: true,
})(FormAbsensiManual);
export default connect(mapStateToProps, null)(FormAbsensiManual);
