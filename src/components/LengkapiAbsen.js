import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import {
  FormGroup,
  Col,
  Row,
  Container,
  Button
} from "reactstrap";
import SelectValidation from "../validations/SelectValidation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { SelectFieldComponent } from "./formController/SelectFieldComponent";
import { InputFieldComponent } from "./formController/InputFieldComponent";


const mapStateToProps = (state) => {
  return {
    getOptUser: state.Opt.getOptUser,
    initialValues: {
      Nama: { value: state.users.getUserDetail.UserID, label: state.users.getUserDetail.Nama },
      TglAwal: state.Laporan.getLaporanRekap ? state.Laporan.getLaporanRekap.TglAwal : state.Laporan.defTglAwal,
      TglAkhir: state.Laporan.getLaporanRekap ? state.Laporan.getLaporanRekap.TglAkhir : state.Laporan.defTglAkhir
    },
  };
};

class LengkapiAbsen extends Component {
  render() {
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log(event);
    }

    return (
      <form >
        <Container>
          <FormGroup row>
            <Row>

              <Col md={3}>
                <FormGroup>
                  <Field
                    type="date"
                    name="TglAwal"
                    component={InputFieldComponent}
                    label="Tanggal Awal:"
                  />
                </FormGroup>
              </Col>

              <Col md={3}>
                <FormGroup>
                  <Field
                    type="date"
                    name="TglAkhir"
                    component={InputFieldComponent}
                    label="Tanggal Akhir :"
                  />
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Field
                    name="Nama"
                    component={SelectFieldComponent}
                    label="Nama:"
                    options={this.props.getOptUser}
                  />
                </FormGroup>
              </Col>
              <Col md={3}>
                <Row>
                <FormGroup style={{ marginTop: "37px" , marginRight: "70px" }}>
                    <Button
                      onClick={this.props.handleSubmit(values => 
                        this.props.onSubmit({ 
                          ...values,
                          type: 'view'
                        }))}
                      color="dark"
                      type="submit"
                      disabled={this.props.submitting}
                    >
                      <FontAwesomeIcon icon={faSearch} /> View
                    </Button>
                  </FormGroup>

                  <FormGroup style={{ marginTop: "37px" }}>
                    <Button
                     onClick={this.props.handleSubmit(values => 
                      this.props.onSubmit({ 
                        ...values,
                        type: 'proses'
                      }))}
                      color="info"
                      type="submit"
                      disabled={this.props.submitting}
                    >
                      <FontAwesomeIcon icon={faSpinner} /> Lengkapi
                    </Button>
                  </FormGroup> &nbsp;
                </Row>
              </Col>
            </Row>
          </FormGroup>
        </Container>
      </form>
    );
  }
}



LengkapiAbsen = reduxForm({
  form: "formLengkapiAbsen",
  validate: SelectValidation,
  enableReinitialize: true,
})(LengkapiAbsen);
export default connect(mapStateToProps, null)(LengkapiAbsen);
