import React, { Component } from "react";
import { Container} from "reactstrap";
import BackIzin from "../components/BackIzin";
import { connect } from "react-redux";
import { deleteDataIzin, getIzinList, postIzinGroup } from "../actions/izinAction";
import { getOptUser } from "../actions/optAction";
import swal from "sweetalert";
import FormIzinGroup from "../components/FormIzinGroup";
import NavbarComponent from "../components/NavbarComponent";
import {Redirect} from "react-router-dom";
import swal2 from "@sweetalert/with-react"
import { postLaporanProses } from "../actions/laporanAction";
import IzinComponent from "../components/IzinComponent";

const mapStateToProps = (state) => {
  return {
    getResponDataIzin: state.Izin.getResponDataIzin,
    errorResponDataIzin: state.Izin.errorResponDataIzin,
  };
};

class CreateIzinGroup extends Component {
  componentDidMount() {
    this.props.dispatch(getOptUser());
    this.props.dispatch(getIzinList());
    this.props.dispatch(deleteDataIzin());
  }
  
  handleSubmit(data) {
    if(data.Status.value === 'LENGKAPI'){
      swal({
        title: "Otomatis lengkapi absen?",
        text:
          "Periksa dulu tanggal awal : " +
          data.TanggalScan +
          " dan tanggal akhir : " +
          data.TanggalScanSampai +
          ". Anda setuju?",
        icon: "warning",
        buttons: {
          defeat: {
            text: "Ya",
            value: "ok",
          },
          cancel: "Tidak",
        },
      }).then((willDelete) => {
        if (willDelete) {
          this.props.dispatch(postLaporanProses(data));
        } else {
          //swal("Your imaginary file is safe!");
        }
      });
    }else{
      this.props.dispatch(postIzinGroup(data));
    }
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
        <IzinComponent />
        </div>
    );
  }
}

export default connect(mapStateToProps, null)(CreateIzinGroup);
