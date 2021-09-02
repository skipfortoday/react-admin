import React, { Component } from "react";
import { Container } from "reactstrap";
import FormAdminComponent from "../components/FormAdminComponent";
import { connect } from "react-redux";
import { getAdminDetail, putAdminUpdate } from "../actions/adminAction";
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

class EditAdminContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getOptUser());
    this.props.dispatch(getOptCabang());
    this.props.dispatch(getAdminDetail(this.props.match.params.AdminID));
  }

  componentWillUnmount(){
    this.props.dispatch(getAdminDetail());
  }

  handleSubmit(data) {
    let kcs = []
    if(data.KodeCabang){
      data.KodeCabang.map(item => kcs.push(item.value))
    }
    data.KodeCabang = kcs.length > 0 ? kcs.join(",") : ''
    // console.log(data)
    this.props.dispatch(
      putAdminUpdate(data, this.props.match.params.AdminID)
    );
  }

  componentDidUpdate(prevProps){
    if (this.props.getResponDataAdmin || this.props.errorResponDataAdmin) {
      if (this.props.errorResponDataAdmin) {
        swal("Failed!", this.props.errorResponDataAdmin, "error");
      } else {
        // this.props.dispatch(reset('formCreateAdmin'))
        this.props.dispatch(putAdminUpdate())
        this.props.dispatch(getAdminDetail(this.props.match.params.AdminID))
        swal(
          "Admin Updated!",
          "",
          "success"
        ).then(()=>{
          this.props.history.push("/superadmin")
        });
      }
    }
  }

  render() {
    if (!localStorage.getItem('user') || localStorage.getItem('user') === "false") {
      swal("Failed!", "Login Dulu Bosq", "error");
      return <Redirect to="/home" />;
    }

    let admin = JSON.parse(localStorage.getItem('user'));
    // console.log(admin, this.props.match.params.AdminID)
    if(admin.AdminID != this.props.match.params.AdminID && admin.RoleAdmin != 99){
      swal("Failed!", "Anda tidak memiliki hak akses menu ini", "error");
      return <Redirect to="/superadmin" />;
    }

    
    return (
      <div>
        <NavbarComponent />
        <div className="mt-4" >
          <Container>
            <BackAdminComponent title="Edit Admin" />
            <FormAdminComponent onSubmit={(data) => this.handleSubmit(data)} editing={true} />
          </Container>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(EditAdminContainer);
