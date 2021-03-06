import React, { Component } from "react";
import { Container } from "reactstrap";
import BackGroup from "../components/BackGroup";
import FormGroupComponent from "../components/FormGroupComponent";
import { connect } from "react-redux";
import { postGroupCreate } from "../actions/groupAction";
import swal from "sweetalert";
import NavbarComponent from "../components/NavbarComponent";
import { Redirect } from "react-router-dom";
import GoBackComponent from "../components/GoBackComponent";

const mapStateToProps = (state) => {
   return {
      getResponDataGroup: state.Group.getResponDataGroup,
      errorResponDataGroup: state.Group.errorResponDataGroup,
   };
};

class CreateGroupContainer extends Component {
   handleSubmit(data) {
      this.props.dispatch(postGroupCreate(data));
   }

   goBackClick() {
      this.props.history.goBack();
   }

   render() {
      if (!localStorage.getItem('user') || localStorage.getItem('user') === "false") {
         swal("Failed!", "Login Dulu Bosq", "error");
         return <Redirect to="/home" />;
      }
      if (this.props.getResponDataGroup || this.props.errorResponDataGroup) {
         if (this.props.errorResponDataGroup) {
            swal("Failed!", this.props.errorResponDataGroup, "error");
         } else {
            swal(
               "Group Created!",
               "ID : " +
               this.props.getResponDataGroup.data.GroupID +
               " , Jabatan : " +
               this.props.getResponDataGroup.data.Jabatan,
               "success"
            ).then((value) => {
               window.location.reload();
            });
         }
      }
      return (
         <div>
            <NavbarComponent />
            <div style={{ backgroundColor: '#f9a826', padding: "20px" }} >
               <GoBackComponent title="Tambah Group Jabatan"
                  functionClick={() => this.goBackClick()} />
               <FormGroupComponent onSubmit={(data) => this.handleSubmit(data)} />
            </div>

            {/* <div style={{ backgroundColor: '#f9a826' }}>
               <BackGroup />
               <Container>
                  <FormGroupComponent onSubmit={(data) => this.handleSubmit(data)} />
               </Container>
            </div> */}
         </div>
      );
   }
}

export default connect(mapStateToProps, null)(CreateGroupContainer);
