import React, { Component } from "react";
import { Container } from "reactstrap";
import BackCabang from "../components/BackCabang";
import FormCabangComponent from "../components/FormCabangComponent";
import { connect } from "react-redux";
import { postCabangCreate } from "../actions/cabangAction";
import swal from "sweetalert";
import NavbarComponent from "../components/NavbarComponent";
import { Redirect } from "react-router-dom";


const mapStateToProps = (state) => {
   return {
      getResponDataCabang: state.Cabang.getResponDataCabang,
      errorResponDataCabang: state.Cabang.errorResponDataCabang,
   };
};


class CreateCabangContainer extends Component {

   handleSubmit(data) {
      this.props.dispatch(postCabangCreate(data));
   }

   render() {
      if (!localStorage.getItem('user') || localStorage.getItem('user') === "false") {
         swal("Failed!", "Login Dulu Bosq", "error");
         return <Redirect to="/home" />;
      }
      if (this.props.getResponDataCabang || this.props.errorResponDataCabang) {
         if (this.props.errorResponDataCabang) {
            swal("Failed!", this.props.errorResponDataCabang, "error");
         } else {
            swal(
               "Cabang Created!",
               "Kode : " +
               this.props.getResponDataCabang.KodeCabang +
               " , Nama : " +
               this.props.getResponDataCabang.NamaCabang,
               "success"
            ); return <Redirect to={"/cabang"} />
         }
      }
      return (
         <div>
            <NavbarComponent />
            <div className="pt-4">
               <Container>
                  <BackCabang title="Tambah Cabang"/>
                  <FormCabangComponent onSubmit={(data) => this.handleSubmit(data)} />
               </Container>
            </div>
         </div>
      );
   }
}

export default connect(mapStateToProps, null)(CreateCabangContainer);
