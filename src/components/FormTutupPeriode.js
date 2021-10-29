import { faBackward, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Col, FormGroup, Row } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { getDetailPeriode } from '../actions/laporanAction';
import { InputFieldComponent } from './formController/InputFieldComponent';
import { SelectFieldComponent } from './formController/SelectFieldComponent';

let periodes = [
    {value:"202108",label:"Agustus 2021"},
    {value:"202109",label:"September 2021"},
    {value:"202110",label:"Oktober 2021"},
    {value:"202111",label:"Nopember 2021"},
    {value:"202112",label:"Desember 2021"},
    {value:"202201",label:"Januari 2022"},
    {value:"202202",label:"Februari 2022"},
    {value:"202203",label:"Maret 2022"},
    {value:"202204",label:"April 2022"},
    {value:"202205",label:"Mei 2022"},
    {value:"202206",label:"Juni 2022"},
    {value:"202207",label:"Juli 2022"},
    {value:"202208",label:"Agustus 2022"},
    {value:"202209",label:"September 2022"},
    {value:"202210",label:"Oktober 2022"},
    {value:"202211",label:"Nopember 2022"},
    {value:"202212",label:"Desember 2022"},
]

const isSudahPeriode =(periode, list)=>{
    let is = false
    list.map((item)=>{
        
        if(periode == item.Periode){
            is = true
        }
    })

    return is
}

const mapStateToProps=(state)=>{
    let Periode = {value:'', label:''}
    let readOnly = false
    if(state.Laporan.dtlPeriode.Periode){
        periodes.map((item)=>{
            if(item.value === state.Laporan.dtlPeriode.Periode) {
                Periode = item
                readOnly = true
            }
        })
    }

    let periodeBisa = []
    if(state.Laporan.listPeriode){
        periodes.map((item)=>{
            let is = isSudahPeriode(item.value, state.Laporan.listPeriode)
            if(!is){
                // console.log(item)
                periodeBisa.push(item)
            }
        })
    }else{
        periodeBisa = periodes
    }

    return {
        dtlPeriode : state.Laporan.dtlPeriode,
        readOnly : readOnly,
        periodes : periodeBisa,
        initialValues : { 
            Periode : Periode,
            TglAwal : state.Laporan.dtlPeriode.TglAwal,
            TglAkhir : state.Laporan.dtlPeriode.TglAkhir,
            id:state.Laporan.dtlPeriode.id
        }
    }

}

class FormTutupPeriode extends Component {
    batalEditing(){
        this.props.dispatch(getDetailPeriode())
    }

    render() {
        return(
            <form onSubmit={this.props.handleSubmit} id="formEditUser">
                <h5>Form Peridoe</h5>
                {/* {" "+this.props.dtlPeriode.Periode} */}
                <FormGroup row>
                    <FormGroup hidden>
                        <Field
                            type="text"
                            name="id"
                            component={InputFieldComponent}
                            label="Periode :"
                        />
                    </FormGroup>
                    <Col md={12} >
                        <FormGroup>
                            <Field
                                type="text"
                                name="Periode"
                                component={SelectFieldComponent}
                                label="Periode :"
                                options={this.props.periodes}
                                isDisabled={this.props.readOnly}
                            />
                        </FormGroup>
                    </Col>
                    <Col md={12} >
                        <FormGroup>
                            <Field
                                type="date"
                                name="TglAwal"
                                component={InputFieldComponent}
                                label="Tanggal Awal :"
                            />
                        </FormGroup>
                        </Col>
                    <Col md={12} >
                        <FormGroup>
                            <Field
                                type="date"
                                name="TglAkhir"
                                component={InputFieldComponent}
                                label="Tanggal Awal :"
                            />
                        </FormGroup>    
                    </Col>
                    <Col md={12} >
                        <FormGroup style={{float:"left"}}>
                            <Button
                                color="dark"
                                type="submit"
                                disabled={this.props.submitting}
                            >
                                <FontAwesomeIcon icon={faSave} /> {this.props.dtlPeriode ? 'Update' : 'Simpan'}
                            </Button>
                        </FormGroup>
                        {this.props.dtlPeriode ?
                        <FormGroup style={{float:"right"}}>
                            <Button
                                color="secondary"
                                type="button"
                                onClick={()=>{this.batalEditing()}}
                            >
                                <FontAwesomeIcon icon={faTimes} /> Batal
                            </Button>
                        </FormGroup> : ""}
                    </Col>
                    <Col md={4} >
                    </Col>
                </FormGroup>
            </form>            
        )
    }
}

FormTutupPeriode = reduxForm({
    form: "FormTutupPeriode",
    // validate: UserValidation,
    enableReinitialize: true,
})(FormTutupPeriode);

export default connect(mapStateToProps,null)(FormTutupPeriode)