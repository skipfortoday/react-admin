import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { FormGroup, Col, Label, Input, Row, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { InputFieldComponent } from "./formController/InputFieldComponent";
import { getListCbCabang, getListCbGroup } from "../actions/pengumumanAction";

import { CheckboxFieldComponentHrz } from "./formController/CheckboxFieldComponentHrz";
import { CheckboxFieldComponent } from "./formController/CheckboxFieldComponent";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, ContentState, convertFromHTML, convertFromRaw, convertToRaw } from 'draft-js';
import { convertToHTML } from 'draft-convert';

const mapStateToProps = (state) => {

   return {
      // getOptUser: state.Opt.getOptUser,
      getOptCabang: state.Opt.getOptCabang,
      listCbCabang: state.Pengumuman.listCbCabang,
      listCbGroup: state.Pengumuman.listCbGroup,
      checkedGroups: state.Pengumuman.getDetailPengumuman.Group,
      checkedCabangs: state.Pengumuman.getDetailPengumuman.KodeCabang,
      linkGambar: state.Pengumuman.getDetailPengumuman.LinkGambar,
      Isi: state.Pengumuman.getDetailPengumuman.Isi,
      //checkedGroup: state.
      initialValues: {
         Judul: state.Pengumuman.getDetailPengumuman.Judul,
         Isi: state.Pengumuman.getDetailPengumuman.Isi,
         KodeAuto: state.Pengumuman.getDetailPengumuman.KodeAuto,
         StartDate: state.Pengumuman.getDetailPengumuman.StartDate,
         EndDate: state.Pengumuman.getDetailPengumuman.EndDate,
         Aktif: state.Pengumuman.getDetailPengumuman.Aktif,
         Pinned: state.Pengumuman.getDetailPengumuman.Pinned,
      },
   };
};

class PengumumanFormComponent extends Component {
   constructor(props) {
      super(props);
      let config = JSON.parse(localStorage.getItem('config'));
      let user = JSON.parse(localStorage.getItem('user'));
      this.state = {
         selectedFile: null,
         onCabang: config.KodeCabang,
         user: user,
         counter: 0,
         editorState: EditorState.createEmpty()
         // editorState: EditorState.createWithContent(ContentState.createFromText('<b>Hello</b>')),
         // editorState: EditorState.createWithContent(ContentState.createFromBlockArray(
         //    convertFromHTML(this.props.Isi)
         // ))
      }

   }

   onEditorStateChange = (editorState) => {
      this.setState({
         ...this.state,
         editorState: editorState,
      });
      this.lemparToParent();
   };


   handleAllChecked = (event) => {
      let newCbGroup = [];
      this.props.listCbGroup.map((item) => {
         item.isChecked = event.target.checked
         newCbGroup.push(item);
      });

      this.setState((prevState) => ({ counter: prevState.counter + 1 }));
      this.props.dispatch(getListCbGroup(this.state.user.RoleAdmin, null, newCbGroup))
   }

   handleCheckChieldElement = (event) => {
      // console.log()
      let newCb = [];
      this.props.listCbCabang.map((cabang) => {
         if (cabang.value === event.target.value) {
            cabang.isChecked = event.target.checked
         }
         newCb.push(cabang);
      });

      this.setState((prevState) => ({ counter: prevState.counter + 1 }));
      this.props.dispatch(getListCbCabang(this.state.user.RoleAdmin, null, newCb))
   }

   handleCheckChieldElementGroup = (event) => {
      let newCbGroup = [];
      this.props.listCbGroup.map((item) => {
         if (item.value === event.target.value) {
            item.isChecked = event.target.checked
         }
         newCbGroup.push(item);
      });

      this.setState((prevState) => ({ counter: prevState.counter + 1 }));
      this.props.dispatch(getListCbGroup(this.state.user.RoleAdmin, null, newCbGroup))
   }

   lemparToParent = () => {

      const text = convertToHTML(this.state.editorState.getCurrentContent());
      this.props.functionIsi(text)
   }

   componentDidMount() {
      if (this.props.Isi) {
         this.setState({
            ...this.state,
            editorState: EditorState.createWithContent(ContentState.createFromBlockArray(
               convertFromHTML(this.props.Isi)))
         })
      } else {
         this.setState({
            ...this.state,
            editorState: EditorState.createEmpty()
         })

      }
      this.lemparToParent();
   }

   componentDidUpdate(prevProps, prevState) {
      if (prevProps.Isi == null && !!this.props.Isi) {

         if (this.props.Isi) {
            this.setState({
               ...this.state,
               editorState: EditorState.createWithContent(ContentState.createFromBlockArray(
                  convertFromHTML(this.props.Isi)))

            });
            setTimeout(() => {
               this.lemparToParent();
            }, 0);
         }
      }
   }

   render() {
      const { editorState } = this.state;
      let arrCheckedGroups = [];
      let arrCheckedCabangs = [];
      if (this.props.checkedGroups) {
         arrCheckedGroups = this.props.checkedGroups.replaceAll("-", "").split(",");
      }
      // console.log(arrCheckedCabangs);

      if (this.props.checkedCabangs) {
         arrCheckedCabangs = this.props.checkedCabangs.replaceAll("-", "").split(",");
      }

      return (
         <form onSubmit={this.props.handleSubmit}>
            <FormGroup row>
               <Col md={8}>
                  <FormGroup>
                     <Field
                        type="text"
                        name="Judul"
                        component={InputFieldComponent}
                        label="Judul :"
                     />
                  </FormGroup>

                  <Label>Isi :</Label>
                  <div style={{ border: "1px solid #ccc", padding: "8px", borderRadius: "4px", minHeight: "250px" }}>
                     <Editor

                        editorState={editorState}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={this.onEditorStateChange}
                     />

                  </div>

                  {/* <FormGroup>
                     <Field
                        type="textarea"
                        name="Isi"
                        component={InputFieldComponent}
                        label="Isi :"
                        hh="200px"
                     />
                  </FormGroup> */}
                  <FormGroup>
                     <Label className="col-form-label">
                        Cabang :
                     </Label>
                     <div>
                        <ul style={{ padding: "0", paddingLeft: "5px" }}>
                           {
                              this.props.listCbCabang ?
                                 this.props.listCbCabang.map((cabang) => {
                                    let data = {
                                       id: cabang.value,
                                       value: cabang.value,
                                       label: cabang.label,
                                       isChecked: cabang.isChecked,
                                       // isChecked: arrCheckedCabangs.includes(cabang.value) ? true:false,
                                       name: "KodeCabang",
                                       disabled: cabang.disabled == 1 ? true : false
                                    }
                                    return (
                                       <CheckBoxItem
                                          handleCheckChieldElement={this.handleCheckChieldElement}
                                          {...data} />
                                    )
                                 })
                                 : ""
                           }
                        </ul>
                     </div>

                  </FormGroup>
                  <FormGroup>
                     <Label className="col-form-label">
                        Group : &nbsp;&nbsp;&nbsp;
                        <Label check>
                           <input
                              type="checkbox"
                              onClick={this.handleAllChecked}
                              value="checkedall" /> Check / Uncheck Semua
                        </Label>
                     </Label>
                     <div>

                        <ul style={{ padding: "0", paddingLeft: "5px" }}>
                           {
                              this.props.listCbGroup ?
                                 this.props.listCbGroup.map((group) => {
                                    let data = {
                                       id: group.value,
                                       value: group.value,
                                       label: group.label,
                                       // isChecked: arrCheckedGroups.includes(group.value) ? true:false,
                                       isChecked: group.isChecked,
                                       name: "Group",
                                    }
                                    return (
                                       <CheckBoxItem
                                          handleCheckChieldElement={this.handleCheckChieldElementGroup}
                                          {...data} />
                                    )
                                 })
                                 : ""
                           }
                        </ul>
                     </div>

                  </FormGroup>


               </Col>
               <Col md={4}>
                  <FormGroup>
                     <Field
                        type="text"
                        name="KodeAuto"
                        component={InputFieldComponent}
                        label="No IM :"
                     />
                  </FormGroup>
                  <Row>
                     <Col md={6}>
                        <FormGroup>
                           <Field
                              type="date"
                              name="StartDate"
                              component={InputFieldComponent}
                              label="Mulai Berlaku :"
                           />
                        </FormGroup>
                     </Col>
                     <Col md={6}>
                        <FormGroup>
                           <Field
                              type="date"
                              name="EndDate"
                              component={InputFieldComponent}
                              label="Berlaku Sampai :"
                           />
                        </FormGroup>

                     </Col>
                  </Row>
                  <Row>
                     <Col md="6">
                        <FormGroup style={{marginLeft:"5px"}}>
                           <Field
                              
                              type="checkbox"
                              name="Aktif"
                              component={CheckboxFieldComponent}
                              label="Aktif :"
                           />
                        </FormGroup>
                     </Col>
                     <Col md="6"> 
                        <FormGroup>
                        <Field
                           type="checkbox"
                           name="Pinned"
                           component={CheckboxFieldComponent}
                           label="Dipin :"
                        />
                     </FormGroup></Col>
                  </Row>

                  <FormGroup>
                     <Label className="col-form-label">
                        Gambar :
                     </Label>
                     <div>
                        <input
                           accept="image/*"
                           type="file"
                           name="LinkGambar"
                           onChange={(e) => this.props.functionFile(e.target.files[0])}
                        />
                     </div>
                     {this.props.linkGambar ?
                        (<img
                           style={{ width: "100%", padding: "5px", border: "1px solid #ccc", marginTop: "10px" }}
                           src={this.props.linkGambar} />) : ("")}

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
                        <FontAwesomeIcon icon={faSave} /> SIMPAN
                     </Button>
                  </FormGroup>
               </Col>
            </FormGroup>
         </form>
      );
   }
}

const CheckBoxItem = (props) => {
   return (
      <li style={{ display: "inline-flex", marginRight: "10px" }}>
         <Label check>
            <input
               key={props.id}
               onClick={props.handleCheckChieldElement}
               type="checkbox"
               checked={props.isChecked}
               name={props.name}
               disabled={props.disabled}
               value={props.value} /> {props.label}

         </Label>
      </li>
   )
}

PengumumanFormComponent = reduxForm({
   form: "formCreatePengumuman",
   //    validate: PengumumanValidation,
   enableReinitialize: true,
})(PengumumanFormComponent);
export default connect(mapStateToProps, null)(PengumumanFormComponent);
