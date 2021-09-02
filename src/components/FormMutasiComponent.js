import React, { Component } from "react";
import { reduxForm, Field, reset } from "redux-form";
import { connect } from "react-redux";
import { FormGroup, Col, Label, Input, Row, Button, Container } from "reactstrap";
import CabangValidation from "../validations/CabangValidation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHistory, faSave, faTimes, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { SelectFieldComponent } from "./formController/SelectFieldComponent";
import { setPegawaiSelect } from "../actions/cabangAction";
import { InputFieldComponent } from "./formController/InputFieldComponent";

const mapStateToProps = (state) => {

    let opsiPegawai = []
    let opsiCabangAsal = []
    let opsiCabangTujuan = []
    
    let allPegawai = state.users.getUsersList;
    let allCabang = state.Cabang.getCabangList;
    let selectPegawai = state.Cabang.selectPegawai;
    let selectCabangAsal = state.Cabang.selectCabangAsal;

    let selectPegawaiValue = null
    let selectCabangAsalValue = null
    if(allPegawai){
        allPegawai.map((item)=>{
            let pegawai = {value:item.UserID, label: item.NamaLengkap, 
                KodeCabang:item.KodeCabang, NamaCabang:item.NamaCabang}
            opsiPegawai.push(pegawai)
            if(selectPegawai){
                if(selectPegawai.UserID == item.UserID) selectPegawaiValue = pegawai
            }
        })
    }

    if(allCabang){
        allCabang.map((item) => {
            if(selectCabangAsal){
                if(item.KodeCabang != selectCabangAsal.KodeCabang){
                    opsiCabangTujuan.push({value:item.KodeCabang, label : item.KodeCabang + " - " +item.NamaCabang})            
                }
            }else{
                opsiCabangTujuan.push({value:item.KodeCabang, label : item.KodeCabang + " - " +item.NamaCabang})            
            }
        })
    }

    if(selectCabangAsal){
        let cabangAsal = {value:selectCabangAsal.KodeCabang, 
            label: selectCabangAsal.KodeCabang+" - "+selectCabangAsal.NamaCabang}
        opsiCabangAsal.push(cabangAsal)
        selectCabangAsalValue  = cabangAsal
    }

    return {
        opsiPegawai: opsiPegawai,
        opsiCabangAsal: opsiCabangAsal,
        opsiCabangTujuan: opsiCabangTujuan,
        initialValues: {
            pegawai:selectPegawaiValue,
            kodeCabangAsal:selectCabangAsalValue,
            kodeCabangTujuan: null
        },
    };
};

class FormMutasiComponent extends Component {
    handlePegawaiSelect(val){
        this.props.dispatch(setPegawaiSelect(val))
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit} style={{paddingLeft:"20px", paddingRight:"20px"}}>
                <FormGroup row>
                    <Col md={4}>
                        <FormGroup>
                            <Field
                                onChange={(val)=>{this.handlePegawaiSelect(val)}}
                                type="text"
                                name="pegawai"
                                options={this.props.opsiPegawai}
                                component={SelectFieldComponent}
                                label="Pegawai :"
                                isDisabled={this.props.editing}
                            />
                        </FormGroup>
                    </Col>
                    <Col md={4}>
                        <FormGroup>
                            <Field
                                type="text"
                                name="kodeCabangAsal"
                                readOnly={true}
                                options={this.props.opsiCabangAsal}
                                component={SelectFieldComponent}
                                label="Cabang Asal :"
                            />
                        </FormGroup>
                    </Col>
                    <Col md={4}>
                        <FormGroup>
                            <Field
                                type="text"
                                name="kodeCabangTujuan"
                                options={this.props.opsiCabangTujuan}
                                component={SelectFieldComponent}
                                label="Cabang Tujuan :"
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
                            </Button> {"   "}
                            {/* <Button
                                outline color="secondary"
                                type="button"
                                onClick={()=>this.props.dispatch(reset("formCreateizin"))}
                                disabled={this.props.submitting}
                            >
                                <FontAwesomeIcon icon={faTimesCircle} /> RESET
                            </Button> */}
                        </FormGroup>
                    </Col>
                    
                </FormGroup>
            </form>
        );
    }
}

const MutasiValidation = (values) => {
    const errors = {};

    if (!values.pegawai || values.pegawai === "") {
      errors.pegawai = "Pegawai harus diisi";
    }
  
    if (!values.kodeCabangAsal || values.kodeCabangAsal === "") {
      errors.kodeCabangAsal = "Kode Cabang Asal harus diisi";
    }
  
    if (!values.kodeCabangTujuan || values.kodeCabangTujuan === "") {
      errors.kodeCabangTujuan = "Kode Cabang Tujuan harus diisi";
    }
  
    return errors;
  };
  
  

FormMutasiComponent = reduxForm({
    form: "FormMutasiComponent",
    validate: MutasiValidation,
    enableReinitialize: true,
})(FormMutasiComponent);
export default connect(mapStateToProps, null)(FormMutasiComponent);
//this.props.dispatch(reset("formCreateizin")); // requires form name