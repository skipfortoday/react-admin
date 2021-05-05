import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { Button, Col, FormGroup } from 'reactstrap'
import { Component } from 'react'
import { connect } from 'react-redux'
import { InputFieldComponent } from '../components/formController/InputFieldComponent'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import FormConfigValidation from '../validations/FormConfigValidation'
import UserValidation from '../validations/UserValidation'

const mapStateToProps = (state) => {
    let config = JSON.parse(localStorage.getItem('config'));
    return {
        initialValues: {
            KodeCabang:config != null ? config.KodeCabang : '',
            NamaCabang:config != null ? config.NamaCabang : '',
        }
    }
}

class FormConfig extends Component {
    render() {

        return (
            <form onSubmit={this.props.handleSubmit} id="formEditUser" style={{ marginTop: "50px" }}>
                <FormGroup row>
                    <Col md="6">
                        <Col md={12}>
                            <FormGroup>
                                <Field
                                    type="text"
                                    name="KodeCabang"
                                    component={InputFieldComponent}
                                    label="Kode Cabang :"
                                />
                            </FormGroup>
                        </Col>
                        <Col md={12}>
                            <FormGroup>
                                <Field
                                    type="password"
                                    name="Password"
                                    component={InputFieldComponent}
                                    label="Password :"
                                />
                            </FormGroup>
                        </Col>
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
                    </Col>
                </FormGroup>
            </form>
        )
    }
}
FormConfig = reduxForm({
    form: "formConfigx",
    validate: FormConfigValidation,
    enableReinitialize: true
})(FormConfig)

export default connect(mapStateToProps, null)(FormConfig);