import React, { Component, useState } from "react";
import { connect } from "react-redux";
import TerlambatBertingkatComponent from "../components/TerlambatBertingkatComponent";
import { getGroupDetail } from "../actions/groupAction";
import swal from "sweetalert";
import NavbarComponent from "../components/NavbarComponent";
import { Redirect } from "react-router-dom";
import { getOptTerlambat } from "../actions/optAction";
import {
  getTerlambatBertingkatDetail, postTerlambatBertingkatCreate,
  getTerlambatBertingkatDetail2 as gtt,
  putTerlambatBertingkatUpdate,
  postSalinRuleTerlambatBertingkat, resetFormTT, reseResponTT,
  deleteTerlambatBertingkat
} from "../actions/TerlambatBertingkatAction";
import FormTTComponent from "../components/FormTTComponent";
import {
  Container, Button, Row, Col,
  Modal, ModalHeader, ModalBody
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import FormDuplikat from "../components/FormDuplikat"
import { reset } from "redux-form";


const mapStateToProps = (state) => {
  return {
    form: state.form.FormTTComponent,
    getTerlambatBertingkatDetail: state.TerlambatBertingkat.getTerlambatBertingkatDetail,
    errorTerlambatBertingkatList: state.TerlambatBertingkat.errorTerlambatBertingkatList,
    getResponDataTerlambatBertingkat: state.TerlambatBertingkat.getResponDataTerlambatBertingkat,
    errorResponDataTerlambatBertingkat: state.TerlambatBertingkat.errorResponDataTerlambatBertingkat,
    getTerlambatBertingkatDetail2: state.TerlambatBertingkat.getTerlambatBertingkatDetail2,
    getOptTerlambat: state.Opt.getOptTerlambat,
    postTerlambatBertingkatSalin: state.TerlambatBertingkat.postTerlambatBertingkatSalin,
    errorTerlambatBertingkatSalin: state.TerlambatBertingkat.errorTerlambatBertingkatSalin,
  };
};

class TerlambatBertingkatContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formTitle: "Tambah Rule Terlambat Bertingkat",
      isEditing: false,
      modalShow: false,
      modal:false,
    };
    this.backFromEdit = this.backFromEdit.bind(this)
    this.handleSubmitSalin = this.handleSubmitSalin.bind(this)
    this.handleEditClick = this.handleEditClick.bind(this)
    this.handleDeleteClick = this.handleDeleteClick.bind(this)
  }

  componentDidMount() {
    this.props.dispatch(getGroupDetail(this.props.match.params.GroupID));
    this.props.dispatch(getOptTerlambat(this.props.match.params.GroupID));

    // // list table 
    this.props.dispatch(getTerlambatBertingkatDetail(this.props.match.params.GroupID));
    if (this.props.match.params.RuleTerlambatBertingkatID) {
      this.handleEditClick(this.props.match.params.RuleTerlambatBertingkatID);
    }
  }

  handleEditClick(RuleID) {
    this.props.dispatch(gtt(RuleID));
    this.setState({ formTitle: "Ubah Rule Terlambat Bertingkat", isEditing: true });
  }

  handleDeleteClick(RuleID){
    swal({
      title: "Apakah Anda yakin akan menghapus data ini ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        this.props.dispatch(deleteTerlambatBertingkat(RuleID))
        swal("Data TerlambatBertingkat Sukses dihapus", {
          icon: "success",
        }).then(()=>{
          this.props.dispatch(getTerlambatBertingkatDetail(this.props.match.params.GroupID))
          this.backFromEdit()
        });
      } else {
        swal("Data gagal dihapus");
      }
    });
  }

  handleSubmit(data) {
    data.GroupID = data.GroupJabatan.value; // modifikasi disini supaya tidak perlu update api
    if (data.RuleID) {
      // update 
      this.props.dispatch(putTerlambatBertingkatUpdate(data, data.RuleID))
    } else {
      this.props.dispatch(postTerlambatBertingkatCreate(data, data.GroupID.value));
      this.props.dispatch(reset('FormTTComponent'));
    }
    this.props.dispatch(resetFormTT())
  }

  handleChangeGroup(data) {
    // this.props.dispatch(delTerlambatBertingkatDetail2)
    //this.props.dispatch(reset('FormTTComponent'));
    this.props.dispatch(resetFormTT())
    this.props.dispatch(getTerlambatBertingkatDetail(data.value));
    this.props.history.replace('/group/terlambatbertingkat/' + data.value);
    //this.props.dispatch(getTerlambatBertingkatDetail2(this.props.match.params.RuleTerlambatBertingkatID));
  };

  getDataForEditing() {
    this.props.dispatch(getTerlambatBertingkatDetail2(this.props.match.params.RuleTerlambatBertingkatID));
  }

  backFromEdit() {
    this.setState({ formTitle: "Tambah Rule Terlambat Bertingkat", isEditing: false });
    this.props.history.push('/group/terlambatbertingkat/' + this.props.match.params.GroupID);
  }

  handleSubmitSalin(data) {
    this.props.dispatch(postSalinRuleTerlambatBertingkat(data));
  }

  toggle = () => {
    //setModal(!modal);
    this.setState({
      ...this.state,
      modal:!this.state.modal
    })
    console.log(this.state.modal);
  }

  render() {
    let ambil = JSON.parse(localStorage.getItem('user'));
    if (!localStorage.getItem('user') || ambil.Login === "false") {
      swal("Failed!", "Login Dulu Bosq", "error");
      return <Redirect to="/home" />;
    }
    if (this.props.getResponDataTerlambatBertingkat || this.props.errorResponDataTerlambatBertingkat) {
      if (this.props.errorResponDataTerlambatBertingkat) {
        swal("Failed!", this.props.errorResponDataTerlambatBertingkat, "error");
      } else {
        swal(
          "Updated!",
          "",
          "success"
        ).then(() => {
          this.props.dispatch(getTerlambatBertingkatDetail(this.props.match.params.GroupID))
        });

        if (this.state.isEditing) this.backFromEdit();
        this.props.dispatch(reseResponTT());
      }
    }

    if (this.props.postTerlambatBertingkatSalin || this.props.errorTerlambatBertingkatSalin) {
      if (this.props.errorTerlambatBertingkatSalin) {
        swal("Failed!", this.props.errorTerlambatBertingkatSalin, "error");
      } else {
        swal(
          "Berhasil disalin",
          "Berhasil disalin ke group lain",
          "success"
        ).then(()=>{
          this.toggle();
        });
      }
      this.props.dispatch(reseResponTT());
    }


    return (
      <div>
        <NavbarComponent />
        <div style={{ backgroundColor: "#f9a826" }}>
          <Container>
            {/* <FormTerlambat/> */}
            <Col md="12">
              <Row className="pt-4 pb-2">
                {this.state.isEditing ?
                  <Button className="mr-2" onClick={this.backFromEdit}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                  </Button> : ""}
                <h5 >{this.state.formTitle}</h5>
              </Row>
            </Col>
            <FormTTComponent
              onSubmit={(data) => this.handleSubmit(data)}
              JabatanChange={(data) => this.handleChangeGroup(data)}
              isEditing={this.state.isEditing}
            />
          </Container>
        </div>
        <div className="pl-4">
          <div>
            {this.props.getTerlambatBertingkatDetail.length > 0 ? (
            <Button color="dark" onClick={this.toggle}>Duplilat ke group jabatan lain</Button>) : ("")}
            <Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-lg">
              <ModalHeader toggle={this.toggle}>Duplikat Rule ke Group Jabatan lain</ModalHeader>
              <ModalBody>
                {this.state.modal ? (
                  <FormDuplikat
                    onSubmit={(data) => this.handleSubmitSalin(data)}
                  />
                ) : ("")}

              </ModalBody>
            </Modal>
          </div>
        </div>
        <TerlambatBertingkatComponent
          onEditButtonClick={() => this.getDataForEditing()}
          editRow={this.handleEditClick}
          deleteRow={this.handleDeleteClick} />
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(TerlambatBertingkatContainer);