import React, { Component } from "react";
import { Button, Container} from "reactstrap";
import BackIzin from "../components/BackIzin";
import { connect } from "react-redux";
import { postIzinGroup } from "../actions/izinAction";
import { getOptUser } from "../actions/optAction";
import swal from "sweetalert";
import FormIzinGroup from "../components/FormIzinGroup";
import NavbarComponent from "../components/NavbarComponent";
import {Redirect} from "react-router-dom";

const mapStateToProps = (state) => {
  return {
    getResponDataIzin: state.Izin.getResponDataIzin,
    errorResponDataIzin: state.Izin.errorResponDataIzin,
  };
};

class CreateIzinGroup extends Component {
  componentDidMount() {
    this.props.dispatch(getOptUser());
  }
  handleSubmit(data) {
    this.props.dispatch(postIzinGroup(data));
  }

  async handleClick(){
    // var a = 0;

    // function aww() {
    //   return 3;
    // }
    
    // let xa = await aww();
    // a +=1;

    // console.log(a);


    // swal(
    //   "test", {
    //     buttons: {
    //       ok:"Okay"
    //     }
    //   }
    // ).then((value) => {
    //   window.location.reload();
    // });
  }

  render() {
    if (!localStorage.getItem('user')||  localStorage.getItem('user') === "false") {
      swal("Failed!", "Login Dulu Bosq", "error");
      return <Redirect to="/home" /> ;
    } 
    if (this.props.getResponDataIzin || this.props.errorResponDataIzin) {
      if (this.props.errorResponDataIzin) {
        swal("Failed!", this.props.errorResponDataIzin, "error");
      } else {
        swal(
          "Izin Created!",
          "~" ,
          "success"
        ).then((value) =>{
          window.location.reload();
        });
      }
    }

    


    return (
      <div>
        <NavbarComponent />
        <div style={{ backgroundColor: '#f9a826'}}>
          <BackIzin></BackIzin>
        <Container>
        <FormIzinGroup onSubmit={(data) => this.handleSubmit(data)} />
        {/* <Button onClick={this.handleClick}>TEST</Button> */}
        </Container>
        </div>
        </div>
    );
  }
}

export default connect(mapStateToProps, null)(CreateIzinGroup);
