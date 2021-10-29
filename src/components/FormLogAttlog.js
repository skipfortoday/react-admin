import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { FormGroup, Col, Label, Button } from "reactstrap";
import { InputRenderComponent } from './InputRenderComponent';
import { SelectRenderComponent } from './SelectRenderComponent';
import SelectValidation from "../validations/SelectValidation";

// initialValues: {
//     Nama : state.History.defNama,
//     TglAwal: state.History.defTglAwal,
//     TglAkhir: state.History.defTglAkhir
// },

const mapStateToProps = (state) => {
    // var option = [{value:"all", label:"Semua Karyawan"}];
    // option = option.concat(state.Opt.getOptUser);
    var option = state.Opt.getOptUser

    return {
        // getOptUser: state.Opt.getOptUser,
        getOptUser: option,
        initialValues: {
            Nama: {
                value: "",
                label: ""
            },
            TglAwal: "",
            TglAkhir: ""
        },
    };
};

class HistoryFilterComponent extends Component {

    render() {
        return (
            // <form onSubmit={this.props.handleSubmitFilter}>
            <form onSubmit={this.props.handleSubmit}>
                <FormGroup row>
                    <Col md={4}>
                        <FormGroup>
                            <Field
                                placeholder="Pilih Pegawai"
                                type="text"
                                name="Nama"
                                component={SelectRenderComponent}
                                options={this.props.getOptUser}
                                label="Nama :"
                            />
                        </FormGroup>
                    </Col>
                    <Col md={3}>
                        <FormGroup>
                            <Field
                                type="date"
                                name="TglAwal"
                                component={InputRenderComponent}
                                label="Mulai Tanggal"
                            />
                        </FormGroup>
                    </Col>
                    <Col md={3}>
                        <FormGroup>
                            <Field
                                type="date"
                                name="TglAkhir"
                                component={InputRenderComponent}
                                label="Sampai Tanggal"
                            />
                        </FormGroup>
                    </Col>

                    <Col md={2}>
                        <FormGroup>
                            <Label md={12} className="text-warning">.</Label>
                            <Button
                                color="info"
                                type="submit"
                                block
                                disabled={this.props.submitting}
                            >
                                Tampilkan Log
                            </Button>
                        </FormGroup>
                    </Col>
                </FormGroup>
            </form>
        );
    }
}

const FilterValidation = (values) => {
    const errors = {};
    if (!values.Nama || values.Nama.value === "") {
        errors.Nama = "Nama harus diisi";
    }
    return errors
};

HistoryFilterComponent = reduxForm({
    form: "formCreateUser",
    validate: SelectValidation,
    enableReinitialize: true,
})(HistoryFilterComponent);
export default connect(mapStateToProps, null)(HistoryFilterComponent);