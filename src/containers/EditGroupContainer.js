import React, { Component } from "react";
import { Container } from "reactstrap";
import BackGroup from "../components/BackGroup";
import { connect } from "react-redux";
import FormGroupComponent from "../components/FormGroupComponent";
import { getGroupDetail, putGroupUpdate } from "../actions/groupAction";
import swal from "sweetalert";
import NavbarComponent from "../components/NavbarComponent";
import { Redirect } from "react-router-dom";
import GoBackComponent from "../components/GoBackComponent";

const mapStateToProps = (state) => {
   return {
      getResponDataGroup: state.Group.getResponDataGroup,
      errorResponDataGroup: state.Group.errorResponDataGroup,
      dataGroup : state.Group.getGroupDetail,
   };
};

class EditGroupContainer extends Component {
   constructor(props){
      super(props)
      this.state = {
         adaShift2 : null,
         adaShift3 : null,
      }
   }

   setAdaShift2(val) {this.setState({...this.state, adaShift2:val})}
   setAdaShift3(val) {this.setState({...this.state, adaShift3:val})}

   componentDidMount() {
      this.props.dispatch(getGroupDetail(this.props.match.params.GroupID));
      console.log('yyy', this.props.getResponDataGroup)
   }

   
   componentDidUpdate(){
      // console.log('xxx')
      // if(!prevProps.getResponDataGroup && this.props.getResponDataGroup){
      //   if(this.props.dataGroup.JamDatangSiang != null) this.props.setAdaShift2(true)
      //   if(this.props.dataGroup.JamDatangSore) this.props.setAdaShift3(true)
        //console.log('xx', this.props.getResponDataGroup.JamDatangSiang, this.props.getResponDataGroup.JamDatangSore)
      //}
    }

   handleSubmit(data) {
      data['AdaOff'] = data.HariLibur.value === "" ? false : true
      data.HariLibur = data.HariLibur.value

      if(this.state.adaShift2 === false){
         data.JamDatangSiang = 'undefined'
         data.JamMulaiLemburSiang = 'undefined'
         data.JamMulaiSiang = 'undefined'
         data.JamPulangSiang = 'undefined'
         data.MaxJamDatangSiang = 'undefined'
         data.MaxJamKembaliSiang = 'undefined'
         data.MinJamLemburSiang = 'undefined'
         // data.TBertingkats2 = []
      }
      
      if(this.state.adaShift3 === false){
         data.JamDatangSore = 'undefined'
         data.JamMulaiLemburSore = 'undefined'
         data.JamMulaiSore = 'undefined'
         data.JamPulangSore = 'undefined'
         data.MaxJamDatangSore = 'undefined'
         data.MaxJamKembaliSore = 'undefined'
         data.MinJamLemburSore = 'undefined'
         // data.TBertingkats3 = []
      }

      // if(!data.RuleTerlambatBertingkat){ ** EDit tidak direset, karena akan dicek dlu di backend, jika false ada rule, akan dihapus
      //    data.TBertingkats1 = []
      //    data.TBertingkats2 = []
      //    data.TBertingkats3 = []
      // }
      console.log(data)
      if(this.state.adaShift2=== false) console.log(this.state.adaShift2,this.state.adaShift3)
      this.props.dispatch(putGroupUpdate(data, this.props.match.params.GroupID));
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
               //window.location.reload();
               //return <Redirect to="/group" />;
               // this.goBackClick()
               this.props.dispatch(getGroupDetail(this.props.match.params.GroupID));
               this.props.dispatch(putGroupUpdate(null));
            });
         }
      }
      return (
         <div>
            <NavbarComponent />
            <div style={{ backgroundColor: '#fff', padding: "20px" }} >
               <GoBackComponent title="Edit Group Jabatan"
                  functionClick={() => this.goBackClick()} />
               <FormGroupComponent 
                  dis={true} 
                  onSubmit={(data) => this.handleSubmit(data)}
                  adaShift2={this.state.adaShift2}
                  adaShift3={this.state.adaShift3}
                  setAdaShift2={(val) => this.setAdaShift2(val)}
                  setAdaShift3={(val) => this.setAdaShift3(val)}
                  />
            </div>
         </div>
      );
   }
}

export default connect(mapStateToProps, null)(EditGroupContainer);
