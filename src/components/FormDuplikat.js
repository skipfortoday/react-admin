import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { FormGroup, Col, Label, Input, Row, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import Select from 'react-select';

const renderField2 = ({
    input,
    name,
    id,
    type,
    placeholder,
    label,
    disabled,
    options,
    readOnly,
    meta: { touched, error, warning },
}) => (
    <Row>
        <Col md="12">
            <Label htmlFor="{input}" className="col-form-label">
                {label}
            </Label>
        </Col>
        <Col md="12">

            <Select
                {...Input}
                id={id}
                name={name}
                type={type}
                placeholder={placeholder}
                disabled={disabled}
                readOnly={readOnly}
                options={options}
                isMulti
                value={input.value}
                onChange={(value) => input.onChange(value)}
            //onBlur={() => input.onBlur()}
            />
            {touched &&
                ((error && <p style={{ color: "red" }}>{error}</p>) ||
                    (warning && <p style={{ color: "brown" }}>{warning}</p>))}
        </Col>
    </Row>
);

const mapStateToProps = (state) => {
    
    return {
        groupList: state.Opt.getOptTerlambat,
        ruleList: state.TerlambatBertingkat.getTerlambatBertingkatDetail,
        initialValues: {
            GroupID: state.Opt.getOptTerlambat,
            RuleID: state.TerlambatBertingkat.getTerlambatBertingkatDetail
        },
    };
};

class FormDuplikat extends Component {

    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <FormGroup row>
                    <Col md={12}>
                        <FormGroup>
                            <Field
                                name="GroupID"
                                disabled
                                component={renderField2}
                                label="GroupID:"
                                options={this.props.groupList}
                            />
                        </FormGroup>
                    </Col>
                    <Col md={12}>
                        <FormGroup>
                            <Field
                                name="RuleID"
                                disabled
                                component={renderField2}
                                label="RuleID:"
                                options={this.props.ruleList}
                            />
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup >
                            <Button
                                style={{ marginTop: "35px" }}
                                color="dark"
                                type="submit"
                                disabled={this.props.submitting}
                            > <FontAwesomeIcon icon={faSave} /> SIMPAN
                            </Button>
                        </FormGroup>
                    </Col>
                </FormGroup>
            </form>
        );
    }
}

const validasi = (values) => {
    const errors = {};

    if(!values.RuleID || values.RuleID === ""){
        errors.RuleID = "Rule ID harus diisi"
    }

    if(!values.GroupID || values.GroupID === ""){
        errors.GroupID = "Group ID harus diisi"
    }

    return errors;
};

FormDuplikat = reduxForm({
    form: "FormDuplikat",
    validate: validasi,
    enableReinitialize: true,
})(FormDuplikat);
export default connect(mapStateToProps, null)(FormDuplikat);
