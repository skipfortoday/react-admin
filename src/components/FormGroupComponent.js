import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { FormGroup, Col, Label, Input, Row, Button } from "reactstrap";
import GroupValidation from "../validations/GroupValidation";

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

const mapStateToProps = (state) => {
  return {
    initialValues: {
      GroupID: state.Group.getGroupDetail.GroupID,
      Jabatan: state.Group.getGroupDetail.Jabatan,
      JamDatang: state.Group.getGroupDetail.JamDatang,
      JamPulang: state.Group.getGroupDetail.JamPulang,
      MaxJamDatang: state.Group.getGroupDetail.MaxJamDatang,
      MinJamLembur: state.Group.getGroupDetail.MinJamLembur,
      JamDatangSiang: state.Group.getGroupDetail.JamDatangSiang,
      JamPulangSiang: state.Group.getGroupDetail.JamPulangSiang,
      MaxJamDatangSiang: state.Group.getGroupDetail.MaxJamDatangSiang,
      MinJamLemburSiang: state.Group.getGroupDetail.MinJamLemburSiang,
      JamDatangSore: state.Group.getGroupDetail.JamDatangSore,
      JamPulangSore: state.Group.getGroupDetail.JamPulangSore,
      MaxJamDatangSore: state.Group.getGroupDetail.MaxJamDatangSore,
      MinJamLemburSore: state.Group.getGroupDetail.MinJamLemburSore,
      HariLibur: state.Group.getGroupDetail.HariLibur,
      RpLemburPerJam: state.Group.getGroupDetail.RpLemburPerJam,
      RpPotonganTerlambat: state.Group.getGroupDetail.RpPotonganTerlambat,
      RpPotonganTidakMasuk: state.Group.getGroupDetail.RpPotonganTidakMasuk,
    },
  };
};

class FormGroupComponent extends Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <FormGroup row>
          <Col md={6}>
            <FormGroup>
              <Field
                type="text"
                name="GroupID"
                component={renderField}
                label="Group ID :"
              />
            </FormGroup>
          </Col>

          <Col md={6}>
            <FormGroup>
              <Field
                type="text"
                name="Jabatan"
                component={renderField}
                label="Nama Group :"
              />
            </FormGroup>
          </Col>

          <Col md={6}>
            <FormGroup>
              <Field
                type="time"
                name="JamDatang"
                component={renderField}
                label="Jam Datang Pagi :"
              />
            </FormGroup>
          </Col>

          <Col md={6}>
            <FormGroup>
              <Field
                type="time"
                name="JamPulang"
                component={renderField}
                label="Jam Pulang Pagi :"
              />
            </FormGroup>
          </Col>

          <Col md={6}>
            <FormGroup>
              <Field
                type="time"
                name="MaxJamDatang"
                component={renderField}
                label="Max Jam Datang Pagi :"
              />
            </FormGroup>
          </Col>

          <Col md={6}>
            <FormGroup>
              <Field
                type="time"
                name="MinJamLembur"
                component={renderField}
                label="Min Jam Lembur Pagi :"
              />
            </FormGroup>
          </Col>

          <Col md={6}>
            <FormGroup>
              <Field
                type="time"
                name="JamDatangSiang"
                component={renderField}
                label="Jam Datang Siang  :"
              />
            </FormGroup>
          </Col>

          <Col md={6}>
            <FormGroup>
              <Field
                type="time"
                name="JamPulangSiang"
                component={renderField}
                label="Jam Pulang Siang :"
              />
            </FormGroup>
          </Col>

          <Col md={6}>
            <FormGroup>
              <Field
                type="time"
                name="MaxJamDatangSiang"
                component={renderField}
                label="Max Jam Datang Siang :"
              />
            </FormGroup>
          </Col>

          <Col md={6}>
            <FormGroup>
              <Field
                type="time"
                name="MinJamLemburSiang"
                component={renderField}
                label="Min Jam Lembur Siang :"
              />
            </FormGroup>
          </Col>

          <Col md={6}>
            <FormGroup>
              <Field
                type="time"
                name="JamDatangSore"
                component={renderField}
                label="Jam Datang Siang  :"
              />
            </FormGroup>
          </Col>

          <Col md={6}>
            <FormGroup>
              <Field
                type="time"
                name="JamPulangSore"
                component={renderField}
                label="Jam Pulang Siang :"
              />
            </FormGroup>
          </Col>

          <Col md={6}>
            <FormGroup>
              <Field
                type="time"
                name="MaxJamDatangSore"
                component={renderField}
                label="Max Jam Datang Siang :"
              />
            </FormGroup>
          </Col>

          <Col md={6}>
            <FormGroup>
              <Field
                type="time"
                name="MinJamLemburSore"
                component={renderField}
                label="Min Jam Lembur Siang :"
              />
            </FormGroup>
          </Col>

          <Col md={6}>
            <FormGroup>
              <Field
                type="text"
                name="HariLibur"
                component={renderField}
                label="Hari Libur :"
              />
            </FormGroup>
          </Col>

          <Col md={6}>
            <FormGroup>
              <Field
                type="number"
                name="RpLemburPerJam"
                component={renderField}
                label="Lembur Perjam :"
              />
            </FormGroup>
          </Col>

          <Col md={6}>
            <FormGroup>
              <Field
                type="number"
                name="RpPotonganTerlambat"
                component={renderField}
                label="Potongan Terlambat :"
              />
            </FormGroup>
          </Col>

          <Col md={6}>
            <FormGroup>
              <Field
                type="number"
                name="RpPotonganTidakMasuk"
                component={renderField}
                label="Potongan Tidak Masuk :"
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
                Submit
              </Button>
            </FormGroup>
          </Col>
        </FormGroup>
      </form>
    );
  }
}

FormGroupComponent = reduxForm({
  form: "formCreateGroup",
  validate: GroupValidation,
  enableReinitialize: true,
})(FormGroupComponent);
export default connect(mapStateToProps, null)(FormGroupComponent);
