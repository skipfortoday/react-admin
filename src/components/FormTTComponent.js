import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { FormGroup, Col, Label, Input, Row, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import TerlambatValidation from "../validations/TerlambatValidation";
import Select from 'react-select';

const renderField = ({
  input,
  type,
  placeholder,
  label,
  disabled,
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
      <Input
        {...input}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}

      >
        <option value="">-</option>
        <option value="1">Shift 1</option>
        <option value="2">Shift 2</option>
        <option value="3">Shift 3</option>
      </Input>

      {touched &&
        ((error && <p style={{ color: "brown" }}>{error}</p>) ||
          (warning && <p style={{ color: "brown" }}>{warning}</p>))}
    </Col>
  </Row>
);

const renderFieldSelect = ({
  input,
  name,
  id,
  type,
  placeholder,
  label,
  isDisabled,
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
        isDisabled={isDisabled}
        readOnly={readOnly}
        options={options}
        value={input.value}
        // onChange={(value) => input.onChange(value)}
        onChange={input.onChange}

      // onBlur={() => input.onBlur()}
      />
      {touched &&
        ((error && <p style={{ color: "red" }}>{error}</p>) ||
          (warning && <p style={{ color: "brown" }}>{warning}</p>))}
    </Col>
  </Row>
);

const mapStateToProps = (state) => {
  return {
    getOptTerlambat: state.Opt.getOptTerlambat,
    initialValues: {
      GroupJabatan: {
        value: state.Group.getGroupDetail.GroupID ? state.Group.getGroupDetail.GroupID : "",
        label: (state.Group.getGroupDetail.GroupID ? state.Group.getGroupDetail.GroupID : "") + ' - ' + (state.Group.getGroupDetail.Jabatan ? state.Group.getGroupDetail.Jabatan : "")
      },
      RuleID: state.TerlambatBertingkat.getTerlambatBertingkatDetail2.RuleTerlambatBertingkatID,
      Shift: state.TerlambatBertingkat.getTerlambatBertingkatDetail2.Shift,
      MaxJamDatang: state.TerlambatBertingkat.getTerlambatBertingkatDetail2.MaxJamDatang,
      RpPotonganTerlambat: state.TerlambatBertingkat.getTerlambatBertingkatDetail2.RpPotonganTerlambat,
      
    },
  };
};

//let  options = [{ value: 'one', label: 'One' }, { value: 'two', label: 'Two' }];


class FormTTComponent extends Component {

  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <FormGroup row>
          <Col md={1} style={{display:"none"}}>
            <FormGroup>
              <Field
                type="text"
                name="RuleID"
                component={renderField}
                label="RuleID :"
                readOnly
              />
            </FormGroup>
          </Col>

          <Col md={3}>
            <FormGroup>
              <Field
                type="select"
                name="GroupJabatan"
                component={renderFieldSelect}
                label="Group Jabatan :"
                placeholder="Pilih Group Jabatan"
                options={this.props.getOptTerlambat}
                onChange={this.props.JabatanChange}
                isDisabled={this.props.isEditing}
              />
            </FormGroup>
          </Col>

          <Col md={2}>
            <FormGroup>
              <Field
                type="select"
                name="Shift"
                component={renderField}
                label="Shift :"
              />
            </FormGroup>
          </Col>

          <Col md={2}>
            <FormGroup>
              <Field
                type="time"
                name="MaxJamDatang"
                component={renderField}
                label="Max Jam Datang :"
              />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Field
                type="number"
                name="RpPotonganTerlambat"
                component={renderField}
                label="Rp Potongan :"
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

FormTTComponent = reduxForm({
  form: "FormTTComponent",
  validate: TerlambatValidation,
  enableReinitialize: true,
})(FormTTComponent);
export default connect(mapStateToProps, null)(FormTTComponent);
