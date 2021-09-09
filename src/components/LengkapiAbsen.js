import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import {
  FormGroup,
  Col,
  Row,
  Container,
  Button,
  Label
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
      Nama: {
        value: state.users.getUserDetail ? state.users.getUserDetail.UserID : "",
        label: state.users.getUserDetail ? state.users.getUserDetail.Nama : ""
      },
      TglAwal: state.Laporan.getLaporanRekap ? state.Laporan.getLaporanRekap.TglAwal : state.Laporan.defTglAwal,
      TglAkhir: state.Laporan.getLaporanRekap ? state.Laporan.getLaporanRekap.TglAkhir : state.Laporan.defTglAkhir
      // Nama: { value: "SB1MIT005", label: "M ALI SHODIKIN" },
      // TglAwal: "2021-06-25",
      // TglAkhir: "2021-06-25"
    },
  };
};

const CheckBoxItem = (props) => {
  return (
     <li style={{ display: "inline-flex", marginRight: "10px" }}>
        <Label check>
           <input
              key={props.id}
              onClick={props.setChecked}
              type="checkbox"
              checked={props.isChecked}
              name={props.name}
              disabled={props.disabled}
              value={props.value} /> {props.label}

        </Label>
     </li>
  )
}

class LengkapiAbsen extends Component {

  constructor(props){
    super(props)
    this.state = {
      CheckAll : true,
      listStatus : [
        { id: "MASUK", value: 'MASUK', label: 'Masuk', isChecked:true, name: "Status"},
        { id: "OFF", value: 'OFF', label: 'OFF', isChecked:true, name: "Status"},
        { id: "LIBUR", value: 'LIBUR', label: 'LIBUR', isChecked:true, name: "Status"},
        { id: "TIDAK MASUK", value: 'TIDAK MASUK', label: 'TIDAK MASUK', isChecked:true, name: "Status"},
        { id: "IZIN TIDAK MASUK", value: 'IZIN TIDAK MASUK', label: 'IZIN TIDAK MASUK', isChecked:true, name: "Status"},
        { id: "CUTI", value: 'CUTI', label: 'CUTI', isChecked:true, name: "Status"},
        { id: "CUTI BERSAMA", value: 'CUTI BERSAMA', label: 'CUTI BERSAMA', isChecked:true, name: "Status"},
        { id: "CUTI KHUSUS", value: 'CUTI KHUSUS', label: 'CUTI KHUSUS', isChecked:true, name: "Status"},
        { id: "DINAS LUAR", value: 'DINAS LUAR', label: 'DINAS LUAR', isChecked:true, name: "Status"},
        { id: "SAKIT", value: 'SAKIT', label: 'SAKIT', isChecked:true, name: "Status"},
        { id: "ACC LUPA ABSEN", value: 'ACC LUPA ABSEN', label: 'ACC LUPA ABSEN', isChecked:true, name: "Status"},
      ]
    }
  }

  render() {
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log(event);
    }

    const setChecked = (event) => {
      // console.log()
      let newLists = [];
      let c = 0;
      this.state.listStatus.map((data) => {
         if (data.value === event.target.value) {
            data.isChecked = event.target.checked
         }
         newLists.push(data);
         c += data.isChecked ? 1 : 0;
      });
      
      console.log(c, this.state.listStatus.length)
      this.setState({
        ...this.state,
        listStatus : newLists,
        CheckAll : c == this.state.listStatus.length ? true : false
      })
      // this.setState((prevState) => ({ counter: prevState.counter + 1 }));
      // this.props.dispatch(getListCbCabang(this.state.user.RoleAdmin, null, newCb))
    }

    const setCheckAll =(e)=>{
      let newLists = [];
      this.state.listStatus.map((data) => {
        data.isChecked = e.target.checked
        newLists.push(data);
      });
      
      this.setState({
        ...this.state, 
        CheckAll:e.target.checked,
        listStatus:newLists
      })
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
                  <FormGroup style={{ marginTop: "37px", marginRight: "70px" }}>
                    <Button
                      onClick={this.props.handleSubmit(values =>
                        this.props.onSubmit({
                          ...values,
                          type: 'view',
                          status : this.state.listStatus
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
                      onClick={this.props.handleSubmit((values) =>
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
            <Row>
              <Col>
                <Label className="col-form-label">
                    Status : &nbsp;&nbsp;&nbsp;
                    <Label check>
                      <input
                        checked={this.state.CheckAll}
                        type="checkbox"
                        onClick={(e)=>setCheckAll(e)}
                        value="checkedall" /> Pilih / Tidak Pilih Semua
                    </Label>
                  </Label>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                {
                  this.state.listStatus.map((data) => {
                    return (
                       <CheckBoxItem
                       setChecked={setChecked}
                          {...data} />
                    )
                 })
                }
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
