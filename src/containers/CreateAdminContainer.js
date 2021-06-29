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


class CreateAdminContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getOptUser());
    this.props.dispatch(getOptCabang());
    this.props.dispatch(getAdminDetail());
  }

  handleSubmit(data) {
    this.props.dispatch(postAdminCreate(data));
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

    if (this.props.getResponDataAdmin || this.props.errorResponDataAdmin) {
      if (this.props.errorResponDataAdmin) {
        swal("Failed!", this.props.errorResponDataAdmin, "error");
      } else {
        this.props.dispatch(reset('formCreateAdmin'))
        swal(
          "Admin Created!",
          "Kode : " +
          this.props.getResponDataAdmin.AdminID +
          " , Nama : " +
          this.props.getResponDataAdmin.TanggalCreate,
          "success"
        );
      }
      this.props.dispatch(postAdminCreate(null));
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
