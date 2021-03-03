import React, { Component} from "react";
import { connect } from "react-redux";
import { postLoginUser } from "../actions/loginAction";
import swal from "sweetalert";
import { getUsersList } from "../actions/userAction";
import LoginComponent from "../components/LoginComponent";
import { Redirect } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";


const mapStateToProps = (state) => {
  return {
    getResponLoginUser: state.Login.getResponLoginUser,
    errorResponLoginUser: state.Login.errorResponLoginUser,
    isAuthenticated: state.Login.isAuthenticated,
    user: state.Login.user,
  };
};


class LoginContainer extends Component {
  handleSubmit(data) {
    this.props.dispatch(postLoginUser(data));
  }
  componentDidMount() {
    this.props.dispatch(getUsersList());
  }


  
  render() {
    if (this.props.getResponLoginUser || this.props.errorResponLoginUser) {
      if (this.props.errorResponLoginUser || this.props.getResponLoginUser.Login === "false" ) {
        alert('Username & Password Salah');
        window.location.reload();
      }  else {
          if (this.props.getResponLoginUser.RoleAdmin === "99"){
            swal(
              "Sucsess!",
              "Login Berhasil",
              "success"
    
            );return <Redirect to="/superadmin" /> 

          }
          else {
            swal(
              "Sucsess!",
              "Login Berhasil",
              "success"
    
            );return <Redirect to="/" />

          }
        
      }
    }

    return (

   
    <div class="bgimg">
    <Container>
    <Row>
      <Col md={6}>
    <LoginComponent onSubmit={(data) => this.handleSubmit(data)}/>
    </Col>
    </Row>
    </Container>
     </div>
   
    );
  }
}

export default connect(mapStateToProps, null)(LoginContainer);
