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
import swal2 from "@sweetalert/with-react"

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
    // console.log(data);
    this.props.dispatch(postIzinGroup(data));
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
        swal2(
          
          <div>
            {
              this.props.getResponDataIzin.responeSudahAda.length > 0 ? (
                <div>
                  <h4>Sukses...</h4>
                  <ul style={{padding:"0", margin:"0 0 0 10px", textAlign:"left"}}> 
                    {
                      this.props.getResponDataIzin.responeSudahAda.map(function(item){
                        return (
                          <li>{item}</li>
                        )
                      })
                    }
                  </ul>
                </div>
              ) : ("Sukses") 
            }
          </div>
          //JSON.stringify(this.props.getResponDataIzin.responeSudahAda) ,
          
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
