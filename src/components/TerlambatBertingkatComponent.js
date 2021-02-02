import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { FormGroup, Col, Label, Input, Row, Button, Alert } from "reactstrap";
import GroupValidation from "../validations/GroupValidation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";

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
        <option value="0">-</option>
        <option value="MONDAY">SENIN</option>
        <option value="TUESDAY">SELASA</option>
        <option value="WEDNESDAY">RABU</option>
        <option value="THURSDAY">KAMIS</option>
        <option value="FRIDAY">JUMAT</option>
        <option value="SATURDAY">SABTU</option>
        <option value="SUNDAY">MINGGU</option>
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

class TerlambatBertingkatComponent extends Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <FormGroup row>
          <Col md={12}>
            <Alert color="danger">
              Masukkan Group ID untuk Kode & Nama Group / Nama Jabatan (WAJIB)
            </Alert>
          </Col>

          <Col md={4}>
            <FormGroup>
              <Field
                type="text"
                name="GroupID"
                component={renderField}
                label="Group ID :"
                disabled
              />
            </FormGroup>
          </Col>

          <Col md={4}>
            <FormGroup>
              <Field
                type="text"
                name="Jabatan"
                component={renderField}
                label="Nama Group :"
                disabled
              />
            </FormGroup>
          </Col>

          
          <Col md={4}>
          </Col>

          <Col md={4}>
            <Alert color="info">Terlambat Bertingkat Shift 1</Alert>
          </Col>

          <Col md={4}>
            <Alert color="warning">Terlambat Bertingkat Shift 2</Alert>
          </Col>

          <Col md={4}>
            <Alert color="danger">Terlambat Bertingkat Shift 3</Alert>
          </Col>

          <Col md={2}>
            <FormGroup>
              <Field
                type="time"
                name="JamDatang"
                component={renderField}
                label="Jam :"
              />
            </FormGroup>
          </Col>

          <Col md={2}>
            <FormGroup>
              <Field
                type="number"
                name="JamDatang"
                component={renderField}
                label="Potongan :"
              />
            </FormGroup>
          </Col>

          <Col md={2}>
            <FormGroup>
              <Field
                type="time"
                name="JamDatang"
                component={renderField}
                label="Jam :"
              />
            </FormGroup>
          </Col>

          <Col md={2}>
            <FormGroup>
              <Field
                type="number"
                name="JamDatang"
                component={renderField}
                label="Potongan :"
              />
            </FormGroup>
          </Col>

          <Col md={2}>
            <FormGroup>
              <Field
                type="time"
                name="JamDatang"
                component={renderField}
                label="Jam :"
              />
            </FormGroup>
          </Col>

          <Col md={2}>
            <FormGroup>
              <Field
                type="number"
                name="JamDatang"
                component={renderField}
                label="Potongan :"
              />
            </FormGroup>
          </Col>

          <Col md={2}>
            <FormGroup>
              <Field
                type="time"
                name="JamDatang"
                component={renderField}
                label="Jam :"
              />
            </FormGroup>
          </Col>

          <Col md={2}>
            <FormGroup>
              <Field
                type="number"
                name="JamDatang"
                component={renderField}
                label="Potongan :"
              />
            </FormGroup>
          </Col>

          <Col md={2}>
            <FormGroup>
              <Field
                type="time"
                name="JamDatang"
                component={renderField}
                label="Jam :"
              />
            </FormGroup>
          </Col>

          <Col md={2}>
            <FormGroup>
              <Field
                type="number"
                name="JamDatang"
                component={renderField}
                label="Potongan :"
              />
            </FormGroup>
          </Col>

          <Col md={2}>
            <FormGroup>
              <Field
                type="time"
                name="JamDatang"
                component={renderField}
                label="Jam :"
              />
            </FormGroup>
          </Col>

          <Col md={2}>
            <FormGroup>
              <Field
                type="number"
                name="JamDatang"
                component={renderField}
                label="Potongan :"
              />
            </FormGroup>
          </Col>


          <Col md={2}>
            <FormGroup>
              <Field
                type="time"
                name="JamDatang"
                component={renderField}
                label="Jam :"
              />
            </FormGroup>
          </Col>

          <Col md={2}>
            <FormGroup>
              <Field
                type="number"
                name="JamDatang"
                component={renderField}
                label="Potongan :"
              />
            </FormGroup>
          </Col>

          <Col md={2}>
            <FormGroup>
              <Field
                type="time"
                name="JamDatang"
                component={renderField}
                label="Jam :"
              />
            </FormGroup>
          </Col>

          <Col md={2}>
            <FormGroup>
              <Field
                type="number"
                name="JamDatang"
                component={renderField}
                label="Potongan :"
              />
            </FormGroup>
          </Col>

          <Col md={2}>
            <FormGroup>
              <Field
                type="time"
                name="JamDatang"
                component={renderField}
                label="Jam :"
              />
            </FormGroup>
          </Col>

          <Col md={2}>
            <FormGroup>
              <Field
                type="number"
                name="JamDatang"
                component={renderField}
                label="Potongan :"
              />
            </FormGroup>
          </Col>

          <Col md={2}>
            <FormGroup>
              <Field
                type="time"
                name="JamDatang"
                component={renderField}
                label="Jam :"
              />
            </FormGroup>
          </Col>

          <Col md={2}>
            <FormGroup>
              <Field
                type="number"
                name="JamDatang"
                component={renderField}
                label="Potongan :"
              />
            </FormGroup>
          </Col>

          <Col md={2}>
            <FormGroup>
              <Field
                type="time"
                name="JamDatang"
                component={renderField}
                label="Jam :"
              />
            </FormGroup>
          </Col>

          <Col md={2}>
            <FormGroup>
              <Field
                type="number"
                name="JamDatang"
                component={renderField}
                label="Potongan :"
              />
            </FormGroup>
          </Col>

          <Col md={2}>
            <FormGroup>
              <Field
                type="time"
                name="JamDatang"
                component={renderField}
                label="Jam :"
              />
            </FormGroup>
          </Col>

          <Col md={2}>
            <FormGroup>
              <Field
                type="number"
                name="JamDatang"
                component={renderField}
                label="Potongan :"
              />
            </FormGroup>
          </Col>

          <Col md={2}>
            <FormGroup>
              <Field
                type="time"
                name="JamDatang"
                component={renderField}
                label="Jam :"
              />
            </FormGroup>
          </Col>

          <Col md={2}>
            <FormGroup>
              <Field
                type="number"
                name="JamDatang"
                component={renderField}
                label="Potongan :"
              />
            </FormGroup>
          </Col>

          <Col md={2}>
            <FormGroup>
              <Field
                type="time"
                name="JamDatang"
                component={renderField}
                label="Jam :"
              />
            </FormGroup>
          </Col>

          <Col md={2}>
            <FormGroup>
              <Field
                type="number"
                name="JamDatang"
                component={renderField}
                label="Potongan :"
              />
            </FormGroup>
          </Col>

          <Col md={2}>
            <FormGroup>
              <Field
                type="time"
                name="JamDatang"
                component={renderField}
                label="Jam :"
              />
            </FormGroup>
          </Col>

          <Col md={2}>
            <FormGroup>
              <Field
                type="number"
                name="JamDatang"
                component={renderField}
                label="Potongan :"
              />
            </FormGroup>
          </Col>

          <Col md={2}>
            <FormGroup>
              <Field
                type="time"
                name="JamDatang"
                component={renderField}
                label="Jam :"
              />
            </FormGroup>
          </Col>

          <Col md={2}>
            <FormGroup>
              <Field
                type="number"
                name="JamDatang"
                component={renderField}
                label="Potongan :"
              />
            </FormGroup>
          </Col>

          <Col md={2}>
            <FormGroup>
              <Field
                type="time"
                name="JamDatang"
                component={renderField}
                label="Jam :"
              />
            </FormGroup>
          </Col>

          <Col md={2}>
            <FormGroup>
              <Field
                type="number"
                name="JamDatang"
                component={renderField}
                label="Potongan :"
              />
            </FormGroup>
          </Col>

          <Col md={2}>
            <FormGroup>
              <Field
                type="time"
                name="JamDatang"
                component={renderField}
                label="Jam :"
              />
            </FormGroup>
          </Col>

          <Col md={2}>
            <FormGroup>
              <Field
                type="number"
                name="JamDatang"
                component={renderField}
                label="Potongan :"
              />
            </FormGroup>
          </Col>
        </FormGroup>

        <FormGroup row>
          <Col md="12">
            <FormGroup>
              <Button
                color="primary"
                type="submit"
                disabled={this.props.submitting}
              >
                <FontAwesomeIcon icon={faSave} /> SIMPAN
              </Button>
            </FormGroup>
          </Col>
        </FormGroup>
      </form>
    );
  }
}

TerlambatBertingkatComponent = reduxForm({
  form: "formTerlambatBertingkat",
  validate: GroupValidation,
  enableReinitialize: true,
})(TerlambatBertingkatComponent);
export default connect(mapStateToProps, null)(TerlambatBertingkatComponent);
