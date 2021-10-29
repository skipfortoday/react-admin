import React, { Component } from "react";
import { reduxForm, Field, FieldArray } from "redux-form";
import { connect } from "react-redux";
import { FormGroup, Col, Label, Input, Row, Button } from "reactstrap";
import GroupValidation from "../validations/GroupValidation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import { CheckboxFieldComponent } from "./formController/CheckboxFieldComponent";
import { SelectFieldComponentHrz } from "./formController/SelectFieldComponentHrz";
import { SelectFieldComponent } from "./formController/SelectFieldComponent";
import { InputFieldComponent } from "./formController/InputFieldComponent";
import { InputFieldComponentHrz } from "./formController/InputFieldComponentHrz";
import { GET_GROUP_DETAIL } from "../actions/groupAction";
import { val } from "dom7";

let opsiDay = [
  {value:'', label : 'TIDAK ADA LIBUR MINGGUAN'},
  {value:'Senin', label : 'SENIN'},
  {value:'Selasa', label : 'SELASA'},
  {value:'Rabu', label : 'RABU'},
  {value:'Kamis', label : 'KAMIS'},
  {value:'Jumat', label : 'JUMAT'},
  {value:'Sabtu', label : 'SABTU'},
  {value:'Minggu', label : 'MINGGU'},
]

let config = JSON.parse(localStorage.getItem('config'))
let KodeCabang = config.KodeCabang
const mapStateToProps = (state) => {
  let initHariLibur = {value:'', label : 'TIDAK ADA LIBUR MINGGUAN'}
  if(state.Group.getGroupDetail.HariLibur){
    opsiDay.map((item)=>{
      if(item.value.toLowerCase() === state.Group.getGroupDetail.HariLibur.toLowerCase()) initHariLibur = item
    })
  }
  
  let bt1 = []
  let bt2 = []
  let bt3 = []

  let mpBertingkat = {1:[],2:[],3:[]}
  if(state.Group.getGroupDetail.bertingkat){
    state.Group.getGroupDetail.bertingkat.map(item=>{
      mpBertingkat[item.Shift].push(item)
    })
  }
  // console.log(mpBertingkat)
  for(var i=1; i<=3;i++){
    //if(mpBertingkat[1][0]) console.log(mpBertingkat[1][0])
    let dv = { 
      RuleTerlambatBertingkatID:0,
      KodeCabang:KodeCabang,
      GroupID:state.Group.getGroupDetail.GroupID,
      Shift:i,
      MaxJamDatang:"",
      RpPotonganTerlambat:""
    }
    // console.log('------------------------------------')
    // console.log(i, 0, mpBertingkat[i][0])
    // console.log(i, 1, mpBertingkat[i][1])
    // console.log(i, 2, mpBertingkat[i][2])
    for(var x=0; x<3;x++){
      if(i==1) bt1.push(mpBertingkat[i][x] ? mpBertingkat[i][x] : dv )
      if(i==2) bt2.push(mpBertingkat[i][x] ? mpBertingkat[i][x] : dv )
      if(i==3) bt3.push(mpBertingkat[i][x] ? mpBertingkat[i][x] : dv )
    }
  }
  
  return {
    dataGroup : state.Group.getGroupDetail,
    initialValues: {
      GroupID: state.Group.getGroupDetail.GroupID,
      Jabatan: state.Group.getGroupDetail.Jabatan,
      AdaOff: state.Group.getGroupDetail.AdaOff,
      CekJamKembali: state.Group.getGroupDetail.CekJamKembali,
      RuleTerlambatBertingkat: state.Group.getGroupDetail.RuleTerlambatBertingkat,
      JamDatang: state.Group.getGroupDetail.JamDatang,
      MaxJamDatang: state.Group.getGroupDetail.MaxJamDatang,
      JamPulang: state.Group.getGroupDetail.JamPulang,
      MinJamLembur: state.Group.getGroupDetail.MinJamLembur,
      JamMulaiLembur: state.Group.getGroupDetail.JamMulaiLembur,
      RpPotonganTerlambat: state.Group.getGroupDetail.RpPotonganTerlambat,
      JamDatangSiang: state.Group.getGroupDetail.JamDatangSiang,
      MaxJamDatangSiang: state.Group.getGroupDetail.MaxJamDatangSiang,
      JamPulangSiang: state.Group.getGroupDetail.JamPulangSiang,
      JamMulaiLemburSiang: state.Group.getGroupDetail.JamMulaiLemburSiang,
      MinJamLemburSiang: state.Group.getGroupDetail.MinJamLemburSiang,
      HariLibur: initHariLibur,
      RpPotonganTerlambatKembali: state.Group.getGroupDetail.RpPotonganTerlambatKembali,
      RpPotonganTidakMasuk: state.Group.getGroupDetail.RpPotonganTidakMasuk,
      RpLemburPerJam: state.Group.getGroupDetail.RpLemburPerJam,
      JamDatangSore: state.Group.getGroupDetail.JamDatangSore,
      MaxJamDatangSore: state.Group.getGroupDetail.MaxJamDatangSore,
      JamPulangSore: state.Group.getGroupDetail.JamPulangSore,
      MinJamLemburSore: state.Group.getGroupDetail.MinJamLemburSore,
      JamMulaiLemburSore: state.Group.getGroupDetail.JamMulaiLemburSore,
      JamMulaiPagi: state.Group.getGroupDetail.JamMulaiPagi,
      MaxJamKembali: state.Group.getGroupDetail.MaxJamKembali,
      JamMulaiSiang: state.Group.getGroupDetail.JamMulaiSiang,
      MaxJamKembaliSiang: state.Group.getGroupDetail.MaxJamKembaliSiang,
      JamMulaiSore: state.Group.getGroupDetail.JamMulaiSore,
      MaxJamKembaliSore: state.Group.getGroupDetail.MaxJamKembaliSore,
      TBertingkats1:bt1,
      TBertingkats2:bt2,
      TBertingkats3:bt3
    },
  };
};

class FormGroupComponent extends Component {
  constructor(props){
    super(props)
    this.state = {
      ruleTerlambat:false,
      shift2:false,
      shift3:false
    }
  }

  componentDidUpdate(prevProps){
    if(!prevProps.dataGroup && this.props.dataGroup){
      this.setState(
        {
          ...this.state, 
          ruleTerlambat : this.props.dataGroup.RuleTerlambatBertingkat,
          shift2: this.props.dataGroup.JamDatangSiang ? true :false,
          shift3: this.props.dataGroup.JamDatangSore ? true :false
        }
      )
      // if(this.props.dataGroup.JamDatangSiang) this.props.setAdaShift2(true)
      // if(this.props.dataGroup.JamDatangSore) this.props.setAdaShift2(false)
    }
  }

  onRuleTerlambatChange = (value) => {
    this.setState({...this.state, ruleTerlambat : value.target.checked})
  }

  renderTBertingkats = ({fields, meta: { touched, error } }) => (
    <Row>
      {fields.map((field, index)=>{
        return (
          <Col md={4}>
            <Row>
              <Col md={5}>
                <FormGroup style={{marginBottom:"0px"}}>
                  <Field
                    type="time"
                    name={`${field}.MaxJamDatang`}
                    component={InputFieldComponent}
                    label="Jam Datang :"
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup style={{marginBottom:"0px"}}>
                <Field
                  name={`${field}.RpPotonganTerlambat`}
                  type="number"
                  component={InputFieldComponent}
                  label="Rp Potongan :"/>
                </FormGroup>
              </Col>
            </Row>
          </Col>
        )
      })}
    </Row>
  )

  setShift2(val){
    this.setState({...this.state, shift2:val}) 
    this.props.setAdaShift2(val)
  }

  setShift3(val){
    this.setState({...this.state, shift3:val}) 
    this.props.setAdaShift3(val)
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <FormGroup row >
            <Col md={12}>
              <Row>
                {/* <Col md={12}>
                  <div style={{ backgroundColor: "#f9a826" }}>
                    Masukkan Group ID untuk Kode & Nama Group / Nama Jabatan (WAJIB)
                  </div>
                </Col> */}

                <Col md={3}>
                  <FormGroup style={{marginBottom:"0px"}}>
                    <Field
                      type="text"
                      name="GroupID"
                      readOnly={this.props.dis}
                      component={InputFieldComponent}
                      label="Group ID :"
                      labelAlign="text-left"
                    />
                  </FormGroup>
                </Col>

                <Col md={3}>
                  <FormGroup style={{marginBottom:"0px"}}>
                    <Field
                      type="text"
                      name="Jabatan"
                      readOnly={this.props.dis}
                      component={InputFieldComponent}
                      label="Nama :"
                      labelAlign="text-left"
                    />
                  </FormGroup>
                </Col>
                {/* <Col md={4}></Col> */}
                {/* <Col md={12}>
                  <div style={{ backgroundColor: "#363b41" , color:"white"  }}>
                    Masukkan Hari Libur Dan Komponen Gaji</div>
                </Col> */}
                
                {/* <Col md={2} style={{paddingLeft:"20px"}}>
                  <FormGroup>
                    <Field 
                      type="checkbox" 
                      name="AdaOff"
                      label="Ada Hari Libur Mingguan"
                      component={CheckboxFieldComponent} />
                  </FormGroup>
                </Col> */}
                <Col md={3}>
                  <FormGroup style={{marginBottom:"0px"}}>
                    <Field
                      type="select"
                      name="HariLibur"
                      options={opsiDay}
                      component={SelectFieldComponent}
                      label="Hari Libur :"
                      labelAlign="text-left"
                    />
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup style={{marginBottom:"0px"}}>
                    <Field
                      type="number"
                      name="RpLemburPerJam"
                      component={InputFieldComponent}
                      label="Rp Lembur Perjam :"
                    />
                  </FormGroup>
                </Col>

                <Col md={3}>
                  <FormGroup style={{marginBottom:"0px"}}>
                    <Field
                      type="number"
                      name="RpPotonganTerlambat"
                      component={InputFieldComponent}
                      label="Rp Potongan Terlambat :"
                    />
                  </FormGroup>
                </Col>

                <Col md={3}>
                  <FormGroup style={{marginBottom:"0px"}}>
                    <Field
                      type="number"
                      name="RpPotonganTerlambatKembali"
                      component={InputFieldComponent}
                      label="Rp Pot. Tlmbat Kembali:"
                    />
                  </FormGroup>
                </Col>

                <Col md={3}>
                  <FormGroup style={{marginBottom:"0px"}}>
                    <Field
                      type="number"
                      name="RpPotonganTidakMasuk"
                      component={InputFieldComponent}
                      label="Potongan Tidak Masuk :"
                    />
                  </FormGroup>
                </Col>
                <Col md={1} style={{paddingLeft:"20px"}}>
                  <FormGroup style={{marginBottom:"0px"}}>
                    <Field
                      type="checkbox"
                      name="CekJamKembali"
                      component={CheckboxFieldComponent}
                      label="CekJam Kbl.Istrt"
                    />
                  </FormGroup>
                </Col>

                <Col md={1}>
                  <FormGroup style={{marginBottom:"0px"}}>
                    <Field type="checkbox" 
                      name="RuleTerlambatBertingkat" 
                      component={CheckboxFieldComponent} 
                      label="Terlambat Bertingkat"
                      onChange={this.onRuleTerlambatChange}
                      />
                  </FormGroup>
                </Col>
              </Row>
            </Col>
            <Col md={12}>
              <Row>
                <Col md={12} style={{marginTop:"8px"}}>
                  <div style={{ backgroundColor: "#363b41" ,color:"white", padding:"3px"}}>
                    Masukkan Aturan Jadwal Pagi atau Jadwal Shift 1 (WAJIB)
                  </div>
                </Col>

                <Col md={2}>
                  <FormGroup style={{marginBottom:"0px"}}>
                    <Field
                      type="time"
                      name="JamDatang"
                      component={InputFieldComponent}
                      label="Datang:"
                    />
                  </FormGroup>
                </Col>

                <Col md={2}>
                  <FormGroup style={{marginBottom:"0px"}}>
                    <Field
                      type="time"
                      name="JamPulang"
                      component={InputFieldComponent}
                      label="Pulang:"
                    />
                  </FormGroup>
                </Col>

                <Col md={2}>
                  <FormGroup style={{marginBottom:"0px"}}>
                    <Field
                      type="time"
                      name="MaxJamDatang"
                      component={InputFieldComponent}
                      label="Max Datang"
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <Row>
                    <Col md={3}>
                      <FormGroup style={{marginBottom:"0px"}}>
                        <Field
                          type="time"
                          name="MinJamLembur"
                          component={InputFieldComponent}
                          label="Min Lembur:"
                        />
                      </FormGroup>
                    </Col>

                    <Col md={3}>
                      <FormGroup style={{marginBottom:"0px"}}>
                        <Field
                          type="time"
                          name="JamMulaiLembur"
                          component={InputFieldComponent}
                          label="Mulai Lmbur:"
                        />
                      </FormGroup>
                    </Col>

                    <Col md={3}>
                      <FormGroup style={{marginBottom:"0px"}}>
                        <Field
                          type="time"
                          name="JamMulaiPagi"
                          component={InputFieldComponent}
                          label="Istirahat:"
                        />
                      </FormGroup>
                    </Col>

                    <Col md={3}>
                      <FormGroup style={{marginBottom:"0px"}}>
                        <Field
                          type="time"
                          name="MaxJamKembali"
                          component={InputFieldComponent}
                          label="Kbl.Istirahat :"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Col>
                {this.state.ruleTerlambat ?
                  <Col md={12}>
                    <div style={{marginTop:"10px"}}>Terlambat Bertingkat :</div>
                    <FieldArray name="TBertingkats1" component={this.renderTBertingkats}/>
                  </Col>
                : ""}
              </Row>
              {this.state.shift2 ? "" :
                <Button color="white" type="button" 
                  onClick={()=>this.setShift2(true)}>
                  <FontAwesomeIcon icon={faPlus} /> Tambah Shift 2 / Sift Siang {" "+this.state.shift2}
                </Button>
              }
            </Col>
            
            <Col md={12} hidden={this.props.adaShift2 || this.state.shift2 ? false : true}>
              <Row>
                <Col md={12} style={{marginTop:"8px"}}>
                  <div style={{ backgroundColor: "#363b41" ,color:"white", padding:"3px"}}>
                    Masukkan Aturan Jadwal Siang atau Jadwal Shift 2 {"  "} 
                    {this.state.shift3 ?  "" :
                    <Button onClick={()=>this.setShift2(false)} 
                      size="sm" color="danger" type="button">
                        <FontAwesomeIcon icon={faTimes} /> Batalkan Shift 2</Button> 
                    }
                  </div>
                </Col>

                <Col md={2} style={{paddingRight:"0px"}}>
                  <FormGroup style={{marginBottom:"0px"}}>
                    <Field
                      type="time"
                      name="JamDatangSiang"
                      component={InputFieldComponent}
                      label="Datang:"
                    />
                  </FormGroup>
                </Col>

                <Col md={2} style={{paddingRight:"0px"}}>
                  <FormGroup style={{marginBottom:"0px"}}>
                    <Field
                      type="time"
                      name="JamPulangSiang"
                      component={InputFieldComponent}
                      label="Pulang:"
                    />
                  </FormGroup>
                </Col>

                <Col md={2} style={{paddingRight:"0px"}}>
                  <FormGroup style={{marginBottom:"0px"}}>
                    <Field
                      type="time"
                      name="MaxJamDatangSiang"
                      component={InputFieldComponent}
                      label="Max Datang:"
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <Row>
                    <Col md={3}>
                      <FormGroup style={{marginBottom:"0px"}}>
                        <Field
                          type="time"
                          name="MinJamLemburSiang"
                          component={InputFieldComponent}
                          label="Min Lembur:"
                        />
                      </FormGroup>
                    </Col>
                    <Col md={3}>
                      <FormGroup style={{marginBottom:"0px"}}>
                        <Field
                          type="time"
                          name="JamMulaiLemburSiang"
                          component={InputFieldComponent}
                          label="Mulai Lmbur:"
                        />
                      </FormGroup>
                    </Col>
                    <Col md={3}>
                      <FormGroup style={{marginBottom:"0px"}}>
                        <Field
                          type="time"
                          name="JamMulaiSiang"
                          component={InputFieldComponent}
                          label="Istirahat:"
                        />
                      </FormGroup>
                    </Col>

                    <Col md={3}>
                      <FormGroup style={{marginBottom:"0px"}}>
                        <Field
                          type="time"
                          name="MaxJamKembaliSiang"
                          component={InputFieldComponent}
                          label="Kbl.Istirahat:"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Col>
                {this.state.ruleTerlambat ?
                  <Col md={12}>
                    <div style={{marginTop:"10px"}}>Terlambat Bertingkat :</div>
                    <FieldArray name="TBertingkats2" component={this.renderTBertingkats}/>
                  </Col>
                : ""}
              </Row>
              {(this.state.shift2 && !this.state.shift3) ?
                <Button color="white" type="button" 
                  onClick={()=>this.setShift3(true)}>
                  <FontAwesomeIcon icon={faPlus} /> Tambah Shift 3 / Sift Sore
                </Button>
                : ""
              }
            </Col>
            
            <Col md={12} hidden={this.props.adaShift3 || this.state.shift3 ? false : true}>
              <Row>
                <Col md={12} style={{marginTop:"8px"}}>
                  <div style={{ backgroundColor: "#363b41",color:"white", padding:"3px"}}>
                    Masukkan Aturan Jadwal Sore atau Jadwal Shift 3 {"  "}
                    <Button onClick={()=>this.setShift3(false)} size="sm" color="danger" type="button">
                      <FontAwesomeIcon icon={faTimes} /> Batalkan Shift 3</Button>
                  </div>
                </Col>

                <Col md={2} style={{paddingRight:"0px"}}>
                  <FormGroup style={{marginBottom:"0px"}}>
                    <Field
                      type="time"
                      name="JamDatangSore"
                      component={InputFieldComponent}
                      label="Datang:"
                    />
                  </FormGroup>
                </Col>

                <Col md={2} style={{paddingRight:"0px"}}>
                  <FormGroup style={{marginBottom:"0px"}}>
                    <Field
                      type="time"
                      name="JamPulangSore"
                      component={InputFieldComponent}
                      label="Pulang:"
                    />
                  </FormGroup>
                </Col>

                <Col md={2} style={{paddingRight:"0px"}}>
                  <FormGroup style={{marginBottom:"0px"}}>
                    <Field
                      type="time"
                      name="MaxJamDatangSore"
                      component={InputFieldComponent}
                      label="Max Datang:"
                    />
                  </FormGroup>
                </Col>
                
                <Col md={6}>
                  <Row>
                    <Col md={3}>
                      <FormGroup style={{marginBottom:"0px"}}>
                        <Field
                          type="time"
                          name="MinJamLemburSore"
                          component={InputFieldComponent}
                          label="Min Lembur:"
                        />
                      </FormGroup>
                    </Col>

                    <Col md={3}>
                      <FormGroup style={{marginBottom:"0px"}}>
                        <Field
                          type="time"
                          name="JamMulaiLemburSore"
                          component={InputFieldComponent}
                          label="Mulai Lmbur:"
                        />
                      </FormGroup>
                    </Col>

                    <Col md={3}>
                      <FormGroup style={{marginBottom:"0px"}}>
                        <Field
                          type="time"
                          name="JamMulaiSore"
                          component={InputFieldComponent}
                          label="Istirahat:"
                        />
                      </FormGroup>
                    </Col>

                    <Col md={3}>
                      <FormGroup style={{marginBottom:"0px"}}>
                        <Field
                          type="time"
                          name="MaxJamKembaliSore"
                          component={InputFieldComponent}
                          label="Kbl.Istirahat:"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Col>
                {this.state.ruleTerlambat ?
                  <Col md={12}>
                    <div style={{marginTop:"10px"}}>Terlambat Bertingkat :</div>
                    <FieldArray name="TBertingkats3" component={this.renderTBertingkats}/>
                  </Col>
                : ""}
              </Row>
            </Col>
        </FormGroup>
        
        <FormGroup row>
          <Col md="12">
            {/* {"sift 2 "+this.props.adaShift2} */}
            {/* {this.props.adaShift2+" "+ this.props.adaShift3} */}
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
