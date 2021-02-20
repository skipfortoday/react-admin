import React, { Component } from "react";
import { reduxForm, Field} from "redux-form";
import { connect } from "react-redux";
import Select from 'react-select';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchPlus } from "@fortawesome/free-solid-svg-icons";
import {
  FormGroup,
  Col,
  Label,
  Input,
  Row,
  Container,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";


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
      ></Input>
      {touched &&
        ((error && <p style={{ color: "red" }}>{error}</p>) ||
          (warning && <p style={{ color: "brown" }}>{warning}</p>))}
    </Col>
  </Row>
);

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
    getOptUser : state.Opt.getOptUser,
    Nama : state.Opt.getOptUser,
    initialValues: {
      UserID: state.users.getUserDetail.UserID,
      Nama : {value : state.users.getUserDetail.GroupID, label: state.users.getUserDetail.Jabatan},
    },
  };
};

class LengkapiAbsenCreate extends Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
          
        <Container>
          <FormGroup row>
            <Row>
            <Col md={6}>
              <FormGroup>
                <Field
                  name="Nama"
                  component={renderField2}
                  label="Nama:"
                  options={this.props.getOptUser}
                />
              </FormGroup>
            </Col>

            <Col md={3}>
              <FormGroup>
                <Field
                  type="date"
                  name="TglAwal"
                  component={renderField}
                  label="Tanggal Awal:"
                />
              </FormGroup>
            </Col>

            <Col md={3}>
              <FormGroup>
                <Field
                  type="date"
                  name="TglAkhir"
                  component={renderField}
                  label="Tanggal Akhir :"
                />
              </FormGroup>
            </Col>

          
            </Row>
          </FormGroup>
        </Container>
      </form>
    );
  }
}



LengkapiAbsenCreate = reduxForm({
  form: "formLengkapiAbsenCreate",
  enableReinitialize: true,
})(LengkapiAbsenCreate);
export default connect(mapStateToProps, null)(LengkapiAbsenCreate);
