import React, { Component } from "react";
import { reduxForm, Field} from "redux-form";
import { connect } from "react-redux";
import Select from 'react-select';
import {
  FormGroup,
  Col,
  Label,
  Input,
  Row,
  Container,
} from "reactstrap";
import SelectValidation from "../validations/SelectValidation";



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
          placeholder="Pilih Group"
          disabled={disabled}
          readOnly={readOnly}
          options={options}
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
    getOptTerlambat: state.Opt.getOptTerlambat,
    initialValues: {
      Nama : {value : state.users.getUserDetail.UserID, label: state.users.getUserDetail.Nama},
    },
  };
};

class FormTerlambat extends Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
          
        <Container>
          <FormGroup row>
              <FormGroup>
              <Row>
                <Col md={12}>
                <Field
                  name="Nama"
                  component={renderField2}
                  label="Nama:"
                  options={this.props.getOptTerlambat}
                />
                </Col>
            </Row>
              </FormGroup>

          </FormGroup>
        </Container>
      </form>
    );
  }
}


 
FormTerlambat = reduxForm({
  form: "FormTerlambat",
  validate: SelectValidation,
  enableReinitialize: true,
})(FormTerlambat);
export default connect(mapStateToProps, null)(FormTerlambat);
