import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { FormGroup, Col, Label, Input, Row, Button } from "reactstrap";
import UserValidation from "../validations/UserValidation";
import { InputRenderComponent } from './InputRenderComponent';
import { SelectRenderComponent } from './SelectRenderComponent';

const mapStateToProps = (state) => {
    var option = [{value:"all", label:"Semua Karyawan"}];
    option = option.concat(state.Opt.getOptUser);

    return {
        // getOptUser: state.Opt.getOptUser,
        getOptUser: option,
        initialValues: {
            Nama : state.History.defNama,
            TglAwal: state.History.defTglAwal,
            TglAkhir: state.History.defTglAkhir
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
                                label="TglAbsen Awal"
                            />
                        </FormGroup>
                    </Col>
                    <Col md={3}>
                        <FormGroup>
                            <Field
                                type="date"
                                name="TglAkhir"
                                component={InputRenderComponent}
                                label="TglAbsen Akhir"
                            />
                        </FormGroup>
                    </Col>

                    <Col md="2">
                        <FormGroup>
                            <Label md={12} className="text-warning">.</Label>
                            <Button
                                color="info"
                                type="submit"
                                block
                                disabled={this.props.submitting}
                            >
                                Filter
                            </Button>
                        </FormGroup>
                    </Col>
                </FormGroup>

                <FormGroup row>
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
    validate: FilterValidation,
    enableReinitialize: true,
})(HistoryFilterComponent);
export default connect(mapStateToProps, null)(HistoryFilterComponent);