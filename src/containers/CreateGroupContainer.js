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
   constructor(props){
      super(props)
      this.state = {
         adaShift2 : false,
         adaShift3 : false,
      }
   }

   setAdaShift2(val) {this.setState({...this.state, adaShift2:val})}
   setAdaShift3(val) {this.setState({...this.state, adaShift3:val})}

   handleSubmit(data) {
      data['AdaOff'] = data.HariLibur.value === "" ? false : true
      data.HariLibur = data.HariLibur.value

      if(!this.state.adaShift2){
         data.JamDatangSiang = 'undefined'
         data.JamMulaiLemburSiang = 'undefined'
         data.JamMulaiSiang = 'undefined'
         data.JamPulangSiang = 'undefined'
         data.MaxJamDatangSiang = 'undefined'
         data.MaxJamKembaliSiang = 'undefined'
         data.MinJamLemburSiang = 'undefined'
         data.TBertingkats2 = []
      }
      
      if(!this.state.adaShift3){
         data.JamDatangSore = 'undefined'
         data.JamMulaiLemburSore = 'undefined'
         data.JamMulaiSore = 'undefined'
         data.JamPulangSore = 'undefined'
         data.MaxJamDatangSore = 'undefined'
         data.MaxJamKembaliSore = 'undefined'
         data.MinJamLemburSore = 'undefined'
         data.TBertingkats3 = []
      }

      if(!data.RuleTerlambatBertingkat){
         data.TBertingkats1 = []
         data.TBertingkats2 = []
         data.TBertingkats3 = []
      }

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
            // swal(
            //    "Group Created!",
            //    "ID : " +
            //    this.props.getResponDataGroup.data.GroupID +
            //    " , Jabatan : " +
            //    this.props.getResponDataGroup.data.Jabatan,
            //    "success"
            // ).then((value) => {
            //    // // window.location.reload();
            //    // this.props.history.goBack();
            //    this.props.dispatch(postGroupCreate(null));
            // });
            this.props.history.replace('/group/edit/'+this.props.getResponDataGroup.data.GroupID)
         }
      }
      return (
         <div>
            <NavbarComponent />
            <div style={{ backgroundColor: '#fff', padding: "20px" }} >
               <GoBackComponent title="Tambah Group Jabatan"
                  functionClick={() => this.goBackClick()} />
               {/* {"adaShift2 "+this.state.adaShift2 +" | adaShift3 "+this.state.adaShift3} */}
               <FormGroupComponent 
                  onSubmit={(data) => this.handleSubmit(data)}
                  adaShift2={this.state.adaShift2}
                  adaShift3={this.state.adaShift3}
                  setAdaShift2={(val) => this.setAdaShift2(val)}
                  setAdaShift3={(val) => this.setAdaShift3(val)}
                  />
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
