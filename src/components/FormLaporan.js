import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { FormGroup, Col, Label, Input, Row, Button, Alert } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
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
      >
      </Input>
      {touched &&
        ((error && <p style={{ color: "red" }}>{error}</p>) ||
          (warning && <p style={{ color: "brown" }}>{warning}</p>))}
    </Col>
  </Row>
);

const mapStateToProps = (state) => {
  return {
    initialValues: {
      UserID: state.users.getUserDetail.UserID,
      Nama: state.users.getUserDetail.Nama
    },
  };
};

class FormLaporan extends Component {
  render() {
    return (
      <form onSubmit={this.props.detaillap}>
        <FormGroup row>
          <Col md={12}>
            <Alert color="danger">
              Detail Data User
            </Alert>
          </Col>


          <Col md={3}>
            <FormGroup>
              <Field
                type="text"
                name="UserID"
                disabled
                component={renderField}
                label="ID :"
              />
            </FormGroup>
          </Col>

        

          <Col md={3}>
            <FormGroup>
              <Field
                type="text"
                name="Nama"
                disabled
                component={renderField}
                label="Nama:"
              />
            </FormGroup>
          </Col>

          <Col md={3}>
            <FormGroup>
              <Field
                type="date"
                name="TanggalAwal"
                component={renderField}
                label="Tanggal Awal:"
              />
            </FormGroup>
          </Col>

          <Col md={3}>
            <FormGroup>
              <Field
                type="date"
                name="TanggalAkhir"
                component={renderField}
                label="Tanggal Akhir :"
              />
            </FormGroup>
          </Col>


         

        </FormGroup>

        <FormGroup row>
          <Col md="12">
            <FormGroup>

              <Link to={"laporan/"}>
              <Button color="warning" className="mr-2">
                <FontAwesomeIcon icon={faSave} /> Print
              </Button>
            </Link>
            </FormGroup>
          </Col>
        </FormGroup>
      </form>
    );
  }
}

FormLaporan = reduxForm({
  form: "formLaporan",
  enableReinitialize: true,
})(FormLaporan);
export default connect(mapStateToProps, null)(FormLaporan);
