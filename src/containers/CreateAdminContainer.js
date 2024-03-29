import React, { Component } from "react";
import { Container } from "reactstrap";
import FormAdminComponent from "../components/FormAdminComponent";
import { connect } from "react-redux";
import { getAdminDetail, postAdminCreate } from "../actions/adminAction";
import { getOptCabang, getOptUser } from "../actions/optAction";
import swal from "sweetalert";
import NavbarComponent from "../components/NavbarComponent";
import { Redirect } from "react-router-dom";
import BackAdminComponent from "../components/BackAdminComponent";
import { reset } from "redux-form";


const mapStateToProps = (state) => {
  return {
    getResponDataAdmin: state.Admin.getResponDataAdmin,
    errorResponDataAdmin: state.Admin.errorResponDataAdmin,
  };
};

// let admin = JSON.parse(localStorage.getItem('user'))

class CreateAdminContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getOptUser());
    this.props.dispatch(getOptCabang());
    this.props.dispatch(getAdminDetail());
  }

  handleSubmit(data) {
    let kocabs = []
    data.KodeCabang.map((item)=>{
      kocabs.push(item.value)
    })
    data.KodeCabang = {value : kocabs.join(",")}
    // console.log(data)
    this.props.dispatch(postAdminCreate(data));
  }

  componentDidUpdate(){
    if (this.props.getResponDataAdmin || this.props.errorResponDataAdmin) {
      if (this.props.errorResponDataAdmin) {
        swal("Failed!", this.props.errorResponDataAdmin, "error");
      } else {
        this.props.dispatch(reset('formCreateAdmin'))
        swal(
          "Sukses!",
          "Admin berhasil dibuat",
          // "Kode : " +
          // this.props.getResponDataAdmin.AdminID +
          // " , Nama : " +
          // this.props.getResponDataAdmin.TanggalCreate,
          "success"
        ).then(()=>{
          this.props.history.replace("/superadmin")
        });
      }
      this.props.dispatch(postAdminCreate(null));
    }
  }

  render() {
    if (!localStorage.getItem('user') || localStorage.getItem('user') === "false") {
      swal("Failed!", "Login Dulu Bosq", "error");
      return <Redirect to="/home" />;
    }

    let admin = JSON.parse(localStorage.getItem('user'));
    console.log(admin.RoleAdmin)
    if(admin.RoleAdmin != 99){
        swal("Failed!", "Anda tidak memiliki hak akses menu ini", "error");
        return <Redirect to="/superadmin" />;
    }

    
    return (
      <div>
        <NavbarComponent />
        <div className="mt-4" >
          <Container>
            <BackAdminComponent title="Tambah Admin" />
            <FormAdminComponent onSubmit={(data) => this.handleSubmit(data)} editing={false}/>
          </Container>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(CreateAdminContainer);
